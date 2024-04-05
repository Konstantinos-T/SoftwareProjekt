import "date-fns";
import React from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import { format } from 'date-fns'
import { MuiPickersUtilsProvider, KeyboardTimePicker } from "@material-ui/pickers";

export default function TimePicker(props) {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate ] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate( date );
    props.parentCallback( date );
  }; 

  React.useEffect(() => {
    setSelectedDate ( props.incomingValue);
  }, [props.incomingValue]);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="flex-start" style={{justifyContent: 'center'}}>
        <KeyboardTimePicker  margin="normal" id="time-picker" label={props.label}  value={selectedDate}   onChange={handleDateChange}  KeyboardButtonProps={{ "aria-label": "change time",}}/>
        </Grid>
    </MuiPickersUtilsProvider>
  );
}
