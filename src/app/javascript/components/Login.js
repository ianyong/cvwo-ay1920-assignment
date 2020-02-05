import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { navigate } from "@reach/router";
import LoginForm from "./LoginForm";
import { Dialog, Slide } from "@material-ui/core";
import RegisterForm from "./RegisterForm";

const registerTransition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

function Login() {
  const [loginFormOpen, setLoginFormOpen] = React.useState(true);
  const [registerFormOpen, setRegisterFormOpen] = React.useState(false);

  const openLoginForm = () => {
    setLoginFormOpen(true);
  };

  const closeLoginForm = () => {
    setLoginFormOpen(false);
  };

  const openRegisterForm = () => {
    setRegisterFormOpen(true);
  };

  const closeRegisterForm = () => {
    setRegisterFormOpen(false);
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
          navigate("/")
        } else {
          // Invalid credentials
        }
      })
    };
    login();
  };

  const loginValidationSchema = Yup.object({
    email: Yup.string()
              .email("Invalid email")
              .required("Email is required"),
    password: Yup.string()
                  .min(6, "Password must contain at least 6 characters")
                  .required("Password is required")
  });

  const values = {
    email: "",
    password: ""
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
            initialValues={values}
            onSubmit={handleLogin}
            validationSchema={loginValidationSchema}>
            {props => <LoginForm
                        {...props}
                        closeLoginForm={closeLoginForm}
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
            initialValues={values}
            onSubmit={handleLogin}
            validationSchema={loginValidationSchema}>
            {props => <RegisterForm
                        {...props}
                        closeRegisterForm={closeRegisterForm}
                        openLoginForm={openLoginForm} />}
          </Formik>
        </Dialog>
      </div>
    </React.Fragment>
  );
}

export default Login;