import React, { Component } from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import toast, { Toaster } from "react-hot-toast";
import authenticator from "../../authentication/auth.js";
import NavigationBar from "../TopBotBars/NavigationBar2.js";

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

export class profilPageEdit extends Component {
  saveProfil() {
    toast.success("gedrückt");
  }

  state = {
    profilBild:
      "https://cdn6.f-cdn.com/contestentries/1376995/30494909/5b566bc71d308_thumbCard.jpg",
    Name: "Name",
    Semester: "Semester",
    Studiengang: "Studiengang",
    Wohnort: "Wohnort",
    Hochschule: "Hochschule",
    Auto: "Auto",
    isLoggedIn: false,
    user: undefined,
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
    const { classes } = this.props;
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
                alt={this.state.name}
                src={this.state.profilBild}
                className={classes.large}
              />
              <form className={classes.root} noValidate autoComplete="off">
                <List>
                  <ListItem>
                    <TextField id="Name" label={this.state.Name} />
                  </ListItem>
                  <Divider></Divider>
                  <ListItem>
                    <TextField id="Semester" label={this.state.Semester} />
                  </ListItem>
                  <Divider></Divider>
                  <ListItem>
                    <TextField
                      id="Studiengang"
                      label={this.state.Studiengang}
                    />
                  </ListItem>
                  <Divider></Divider>
                  <ListItem>
                    <TextField id="Wohnort" label={this.state.Wohnort} />
                  </ListItem>
                  <Divider></Divider>
                  <ListItem>
                    <TextField id="Hochschule" label={this.state.Hochschule} />
                  </ListItem>
                  <Divider></Divider>
                  <ListItem>
                    <TextField id="Auto" label={this.state.Auto} />
                  </ListItem>
                  <ListItem>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.saveProfil}
                    >
                      {" "}
                      Speichern
                    </Button>
                  </ListItem>
                </List>
              </form>
            </Grid>
          </CardContent>
        </Card>
        <NavigationBar></NavigationBar>
      </div>
    );
  }
}
profilPageEdit.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(useStyles)(profilPageEdit);
