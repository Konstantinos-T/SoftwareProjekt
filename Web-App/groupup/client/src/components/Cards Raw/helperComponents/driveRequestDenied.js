import React, { Component } from "react";
import toast, { Toaster } from "react-hot-toast";
import Avatar from "@material-ui/core/Avatar";
import { Button } from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import axios from "axios";
import { IconButton } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ThumbUp from "@material-ui/icons/ThumbUp";
import ThumbDown from "@material-ui/icons/ThumbDown";
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';


export default class DriveRequestAccepted extends Component {
  //props: userData, driveData
  constructor(props){
    super(props);
    
    this.state = {
      driveData: this.props.driveData,
      userData: this.props.userData,

      response: []
    };
  }

  //Dialogfunktionen für Dialogöffnung, Like und Dislike
  handleClickOpen = () => {
    axios.get("http://localhost:5000/userPosts/findUser/" + this.state.userData)
    .then((res) => {
      this.setState({response: res.data});
    });
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  like = () => {

  };

  render() {
    return (
      <div>
        <Toaster /> 
        <div style={{ display: "flex " , flex: 1 , justifyContent: "space-between" }} >
          <div style={{  flex: 1  }}>
            <Button color="default" onClick={this.handleClickOpen}>
              {this.state.userData}
            </Button>
          </div>
          <div style={{  flex: 1 , marginLeft:"5px" }}>
          </div>
        </div>
        <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="Löschen"
            aria-describedby="Löschen-Bestätigung"
          >
            <DialogTitle id="Löschendialog">{"Fahrt löschen?"}</DialogTitle>
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
                </List>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} variant="contained" color="secondary">
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
      </div>
    );
  }
}
