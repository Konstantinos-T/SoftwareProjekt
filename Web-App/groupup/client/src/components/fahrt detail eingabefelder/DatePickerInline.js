import "date-fns";
import React from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils  from "@date-io/date-fns";
import { format } from 'date-fns'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";


export default function DatePickerInline(props) {
  // The first commit of Material-UI
  //TODO:fix month
  const [selectedDate , setSelectedDate ] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate( format(new Date(date), "yyyy-MM-dd"));
    props.parentCallback(date);
  }; 

  React.useEffect(() => {
    setSelectedDate(props.incomingValue) ;
  }, [props.incomingValue]);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="flex-start" style={{justifyContent: 'center'}}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd.MM.yyyy"
          margin="normal"
          id="date-picker-inline"
          label={props.label}
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
