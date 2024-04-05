import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


export default function FahrtdetailsAnbietenAuswahl(props) {
  
  
  
  const classes = useStyles();
  const [state, setState] = React.useState({Preis: undefined});

  const handleChange = (event) => {
    const name = event.target.name;
    setState({  ...state, [name]: event.target.value });
    props.parentCallback(event.target.value);
  };

  React.useEffect(() => {
    setState ( { Preis: props.incomingValue } );
  }, [props.incomingValue]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gridGap: "2em",
      }}
    >
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">Preis p.P.</InputLabel>
        <Select
          native
          value={state.Preis}
          onChange={handleChange}
          label="Preis"
          inputProps={{
            name: "Preis",
            id: "outlined-age-native-simple",
          }}
        >
          <option aria-label="None" value={undefined} />
          <option value={0}>Gratis</option>
          <option value={1}>1€</option>
          <option value={2}>2€</option>
          <option value={3}>3€</option>
          <option value={4}>4€</option>
          <option value={5}>5€</option>
        </Select>
      </FormControl>
    </div>
  );
}