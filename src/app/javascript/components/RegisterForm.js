import React from "react";
import { TextField, Button } from "@material-ui/core";

const RegisterForm = props => {
  const {
    values: { email, password },
    errors,
    touched,
    handleSubmit,
    handleChange,
    isValid,
    setFieldTouched,
    closeRegisterForm,
    openLoginForm
  } = props;

  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  return(
    <form
      className="form"
      onSubmit={handleSubmit}>
      <p
        className="title">
        To-do Task Manager
      </p>
      <TextField
        className="textfield"
        id="email"
        name="email"
        helperText={touched.email ? errors.email : ""}
        error={touched.email && Boolean(errors.email)}
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
          onClick={() => { closeRegisterForm(); openLoginForm(); }}>
          Already have an account?
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;