import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Logo from "../../Bilder/Logo.PNG";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: { minWidth: 275, maxWidth: 345, minHeight: 200 },
  title: { fontSize: 25 }
});

export default function LoginCard() {
  const classes = useStyles();
  return (
    <div>
      <Card className={classes.root}>
      <CardActionArea>
        <CardMedia component="img" alt="Logo" height="140" src={ Logo } title="GroupUp" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" align="center">
            Herzlich Willkommen
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" align="center">
              Nutzen Sie diese App und Organisieren Sie Mitfahrgelegenheiten um dabei der Umwelt und ihren Geldbeutel zu schützen.
              Viel Spaß dabei :) 
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link to="/auth/login">
          <Button size="large" color="primary" variant="contained" style={{ marginLeft:"110px" }}>
          Login
        </Button>
        </Link>
      </CardActions>
    </Card>
  </div>
  );
}
