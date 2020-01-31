import React from  "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@material-ui/core";
import { Formik } from "formik";
import * as Yup from "yup";
import AddUpdateTaskForm from "./AddUpdateTaskForm";

class AddUpdateTaskDialog extends React.Component {
  constructor(props) {
    super(props);
    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.updateValues = this.updateValues.bind(this);
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

  handleSubmit = () => {
    const addTask = async () => {
      let token = localStorage.getItem("token");
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/vnd.api+json",
          "Authorization": token
        },
        body: JSON.stringify({
          name: this.values.name,
          description: this.values.description,
          due_date: this.values.due_date
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

  handleUpdate = () => {
    const updateTask = async () => {
      let token = localStorage.getItem("token");
      const response = await fetch("/api/tasks/" + this.props.task.attributes.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/vnd.api+json",
          "Authorization": token
        },
        body: JSON.stringify({
          name: this.values.name,
          description: this.values.description,
          due_date: this.values.due_date
        })
      })
      const { data } = await response.json();
      if (response.status === 500) {
        // Not logged in
        navigate("/login")
      } else if (response.status === 200) {
        // Successfully updated task
        this.props.onClose();
      } else {
        // Failed to update task
      }
    };
    updateTask();
  };

  validationSchema = Yup.object({
    name: Yup.string()
              .required("Task name is required"),
    description: Yup.string(),
    due_date: Yup.date()
  });

  initialValues = this.props.task ? {
    name: this.props.task.attributes.name,
    description: this.props.task.attributes.description,
    due_date: this.props.task.attributes['due-date']
  } : {
    name: "",
    description: "",
    due_date: new Date()
  };

  updateValues = values => {
    this.values = values;
  };

  render() {
    return (
      <Dialog
        open={this.props.open}
        fullWidth={true}
        maxWidth="md"
        scroll="paper">
        <DialogTitle>
          {this.props.task ? "Edit task" : "Add task"}
        </DialogTitle>
        <DialogContent>
          <Formik
            initialValues={this.initialValues}
            validationSchema={this.validationSchema}
            validateOnMount="true">
            {props => <AddUpdateTaskForm
                        {...props}
                        enableButton={this.enableButton}
                        disableButton={this.disableButton}
                        updateValues={this.updateValues} />}
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
            onClick={this.props.task ? this.handleUpdate : this.handleSubmit}
            color="primary"
            disabled={!this.state.buttonEnabled}>
            {this.props.task ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default AddUpdateTaskDialog;