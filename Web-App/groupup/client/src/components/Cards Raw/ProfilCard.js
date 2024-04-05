import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import { IconButton } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";
import Collapse from "@material-ui/core/Collapse";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import axios from "axios";

const useStyles = (theme) => ({
  root: {
    display: "inline-block",
    width: "200px",
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: "50%",
    height: theme.spacing(12),
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

export class profilCard extends Component {
  state = {
    profilBild:
      "https://cdn6.f-cdn.com/contestentries/1376995/30494909/5b566bc71d308_thumbCard.jpg",
    /*Name: "Max Müller",
      Semester: "4",
      Studiengang: "SWB",
      Wohnort: "Esslingen",
      Hochschule: "Hochschule Esslingen",
      Auto: "Lada"*/
    UserID: undefined,
    Benutzername: undefined,
    Nachname: undefined,
    Vorname: undefined,
    Hochschule: undefined,
    Studiengang: undefined,
    Semester: undefined,
    Automarke: undefined,
    Auto_Farbe: undefined,
    Kennzeichen: undefined,
    Geschlecht: undefined,
    Wohnort: undefined,
    expanded: false,
    open: false,
  };

  componentDidMount() {
    axios.get("http://localhost:8100/auth/isAuth", { withCredentials: true })
    .then((res) => {
      let auth = res.data.state;
      let user = res.data.user;
      this.setState({ isLoggedIn: auth });
      this.setState({ Benutzername: user.id });                   
      localStorage.setItem("isLoggedIn", auth);
      //console.log("isAuth", auth);
      //console.log("UserID", user.id); 

      axios.get("http://localhost:5000/userPosts/findUser/"+ this.state.Benutzername)
        .then((response) => { 
          try {
            //console.log("Ich habe die User ID");
            //console.log(response.data);
            this.setState({UserID: response.data._id});
            this.setState({ Nachname: response.data.Nachname });
            this.setState({ Vorname: response.data.Vorname });
            this.setState({ Hochschule: response.data.Hochschule });
            this.setState({ Studiengang: response.data.Studiengang });
            this.setState({ Semester: response.data.Semester });
            this.setState({ Automarke: response.data.Automarke });
            this.setState({ Auto_Farbe: response.data.Auto_Farbe });
            this.setState({ Kennzeichen: response.data.Kennzeichen });
            this.setState({ Geschlecht: response.data.Geschlecht });
            this.setState({ Wohnort: response.data.Wohnort });
          }catch (error) {
            console.log("Ich habe keine ID");
            console.log(error);
          }
        });
    })
  }

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  editClicked = () => {
    //console.log(this.state.UserID);
    //console.log(this.state.Benutzername);
    //console.log("editClicked entered");
    this.setState({ open: true });
  };

  /*handleClickOpen = () => {
    this.setState({ open: true });
  };*/

  handleClose = () => {
    this.setState({ open: false });
  };

  sendProfil = () => {
    const updatedProfil = {
      Benutzername: this.state.Benutzername,
      Nachname: this.state.Nachname,
      Vorname: this.state.Vorname,
      Hochschule: this.state.Hochschule,
      Studiengang: this.state.Studiengang,
      Semester: this.state.Semester,
      Automarke: this.state.Automarke,
      Auto_Farbe: this.state.Auto_Farbe,
      Kennzeichen: this.state.Kennzeichen,
      Geschlecht: this.state.Geschlecht,
      Wohnort: this.state.Wohnort,
    };
    //Ich brauche die ID dieses Profils!
    axios
      .patch(
        "http://localhost:5000/userPosts/update/" + this.state.UserID,
        updatedProfil
      )
      .then((res) => {
        console.log("Das Profil wurde erfolgreich verändert: ", res);
      })
      .catch((err) => {
        console.log("Update Error: ", err);
      });
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div>
          <Card className={classes.root}>
            <CardContent>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Avatar
                  alt={this.state.name}
                  src={this.state.profilBild}
                  className={classes.large}
                />
                <List>
                  <ListItem>
                    <ListItemText
                      primary={this.state.Benutzername}
                      secondary={"Benutzername"}
                    ></ListItemText>
                  </ListItem>
                  <Divider></Divider>
                  <ListItem>
                    <ListItemText
                      primary={this.state.Hochschule}
                      secondary={"Hochschule"}
                    ></ListItemText>
                  </ListItem>
                  <Divider></Divider>
                  <ListItem>
                    <ListItemText
                      primary={this.state.Studiengang}
                      secondary={"Studiengang"}
                    ></ListItemText>
                  </ListItem>
                  <Divider></Divider>
                  <ListItem>
                    <ListItemText
                      primary={this.state.Semester}
                      secondary={"Semester"}
                    ></ListItemText>
                  </ListItem>
                  <Divider></Divider>
                  <ListItem>
                    <ListItemText
                      primary={this.state.Geschlecht}
                      secondary={"Geschlecht"}
                    ></ListItemText>
                  </ListItem>
                </List>
              </Grid>
            </CardContent>
            <CardActions>
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  flexWrap: "nowrap",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div style={{ marginLeft: "4em" }}>
                  <IconButton>
                    <CreateIcon onClick={this.editClicked}></CreateIcon>
                  </IconButton>
                </div>
                <div style={{ marginLeft: "4em" }}>
                  <IconButton
                    className={clsx(classes.expand, {
                      [classes.expandOpen]: this.state.expanded,
                    })}
                    onClick={this.handleExpandClick}
                    aria-expanded={this.state.expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />{" "}
                  </IconButton>
                </div>
              </div>
            </CardActions>

            <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                >
                  <List>
                    <ListItem>
                      <ListItemText
                        primary={this.state.Automarke}
                        secondary={"Automarke"}
                      ></ListItemText>
                    </ListItem>
                    <Divider></Divider>
                    <ListItem>
                      <ListItemText
                        primary={this.state.Auto_Farbe}
                        secondary={"Auto_Farbe"}
                      ></ListItemText>
                    </ListItem>
                    <Divider></Divider>
                    <ListItem>
                      <ListItemText
                        primary={this.state.Kennzeichen}
                        secondary={"Kennzeichen"}
                      ></ListItemText>
                    </ListItem>
                    <Divider></Divider>
                    <ListItem>
                      <ListItemText
                        primary={this.state.Wohnort}
                        secondary={"Wohnort"}
                      ></ListItemText>
                    </ListItem>
                  </List>
                </Grid>
              </CardContent>
            </Collapse>
          </Card>
        </div>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="Editierdialog">{"Profil bearbeiten:"}</DialogTitle>
          <DialogContent>
            <div>
              <form
                className={classes.root}
                autoComplete="off"
                onSubmit={this.sendProfil}
                noValidate
                style={{
                  margin: "2%",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  width: "14em",
                }}
              >
                <Avatar
                  alt={this.state.name}
                  src={this.state.profilBild}
                  className={classes.large}
                />
                <TextField
                  style={{ margin: "0.2em" }}
                  id="Nachname"
                  name="Nachname"
                  variant="outlined"
                  label="Nachname"
                  fullWidth
                  value={this.state.Nachname}
                  onChange={(e) => this.setState({ Nachname: e.target.value })}
                />
                <TextField
                  style={{ margin: "0.2em" }}
                  id="Vorname"
                  name="Vorname"
                  variant="outlined"
                  label="Vorname"
                  fullWidth
                  value={this.state.Vorname}
                  onChange={(e) => this.setState({ Vorname: e.target.value })}
                />
                <TextField
                  style={{ margin: "0.2em" }}
                  id="Studiengang"
                  name="Studiengang"
                  variant="outlined"
                  label="Studiengang"
                  fullWidth
                  value={this.state.Studiengang}
                  onChange={(e) =>
                    this.setState({ Studiengang: e.target.value })
                  }
                />
                <TextField
                  style={{ margin: "0.2em" }}
                  id="Hochschule"
                  name="Hochschule"
                  variant="outlined"
                  label="Hochschule"
                  fullWidth
                  value={this.state.Hochschule}
                  onChange={(e) =>
                    this.setState({ Hochschule: e.target.value })
                  }
                />
                <TextField
                  style={{ margin: "0.2em" }}
                  id="Semester"
                  name="Semester"
                  variant="outlined"
                  label="Semester"
                  fullWidth
                  value={this.state.Semester}
                  onChange={(e) => this.setState({ Semester: e.target.value })}
                />
                <TextField
                  style={{ margin: "0.2em" }}
                  id="Automarke"
                  name="Automarke"
                  variant="outlined"
                  label="Automarke"
                  fullWidth
                  value={this.state.Automarke}
                  onChange={(e) => this.setState({ Automarke: e.target.value })}
                />
                <TextField
                  style={{ margin: "0.2em" }}
                  id="Auto_Farbe"
                  name="Auto_Farbe"
                  variant="outlined"
                  label="Auto_Farbe"
                  fullWidth
                  value={this.state.Auto_Farbe}
                  onChange={(e) =>
                    this.setState({ Auto_Farbe: e.target.value })
                  }
                />
                <TextField
                  style={{ margin: "0.2em" }}
                  id="Kennzeichen"
                  name="Kennzeichen"
                  variant="outlined"
                  label="Kennzeichen"
                  fullWidth
                  value={this.state.Kennzeichen}
                  onChange={(e) =>
                    this.setState({ Kennzeichen: e.target.value })
                  }
                />
                <TextField
                  style={{ margin: "0.2em" }}
                  id="Geschlecht"
                  name="Geschlecht"
                  variant="outlined"
                  label="Geschlecht"
                  fullWidth
                  value={this.state.Geschlecht}
                  onChange={(e) =>
                    this.setState({ Geschlecht: e.target.value })
                  }
                />
                <TextField
                  style={{ margin: "0.2em" }}
                  id="Wohnort"
                  name="Wohnort"
                  variant="outlined"
                  label="Wohnort"
                  fullWidth
                  value={this.state.Wohnort}
                  onChange={(e) => this.setState({ Wohnort: e.target.value })}
                />
              </form>
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleClose}
              variant="contained"
              color="secondary"
            >
              Cancel
            </Button>
            <Button
              onClick={this.sendProfil}
              variant="contained"
              color="primary"
              autoFocus
            >
              Speichern
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
profilCard.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(useStyles)(profilCard);
