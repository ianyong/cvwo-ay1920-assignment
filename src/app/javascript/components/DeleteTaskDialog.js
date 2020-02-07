import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Snackbar } from "@material-ui/core";
import { navigate } from "@reach/router";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class DeleteTaskDialog extends React.Component {
  constructor(props) {
    super(props);
    this.openAlert = this.openAlert.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
    this.state = {
      alertOpen: false
    };
  }

  openAlert() {
    this.setState({
      alertOpen: true
    });
  }

  closeAlert() {
    this.setState({
      alertOpen: false
    });
  }

  handleDelete = () => {
    const deleteTask = async () => {
      let token = localStorage.getItem("token");
      const response = await fetch("/api/tasks/" + this.props.task.id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/vnd.api+json",
          "Authorization": token
        }
      })
      const { data } = await response.json();
      if (response.status === 200) {
        // Successfully deleted task
        this.props.onClose();
        this.props.refreshTaskList();
        this.openAlert();
      } else {
        // Failed to delete task
        navigate("/");
      }
    };
    deleteTask();
  };

  render() {
    return (
      <React.Fragment>
        <Dialog
          open={this.props.open}
          onClose={this.props.onClose} // Responsive full-screen
          fullWidth={true}
          maxWidth="md"
          scroll="paper">
          <DialogTitle>
            Delete task - {this.props.task.attributes.name}
          </DialogTitle>
          <DialogContent>
            Are you sure you want to delete this task?
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              onClick={this.handleDelete}
              color="secondary">
              Yes
            </Button>
            <Button
              onClick={this.props.onClose}
              color="primary">
              No
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={this.state.alertOpen}
          autoHideDuration={2000}
          onClose={this.closeAlert}>
          <Alert
            onClose={this.closeAlert}
            severity="success">
            Successfully deleted task
          </Alert>
        </Snackbar>
      </React.Fragment>
    );
  }
}

export default DeleteTaskDialog;