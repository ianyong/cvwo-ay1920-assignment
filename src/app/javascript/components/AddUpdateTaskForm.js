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
  const [allTags, setAllTags] = React.useState([]);
  const [selectedTags, setSelectedTags] = React.useState([]);

  const requestAllTags = async () => {
    let token = localStorage.getItem("token");
    const response = await fetch("/api/tags", {
      method: "GET",
      headers: {
        "Content-Type": "application/vnd.api+json",
        "Authorization": token
      }
    })
    const { data } = await response.json();
    if (response.status === 500) {
      // Not logged in
      navigate("/login")
    } else {
      setAllTags(data);
    }
  }

  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  const handleDateChange = date => {
    setSelectedDate(date);
    props.values.due_date = date;
  };

  const handleTagChange = (event, tags) => {
    setSelectedTags(tags);
  };

  // Upon losing focus, turn any remaining user input into a chip
  const handleLoseFocus = event => {
    // console.log(event.target.value);
    if (event.target.value.length > 0) {
      setSelectedTags([...selectedTags, event.target.value]);
    }
  };

  // Set button state based off validation
  useEffect(() => isValid ? enableButton() : disableButton(), [isValid]);

  // Update values in parent
  useEffect(() => updateValues(props.values), [props.values]);

  // Run on first render
  useEffect(() => { requestAllTags(); setSelectedTags(props.values.tags); }, []);

  // Update props
  useEffect(() => { props.values.tags = selectedTags }, [selectedTags]);

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
          value={selectedTags}
          options={allTags.map(option => option.attributes.name)}
          filter={Autocomplete.fuzzyFilter}
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
          )}
          onChange={handleTagChange}
          onBlur={handleLoseFocus} />
      </div>
    </form>
  );
}

export default AddUpdateTaskForm;