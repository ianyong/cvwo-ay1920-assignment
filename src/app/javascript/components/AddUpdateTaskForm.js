import React, { useEffect } from "react";
import { TextField, Chip } from "@material-ui/core";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Autocomplete } from "@material-ui/lab";
import DateFnsUtils from "@date-io/date-fns";

const AddUpdateTaskForm = props => {
  const {
    values: {
      name,
      description,
      due_date,
      tags
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

  const [selectedDate, setSelectedDate] = React.useState(due_date);

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
      <div className="row">
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
        <Autocomplete
          className="full-width"
          multiple
          id="tags"
          defaultValue={tags}
          freeSolo
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip variant="outlined" label={option} {...getTagProps({ index })} />
            ))
          }
          renderInput={params => (
            <TextField
              {...params}
              variant="outlined"
              label="Tags"
              fullWidth />
          )} />
      </div>
    </form>
  );
}

export default AddUpdateTaskForm;