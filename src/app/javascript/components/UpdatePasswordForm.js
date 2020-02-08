import React, { useEffect } from "react";
import { TextField } from "@material-ui/core";

const UpdatePasswordForm = props => {
  const {
    values: {
      newPassword,
      confirmNewPassword,
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
    setPasswordDetails
  } = props;

  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
    if (name == "currentPassword" && wrongPassword) {
      setWrongPassword(false);
    }
  };

  // Set button state based off validation
  useEffect(() => isValid ? enableButton() : disableButton(), [isValid]);

  // Update values in parent
  useEffect(() => setPasswordDetails(props.values), [props.values]);

  return (
    <form>
      <TextField
        className="textfield"
        id="newPassword"
        name="newPassword"
        helperText={touched.newPassword ? errors.newPassword : ""}
        error={touched.newPassword && Boolean(errors.newPassword)}
        label="New password"
        value={newPassword}
        onChange={change.bind(null, "newPassword")}
        fullWidth
        variant="outlined"
        type="password" />
      <TextField
        className="textfield"
        id="confirmNewPassword"
        name="confirmNewPassword"
        helperText={touched.confirmNewPassword ? errors.confirmNewPassword : ""}
        error={touched.confirmNewPassword && Boolean(errors.confirmNewPassword)}
        label="Confirm new password"
        value={confirmNewPassword}
        onChange={change.bind(null, "confirmNewPassword")}
        fullWidth
        variant="outlined"
        type="password" />
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

export default UpdatePasswordForm;