import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import PlaceIcon from "@material-ui/icons/Place";
import AlarmIcon from "@material-ui/icons/Alarm";
import EventIcon from "@material-ui/icons/Event";
//import DirectionsCarIcon from "@material-ui/icons/DirectionsCar";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import toast, { Toaster } from "react-hot-toast";
import List from "@material-ui/core/List";
import SmokingRoomsIcon from "@material-ui/icons/SmokingRooms";
import SmokeFreeIcon from "@material-ui/icons/SmokeFree";
import PetsIcon from "@material-ui/icons/Pets";
import AirlineSeatLegroomNormalIcon from "@material-ui/icons/AirlineSeatLegroomNormal";
import axios from "axios";
import authenticator from "../../authentication/auth.js";


import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";

const useStyles = (theme) => ({
  root: {
    display: "grid",
    placeItems: "center",
    margin: "1em",
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

export class SuchenFahrtCardMini extends Component {
    
  constructor(props) {
    super(props);
  
    this.state = {
      driveData: this.props.driveData,
      userData: this.props.userData,
      BelegteSitze: this.props.BelegteSitze,
      user: "",
      counter: 0,
      driverData: {
        benutzerObjektID: "",
        benutzerRating: "",
        benutzerProfilBild:
          "https://cdn6.f-cdn.com/contestentries/1376995/30494909/5b566bc71d308_thumbCard.jpg",
        benutzerName: "Default",
        benutzerSemester: "Default",
        benutzerStudiengang: "Default",
        benutzerWohnort: "Default",
        benutzerHochschule: "Default",
        benutzerAuto: "Default",
        benutzerGeschlecht: "Default",
      },
    };
  }

  componentDidMount() {
    this.setState({
      driverData: this.props.driverData,
      driveData: this.props.driveData,
      userData: this.props.userData,
    });
    const pUser = authenticator.getUser();
    this.state.user = pUser;
    /* console.log("User " + this.state.user); */
  }

  buchen = () => {
    console.log("Dieser user hat eine Anfrage gestellt: " + this.state.user)
    toast("Fahrtanfrage von: " + this.state.user + ". Ihre Fahrt wird gebucht");
    console.log("Die ID der Fahrt: " + this.state.driveData.fahrtObjektID );
    console.log("Der Benutzername der diese Fahrt buchen möchte: " + this.state.user  );

    const updateMitfahrAnfragender = { MitfahrAnfragender: this.state.user}

    //Push den Benutzer in den MitfahrerAnfrageArray  
     axios.patch("http://localhost:5000/posts/buchen/" + this.state.driveData.fahrtObjektID, updateMitfahrAnfragender )
    .then((res) => {
      console.log("Der Benutzer hat erfolreich eine Buchungsanfrage gestellt: ", res);
    })
    .catch((err) => {
      console.log("Der User konnte diese Fahrt nicht anfragen: ", err);
    });  
  }



  //man kann mit res.local daten in einer middleware wie express setzen und mit der lokal arbeiten. Ist auch schreibgeschützt.

/* this.setupDistance(
      this.state.benutzerLat,
      this.state.benutzerLong,
      this.state.fahrtAbfahrtsLat,
      this.state.fahrtAbfahrtsLong
    );

    <Avatar
    alt={this.state.driverData.benutzerProfilBild}
    src={this.state.driverData.benutzerProfilBild}
    className={classes.large}
    />
    <ListItem>
                  <ListItemText
                    style={{ minWidth: "300" }}
                    primary={this.state.driverData.benutzerName}
                  ></ListItemText>
                </ListItem>

                <Divider></Divider>
    */

  render() {
    const { classes } = this.props;
    if(isMobile){
      return <h3>{this.state.driveData.fahrtAbfahrtsOrt}</h3>
    }
    else {

    
    return (
      <div style={{ minWidth: "50px" }}>
        <Toaster />
        <Card className={classes.root} style={{ maxWidth: "300px" }}>
          <CardContent>
            <Grid container direction="column" justify="center" alignItems="center" >
              <List>
                <ListItem alignItems="flex-start">
                  <ListItemIcon>
                    <PlaceIcon></PlaceIcon>
                  </ListItemIcon>
                  <ListItemText
                    primary={this.state.driveData.fahrtAbfahrtsOrt}
                    secondary="Start"
                  ></ListItemText>
                </ListItem>
                <Divider></Divider>
                <ListItem alignItems="flex-start">
                  <ListItemIcon>
                    <PlaceIcon></PlaceIcon>
                  </ListItemIcon>
                  <ListItemText
                    primary={this.state.driveData.fahrtAnkunftsOrt}
                    secondary="Ziel"
                  ></ListItemText>
                </ListItem>
                <Divider></Divider>
                <ListItem alignItems="flex-start">
                  <ListItemIcon>
                    <EventIcon></EventIcon>
                  </ListItemIcon>
                  <ListItemText
                    primary={this.state.driveData.fahrtDatum.substring(0, 10)}
                    secondary="Datum"
                  ></ListItemText>
                </ListItem>
                <Divider></Divider>
                <ListItem alignItems="flex-start">
                  <ListItemIcon>
                    <AlarmIcon></AlarmIcon>
                  </ListItemIcon>
                  <ListItemText
                    primary={this.state.driveData.fahrtAbfahrtsZeit.substring(11, 16)}
                    secondary="Abfahrt"
                  ></ListItemText>
                </ListItem>
                <Divider></Divider>
                <ListItem alignItems="flex-start">
                  <ListItemIcon>
                    <AlarmIcon></AlarmIcon>
                  </ListItemIcon>
                  <ListItemText
                    primary={this.state.driveData.fahrtAnkunftsZeit.substring(11, 16)}
                    secondary="Ankunft"
                  ></ListItemText>
                </ListItem>
                <Divider></Divider>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={this.state.driveData.fahrtSitze}
                    secondary="Sitze"
                  ></ListItemText>
                  <ListItemText
                    primary={this.props.driveData.fahrtPreis + "€"}
                  ></ListItemText>
                  <div style={{ marginRight: "2em" }} >
                    {this.state.driveData.fahrtRauchen ? (<SmokingRoomsIcon></SmokingRoomsIcon>) : (<SmokeFreeIcon></SmokeFreeIcon>)}
                  </div>
                  <div>
                    {this.state.driveData.fahrtTierauto ? ( <PetsIcon></PetsIcon> ) : ( <PetsIcon color="secondary"></PetsIcon> )}
                  </div>
                </ListItem>
                <ListItem>
                  <div style={{ display: "flex", flex: "1", flexDirection: "cloumn", justifyContent: "center",   alignItems: "stretch",   flexWrap: "nowrap", }}>
                    <div>
                      <Button size="small" variant="contained" color="primary" onClick={() => { this.buchen(); }}>
                        Diese Fahrt buchen
                      </Button>
                    </div>
                  </div>
                </ListItem>
              </List>
            </Grid>
          </CardContent>
        </Card>
      </div>
    );
  }
  }
  
}
SuchenFahrtCardMini.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(useStyles)(SuchenFahrtCardMini);
