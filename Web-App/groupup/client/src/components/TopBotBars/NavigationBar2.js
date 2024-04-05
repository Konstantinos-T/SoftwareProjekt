import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import FindIcon from "@material-ui/icons/FindInPage";
import CreateIcon from "@material-ui/icons/Create";
import DashboardIcon from "@material-ui/icons/Dashboard";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { useHistory, Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: "auto",
    bottom: 0,
    color: "primary",
  },
  /*
  divBar: {
    width: "100%",
    height: "10%",
    display: "grid",
    gridGap: "10%",
    gridTemplateColumns: "1fr 1fr 1fr",
    
  },
  //icon: {
  //  marginLeft: "25%",
 // },
 // find: {
 //   marginLeft: "15%",
  //},
  */
  root: {
    // position: "fixed",
    bottom: 0,
    width: "100%",
    backgroundColor: "F00",
  },
}));

export default function NavigationBar() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const history = useHistory();
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          history.push(`/${newValue}`);
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction
          label="Fahrt suchen"
          value={"Suchen"}
          icon={<FindIcon style={{ color: "#002984" }} />}
        ></BottomNavigationAction>
        <BottomNavigationAction
          label="Fahrt anbieten"
          value={"Anbieten"}
          icon={<CreateIcon style={{ color: "#002984" }} />}
        />
        <BottomNavigationAction
          label="Dashboard"
          value={"DashboardDemo"}
          icon={<DashboardIcon style={{ color: "#002984" }} />}
        />
      </BottomNavigation>
    </AppBar>
  );
}
