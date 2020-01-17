import React, { useEffect } from "react";
import { TextField } from "@material-ui/core";

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
    disableButton
  } = props;

  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  // Set button state based off validation
  useEffect(() => isValid ? enableButton() : disableButton(), [isValid]);

  return(
    <form>
      <TextField
        id="name"
        name="name"
        helperText={touched.name ? errors.name : ""}
        error={touched.name && Boolean(errors.name)}
        label="Task name"
        value={name}
        onChange={change.bind(null, "name")}
        fullWidth
        variant="outlined" />
    </form>
  );
}

export default AddTaskForm;