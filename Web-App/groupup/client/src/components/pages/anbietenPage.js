import React, { Component } from "react";
import axios from "axios";
import { Paper, Button } from "@material-ui/core";
import MapsOrtfeld from "../fahrt detail eingabefelder/MapsOrtFeld.js";
import DatePickerInline from "../fahrt detail eingabefelder/DatePickerInline.js";
import TimePicker from "../fahrt detail eingabefelder/TimePicker.js";
import Topbar from "../TopBotBars/Topbar.js";
import FahrtdetailsAnbieten from "../fahrt detail eingabefelder/FahrtdetailsAnbieten.js";
import CardGenerator from "../Cards Raw/CardGenerator.js";
import authenticator from "../../authentication/auth.js";
import NavigationBar from "../TopBotBars/NavigationBar2.js";
import {Toaster, toast} from "react-hot-toast";

export class anbietenPage extends Component {
  constructor(props) {
    super(props);

    //Bind <this> to the Methods because otherwise <this> is undefined.
    this.onSubmit = this.onSubmit.bind(this);
    this.GetDrivesByUserID = this.GetDrivesByUserID.bind(this);

    this.state = {
      isLoggedIn: false,
      user: undefined,
      Start: "",
      StartLongitude: undefined,
      StartLatitude: undefined,
      Ziel: "",
      ZielLongitude: undefined,
      ZielLatitude: undefined,
      Datum: undefined,
      Abfahrt: undefined,
      Ankunft: undefined,
      Preis: undefined,
      Sitze: undefined,
      Umwege: undefined,
      MaennlicheMitfahrer: undefined,
      WeiblicheMitfahrer: undefined,
      Rauchen: undefined,
      Tierauto: undefined,
      response: [],
      Suche: undefined,
      searchNo: 0,
    };
  }

onSubmit = async (e)  => {
  e.preventDefault();

  if(this.checkIfFahrtValid()===true){
    
  await axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
    params:{address:this.state.Start,  key:'AIzaSyAal9X3BtUcBUTaSCWtSTHUaXFkrrjMDHk' }})
    .then((response) => {
      this.setState({ StartLatitude: response.data.results[0].geometry.location.lat });
      this.setState({ StartLongitude: response.data.results[0].geometry.location.lng }); 
      /* this.state.StartLatitude=response.data.results[0].geometry.location.lat;
      this.state.StartLongitude=response.data.results[0].geometry.location.lng;  */
      console.log("Geocoding erfolgreich: Lat:"+ this.state.StartLatitude+" Long:"+this.state.StartLongitude);
    }) 
    .catch ((error) => {
      console.log("Geocoding fehlgeschlagen. Ort:"+  this.state.Start);
    });

    const Fahrt = {
      Fahrer: this.state.user,
      Start: this.state.Start,
      Ziel: this.state.Ziel,
      Datum: this.state.Datum,
      Abfahrt: this.state.Abfahrt,
      StartLatitude: this.state.StartLatitude,
      StartLongitude: this.state.StartLongitude,
      Ankunft: this.state.Ankunft,
      Preis: this.state.Preis,
      Sitze: this.state.Sitze,
      Umwege: this.state.Umwege,
      MaennlicheMitfahrer: this.state.MaennlicheMitfahrer,
      WeiblicheMitfahrer: this.state.WeiblicheMitfahrer,
      Rauchen: this.state.Rauchen,
      Tierauto: this.state.Tierauto,
      BelegteSitze: 0,
      isloaded:false,
    };
    console.log(Fahrt);

  await axios.post("http://localhost:5000/posts", Fahrt)
      .then((res) => {
        console.log("RESPONSE RECEIVED: ", res);
      })
      .catch((err) => {
        console.log("AXIOS POST ERROR: ", err);
      });
  }
  this.setState({ searchNo: this.state.searchNo + 1 });
}


  //Checkt ob die Werte gestetzt und mindestens Maennliche oder Weibliche Mitfahrer angenommen werden
