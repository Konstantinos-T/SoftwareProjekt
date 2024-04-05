import React, { Component } from "react";
import CardGenerator from "../Cards Raw/CardGenerator.js";
import ProfilCard from "../Cards Raw/ProfilCard.js";
import Topbar from "../TopBotBars/Topbar.js";
import authenticator from "../../authentication/auth.js";
import NavigationBar from "../TopBotBars/NavigationBar2.js";
import axios from "axios";
import { Button } from "@material-ui/core";

export class DashboardDemo extends Component {
  constructor(props) {
    super(props);
    //console.log(this.props);
    
    this.state = {
      isLoggedIn: false,
      user: undefined,
      start: "",
      ziel: "",
      date: "",
      abfahrt: "",
      ankunft: "",
      preis: "",
      umwege: true,
      maennlicheMitfahrer: true,
      weiblicheMitfahrer: true,
      rauchen: true,
      tierauto: true,
      response: [],
      Suche: undefined,
      Benutzername: undefined,
      number:0,
      searchNo: 0,
      isloaded:false,

      trialUserData: {
        benutzerObjektID: "",
        benutzerProfilBild:
          "https://cdn6.f-cdn.com/contestentries/1376995/30494909/5b566bc71d308_thumbCard.jpg",
        benutzerName: "TestUser",
        benutzerSemester: "TestSemester",
        benutzerStudiengang: "TestStudiengang",
        benutzerWohnort: "TestWohnort",
        benutzerHochschule: "TestHochschule",
        benutzerAuto: "TestAuto",
        benutzerGeschlecht: "TestGeschlecht",
        benutzerOrt: "TestOrt",
        benutzerLat: 0,
        benutzerLong: 0,
        fahrtenAngenommen: [{}],
        fahrtenAbgelehnt: [],
        fahrtenAngeboten: [],
        alarme: {
          fahrtAngenommen: false,

          neueMitfahrer: false,
        },
      },
    };
  }

  

  componentDidMount(){
    /* let pIsLoggedIn = authenticator.isAuthenticated();
    let pUser = authenticator.getUser();
    this.state.isLoggedIn = pIsLoggedIn;
    this.state.user = pUser;
    console.log("Logged " + this.state.isLoggedIn);
    console.log("User " + this.state.user); */
    axios.get("http://localhost:8100/auth/isAuth", { withCredentials: true })
      .then((res) => {
        const auth = res.data.state;
        const user = res.data.user;
        this.setState({ isLoggedIn: auth });          
        this.setState({ user: user.id });
        //console.log(this.state.user);
        this.state.Benutzername = user.id;
        this.setState({isloaded: true})
    })
  }

  render() {
    if(this.state.isloaded){
    return (
      <div style={{ margin: "1%" }}>
        <Topbar title={"Dashboard"}></Topbar>
        <div style={{ display: "flex",flexWrap: "wrap" }}>
          <div>
            <h1>Profil</h1>
              <ProfilCard user={this.state.user}>
            </ProfilCard>
          <Button onClick = {() => {this.setState({searchNo: this.state.searchNo+1})}} variant="contained" color="primary" size="large" type="submit" fullWidth> Aktualisieren </Button>
          </div>
          <div>
            <h1>Deine Angebote</h1>
            <CardGenerator
              type="EigeneAngeboteneFahrtCard"
              params={this.state.Benutzername}
            ></CardGenerator>
          </div>
          <div>
            <h1>Buchungen</h1>
            <CardGenerator
              type="GebuchteFahrtenCard"
              params={this.state.Benutzername}
            ></CardGenerator>
          </div>
          <div>
            <h1>Fahrtanfragen</h1>
            <CardGenerator
              type="AngefragteFahrtCard"
              params={this.state.Benutzername}
            ></CardGenerator>
          </div>
        </div>
        <NavigationBar></NavigationBar>
      </div>
    );
  }
  else return null;
  }
}

export default DashboardDemo;
