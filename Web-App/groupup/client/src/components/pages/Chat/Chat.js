/* import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import TextContainer from "../../chat/TextContainer/TextContainer.js";
import Messages from "../../chat/Messages/Messages.js";
import InfoBar from "../../chat/InfoBar/InfoBar.js";
import Input from "../../chat/Input/Input/Input.js";
import Topbar from "../../TopBotBars/Topbar";
import NavigationBar from "../../TopBotBars/NavigationBar2.js";
import { Link } from "react-router-dom";

import "./Chat.css";

const ENDPOINT = "localhost:5001/";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT); //pass endport to the server

    setRoom(room);
    setName(name);

    socket.emit("join", { name, room }, (error) => {
      //on join wie are going to do ..., error function callback
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]); //only if these two points change, we need t rerender

  //listen for messages
  useEffect(() => {
    socket.on("message", (message) => {
      console.log(message);
      setMessages((messages) => [...messages, message]); //add every new message to messages array
    });

    socket.on("roomData", ({ users }) => {
      console.log(users);
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault(); //prevent default behavior of a button or a key press

    if (message) {
      socket.emit("sendMessage", message, () => setMessage("")); //input field clears after sending a message
    }
  };

  return (
    <div>
      <Topbar title={"Chat"}></Topbar>
      <div className="outerContainer">
        <div className="container">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        </div>
        <TextContainer users={users} />
      </div>
      <NavigationBar></NavigationBar>
    </div>
  );
};

export default Chat;
 */