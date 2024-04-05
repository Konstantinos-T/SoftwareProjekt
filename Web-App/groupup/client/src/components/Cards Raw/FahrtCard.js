import React, { Component } from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import PlaceIcon from "@material-ui/icons/Place";
import DirectionsCarIcon from "@material-ui/icons/DirectionsCar";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import toast, { Toaster } from "react-hot-toast";

const useStyles = (theme) => ({
  root: {
    display: "grid",
    placeItems: "center",
    margin: "2em",
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

export class FahrtCard extends Component {
  state = {
    //Props: benutzerID, fahrerID, fahrtID

    //User
    benutzerProfilBild:
      "https://cdn6.f-cdn.com/contestentries/1376995/30494909/5b566bc71d308_thumbCard.jpg",
    benutzerName: "Max Müller",
    benutzerSemester: "4",
    benutzerStudiengang: "SWB",
    benutzerWohnort: "Esslingen",
    benutzerHochschule: "hochschule Esslingen",
    benutzerAuto: "Lada",
    benutzerGeschlecht: "M",
    benutzerOrt: "UserOrt",
    benutzerLat: 0,
    benutzerLong: 0,

    //Fahrer
    fahrerProfilBild:
      "https://cdn6.f-cdn.com/contestentries/1376995/30494909/5b566bc71d308_thumbCard.jpg",
    fahrerName: "Max Müller",
    fahrerSemester: "4",
    fahrerStudiengang: "SWB",
    fahrerWohnort: "Esslingen",
    fahrerHochschule: "hochschule Esslingen",
    fahrerAuto: "Lada",
    fahrerGeschlecht: "M",

    //fahrtDatumn
    fahrtDatum: "03.01.2021",
    fahrtAbfahrtsZeit: "09:00",
    fahrtAbfahrtsOrt: "Startpunkt",
    fahrtAbfahrtsLat: 48.74516,
    fahrtAbfahrtsLong: 9.32248,

    fahrtAnkunftsZeit: "10:00",
    fahrtAnkunftsOrt: "ZielOrt",
    fahrtAnkunftsLat: 48.74516,
    fahrtAnkunftsLong: 9.32248,

    fahrtAuto: "Lada",
    fahrtKennzeichen: "Kennzeichen",
    fahrtPreis: "0",
    fahrtSitze: 2,
    fahrtSitzeFrei: 2,
    fahrtRauchen: true,
    fahrtTierauto: false,

    distance: 0,
    distanzAnzeige: "",
  };

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

  setupDistance(lat1, lon1, lat2, lon2) {
    this.state.distance = this.measure(lat1, lon1, lat2, lon2);
    //km
    if (this.state.distance > 1000) {
      let tempDist = this.state.distance / 1000;
      let tempDistString = "" + tempDist.toFixed(1);
      this.state.distanceForDisplay = tempDistString + "km";
    } else {
      this.state.distanceForDisplay = this.state.distance + "m";
    }
  }

  buchen() {
    toast.success("buchen");
  }

  replaceDefaultVarWithProps() {
    //TestUser1
    if (this.props.benutzerID === "Testbenutzer1") {
      this.setState({
        benutzerProfilBild:
          "https://cdn6.f-cdn.com/contestentries/1376995/30494909/5b566bc71d308_thumbCard.jpg",
        benutzerName: "Stefan Müller",
        benutzerSemester: "5",
        benutzerStudiengang: "SWB",
        benutzerWohnort: "Stuttgart",
        benutzerHochschule: "Hochschule Esslingen",
        benutzerAuto: "Cayenne",
        benutzerGeschlecht: "W",

        benutzerOrt: "Anonym",
        benutzerLat: 0,
        benutzerLong: 0,
      });
    }

    //TestUser2
    if (this.props.benutzerID === "TestUser2") {
      this.setState({
        benutzerProfilBild:
          "https://cdn6.f-cdn.com/contestentries/1376995/30494909/5b566bc71d308_thumbCard.jpg",
        benutzerName: "Stefanie Müller",
        benutzerSemester: "5",
        benutzerStudiengang: "SWB",
        benutzerWohnort: "Stuttgart",
        benutzerHochschule: "Hochschule Esslingen",
        benutzerAuto: "Cayenne",
        benutzerGeschlecht: "W",

        benutzerOrt: "Anonym",
        benutzerLat: 0,
        benutzerLong: 0,
      });
    }
    //TestFahrer1
    if (this.props.fahrerID === "TestFahrer1") {
      this.setState({
        fahrerProfilBild:
          "https://cdn6.f-cdn.com/contestentries/1376995/30494909/5b566bc71d308_thumbCard.jpg",
        fahrerName: "Stefan Testfahrer",
        fahrerSemester: "4",
        fahrerStudiengang: "SWB",
        fahrerWohnort: "Esslingen",
        fahrerHochschule: "Hochschule Esslingen",
        fahrerAuto: "BMW",
        fahrerGeschlecht: "M",
      });
    }

    //TestFahrer2
    if (this.props.fahrerID === "TestFahrer2") {
      this.setState({
        fahrerProfilBild:
          "https://cdn6.f-cdn.com/contestentries/1376995/30494909/5b566bc71d308_thumbCard.jpg",
        fahrerName: "Herbert Testfahrer",
        fahrerSemester: "4",
        fahrerStudiengang: "SWB",
        fahrerWohnort: "Esslingen",
        fahrerHochschule: "Hochschule Esslingen",
        fahrerAuto: "BMW",
        fahrerGeschlecht: "M",
      });
    }
    //TestFahrt1
    if (this.props.fahrtID === "TestFahrt1") {
      this.setState({
        fahrtDatum: "03.01.2021",
        fahrtAbfahrtsZeit: "09:00",
        fahrtAbfahrtsOrt: "Startpunkt",
        fahrtAbfahrtsLat: 48.74516,
        fahrtAbfahrtsLong: 9.32248,

        fahrtAnkunftsZeit: "10:00",
        fahrtAnkunftsOrt: "ZielOrt",
        fahrtAnkunftsLat: 48.74516,
        fahrtAnkunftsLong: 9.32248,

        fahrtPreis: "0",
        fahrtSitze: 2,
        fahrtSitzeFrei: 2,
        fahrtRauchen: true,
        fahrtTierauto: false,
        fahrtAuto: "Lada",
        fahrtKennzeichen: "Kennzeichen1",
      });
    }

    //TestFahrt2
    if (this.props.fahrtID === "TestFahrt2") {
      this.setState({
        fahrtDatum: "03.01.2021",
        fahrtAbfahrtsZeit: "10:00",
        fahrtAbfahrtsOrt: "Startpunkt2",
        fahrtAbfahrtsLat: 48.74516,
        fahrtAbfahrtsLong: 9.32248,

        fahrtAnkunftsZeit: "11:00",
        fahrtAnkunftsOrt: "ZielOrt",
        fahrtAnkunftsLat: 48.74516,
        fahrtAnkunftsLong: 9.32248,

        fahrtPreis: "0",
        fahrtSitze: 2,
        fahrtSitzeFrei: 2,
        fahrtRauchen: true,
        fahrtTierauto: false,
        fahrtAuto: "Lada",
        fahrtKennzeichen: "Kennzeichen1",
      });
    }
  }

  componentDidMount() {
    this.replaceDefaultVarWithProps();
  }

  render() {
    const { classes } = this.props;
    this.setupDistance(
      this.state.benutzerLat,
      this.state.benutzerLong,
      this.state.fahrtAbfahrtsLat,
      this.state.fahrtAbfahrtsLong
    );
    return (
      <div>
        <Toaster />
        <Card className={classes.root}>
          <CardContent>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Avatar
                alt={this.state.benutzerName}
                src={this.state.benutzerProfilBild}
                className={classes.large}
              />

              <List>
                <ListItem>
                  <ListItemText
                    primary={this.state.benutzerName}
                  ></ListItemText>
                </ListItem>
                <Divider></Divider>

                <ListItem alignItems="flex-start">
                  <ListItemIcon>
                    <PlaceIcon></PlaceIcon>
                  </ListItemIcon>
                  <ListItemText
                    primary={this.state.distanceForDisplay}
                    secondary={this.state.fahrtAbfahrtsOrt}
                  ></ListItemText>
                </ListItem>

                <Divider></Divider>

                <ListItem>
                  <ListItemIcon>
                    <DirectionsCarIcon></DirectionsCarIcon>
                  </ListItemIcon>
                  <ListItemText primary={this.state.fahrerAuto}></ListItemText>
                </ListItem>
                <Divider></Divider>
                <ListItem>
                  <ListItemIcon>
                    <AttachMoneyIcon></AttachMoneyIcon>
                  </ListItemIcon>
                  <ListItemText
                    primary={this.state.fahrtPreis + "€"}
                  ></ListItemText>
                </ListItem>
                <ListItem alignItems="flex-start">
                  <Button
                    size="medium"
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      this.buchen();
                    }}
                  >
                    {" "}
                    Buchen{" "}
                  </Button>
                </ListItem>
              </List>
            </Grid>
          </CardContent>
        </Card>
      </div>
    );
  }
}
FahrtCard.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(useStyles)(FahrtCard);