checkIfFahrtValid(){
  if(this.state.user!==""&&this.state.Start!==""&&this.state.Ziel!==""&&this.state.Datum!==undefined&&this.state.Abfahrt!==undefined&&this.state.Ankunft!==undefined
  &&this.state.Preis!==""&&this.state.Sitze!==""&&this.state.Umwege!==""&&this.state.MaennlicheMitfahrer!==""&&this.state.WeiblicheMitfahrer!==""&&this.state.Rauchen!==""
  &&this.state.Tierauto!==""&&(this.state.MaennlicheMitfahrer||this.state.WeiblicheMitfahrer===true)){
    return true}
  else {
    toast.error("Bitte überprüfe ob du alles eingetragen hast");
    return false
  }
}
  GetDrivesByUserID(e) {
    e.preventDefault();

    console.log(
      "this is the current user wich i can search: " + this.state.user
    );
    const Details = { Fahrer: this.state.user };
    console.log(Details);
    this.setState({ Suche: Details });
    this.setState({ searchNo: this.state.searchNo + 1 });
  }

  componentDidMount() {
    let pIsLoggedIn = authenticator.isAuthenticated();
    let pUser = authenticator.getUser();
    /* this.setState({isLoggedIn: pIsLoggedIn});
    this.setState({user: pUser}); */
    this.state.isLoggedIn = pIsLoggedIn;
    this.state.user = pUser;
    //console.log("Logged " + this.state.isLoggedIn);
    //console.log("User " + this.state.user);
    this.setState({isloaded: true})
  }

  render() {
    if(this.state.isloaded){
    return (
      <div>
        <Toaster></Toaster>
        <Topbar title={"Fahrt-Anbieten"}></Topbar>
        <div style={{ display: "flex", flexWrap: "Wrap", justifyContent: "center", flex: "1", }} >
          <Paper style={{ width: 300, height: 870, margin: "1%" }} >
            <form onSubmit={this.onSubmit} autoComplete="off" noValidate style={{ margin: "2%", display: "flex", flexWrap: "wrap", justifyContent: "center", }} >
              <MapsOrtfeld
                label="Start"
                parentCallback={(Start, StartLongitude, StartLatitude) => {
                this.setState({ Start: Start });
                this.setState({ StartLongitude: StartLongitude });
                this.setState({ StartLatitude: StartLatitude });
                }}
              ></MapsOrtfeld>
              <MapsOrtfeld
                label="Ziel"
                parentCallback={(Ziel, ZielLongitude, ZielLatitude) => {
                  this.setState({ Ziel: Ziel });
                  this.setState({ ZielLongitude: ZielLongitude });
                  this.setState({ ZielLatitude: ZielLatitude });
                }}
              ></MapsOrtfeld>
              <DatePickerInline
                label="Datum"
                parentCallback={(value) => {
                  this.setState({ Datum: value });
                }}
              ></DatePickerInline>
              <TimePicker
                label="Früheste Abfahrt"
                parentCallback={(value) => {
                  this.setState({ Abfahrt: value });
                }}
              ></TimePicker>
              <TimePicker
                label="Späteste Ankunft"
                parentCallback={(value) => {
                  this.setState({ Ankunft: value });
                }}
              ></TimePicker>
              <FahrtdetailsAnbieten
                parentCallback={( value1, value2, value3, value4, value5, value6, value7) => {
                  this.setState({ Preis: value1 });
                  this.setState({ Sitze: value2 });
                  this.setState({ Umwege: value3 });
                  this.setState({ MaennlicheMitfahrer: value4 });
                  this.setState({ WeiblicheMitfahrer: value5 });
                  this.setState({ Rauchen: value6 });
                  this.setState({ Tierauto: value7 });
                }}
              ></FahrtdetailsAnbieten>
              <Button variant="contained" color="primary" size="large" type="submit" fullWidth > Erstelle die Fahrt </Button>
            </form>
          </Paper>
          <div>
            <h1 style={{textAlign: "left"}}>Deine Angebotenen Fahrten: </h1>
              <CardGenerator key={this.state.searchNo} type="EigeneAngeboteneFahrtCard" params={this.state.user} ></CardGenerator>
          </div>  
        </div>
        <NavigationBar></NavigationBar>
      </div>
    );
  }
  else return null;
  }
}

export default anbietenPage;
