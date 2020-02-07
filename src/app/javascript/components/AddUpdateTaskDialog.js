import React from  "react";
import { navigate } from "@reach/router";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Snackbar } from "@material-ui/core";
import { Formik } from "formik";
import * as Yup from "yup";
import AddUpdateTaskForm from "./AddUpdateTaskForm";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class AddUpdateTaskDialog extends React.Component {
  constructor(props) {
    super(props);
    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.updateValues = this.updateValues.bind(this);
    this.setSelectedDate = this.setSelectedDate.bind(this);
    this.setAllTags = this.setAllTags.bind(this);
    this.setSelectedTags = this.setSelectedTags.bind(this);
    this.openAddAlert = this.openAddAlert.bind(this);
    this.closeAddAlert = this.closeAddAlert.bind(this);
    this.state = {
      buttonEnabled: false,
      selectedDate: new Date(),
      allTags: [],
      selectedTags: [],
      addAlertOpen: false
    };
  }

  enableButton() {
    this.setState({
      buttonEnabled: true
    });
  }

  disableButton() {
    // Reset form
    this.setState({
      buttonEnabled: false,
      selectedDate: new Date(),
      allTags: [],
      selectedTags: []
    });
  }

  setSelectedDate(date) {
    this.setState({
      selectedDate: date
    });
  }

  setAllTags(tags) {
    this.setState({
      allTags: tags
    });
  }

  setSelectedTags(tags) {
    this.setState({
      selectedTags: tags
    });
  }

  openAddAlert() {
    this.setState({
      addAlertOpen: true
    });
  }

  closeAddAlert() {
    this.setState({
      addAlertOpen: false
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
          due_date: new Date(this.values.due_date.getTime() - this.values.due_date.getTimezoneOffset() * 60000),
          tag_list: this.values.tags
        })
      })
      const { data } = await response.json();
      if (response.status === 200) {
        // Successfully added task
        this.props.onClose();
        this.props.refreshTaskList();
        this.openAddAlert();
      } else {
        // Failed to add task
        navigate("/login");
      }
    };
    addTask();
  };

  handleUpdate = () => {
    const updateTask = async () => {
      let token = localStorage.getItem("token");
      const response = await fetch("/api/tasks/" + this.props.task.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/vnd.api+json",
          "Authorization": token
        },
        body: JSON.stringify({
          name: this.values.name,
          description: this.values.description,
          due_date: this.values.due_date,
          tag_list: this.values.tags
        })
      })
      const { data } = await response.json();
      if (response.status === 200) {
        // Successfully updated task
        this.props.onClose();
        this.props.refreshTaskList();
        this.props.openEditAlert();
      } else {
        // Failed to update task
        navigate("/login");
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
    due_date: this.props.task.attributes['due-date'],
    tags: this.props.task.attributes['tag-list'].split("\u0000").filter(e => e !== "")
  } : {
    name: "",
    description: "",
    due_date: new Date(),
    tags: []
  };

  updateValues = values => {
    this.values = values;
  };

  render() {
    return (
      <React.Fragment>
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
                          state={this.state}
                          enableButton={this.enableButton}
                          disableButton={this.disableButton}
                          updateValues={this.updateValues}
                          setSelectedDate={this.setSelectedDate}
                          setAllTags={this.setAllTags}
                          setSelectedTags={this.setSelectedTags} />}
            </Formik>
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              onClick={this.props.task ? this.handleUpdate : this.handleSubmit}
              color="secondary"
              disabled={!this.state.buttonEnabled}>
              {this.props.task ? "Update" : "Add"}
            </Button>
            <Button
              onClick={this.props.onClose}
              color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={this.state.addAlertOpen}
          autoHideDuration={2000}
          onClose={this.closeAddAlert}>
          <Alert
            onClose={this.closeAddAlert}
            severity="success">
            Successfully added task
          </Alert>
        </Snackbar>
      </React.Fragment>
    );
  }
}

export default AddUpdateTaskDialog;