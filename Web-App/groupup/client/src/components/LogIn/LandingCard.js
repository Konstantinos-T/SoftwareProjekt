import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Logo from "../../Bilder/Logo.PNG";
import axios from "axios";

export class LandingCard extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          isLoggedIn: false,
          user: undefined,
        };
      }
      componentDidMount() {
        axios.get("http://localhost:8100/auth/isAuth", { withCredentials: true })
        .then((res) => {
            let auth = res.data.state;
            let user = res.data.user;
            this.setState({ isLoggedIn: auth });          
            this.setState({ user: user.id });
            console.log(this.state.user);
        });
    }

    render() {
    return (
        <Card style={{ minWidth: 275, maxWidth: 345, minHeight: 200}}>
        <CardActionArea>
        <CardMedia component="img" alt="Logo" height="140" src={ Logo } title="GroupUp" />
        <CardContent>
            <Typography gutterBottom variant="h5" component="h2" align="center">
            Herzlich Willkommen {this.state.user} 
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" align="center">
                Viel Spaß bei der Nutzung von GroupUp :D
            </Typography>
        </CardContent>
        </CardActionArea>
    </Card>
    );
    }
}

export default LandingCard;