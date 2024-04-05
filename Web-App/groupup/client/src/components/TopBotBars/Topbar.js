import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MeetingRoom from "@material-ui/icons/MeetingRoom";
import Logo from "../../Bilder/LogoOhneHintergrund.png";
import { Link } from "react-router-dom";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

const useStyles = makeStyles((theme) => ({
  topbar: {
    /* backgroundColor:"F00",
      width: "100%",
      float: "right", */
  },
  menuRight: {
    //marginLeft: "35%",
    width: "30%",
  },
  textStyle: {
    // marginLeft: "10%",
    //width: "70%",
    //paddingLeft: "20%",
  },
}));

export default function NavigationBar(props) {
  const classes = useStyles();

  return (
    <div style={{ marginBottom: "80px" }}>
      <AppBar position="fixed" style={{ maxHeight: "80px" }}>
        <Toolbar>
          <div
            style={{
              display: "flex",
              flex: "1",
              flexDirection: "cloumn",
              justifyContent: "space-between",
              alignItems: "stretch",
              flexWrap: "nowrap",
            }}
          >
            <div style={{ alignSelf: "center" }}>
              <Typography variant="h5">{props.title}</Typography>
            </div>
            <div style={{ alignSelf: "center" }}>
              <Link to="/Landing">
                <img
                  src={Logo}
                  alt="Logo"
                  style={{ maxWidth: "150px", maxHeight: "100px" }}
                />
              </Link>
            </div>
            <div style={{ alignSelf: "center" }}>
            <Link to="/DatenschutzImpressum">
              <IconButton>
              <HelpOutlineIcon></HelpOutlineIcon>
              </IconButton>
              </Link>
              <Link to="/auth/logοut/">
                <IconButton style={{ maxWidth: "250px", maxHeight: "200px" }}>
                  <MeetingRoom style={{ color: "white" }} />
                  <Typography style={{ color: "white" }}>Logout</Typography>
                </IconButton>
              </Link>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
