import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import SuchenFahrtCard from "./SuchenFahrtCard.js";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import EigeneAngeboteneFahrtCard from "./EigeneAngeboteneFahrtCard";
import GebuchteFahrtenCard from "./GebuchteFahrtenCard.js";
import AngefragteFahrtCard from "./AngefragteFahrtCard.js"

const useStyles = (theme) => ({
  root: {
    display: "inline-block",
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
});

export class CardGeneratorFahrtenSuchen extends Component {
  //props: params, type
  constructor(props){
    super(props);

    this.mapAxiosDriveResponseSuche = this.mapAxiosDriveResponseSuche.bind(this);
    this.mapAxiosDriveResponseBuchungen = this.mapAxiosDriveResponseBuchungen.bind(this);
    this.mapAxiosDriveResponseEigeneFahrt = this.mapAxiosDriveResponseEigeneFahrt.bind(this);
    this.mapAxiosDriveResponseAnfrage = this.mapAxiosDriveResponseAnfrage.bind(this);


    //console.log(this.props);
    this.state = {
      params: undefined ,
      response: [],
      userData: "",
      driverData: "",
      driveData: [],
      //Update für die Differenzierung der Karten
      driveDataSuche:[],
      driveDataMitfahrer:[],
      driveDataAnfrage:[],
      driveDataEigene:[],

      responseDataEigeneFahrt:[],


      testDriveData: [
        {
          fahrtCreatedAt: "",
          fahrtObjektID: "",
          fahrtFahrerID: "test01",
          fahrtDatum: "",
          fahrtAbfahrtsZeit: "",
          fahrtAbfahrtsOrt: "testFahrtAbfahrtsOrt",
          fahrtAbfahrtsLat: "10.1",
          fahrtAbfahrtLong: "10.1",
          fahrtAnkunftsOrt: "testFahrtAnkunftsOrt",
          fahrtAnkunftsLat: "10.5",
          fahrtAnkunftsLong: "10.5",
          fahrtAnkunftsZeit: "",
          fahrtAuto: "",
          fahrtKennzeichen: "",
          fahrtPreis: "3",
          fahrtSitze: 2,
          fahrtSitzeFrei: 1,
          fahrtRauchen: true,
          fahrtTierAuto: false,
          rideRequests: {
            pending: [
              {
                //TestUSer
                benutzerObjektID: "testUser01",
                benutzerProfilBild:
                  "https://media.krankenkassenzentrale.de/assets/Icon_Test_V3.png",
                benutzerName: "TestUser1",
                benutzerSemeser: 4,
                benutzerStudiengang: "TestStudiengang",
                benutzerWohnort: "TestWohnort",
                benutzerHochschule: "TestHochschule",
                benutzerAuto: "TestAuto",
                benutzerGeschlecht: "M",
                benutzerOrt: "TestOrt",
                benutzerLat: "10.2",
                benutzerLong: "10.2",
                alertMitfahrtWurdeGelöscht: 0,
                alertWurdeAngenommen: 0,
                alertWurdeBeiFahrtAbgelehnt: 0,
              },
            ],
            accepted: [
              {
                benutzerObjektID: "testUser02",
                benutzerProfilBild:
                  "https://media.krankenkassenzentrale.de/assets/Icon_Test_V3.png",
                benutzerName: "TestUser2",
                benutzerSemeser: 4,
                benutzerStudiengang: "TestStudiengang",
                benutzerWohnort: "TestWohnort",
                benutzerHochschule: "TestHochschule",
                benutzerAuto: "TestAuto",
                benutzerGeschlecht: "M",
                benutzerOrt: "TestOrt",
                benutzerLat: "10.2",
                benutzerLong: "10.2",
                alertMitfahrtWurdeGelöscht: 0,
                alertWurdeAngenommen: 0,
                alertWurdeBeiFahrtAbgelehnt: 0,
              },
            ],
            denied: [
              {
                benutzerObjektID: "testUser02",
                benutzerProfilBild: "",
                benutzerName: "TestUserMax",
                benutzerSemeser: 4,
                benutzerStudiengang: "TestStudiengang",
                benutzerWohnort: "TestWohnort",
                benutzerHochschule: "TestHochschule",
                benutzerAuto: "TestAuto",
                benutzerGeschlecht: "M",
                benutzerOrt: "TestOrt",
                benutzerLat: "10.3",
                benutzerLong: "10.3",
                alertMitfahrtWurdeGelöscht: 1,
                alertWurdeAngenommen: 1,
                alertWurdeBeiFahrtAbgelehnt: 1,
              },
            ],
          },
        },
      ],
    };
  }

  componentDidMount(){
    this.getDriveData(this.props.params);
  }

  //Fahrten suchen, Filtern/Sortieren über Parameter
  getDriveData(params) {
    
    //console.log("ich bin in der Funktion getDriveData");
    //console.log("Meine Suchparameter " + params );

    //In diesem Fall werden alle Fahrten gefunden wenn params undefined ist. Oder man sucht nach vorhandenen params von der Suchen Seite.
    if (this.props.type === "SuchenFahrtCard" ) {

      //console.log("Zweig Suche");
     // console.log(params);

    axios.get("http://localhost:5000/posts/find", { params}  )
      .then((responseSuche) => {
        this.mapAxiosDriveResponseSuche(responseSuche);
      });
    }

    if (this.props.type === "GebuchteFahrtenCard"  ) { //Dashboard Gebuchte Karten als Mitfahrer
      
      //console.log("Zweig Buchung");
      //console.log("Params nach dem ich die Gebuchte Fahrten Suche: " + params );

      axios.get("http://localhost:5000/posts/findeEigeneMitfahrt/" + params )
      .then((responseBuchung) => {
        
        this.mapAxiosDriveResponseBuchungen(responseBuchung);
      });
    }

    if (this.props.type === "EigeneAngeboteneFahrtCard" && this.props.params !== undefined ) { //Dashboard Gebuchte Karten als Fahrer

      //console.log("Zweig Eigene Fahrten");
      //console.log("Ich bin in der EigeneAngeboteneFahrtCard get Drive: ");



      axios.get("http://localhost:5000/posts/findeEigeneFahrt/" + params )
      .then((responseEigeneFahrt) => {
        this.mapAxiosDriveResponseEigeneFahrt(responseEigeneFahrt);
      });
    }

    if (this.props.type === "AngefragteFahrtCard" && this.props.params !== undefined) { //Dashboard Gebuchte Karten als Anfragender

      //console.log("Zweig Angefragte Fahrten");
      //console.log("Ich bin in der AngefragteFahrtCard get Drive: ");

      axios.get("http://localhost:5000/posts/findeEigeneAnfrage/" + params )
      .then((responseAnfrage) => {
        this.mapAxiosDriveResponseAnfrage(responseAnfrage);
      });
      
    }
  }

  mapAxiosDriveResponseSuche(responseSuche) {

    /*driveDataSuche:[],
      driveDataMitfahrer:[],
      driveDataAnfrage:[],
      driveDataEigene:[], */

      //(responseSuche.data);

    const DriveDataFromResponseSuche = responseSuche.data.map((response) => {
      return {
        fahrtCreatedAt: response.createdAt,
        fahrer: response.Fahrer,
        fahrtObjektID: response._id,
        fahrtDatum: response.Datum,
        fahrtAbfahrtsZeit: response.Abfahrt,
        fahrtAbfahrtsOrt: response.Start,   
        fahrtAbfahrtsLat: response.StartLatitude,
        fahrtAbfahrtsLong: response.StartLongitude,
        fahrtAnkunftsZeit: response.Ankunft,
        fahrtAnkunftsOrt: response.Ziel,
        fahrtAnkunftsLat: response.EndLatitude,
        fahrtAnkunftsLong: response.EndLongitude,
        fahrtPreis: response.Preis,
        fahrtSitze: response.Sitze,
        fahrtRauchen: response.Rauchen,
        fahrtTierauto: response.Tierauto,
        pending: response.MitfahrAnfragender,
        accepted: response.Mitfahrer,
        denied: response.MitfahrerAbgelent,
      };
    });

    this.setState({ driveDataSuche: DriveDataFromResponseSuche });

    if (this.props.type === "SuchenFahrtCard") {
      if (this.state.driveDataSuche.length > 0) {
        toast.success(this.state.driveDataSuche.length + " Fahrten gefunden" + "🎉");
        this.props.getLatLongFromCardGenerator(this.state.driveDataSuche);
      } else {
        toast.error("Leider keine Fahrten gefunden");
      }
    }
  }
  mapAxiosDriveResponseBuchungen(responseBuchung) {
    
    /*driveDataSuche:[],
      driveDataMitfahrer:[],
      driveDataAnfrage:[],
      driveDataEigene:[], */

    const DriveDataFromResponseBuchung = responseBuchung.data.map((response) => {
      return {
        eigenerUser: this.props.params,
        fahrtCreatedAt: response.createdAt,
        fahrer: response.Fahrer,
        fahrtObjektID: response._id,
        fahrtDatum: response.Datum,
        fahrtAbfahrtsZeit: response.Abfahrt,
        fahrtAbfahrtsOrt: response.Start,   
        fahrtAbfahrtsLat: response.StartLatitude,
        fahrtAbfahrtsLong: response.StartLongitude,
        fahrtAnkunftsZeit: response.Ankunft,
        fahrtAnkunftsOrt: response.Ziel,
        fahrtAnkunftsLat: response.EndLatitude,
        fahrtAnkunftsLong: response.EndLongitude,
        fahrtPreis: response.Preis,
        fahrtSitze: response.Sitze,
        fahrtRauchen: response.Rauchen,
        fahrtTierauto: response.Tierauto,
        pending: response.MitfahrAnfragender,
        accepted: response.Mitfahrer,
        denied: response.MitfahrerAbgelent,
      };
    });

    this.setState({ driveDataMitfahrer: DriveDataFromResponseBuchung });

    if (this.props.type === "GebuchteFahrtenCard") {
      if (this.state.driveDataMitfahrer.length > 0) {
        toast.success(this.state.driveDataMitfahrer.length + " Fahrten gefunden" + "🎉");
        /* this.props.getLatLongFromCardGenerator(this.state.driveDataMitfahrer); */
      } else {
        toast.error("Sie haben keine Fahrten bei der Sie mitfahren");
      }
    }
  }
  
  mapAxiosDriveResponseEigeneFahrt(responseEigeneFahrt) {

    /*driveDataSuche:[],
      driveDataMitfahrer:[],
      driveDataAnfrage:[],
      driveDataEigene:[], */

    
    const DriveDataFromResponseEigeneFahrt = responseEigeneFahrt.data.map((response) => {
      return {
        fahrtCreatedAt: response.createdAt,
        fahrer: response.Fahrer,
        fahrtObjektID: response._id,
        fahrtDatum: response.Datum,
        fahrtAbfahrtsZeit: response.Abfahrt,
        fahrtAbfahrtsOrt: response.Start,   
        fahrtAbfahrtsLat: response.StartLatitude,
        fahrtAbfahrtsLong: response.StartLongitude,
        fahrtAnkunftsZeit: response.Ankunft,
        fahrtAnkunftsOrt: response.Ziel,
        fahrtAnkunftsLat: response.EndLatitude,
        fahrtAnkunftsLong: response.EndLongitude,
        fahrtPreis: response.Preis,
        fahrtSitze: response.Sitze,
        fahrtRauchen: response.Rauchen,
        fahrtTierauto: response.Tierauto,
        pending: response.MitfahrAnfragender,
        accepted: response.Mitfahrer,
        denied: response.MitfahrerAbgelent, 
      };
    });

    this.setState({ driveDataEigene: DriveDataFromResponseEigeneFahrt });

    if (this.props.type === "GebuchteFahrtenCard") {
      if (this.state.driveDataEigene.length > 0) {
        toast.success(this.state.driveDataEigene.length + " Fahrten gefunden" + "🎉");
        this.props.getLatLongFromCardGenerator(this.state.driveDataEigene);
      } else {
        toast.error("Sie haben keine Fahrten angeboten gefunden");
      }
    }
  }

  mapAxiosDriveResponseAnfrage(AngefragteFahrtCard) {

    /*driveDataSuche:[],
      driveDataMitfahrer:[],
      driveDataAnfrage:[],
      driveDataEigene:[], */

    const DriveDataFromResponseAngefragteFahrt = AngefragteFahrtCard.data.map((response) => {
      return {
        fahrtCreatedAt: response.createdAt,
        fahrer: response.Fahrer,
        fahrtObjektID: response._id,
        fahrtDatum: response.Datum,
        fahrtAbfahrtsZeit: response.Abfahrt,
        fahrtAbfahrtsOrt: response.Start,   
        fahrtAbfahrtsLat: response.StartLatitude,
        fahrtAbfahrtsLong: response.StartLongitude,
        fahrtAnkunftsZeit: response.Ankunft,
        fahrtAnkunftsOrt: response.Ziel,
        fahrtAnkunftsLat: response.EndLatitude,
        fahrtAnkunftsLong: response.EndLongitude,
        fahrtPreis: response.Preis,
        fahrtSitze: response.Sitze,
        fahrtRauchen: response.Rauchen,
        fahrtTierauto: response.Tierauto,
        pending: response.MitfahrAnfragender,
        accepted: response.Mitfahrer,
        denied: response.MitfahrerAbgelent,
      };
    });

    this.setState({ driveDataAnfrage: DriveDataFromResponseAngefragteFahrt });

    if (this.props.type === "AngefragteFahrtCard") {
      if (this.state.driveDataAnfrage.length > 0) {
        toast.success(this.state.driveDataAnfrage.length + " Fahrten gefunden" + "🎉");
        this.props.getLatLongFromCardGenerator(this.state.driveDataAnfrage);
      } else {
        toast.error("Keine Fahrtanfragen gefunden");
      }
    }
  }

  measure(lat1, lon1, lat2, lon2) {
    // generally used geo measurement function
    var R = 6378.137; // Radius of earth in KM
    var dLat = (lat2 * Math.PI) / 180 - (lat1 * Math.PI) / 180;
    var dLon = (lon2 * Math.PI) / 180 - (lon1 * Math.PI) / 180;
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d * 1000; // meters
  }


  displayCards() {
    /*driveDataSuche:[],
      driveDataMitfahrer:[],
      driveDataAnfrage:[],
      driveDataEigene:[], */

    if (this.props.type === "SuchenFahrtCard" || this.props.type === "") {
      const Fahrten = this.state.driveDataSuche.map((Data, i) => {
        /* console.log("Das sind die Daten die an die SuchenFahrtCard weitergegeben werden" + Data.fahrtObjektID); */
        return (
          <SuchenFahrtCard
            key={i}
            userData={this.userData}
            driveData={Data}
            inputValue={this.state.user}
          ></SuchenFahrtCard>
        );
      }, this);
    return Fahrten;
    } 
    if (this.props.type === "GebuchteFahrtenCard" || this.props.type === "") {
      const Fahrten = this.state.driveDataMitfahrer.map((Data, i) => {
        /* console.log("Das sind die Daten die an die GebuchteFahrtCards weitergegeben werden" + Data.fahrtObjektID); */
        return (
          <GebuchteFahrtenCard
            key={i}
            userData={this.userData}
            driveData={ Data }
          ></GebuchteFahrtenCard>
        );
      }, this);
      return Fahrten;
    }
    if (this.props.type === "EigeneAngeboteneFahrtCard" || this.props.type === "") {
      const Fahrten = this.state.driveDataEigene.map((Data, i) => {
        return (
          <EigeneAngeboteneFahrtCard
            key={ i }
            userData={this.userData}
            driveData={ Data }
          ></EigeneAngeboteneFahrtCard>
        );
      }, this);
      return Fahrten;
    }
    if (this.props.type === "AngefragteFahrtCard") {
      const Fahrten = this.state.driveDataAnfrage.map((Data, i) => {
        return (
          <AngefragteFahrtCard
            key={i}
            userData={this.userData} 
            driveData={ Data }
          ></AngefragteFahrtCard>
        );
      }, this);
      return Fahrten;
    }
  }

  render() {
    /* const { classes } = this.props; */
    return (
      //deconstructed pancake
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <Toaster></Toaster>
        {this.displayCards()}
      </div>
    );
  }
}

export default withStyles(useStyles)(CardGeneratorFahrtenSuchen);
