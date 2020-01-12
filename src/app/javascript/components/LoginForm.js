import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const LoginForm = props => {
  const {
    values: { email, password },
    errors,
    touched,
    handleSubmit,
    handleChange,
    isValid,
    setFieldTouched
  } = props;

  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  return(
    <form
      onSubmit={handleSubmit}>
      <TextField
        id="email"
        name="email"
        helperText={touched.email ? errors.email : ""}
        error={touched.email && Boolean(errors.email)}
        label="Email"
        value={email}
        onChange={change.bind(null, "email")}
        fullWidth />

      <TextField
        id="password"
        name="password"
        helperText={touched.password ? errors.password : ""}
        error={touched.password && Boolean(errors.password)}
        label="Password"
        value={password}
        onChange={change.bind(null, "password")}
        fullWidth
        type="password" />

      <Button
        type="submit"
        fullWidth
        disabled={!isValid}>
        Log in
      </Button>
    </form>
  );
};

export default LoginForm;