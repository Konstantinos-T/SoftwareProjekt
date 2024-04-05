import React, { Component } from "react";
import { Paper, Button } from "@material-ui/core";
import MapsOrtfeld from "../fahrt detail eingabefelder/MapsOrtFeld.js";
import DatePickerInline from "../fahrt detail eingabefelder/DatePickerInline.js";
import TimePicker from "../fahrt detail eingabefelder/TimePicker.js";
import Topbar from "../TopBotBars/Topbar.js";
import FahrtdetailsSuchen from "../fahrt detail eingabefelder/FahrtdetailsSuchen.js";
import CardGenerator from "../Cards Raw/CardGenerator.js";
import authenticator from "../../authentication/auth.js";
import NavigationBar from "../TopBotBars/NavigationBar2.js";
import GoogleMapsReact from"../Schould Haves/GoogleMaps.js";
import Maps from "../Schould Haves/GoogleMaps3.js";
export class suchenPage extends Component {
  
  constructor(props) {
    super(props);

    //Bind <this> to the Methods because otherwise <this> is undefined.
    this.findDrive = this.findDrive.bind(this);

    this.state = {
      isLoggedIn: false,
      user: undefined,
      Start: undefined,
      Ziel: undefined,
      Datum: undefined,
      Abfahrt: undefined,
      Ankunft: undefined,
      response: [],
      Suche: undefined,
      searchNo: 0,
      CardGenerator: undefined,
      Preis: undefined,
      MarkerLatLongs: undefined,
      Maps: undefined
    };
  }
  
  componentDidMount() {
    let pIsLoggedIn = authenticator.isAuthenticated();
    let pUser = authenticator.getUser();
    this.state.isLoggedIn = pIsLoggedIn;
    this.state.user = pUser;
    //console.log("Logged " + this.state.isLoggedIn);
    //console.log("User " + this.state.user);
  }
  findDrive(e) {
    e.preventDefault();

    const Details = {
      Start: this.state.Start,
      Ziel: this.state.Ziel,
      Datum: this.state.Datum,
      Abfahrt: this.state.Abfahrt,
      Ankunft: this.state.Ankunft,
      Preis: this.state.Preis,
    };
    console.log(Details);
    this.setState({ Suche: Details });
    this.setState({ searchNo: this.state.searchNo + 1 });
  }

  getLatLongFromCardGenerator=(driveData) =>{
    //console.log("driveData für LatLong:"+JSON.stringify(driveData));
    const LatLong = driveData.map((Data, i) => {
      /* console.log("Das sind die Daten die an die SuchenFahrtCard weitergegeben werden" + Data.fahrtObjektID); */
        return (
          {
            Lat:Data.fahrtAbfahrtsLat,
            Lng:Data.fahrtAbfahrtsLong
          }
        );
    }, this);
    //console.log("Markes für LatLong:"+JSON.stringify(LatLong));
    this.setState({MarkerLatLongs:LatLong})
    //console.log("MarkerLatLongs(Seite):"+JSON.stringify(this.state.MarkerLatLongs))
    const Karte=<Maps key={this.state.searchNo+12894619264} Markerpos={this.state.MarkerLatLongs} driveData={driveData}/>
this.setState({Maps: Karte});  
  }

  render() {
   
    return (
      <div>
        <Topbar title={"Fahrt-Suchen"}></Topbar>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "left", flex: "1", }} >
            <Paper style={{ width: 300, height: 570, margin: "1%" }}>
              <form onSubmit={this.findDrive} autoComplete="off" noValidate style={{ margin: "2%", display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
                <MapsOrtfeld label="Start" parentCallback={(Start) => {   this.setState({ Start:  Start }); }} ></MapsOrtfeld>
                <MapsOrtfeld label="Ziel" parentCallback={(Ziel) => {   this.setState({ Ziel: Ziel }); }}></MapsOrtfeld>
                <DatePickerInline label="Datum" parentCallback={(value) => {this.setState({ Datum: value }); }}></DatePickerInline>
                <TimePicker label="Früheste Abfahrt" parentCallback={(value) => { this.setState({ Abfahrt: value }); }}></TimePicker>
                <TimePicker label="Späteste Ankunft" parentCallback={(value) => { this.setState({ Ankunft: value }); }}></TimePicker>
                <FahrtdetailsSuchen 
                  parentCallback={(value1, value2, value3) => {
                    this.setState({ Preis: value1 }); 
                    this.setState({ Sitze: value2 });
                    this.setState({ Umwege: value3 }); 
                }}></FahrtdetailsSuchen>
                <Button variant="contained" color="primary" size="large" type="submit" fullWidth> Suche </Button>
              </form>
            </Paper>
           {this.state.Maps}
           <div>
              <h1 style={{textAlign: "left"}}>Deine Suchergebnisse:</h1>
              <CardGenerator key={ this.state.searchNo } getLatLongFromCardGenerator={this.getLatLongFromCardGenerator} type="SuchenFahrtCard" params={ this.state.Suche } inputValue = { this.state.user }></CardGenerator>
              </div>
        </div>
        <NavigationBar></NavigationBar>
      </div>
    );
  }
}

export default suchenPage;
