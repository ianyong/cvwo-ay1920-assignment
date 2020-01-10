import React from "react";
import { navigate } from "@reach/router";
import { Formik, Field, Form } from "formik";

function AddTask() {
  const handleSubmit = values => {
    const requestTasks = async () => {
      const csrfToken = document.querySelector("meta[name=csrf-token]").content;
      const response = await fetch("/api/tasks", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/vnd.api+json",
          "X-CSRF-Token": csrfToken
        },
        body: JSON.stringify({ data: values })
      });
      if(response.status === 201) {
        navigate("/");
      }
    };
    requestTasks();
  };

  return (
    <div>
      <h2>Add your task</h2>
      <Formik
        initialValues={{
          type: "tasks",
          attributes: {
            name: "",
            description: "",
            due_date: "",
            is_completed: false
          }
        }}
        onSubmit={handleSubmit}
        render={() => (
          <Form>
            <Field type="text" name="attributes.name" />
            <Field type="text" name="attributes.description" />
            <Field type="date" name="attributes.due_date" />

            <button type="submit">Create</button>
          </Form>
        )}
      />
    </div>
  );
}

export default AddTask;