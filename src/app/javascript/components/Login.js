import React from "react";
import { Formik, Field, Form } from "formik";
import { navigate } from "@reach/router";

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

  return (
    <div>
      <h2>Log In</h2>
      <Formik
        initialValues={{
          type: "users",
          attributes: {
            email: "",
            password: ""
          }
        }}
        onSubmit={handleSubmit}
        render={() => (
          <Form>
            <Field type="text" name="attributes.email" />
            <Field type="text" name="attributes.password" />

            <button type="submit">Log in</button>
          </Form>
        )}
      />
    </div>
  );
}

export default Login;