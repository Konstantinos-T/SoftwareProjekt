// Keycloak imports
import saml from "passport-saml";
import passport from "passport";
import { fileURLToPath } from "url";
import { dirname } from "path";
// Server imports
import fs from "fs";
import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import { Server as httpserver } from "http";
import { Server } from "socket.io";
import { addUser, removeUser, getUser, getUsersInRoom } from "./controllers/users.js";
import postsRouter from "./routes/postsRouter.js";
import userRouter from "./routes/userRouter.js";

const app = express();
const http = httpserver(app);
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods","GET, POST, OPTIONS, PUT, PATCH, DELETE" );
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Routen in die Datenbank http://localhost:5000/posts/
app.use("/posts", postsRouter);
app.use("/userPosts", userRouter);

const MongoDB_Port = process.env.PORT;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(MongoDB_Port, () =>
      console.log(
        `MongoDB is running on Port: http://localhost:${MongoDB_Port}`
      )
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
mongoose.set("useFindAndModify", false);

////////////////////////////////////////////////////////////////////////////////////////
//// Node

const corsConfig = { origin: true, credentials: true };
app.use(cors(corsConfig));

const NODE_PORT = process.env.PORT_Node || "8100";
app.set("port", NODE_PORT);
app.listen(NODE_PORT, () =>
  console.log(
    `MySQL/Keycloak Server is running on http://localhost:${NODE_PORT}`
  )
);

let memoryStore = new session.MemoryStore();

session;
app.use(
  session({
    secret: "thisShouldBeLongAndSecret",
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
    // Enable for cross site cookie
    // secure: true //https
    // secure: false //http
    // cookie: { sameSite: "none", secure: true },
  })
);

///////////////////////////////////////////////////////////////////////////////
//// Keycloak



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());

const CALLBACK_URL = `http://localhost:${NODE_PORT}/login/callback`;
const ISSUER = "node";

// passed as option to docker
const ENTRY_POINT = "http://localhost:8080/auth/realms/hse/protocol/saml";

const publicKey = fs.readFileSync(__dirname + "/certs/server.crt", "utf8");
const privateKey = fs.readFileSync(__dirname + "/certs/key.pem", "utf8");

const saml_options = {
  callbackUrl: CALLBACK_URL,
  issuer: ISSUER,
  entryPoint: ENTRY_POINT,
  identifierFormat: null,
  // The decryptionPvK and privateCert both refer to the local private key
  // downloaded from keycloak - client - SAML keys - export (format: pks12)
  privateCert: privateKey,
  decryptionPvk: privateKey,
  // IDP public key from the servers meta data
  cert: fs.readFileSync(__dirname + "/certs/idp_cert.pem", "utf8"),
  validateInResponseTo: false,
  disableRequestedAuthnContext: true,
};

function saml_callback(profile, done) {
  console.log("Parsing SAML", profile);
  const user = { id: profile.nameID };
  return done(null, user);
}

const samlStrategy = new saml.Strategy(saml_options, saml_callback);
passport.use("samlStrategy", samlStrategy);

app.get(
  "/auth/login",
  passport.authenticate("samlStrategy", {
    // successRedirect: "",
    failureRedirect: "/auth/fail",
  })
);

app.get("/auth/isAuth", (req, res) => {
  if (req.isAuthenticated()) {
    res.send({ state: true, user: req.user });
  } else {
    res.send({ state: false, user: req.user });
  }
});

app.get("/auth/logout", (req, res) => {
  req.logout();
  res.redirect("http://localhost:3000/");
});

// You need to provide a route corresponding to the path configuration parameter given to the strategy:
// The authentication callback must be invoked after the body-parser middlerware.
app.post(
  "/login/callback",
  bodyParser.urlencoded({ extended: false }),
  passport.authenticate("samlStrategy", { failureRedirect: "/auth/fail" }),
  (req, res, next) => {
    console.log("SSO Login ################", req.user.id);
    res.redirect("http://localhost:3000/Landing");
  }
);

const metadata = samlStrategy.generateServiceProviderMetadata(
  publicKey,
  publicKey
);
app.get("/metadata", function (req, res) {
  res.type("application/xml");
  res.status(200).send(metadata);
});
const PORT = process.env.PORT;

///////////////////////////////////////////////////////////////////////////////
//// Socket.IO Connection

// const server = http.createServer(app);
const io = new Server(http, { cors: { origin: "*" } });

const CHAT = process.env.CHAT_PORT;
app.set("port", CHAT);
http.listen(CHAT, () =>
  console.log(`Chat Server is running on http://localhost:${CHAT}`)
);
// app.set("socketio", io);
console.log(io.path());
io.on("connect", (socket) => {
  console.log("verbunden ?");
  socket.on("join", ({ name, room }, callback) => {
    console.log("verbunden ?");
    //error handling
    const { error, user } = addUser({
      //add new user
      id: socket.id,
      name,
      room,
    });

    if (error) return callback(error); //error message from users.js will be called

    socket.join(user.room);

    //welcome message with username for the user
    socket.emit("message", {
      user: "admin",
      text: `${user.name}, willkommen im Chatraum der Fahrt: ${user.room}.`,
    });
    //Join message for every other user in the room
    //broadcast send a message to everone besides that specific user in the user.room
    socket.broadcast.to(user.room).emit("message", {
      user: "admin",
      text: `${user.name} ist dem Chatraum beigetreten!`,
    });

    //users in room
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  //message send
  socket.on("sendMessage", (message, callback) => {
    //user who sends the message
    const user = getUser(socket.id);

    //message comes from the frontend
    io.to(user.room).emit("message", {
      user: user.name,
      text: message,
    });

    callback();
  });

  //disconnect messages
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit("message", {
        user: "Admin",
        text: `${user.name} hat den Chatraum verlassen.`,
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});
