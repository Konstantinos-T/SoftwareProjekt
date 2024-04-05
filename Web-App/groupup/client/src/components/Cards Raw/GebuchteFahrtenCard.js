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
import Avatar from "@material-ui/core/Avatar";
import PlaceIcon from "@material-ui/icons/Place";
//import DirectionsCarIcon from "@material-ui/icons/DirectionsCar";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import EuroIcon from "@material-ui/icons/Euro";
import AlarmIcon from "@material-ui/icons/Alarm";
import EventIcon from "@material-ui/icons/Event";
import toast from "react-hot-toast";
import List from "@material-ui/core/List";
import { IconButton, TextField, Typography } from "@material-ui/core";
import MapIcon from "@material-ui/icons/Map";
import SmokingRoomsIcon from "@material-ui/icons/SmokingRooms";
import SmokeFreeIcon from "@material-ui/icons/SmokeFree";
import PetsIcon from "@material-ui/icons/Pets";
import AirlineSeatLegroomNormalIcon from "@material-ui/icons/AirlineSeatLegroomNormal";
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
import DriveRequestAcceptedMitfahrer from "../Cards Raw/helperComponents/driveRequestAcceptedMitfahrer.js";
import DriveRequestDenied from "../Cards Raw/helperComponents/driveRequestDenied.js";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";
import Collapse from "@material-ui/core/Collapse";
import emailjs from "emailjs-com";
import { Link } from "react-router-dom";
import authenticator from "../../authentication/auth.js";
import ThumbUp from "@material-ui/icons/ThumbUp";
import ThumbDown from "@material-ui/icons/ThumbDown";

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
      //Löschdialog
      open: false,
      //Löschdialog

      //Editierdialog
      editOpen: false,

      //Erweiterung offen oder nicht
      expanded: false,
      profilOpen: false,
      //Editierte Eingabewerte
      Start: undefined,
      Ziel: undefined,
      Datum: undefined,
      Abfahrt: undefined,
      Ankunft: undefined,
      Preis: undefined,
      response: [],
      ID: this.props.driveData.fahrtObjektID,
      eigenerUser: this.props.driveData.eigenerUser,
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

  cancel = () => {
    console.log("Dieser user wird storniert: " + this.state.eigenerUser)
    toast(this.state.userData +" storniert");

    const storniereMitfahrer = { Mitfahrer: this.state.eigenerUser}

    axios.patch("http://localhost:5000/posts/remPending/" + this.state.ID, storniereMitfahrer )
    .then((res) => {
      console.log("Der Fahrer wurde storniert: ", res);
    })
    .catch((err) => {
      console.log("Stornier Error: ", err);
    });
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

    //Dialogfunktionen für Dialogöffnung, Like und Dislike
    handleClickProfilOpen = () => {
      axios.get("http://localhost:5000/userPosts/findUser/" + this.state.driveData.fahrer)
      .then((res) => {
        this.setState({response: res.data});
      });
      this.setState({ profilOpen: true });
    };
  
    handleProfilClose = () => {
      this.setState({ profilOpen: false });
    };
  
    like = () => {
      console.log("Dieser Benutzer wurde geliked: " + this.state.userData)
      toast(this.state.userData +" geliked");
      console.log(this.state.ID)
  
      axios.get("http://localhost:5000/userPosts/findUser/" + this.state.userData)
        .then( (res) => {
          console.log(res.data.Like);
          console.log(res.data._id);
          const userID = res.data._id;
          const userLike = res.data.Like;
  
          axios.patch("http://localhost:5000/userPosts/userLike/" + userID, userLike )
          .then((res) => {
            console.log("User wurde geliked: ", res);
          })
          .catch((err) => {
            console.log("Delete Error: ", err);
          });
        })
    };
  
    dislike = () => {
      console.log("Dieser Benutzer wurde disliked: " + this.state.userData)
      toast(this.state.userData +" disliked");
      console.log(this.state.ID)
  
      axios.get("http://localhost:5000/userPosts/findUser/" + this.state.userData)
        .then( (res) => {
          console.log(res.data.Like);
          console.log(res.data._id);
          const userID = res.data._id;
          const userLike = res.data.Like;
  
          axios.patch("http://localhost:5000/userPosts/userDisLike/" + userID, userLike )
          .then((res) => {
            console.log("User wurde disliked: ", res);
          })
          .catch((err) => {
            console.log("Delete Error: ", err);
          });
        })
    };
    generateAcceptedElement() {
      //Avatar sollte reichen
      const acceptedElements = this.props.driveData.accepted.map(
        (singleAcceptedUser, i) => {
          return (
            <DriveRequestAcceptedMitfahrer
              key={i}
              userData={singleAcceptedUser}
              inputValue={this.state.driveData.fahrtObjektID}
            ></DriveRequestAcceptedMitfahrer>
          );
        },
        this
      );
      return acceptedElements;
    }

  componentDidMount() {
    const acceptedElements = this.generateAcceptedElement();
    this.setState({acceptedElements: acceptedElements});
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
                <div style={{display:"grid", displayItems:"center"}} onClick={this.handleClickProfilOpen}>
                  <Button>
                    <Avatar>{ this.state.driveData.fahrer.substring(0,1) } </Avatar>
                  </Button>                 
                </div>
                <List>
                  <Divider></Divider>
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
                {/* <div>
                  <IconButton
                    color="default"
                    aria-label="chat"
                    onClick={this.edit}
                  >
                    <CreateIcon />
                  </IconButton>
                </div> */}
                <div>
                  <IconButton
                    color="secondary"
                    aria-label="open"
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
                <CardContent>
                  <h3>Mitfahrer</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr" }}>
                    {this.state.acceptedElements}
                  </div>
                </CardContent>
              </Collapse>

              <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="Stornieren"
                aria-describedby="Stornieren-Bestätigung"
              >
                <DialogTitle id="Löschendialog">{"Fahrt Stornieren?"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="LöschendialogBeschreibung">
                    Sind Sie sich sicher, dass Sie diese Fahrt löschen wollen?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    Nein
                  </Button>
                  <Button onClick={this.cancel} color="primary" autoFocus>
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
              <Dialog
            open={this.state.profilOpen}
            onClose={this.handleProfilClose}
            aria-labelledby="Bewerten"
            aria-describedby="Bewertung-Bestätigen"
          >
            <DialogTitle id="Bewerten">{"Benutzer bewerten"}</DialogTitle>
            <DialogContent style={{width: '15em'}}>
              <Grid container direction="column" justify="center" alignItems="center" >
                <Avatar alt={this.state.name} src={this.state.profilBild} />
                <List>
                  <ListItem>
                    <ListItemText  primary={this.state.response.Benutzername} secondary={"Benutzername"}></ListItemText>
                  </ListItem>
                  <Divider></Divider>
                  <ListItem>
                      <ListItemText primary={this.state.response.Vorname} secondary={"Vorname"}></ListItemText>
                  </ListItem>
                  <Divider></Divider>
                  <ListItem>
                      <ListItemText primary={this.state.response.Nachname} secondary={"Nachname"}></ListItemText>
                  </ListItem>
                  <Divider></Divider>
                  <ListItem>
                      <ListItemText primary={this.state.response.Hochschule} secondary={"Hochschule"}></ListItemText>
                  </ListItem>
                  <Divider></Divider>
                  <ListItem>
                      <ListItemText primary={this.state.response.Studiengang} secondary={"Studiengang"}></ListItemText>
                  </ListItem>
                  <Divider></Divider>
                  <ListItem>
                      <ListItemText primary={this.state.response.Semester} secondary={"Semester"}></ListItemText>
                  </ListItem>
                  <Divider></Divider>
                  <ListItem>
                      <ListItemText primary={this.state.response.Automarke} secondary={"Automarke"}></ListItemText>
                  </ListItem>
                  <Divider></Divider>
                  <ListItem>
                      <ListItemText primary={this.state.response.Auto_Farbe} secondary={"Auto_Farbe"}></ListItemText>
                  </ListItem>
                  <Divider></Divider>
                  <ListItem>
                      <ListItemText primary={this.state.response.Kennzeichen} secondary={"Kennzeichen"}></ListItemText>
                  </ListItem>
                  <Divider></Divider>
                  <ListItem>
                      <ListItemText primary={this.state.response.Geschlecht} secondary={"Geschlecht"}></ListItemText>
                  </ListItem>
                  <Divider></Divider>
                  <ListItem>
                      <ListItemText primary={this.state.response.Wohnort} secondary={"Wohnort"}></ListItemText>
                  </ListItem>
                  <ListItem>
                      <ListItemText primary={this.state.response.Like} secondary={"Like"}></ListItemText>
                      <ListItemText primary={this.state.response.Dislike} secondary={"Dislike"}></ListItemText>
                  </ListItem>
                </List>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleProfilClose} variant="contained" color="secondary">
                Close
              </Button>
              <IconButton color="primary" aria-label="like" onClick={this.like}>
                    <ThumbUp />
                </IconButton>
                <IconButton color="primary" aria-label="dislike" onClick={this.dislike}>
                    <ThumbDown />
                </IconButton>
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
