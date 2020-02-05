import React from "react";
import { TextField, Button } from "@material-ui/core";

const RegisterForm = props => {
  const {
    values: { firstName, lastName, email, password, confirmPassword },
    errors,
    touched,
    handleSubmit,
    handleChange,
    isValid,
    setFieldTouched,
    closeRegisterForm,
    openLoginForm,
    emailExists,
    setEmailExists
  } = props;

  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
    if (name == "email" && emailExists) {
      setEmailExists(false);
    }
  };

  return(
    <form
      className="form"
      onSubmit={handleSubmit}>
      <p className="title">
        To-do Task Manager
      </p>
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
        id="password"
        name="password"
        helperText={touched.password ? errors.password : ""}
        error={touched.password && Boolean(errors.password)}
        label="Password"
        value={password}
        onChange={change.bind(null, "password")}
        fullWidth
        variant="outlined"
        type="password" />
      <TextField
        className="textfield"
        id="confirmPassword"
        name="confirmPassword"
        helperText={touched.confirmPassword ? errors.confirmPassword : ""}
        error={touched.confirmPassword && Boolean(errors.confirmPassword)}
        label="Confirm password"
        value={confirmPassword}
        onChange={change.bind(null, "confirmPassword")}
        fullWidth
        variant="outlined"
        type="password" />
      <Button
        type="submit"
        fullWidth
        disabled={!isValid}
        color="primary"
        variant="contained">
        Register
      </Button>
      <div className="button-container">
        <Button
          className="button"
          color="secondary"
          onClick={closeRegisterForm}>
          Already have an account?
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;