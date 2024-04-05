import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

export default function FahrtdetailsCheckboxengruppeBlau(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    UmwegeAkzeptieren: true,
    MännlicheMitfahrerAkzeptieren: true,
    WeiblicheMitfahrerAkzeptieren: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    props.parentCallback(
      state.UmwegeAkzeptieren,
      state.MännlicheMitfahrerAkzeptieren,
      state.WeiblicheMitfahrerAkzeptieren
    );
  };

  const {
    UmwegeAkzeptieren,
    MännlicheMitfahrerAkzeptieren,
    WeiblicheMitfahrerAkzeptieren,
  } = state;
  const error =
    MännlicheMitfahrerAkzeptieren === false &&
    WeiblicheMitfahrerAkzeptieren === false;

  return (
    <div className={classes.root}>
      <FormControl
        required
        error={error}
        component="fieldset"
        className={classes.formControl}
      >
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={UmwegeAkzeptieren}
                onChange={handleChange}
                name="UmwegeAkzeptieren"
              />
            }
            label="UmwegeAkzeptieren"
          />
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={MännlicheMitfahrerAkzeptieren}
                onChange={handleChange}
                name="MännlicheMitfahrerAkzeptieren"
              />
            }
            label="Männliche Mitfahrer akzeptieren "
          />
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={WeiblicheMitfahrerAkzeptieren}
                onChange={handleChange}
                name="WeiblicheMitfahrerAkzeptieren"
              />
            }
            label="Weibliche Mitfahrer akzeptieren"
          />
        </FormGroup>
        <FormHelperText>
          Du musst mindestens weibliche oder männliche Mitfahrer akzeptieren
        </FormHelperText>
      </FormControl>
    </div>
  );
}
