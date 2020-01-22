import React, { useEffect } from "react";
import { TextField } from "@material-ui/core";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns"

const AddTaskForm = props => {
  const {
    values: {
      name,
      description,
      due_date
    },
    errors,
    touched,
    handleSubmit,
    handleChange,
    isValid,
    setFieldTouched,
    enableButton,
    disableButton,
    updateValues
  } = props;

  const [selectedDate, setSelectedDate] = React.useState(props.values.due_dute);

  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  const handleDateChange = date => {
    setSelectedDate(date);
    props.values.due_date = date;
  };

  // Set button state based off validation
  useEffect(() => isValid ? enableButton() : disableButton(), [isValid]);

  // Update values in parent
  useEffect(() => updateValues(props.values), [props.values]);

  return(
    <form>
      <TextField
        id="name"
        name="name"
        helperText={touched.name ? errors.name : ""}
        error={touched.name && Boolean(errors.name)}
        label="Name"
        value={name}
        onChange={change.bind(null, "name")}
        fullWidth
        variant="outlined" />
      <TextField
        className="textfield"
        id="description"
        name="description"
        helperText={touched.description ? errors.description : ""}
        error={touched.description && Boolean(errors.description)}
        label="Description"
        value={description}
        onChange={change.bind(null, "description")}
        fullWidth
        variant="outlined"
        multiline
        rows="5" />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          id="due_date"
          name="due_date"
          helperText={touched.due_date ? errors.due_date : ""}
          error={touched.due_date && Boolean(errors.due_date)}
          label="Due Date"
          value={selectedDate}
          onChange={handleDateChange} />
      </MuiPickersUtilsProvider>
    </form>
  );
}

export default AddTaskForm;