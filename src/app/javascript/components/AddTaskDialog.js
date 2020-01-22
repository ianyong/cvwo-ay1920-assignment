import React from  "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@material-ui/core";
import { Formik } from "formik";
import * as Yup from "yup";
import AddTaskForm from "./AddTaskForm";

class AddTaskDialog extends React.Component {
  constructor(props) {
    super(props);
    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.state = {
      buttonEnabled: false
    };
  }

  enableButton() {
    this.setState({
      buttonEnabled: true
    });
  }

  disableButton() {
    this.setState({
      buttonEnabled: false
    });
  }

  handleSubmit = values => {
    const addTask = async () => {
      let token = localStorage.getItem("token");
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/vnd.api+json",
          Authorization: token
        },
        body: JSON.stringify({
          name: values.name,
          description: values.description,
          due_date: values.due_date
        })
      })
      const { data } = await response.json();
      if (response.status === 500) {
        // Not logged in
        navigate("/login")
      } else if (response.status === 200) {
        // Successfully added task
        this.props.onClose();
      } else {
        // Failed to add task
      }
    };
    addTask();
  };

  validationSchema = Yup.object({
    name: Yup.string()
              .required("Task name is required"),
    description: Yup.string(),
    due_date: Yup.date()
  });

  values = {
    name: "",
    description: "",
    due_date: new Date()
  };

  render() {
    return (
      <Dialog
        open={this.props.open}
        fullWidth={true}
        maxWidth="md"
        scroll="paper">
        <DialogTitle>
          Add task
        </DialogTitle>
        <DialogContent>
          <Formik
            initialValues={this.values}
            validationSchema={this.validationSchema}
            validateOnMount="true">
            {props => <AddTaskForm
                        {...props}
                        enableButton={this.enableButton}
                        disableButton={this.disableButton} />}
          </Formik>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.props.onClose}
            color="secondary">
            Cancel
          </Button>
          <Button
            autoFocus
            onClick={this.handleSubmit}
            color="primary"
            disabled={!this.state.buttonEnabled}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default AddTaskDialog;