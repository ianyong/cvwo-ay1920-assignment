import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { navigate } from "@reach/router";
import LoginForm from "./LoginForm";
import { Dialog, Slide, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import RegisterForm from "./RegisterForm";

const registerTransition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Login() {
  const [registerFormOpen, setRegisterFormOpen] = React.useState(false);
  const [emailExists, setEmailExists] = React.useState(false);
  const [loginAlertOpen, setLoginAlertOpen] = React.useState(false);
  const [emailAlertOpen, setEmailAlertOpen] = React.useState(false);

  const openRegisterForm = () => {
    setRegisterFormOpen(true);
  };

  const closeRegisterForm = () => {
    setRegisterFormOpen(false);
    setEmailExists(false);
  };

  const openLoginAlert = () => {
    setLoginAlertOpen(true);
  };

  const closeLoginAlert = () => {
    setLoginAlertOpen(false);
  };

  const openEmailAlert = () => {
    setEmailAlertOpen(true);
  };

  const closeEmailAlert = () => {
    setEmailAlertOpen(false);
  };

  const handleLogin = values => {
    const login = async () => {
      const csrfToken = document.querySelector("meta[name=csrf-token]").content;
      fetch("/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/vnd.api+json",
          "X-CSRF-Token": csrfToken
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password
        })
      })
      .then(resp => resp.json())
      .then(data => {
        if (data.message) {
          // Successfully logged in
          localStorage.setItem("token", data.access_token);
          navigate("/");
        } else {
          // Invalid credentials
          openLoginAlert();
        }
      })
    };
    login();
  };

  const handleRegister = values => {
    const register = async () => {
      const csrfToken = document.querySelector("meta[name=csrf-token]").content;
      fetch("/api/auth/register", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/vnd.api+json",
          "X-CSRF-Token": csrfToken
        },
        body: JSON.stringify({
          first_name: values.firstName,
          last_name: values.lastName,
          email: values.email,
          password: values.password
        })
      })
      .then(resp => resp.json())
      .then(data => {
        if (data.message) {
          // Successfully registered
          localStorage.setItem("token", data.access_token);
          navigate("/");
        } else if (data.email) {
          // Email taken
          setEmailExists(true);
          openEmailAlert();
        } else {
          // Invalid information
        }
      })
    };
    register();
  };

  const loginValidationSchema = Yup.object({
    email: Yup.string()
              .email("Invalid email")
              .required("Email is required"),
    password: Yup.string()
                  .min(6, "Password must contain at least 6 characters")
                  .required("Password is required")
  });

  const registerValidationSchema = Yup.object({
    firstName: Yup.string()
                  .required("First name is required"),
    lastName: Yup.string()
                  .required("Last name is required"),
    email: Yup.string()
              .email("Invalid email")
              .required("Email is required"),
    password: Yup.string()
                  .min(6, "Password must contain at least 6 characters")
                  .required("Password is required"),
    confirmPassword: Yup.string()
                        .oneOf([Yup.ref('password'), null], "Password does not match")
                        .required("Confirm password is required")
  });

  const loginValues = {
    email: "",
    password: ""
  };

  const registerValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  };

  return (
    <React.Fragment>
      <div className="form-container">
        <Dialog
          className="column"
          open={true}
          fullWidth={true}
          maxWidth="sm"
          scroll="paper"
          BackdropProps={{
            style: {
              backgroundColor: 'transparent'
            }
          }}>
          <Formik
            initialValues={loginValues}
            onSubmit={handleLogin}
            validationSchema={loginValidationSchema}>
            {props => <LoginForm
                        {...props}
                        openRegisterForm={openRegisterForm} />}
          </Formik>
        </Dialog>
      </div>
      <div className="form-container">
        <Dialog
          className="column"
          TransitionComponent={registerTransition}
          open={registerFormOpen}
          fullWidth={true}
          maxWidth="sm"
          scroll="paper"
          BackdropProps={{
            style: {
              backgroundColor: 'transparent'
            }
          }}>
          <Formik
            initialValues={registerValues}
            onSubmit={handleRegister}
            validationSchema={registerValidationSchema}>
            {props => <RegisterForm
                        {...props}
                        closeRegisterForm={closeRegisterForm}
                        emailExists={emailExists}
                        setEmailExists={setEmailExists} />}
          </Formik>
        </Dialog>
      </div>
      <Snackbar
        open={loginAlertOpen}
        autoHideDuration={5000}
        onClose={closeLoginAlert}>
        <Alert
          onClose={closeLoginAlert}
          severity="error">
          Invalid credentials
        </Alert>
      </Snackbar>
      <Snackbar
        open={emailAlertOpen}
        autoHideDuration={5000}
        onClose={closeEmailAlert}>
        <Alert
          onClose={closeEmailAlert}
          severity="warning">
          Email is already in use
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}

export default Login;