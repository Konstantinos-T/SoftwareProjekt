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
import AlarmIcon from "@material-ui/icons/Alarm";
import EventIcon from "@material-ui/icons/Event";
import toast from "react-hot-toast";
import List from "@material-ui/core/List";
import { IconButton, TextField } from "@material-ui/core";
import MapIcon from "@material-ui/icons/Map";
import SmokingRoomsIcon from "@material-ui/icons/SmokingRooms";
import SmokeFreeIcon from "@material-ui/icons/SmokeFree";
import PetsIcon from "@material-ui/icons/Pets";
import DatePickerInline from "../fahrt detail eingabefelder/DatePickerInline.js";
import TimePicker from "../fahrt detail eingabefelder/TimePicker.js";
import FahrtdetailsAnbieten from "../fahrt detail eingabefelder/FahrtdetailsAnbieten.js";
import ChatIcon from "@material-ui/icons/Chat";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CreateIcon from "@material-ui/icons/Create";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import MapsOrtFeld from "../fahrt detail eingabefelder/MapsOrtFeld";
import DriveRequestPending from "../Cards Raw/helperComponents/driveRequestPending.js";
import DriveRequestAccepted from "../Cards Raw/helperComponents/driveRequestAccepted.js";
import DriveRequestDenied from "../Cards Raw/helperComponents/driveRequestDenied.js";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";
import Collapse from "@material-ui/core/Collapse";
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

