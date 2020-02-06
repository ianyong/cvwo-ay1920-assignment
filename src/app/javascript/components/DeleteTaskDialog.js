import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@material-ui/core";
import { navigate } from "@reach/router";

class DeleteTaskDialog extends React.Component {
  constructor(props) {
    super(props);
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
      } else {
        // Failed to delete task
        navigate("/");
      }
    };
    deleteTask();
  };

  render() {
    return (
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
    );
  }
}

export default DeleteTaskDialog;