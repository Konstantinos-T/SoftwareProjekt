import React, { Component } from "react";
import LoginCard from "../LogIn/LoginCard.js";
import Grid from "@material-ui/core/Grid";
import Esslingen from "../../Bilder/esslingen-5033333_1920.jpg";

export class loginPage extends Component {
  state = {
    isLoggedIn: false,
    user: undefined,
  };

  render() {
    return (
      <div
        style={{ backgroundImage: `url(${Esslingen})`, backgroundSize: `cover`, }} >
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "100vh" }}
        >
          <LoginCard></LoginCard>
        </Grid>
      </div>
    );
  }
}

export default loginPage;
