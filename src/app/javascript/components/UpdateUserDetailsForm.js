import React, { useEffect } from "react";
import { TextField } from "@material-ui/core";

const UpdateUserDetailsForm = props => {
  const {
    values: {
      firstName,
      lastName,
      email,
      currentPassword
    },
    errors,
    touched,
    handleChange,
    isValid,
    setFieldTouched,
    enableButton,
    disableButton,
    wrongPassword,
    setWrongPassword,
    emailExists,
    setEmailExists,
    setUserDetails
  } = props;

  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
    if (name == "email" && emailExists) {
      setEmailExists(false);
    } else if (name == "currentPassword" && wrongPassword) {
      setWrongPassword(false);
    }
  };

  // Set button state based off validation
  useEffect(() => isValid ? enableButton() : disableButton(), [isValid]);

  // Update values in parent
  useEffect(() => setUserDetails(props.values), [props.values]);

  return (
    <form>
      <div className="row">
        <TextField
          className="textfield textfield-right-margin"
          id="firstName"
          name="firstName"
          helperText={touched.firstName ? errors.firstName : ""}
          error={touched.firstName && Boolean(errors.firstName)}
          label="First name"
          value={firstName}
          onChange={change.bind(null, "firstName")}
          variant="outlined" />
        <TextField
          className="textfield textfield-left-margin"
          id="lastName"
          name="lastName"
          helperText={touched.lastName ? errors.lastName : ""}
          error={touched.lastName && Boolean(errors.lastName)}
          label="Last name"
          value={lastName}
          onChange={change.bind(null, "lastName")}
          variant="outlined" />
      </div>
      <TextField
        className="textfield"
        id="email"
        name="email"
        helperText={emailExists ? "Email already exists" : touched.email ? errors.email : ""}
        error={emailExists || touched.email && Boolean(errors.email)}
        label="Email"
        value={email}
        onChange={change.bind(null, "email")}
        fullWidth
        variant="outlined" />
      <TextField
        className="textfield"
        id="currentPassword"
        name="currentPassword"
        helperText={wrongPassword ? "Incorrect password" : touched.currentPassword ? errors.currentPassword : ""}
        error={wrongPassword || touched.currentPassword && Boolean(errors.currentPassword)}
        label="Current password"
        value={currentPassword}
        onChange={change.bind(null, "currentPassword")}
        fullWidth
        variant="outlined"
        type="password" />
    </form>
  );
};

export default UpdateUserDetailsForm;