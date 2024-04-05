import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Divider from "@material-ui/core/Divider";
import PlaceIcon from "@material-ui/icons/Place";
//import DirectionsCarIcon from "@material-ui/icons/DirectionsCar";
import AlarmIcon from "@material-ui/icons/Alarm";
import EventIcon from "@material-ui/icons/Event";
import toast from "react-hot-toast";
import List from "@material-ui/core/List";
import { IconButton, TextField } from "@material-ui/core";
import MapIcon from "@material-ui/icons/Map";
import SmokingRoomsIcon from "@material-ui/icons/SmokingRooms";
import SmokeFreeIcon from "@material-ui/icons/SmokeFree";
import PetsIcon from "@material-ui/icons/Pets";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import emailjs from "emailjs-com";
import authenticator from "../../authentication/auth.js";

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
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
});

export class GebuchteFahrtenCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //Props: userData, driverData, driveData

      RepText: "",

      driveData: this.props.driveData,
      driverData: this.props.driverData,
      userData: this.props.userData,

      //Debugging
      buchenCalls: 0,
      pendingElements: [],
      acceptedElements: [],
      deniedElements: [],
      TestArrayMitfahrer: ["kotsit00", "fasait02"],
      responseFindOnePost: [],
      //Löschdialog
      open: false,
      //Löschdialog

      //Editierdialog
      editOpen: false,

      //Erweiterung offen oder nicht
      expanded: false,

      //Editierte Eingabewerte
      Start: undefined,
      Ziel: undefined,
      Datum: undefined,
      Abfahrt: undefined,
      Ankunft: undefined,
      Preis: undefined,
    };
  }

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };


  chat = () => {
    toast("Chat");
    window.open(
      `/chat?name=${authenticator.getUser()}&room=${
        this.state.driveData.fahrtObjektID
      }`
    );
  };

  report(e) {
    e.preventDefault();
    console.log("In Report-Funktion");
    emailjs
      .sendForm("Gmail", "Report", e.target, "user_Xq57XYac8Yg7q61cgCOHH")
      .then(
        (result) => {
          console.log(result.text);
          toast.success("Es wurde eine E-Mail an einen Moderator gesendet");
        },
        (error) => {
          console.log(error.text);
          toast.error("Es gab ein Problem beim Senden der E-Mail");
        }
      );
    //e.target.reset()
  }

  delete = () => {
    axios
      .delete(
        "http://localhost:5000/posts/" + this.props.driveData.fahrtObjektID
      )
      .then((res) => {
        console.log("Die Fahrt wurde erfolgreich gelöscht: ");
      })
      .catch((err) => {
        console.log("Delete Error: ", err);
      });
    toast("Delete");
    this.handleClose();
  };

  componentDidMount() {}

  render() {
    const { classes } = this.props;

    return (
      <div>
        <div>
          <Card style={{ width: "300px" }} className={classes.root}>
            <CardContent>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <List>
                  <ListItem alignItems="flex-start">
                    <ListItemIcon>
                      <PlaceIcon></PlaceIcon>
                    </ListItemIcon>
                    <ListItemText
                      //primary={this.state.distanceForDisplay}
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
                      // primary={this.state.distanceForDisplay}
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
                      // primary={this.state.distanceForDisplay}
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
                      // primary={this.state.distanceForDisplay}
                      primary={this.state.driveData.fahrtAbfahrtsZeit.substring(
                        11,
                        16
                      )}
                      secondary="Abfahrt"
                    ></ListItemText>
                  </ListItem>
                  <Divider></Divider>
                  <ListItem alignItems="flex-start">
                    <ListItemIcon>
                      <AlarmIcon></AlarmIcon>
                    </ListItemIcon>
                    <ListItemText
                      // primary={this.state.distanceForDisplay}
                      primary={this.state.driveData.fahrtAnkunftsZeit.substring(
                        11,
                        16
                      )}
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
                    <div style={{ marginRight: "2em" }}>
                      {this.state.driveData.fahrtRauchen ? (
                        <SmokingRoomsIcon></SmokingRoomsIcon>
                      ) : (
                        <SmokeFreeIcon></SmokeFreeIcon>
                      )}
                    </div>
                    <div>
                      {this.state.driveData.fahrtTierauto ? (
                        <PetsIcon></PetsIcon>
                      ) : (
                        <PetsIcon color="secondary"></PetsIcon>
                      )}
                    </div>
                  </ListItem>
                </List>
              </Grid>
              <div
                style={{
                  display: "flex ",
                  flex: 1,
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <IconButton
                    color="default"
                    aria-label="Karte öffnen"
                    onClick={() =>
                      window.open(
                        "https://www.google.com/maps/dir/" +
                          this.state.driveData.fahrtAbfahrtsOrt +
                          "/" +
                          this.state.driveData.fahrtAnkunftsOrt
                      )
                    }
                  >
                    <MapIcon />
                  </IconButton>
                </div>
                <div>
                  <IconButton
                    color="secondary"
                    aria-label="open"
                    onClick={this.handleClickOpen}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                </div>
              </div>
              <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="Löschen"
                aria-describedby="Löschen-Bestätigung"
              >
                <DialogTitle id="Löschendialog">{"Fahrt löschen?"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="LöschendialogBeschreibung">
                    Sind Sie sich sicher, dass Sie diese Fahrt löschen wollen?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    Nein
                  </Button>
                  <Button onClick={this.delete} color="primary" autoFocus>
                    Ja
                  </Button>
                </DialogActions>
              </Dialog>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}
GebuchteFahrtenCard.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(useStyles)(GebuchteFahrtenCard);