export class EigeneAngeboteneFahrtCard extends Component {
  constructor(props) {
    super(props);

    this.generatePendingElement = this.generatePendingElement.bind(this);
    /*  this.generateAcceptedElement = this.generateAcceptedElement.bind(this); */

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

  /*   setupDistance(lat1, lon1, lat2, lon2) {
    let Distanz = this.measure(lat1, lon1, lat2, lon2);
    this.setState({ distance: Distanz });
    //km
    if (this.state.distance > 1000) {
      let tempDist = this.state.distance / 1000;
      let tempDistString = "" + tempDist.toFixed(1);
      let TempDistString = tempDistString + "km";
      this.state.distanceForDisplay({ TempDistString: TempDistString });
    } else {
      this.setState.distanceForDisplay = this.state.distance + "m";
    }
  } 
*/

  edit = () => {
    this.setState({ Start: this.state.driveData.fahrtAbfahrtsOrt });
    this.setState({ Ziel: this.state.driveData.fahrtAnkunftsOrt });
    this.setState({ Datum: this.state.driveData.fahrtDatum });
    this.setState({ Abfahrt: this.state.driveData.fahrtAbfahrtsZeit });
    this.setState({ Ankunft: this.state.driveData.fahrtAnkunftsZeit });
    this.setState({ Preis: this.state.driveData.fahrtPreis });
    this.setState({ openEdit: true });
  };

  handleEditClose = () => {
    this.setState({ openEdit: false });
  };

  submitUpdate = () => {
    const updatedDrive = {
      Start: this.state.Start,
      Ziel: this.state.Ziel,
      Datum: this.state.Datum,
      Abfahrt: this.state.Abfahrt,
      Ankunft: this.state.Ankunft,
      Preis: this.state.Preis,
    };
    axios
      .patch(
        "http://localhost:5000/posts/" + this.props.driveData.fahrtObjektID,
        updatedDrive
      )
      .then((res) => {
        console.log("Die Fahrt wurde Erfolgreich verändert: ", res);
      })
      .catch((err) => {
        console.log("Update Error: ", err);
      });
    this.setState({ openEdit: false });
  };

  chat = () => {
    // toast("Chat");
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

     console.log(this.props.driveData.fahrtObjektID);
   /* axios.delete("http://localhost:5000/posts/" + this.props.driveData.fahrtObjektID)
      .then((res) => {
        console.log("Die Fahrt wurde erfolgreich gelöscht: ");
      })
      .catch((err) => {
        console.log("Delete Error: ", err);
      }); */
    toast("Delete");
    this.handleClose();
  };

  generatePendingElement() {
    const pendingElements = this.props.driveData.pending.map(
      (singlePendingUser, i) => {
        return (
          <DriveRequestPending
            key={i}
            userData={singlePendingUser}
            inputValue={this.state.driveData.fahrtObjektID}
          ></DriveRequestPending>
        );
      },
      this
    );
    return pendingElements;
  }

  generateAcceptedElement() {
    //Avatar sollte reichen
    const acceptedElements = this.props.driveData.accepted.map(
      (singleAcceptedUser, i) => {
        return (
          <DriveRequestAccepted
            key={i}
            userData={singleAcceptedUser}
            inputValue={this.state.driveData.fahrtObjektID}
          ></DriveRequestAccepted>
        );
      },
      this
    );
    return acceptedElements;
  }
  generatedeniedElement() {
    //Avatar sollte reichen
    const deniedElements = this.props.driveData.denied.map(
      (singleDeniedUser, i) => {
        return (
          <DriveRequestDenied
            key={i}
            userData={singleDeniedUser}
            inputValue={this.state.driveData.fahrtObjektID}
          ></DriveRequestDenied>
        );
      },
      this
    );
    return deniedElements;
  }

  componentDidMount() {
    const pendingElements = this.generatePendingElement();
    const acceptedElements = this.generateAcceptedElement();
    const deniedElements = this.generatedeniedElement();
    this.setState({
      pendingElements: pendingElements,
      acceptedElements: acceptedElements,
      deniedElements: deniedElements,
    });
  }

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
                  {/* <Link
                    to={`/chat?name=${authenticator.getUser()}&room=${
                      this.state.driveData.fahrtObjektID
                    }`}
                  > */}
                  <IconButton
                    color="primary"
                    aria-label="chat"
                    onClick={this.chat}
                  >
                    <ChatIcon />
                  </IconButton>
                  {/* </Link> */}
                </div>
                <div>
                  <IconButton
                    color="default"
                    aria-label="chat"
                    onClick={this.edit}
                  >
                    <CreateIcon />
                  </IconButton>
                </div>
                <div>
                  <IconButton
                    color="secondary"
                    aria-label="chat"
                    onClick={this.handleClickOpen}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                </div>
                <div>
                  <IconButton
                    className={clsx(classes.expand, {
                      [classes.expandOpen]: this.state.expanded,
                    })}
                    onClick={this.handleExpandClick}
                    aria-expanded={this.state.expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </div>
              </div>
              <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
              <CardContent style={{padding: '5px'}}>
              <h3>Anfragen</h3>
              <div style={{ display: "grid", gridTemplateRows: "1fr" }}>
                {this.state.pendingElements}
              </div>
              <h3>Mitfahrer</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr" }}>
                {this.state.acceptedElements}
              </div>
              <h3>Abgelehnt</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr" }}>
                {this.state.deniedElements}
              </div>
              </CardContent>
              </Collapse>

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

              <Dialog
                open={this.state.openEdit}
                onClose={this.handleEditClose}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="Editierendialog">
                  {"Fahrt editieren:"}
                </DialogTitle>
                <DialogContent>
                  <div style={{ display: "grid", gridGap: "1em" }}>
                    <form
                      onSubmit={this.onSubmit}
                      autoComplete="off"
                      noValidate
                      style={{
                        margin: "2%",
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                      }}
                    >
                      <MapsOrtFeld
                        label="Start"
                        incomingValue={this.state.Start}
                        parentCallback={(Start) => {
                          this.setState({ Start: Start });
                        }}
                      ></MapsOrtFeld>
                      <MapsOrtFeld
                        label="Ziel"
                        incomingValue={this.state.Ziel}
                        parentCallback={(Ziel) => {
                          this.setState({ Ziel: Ziel });
                        }}
                      ></MapsOrtFeld>
                      <DatePickerInline
                        label="Datum"
                        incomingValue={this.state.Datum}
                        parentCallback={(value) => {
                          this.setState({ Datum: value });
                        }}
                      ></DatePickerInline>
                      <TimePicker
                        label="Früheste Abfahrt"
                        incomingValue={this.state.Abfahrt}
                        parentCallback={(value) => {
                          this.setState({ Abfahrt: value });
                        }}
                      ></TimePicker>
                      <TimePicker
                        label="Späteste Ankunft"
                        incomingValue={this.state.Ankunft}
                        parentCallback={(value) => {
                          this.setState({ Ankunft: value });
                        }}
                      ></TimePicker>
                      <FahrtdetailsAnbieten
                        incomingValue={this.state.Preis}
                        parentCallback={(
                          value1,
                          value2,
                          value3,
                          value4,
                          value5,
                          value6,
                          value7
                        ) => {
                          this.setState({ Preis: value1 });
                          this.setState({ Sitze: value2 });
                          this.setState({ Umwege: value3 });
                          this.setState({ MaennlicheMitfahrer: value4 });
                          this.setState({ WeiblicheMitfahrer: value5 });
                          this.setState({ Rauchen: value6 });
                          this.setState({ Tierauto: value7 });
                        }}
                      ></FahrtdetailsAnbieten>
                    </form>
                  </div>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={this.handleEditClose}
                    variant="contained"
                    color="default"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={this.submitUpdate}
                    variant="contained"
                    color="primary"
                  >
                    Submit
                  </Button>
                </DialogActions>
              </Dialog>
              <Dialog
                open={this.state.openReport}
                onClose={this.handleCloseReport}
                aria-labelledby="ReportTheDialog"
              >
                <DialogTitle id="ReportDialog">Probleme melden</DialogTitle>
                <form onSubmit={this.report}>
                  <DialogContent>
                    <DialogContentText>
                      Wenn es Probleme bei der Fahrt gab kannst du diese hier
                      anonym melden. Wenn du möchtest kannst du aber auch
                      Kontaktdaten hinterlassen.
                    </DialogContentText>
                    <div>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="ReportText"
                        label="ReportText"
                        type="text"
                        fullWidth
                        placeholder="message"
                        name="message" //onChange={(e) => this.setState({  reportData: e.target.value })}
                      />
                    </div>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleCloseReport} color="primary">
                      Abbrechen
                    </Button>
                    <Button
                      type="submit"
                      value="Send Message"
                      onClick={this.handleCloseReport}
                      color="primary"
                    >
                      Melden
                    </Button>
                  </DialogActions>
                </form>
              </Dialog>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}
EigeneAngeboteneFahrtCard.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(useStyles)(EigeneAngeboteneFahrtCard);
