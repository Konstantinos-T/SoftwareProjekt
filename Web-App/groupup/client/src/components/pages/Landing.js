import React, { Component } from "react";
import Esslingen from "../../Bilder/esslingen-5033333_1920.jpg";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import authenticator from "../../authentication/auth.js";
import LoginCard from "../LogIn/LandingCard.js";
import NavigationBar from "../TopBotBars/NavigationBar2.js";
import Topbar from "../TopBotBars/Topbar.js";

export class landingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Benutzername: "",
      isLoggedIn: false,
      user: undefined,
      response: [],
      Suche: undefined
    };
  }


componentDidMount() {
  axios.get("http://localhost:8100/auth/isAuth", { withCredentials: true })
  .then((res) => {
    const auth = res.data.state;
    const user = res.data.user;
    this.setState({ isLoggedIn: auth });          
    this.setState({ Benutzername: user.id });             
    localStorage.setItem("isLoggedIn", auth);
    /* console.log("isAuth", auth);
    console.log("UserID", this.state.Benutzername); */ 
    if (res.data.state === true) {
      console.log("Alles gut.. der User ist legal")
      authenticator.login();
      authenticator.setUser(res.data.user.id);
    }else{
      console.log("Error: Der User ist nicht AUTHENTIFIZIERT.")
    }
    //Suche in der Datenbank ob der user angelegt ist.
    axios.get("http://localhost:5000/userPosts/findUser/"+this.state.Benutzername)
      .then((res) => { 
          console.log(res.data);
          if(res.data <= 0){
          console.log("Es gibt aber keinen Treffer!!"); 
          const NeuerBenutzer = { Like: 0, Dislike: 0, Benutzername: this.state.Benutzername }; 
          console.log("Ich lege deswegen ein Profil an: "); 

          axios.post("http://localhost:5000/userPosts", NeuerBenutzer )
          .then((res) => {
          console.log("RESPONSE RECEIVED: ", res);})
          .catch((err) => {
          console.log("AXIOS POST ERROR: ", err);});
          }
      });
  })
}

  render() {
    return (
      <div>
        <Topbar></Topbar>
        <div style={{ backgroundImage: `url(${Esslingen})`, backgroundSize: `cover`}}>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "100vh" }}
        >
          <LoginCard props={this.state.user} ></LoginCard>
        </Grid>
        </div>
        <NavigationBar></NavigationBar>
      </div>
    );
  }
}

export default landingPage;
