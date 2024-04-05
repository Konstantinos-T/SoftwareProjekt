import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

export default function FahrtdetailsCheckboxengruppeRot(props) {
  const [state, setState] = React.useState({
    Raucherauto: true,
    Tierauto: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    props.parentCallback(state.Raucherauto, state.Tierauto);
  };

  return (
    <div style={{ marginLeft:"2em" }}>
      <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox
            checked={state.Raucherauto}
            onChange={handleChange}
            name="Raucherauto"
          />
        }
        label="Rauchen erlaubt"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={state.Tierauto}
            onChange={handleChange}
            name="Tierauto"
          />
        }
        label="Tierfreies Auto"
      />
    </FormGroup>
    </div>
  );
}
