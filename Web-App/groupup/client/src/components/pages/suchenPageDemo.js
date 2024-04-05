import React, { Component } from "react";
import { Paper, Button } from "@material-ui/core";
import MapsOrtFeld from "../fahrt detail eingabefelder/MapsOrtFeld.js";
import DatePickerInline from "../fahrt detail eingabefelder/DatePickerInline.js";
import TimePicker from "../fahrt detail eingabefelder/TimePicker.js";
import TopbarSuchen from "../TopBotBars/TopbarSuchen.js";
import FahrtdetailsSuchen from "../fahrt detail eingabefelder/FahrtdetailsSuchen.js";
import CardGenerator from "../Cards Raw/CardGenerator.js";
import authenticator from "../../authentication/auth.js";

export class suchenPageDemo extends Component {
  state = {
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
  };

  componentDidMount() {
    let pIsLoggedIn = authenticator.isAuthenticated();
    let pUser = authenticator.getUser();
    this.state.isLoggedIn = pIsLoggedIn;
    this.state.user = pUser;
    console.log("Logged " + this.state.isLoggedIn);
    console.log("User " + this.state.user);
  }

  render() {
    return (
      <div>
        <TopbarSuchen></TopbarSuchen>
        <div style={{ display: "grid", placeItems: "center" }}>
          <Paper style={{ padding: "2%", width: 350, margin: "2%", marginBottom: "7%", }} >
            <form autoComplete="off" noValidate style={{ margin: "2%", display: "flex", flexWrap: "wrap", justifyContent: "center", }} >
              <MapsOrtFeld label="Start" parentCallback={this.callbackFunctionStart} ></MapsOrtFeld>
              <MapsOrtFeld label="Ziel" parentCallback={this.callbackFunctionZiel} ></MapsOrtFeld>
              <DatePickerInline label="Datum" parentCallback={this.callbackFunctionDatum} ></DatePickerInline>
              <TimePicker label="Früheste Abfahrt" parentCallback={this.callbackFunctionAbfahrt} ></TimePicker>
              <TimePicker label="Späteste Ankunft" parentCallback={this.callbackFunctionAnkunft} ></TimePicker>
              <FahrtdetailsSuchen parentCallback={this.callbackFunctionFahrtdetails} ></FahrtdetailsSuchen> <Button>Mach mich Smart</Button>
            </form>
          </Paper>
          <CardGenerator
            type="SuchenFahrtCard"
            params="_limit: 2"
          ></CardGenerator>
        </div>
      </div>
    );
  }
}

export default suchenPageDemo;
