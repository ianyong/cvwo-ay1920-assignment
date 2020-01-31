import React from "react";
import { Dialog, DialogTitle, DialogActions, Button, DialogContent, DialogContentText } from "@material-ui/core";
import AddUpdateTaskDialog from "./AddUpdateTaskDialog";

class TaskDetailsDialog extends React.Component {
  constructor(props) {
    super(props);
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.state = {
      dialogOpen: false
    };
  }

  openDialog() {
    this.setState({
      dialogOpen: true
    });
  }

  closeDialog() {
    this.setState({
      dialogOpen: false
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
              onClick={() => { this.props.onClose(); this.openDialog(); }}
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
          task={this.props.task}
          open={this.state.dialogOpen}
          onClose={this.closeDialog}
          refreshTaskList={this.props.refreshTaskList} />
      </React.Fragment>
    );
  }
}

export default TaskDetailsDialog;