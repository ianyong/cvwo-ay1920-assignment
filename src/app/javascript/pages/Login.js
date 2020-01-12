import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { navigate } from "@reach/router";
import LoginForm from "../components/LoginForm";

function Login() {
  const handleSubmit = values => {
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
          email: values.attributes.email,
          password: values.attributes.password
        })
      })
      .then(resp => resp.json())
      .then(data => {
        if(data.message) {
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

  const validationSchema = Yup.object({
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
      <Formik
        initialValues={values}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}>
        {props => <LoginForm {...props} />}
      </Formik>
    </React.Fragment>
  );
}

export default Login;