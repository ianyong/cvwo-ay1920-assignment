import React from "react";
import { Dialog, DialogTitle, DialogActions, Button, DialogContent, DialogContentText } from "@material-ui/core";
import AddUpdateTaskDialog from "./AddUpdateTaskDialog";
import DeleteTaskDialog from "./DeleteTaskDialog";

class TaskDetailsDialog extends React.Component {
  constructor(props) {
    super(props);
    this.openEditDialog = this.openEditDialog.bind(this);
    this.closeEditDialog = this.closeEditDialog.bind(this);
    this.openDeleteDialog = this.openDeleteDialog.bind(this);
    this.closeDeleteDialog = this.closeDeleteDialog.bind(this);
    this.state = {
      editDialogOpen: false,
      deleteDialogOpen: false
    };
  }

  openEditDialog() {
    this.setState({
      editDialogOpen: true
    });
  }

  closeEditDialog() {
    this.setState({
      editDialogOpen: false
    });
  }

  openDeleteDialog() {
    this.setState({
      deleteDialogOpen: true
    });
  }

  closeDeleteDialog() {
    this.setState({
      deleteDialogOpen: false
    });
  }
  
  render() {
    return (
      <React.Fragment>
        <Dialog
          open={this.props.open}
          fullWidth={true}
          maxWidth="md"
          scroll="paper">
          <DialogTitle>
            {this.props.task.attributes.name}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {this.props.task.attributes.description}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => { this.props.onClose(); this.openDeleteDialog(); }}
              color="secondary">
              Delete
            </Button>
            <Button
              onClick={() => { this.props.onClose(); this.openEditDialog(); }}
              color="secondary">
              Edit
            </Button>
            <Button
              autoFocus
              onClick={this.props.onClose}
              color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
        <AddUpdateTaskDialog
          key={this.state.editDialogOpen} // Force update child component
          task={this.props.task}
          open={this.state.editDialogOpen}
          onClose={this.closeEditDialog}
          refreshTaskList={this.props.refreshTaskList} />
        <DeleteTaskDialog
          key={this.state.deleteDialogOpen}
          task={this.props.task}
          open={this.state.deleteDialogOpen}
          onClose={this.closeDeleteDialog}
          refreshTaskList={this.props.refreshTaskList} />
      </React.Fragment>
    );
  }
}

export default TaskDetailsDialog;