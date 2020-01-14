import React from "react";
import { Dialog, DialogTitle, DialogActions, Button, DialogContent, DialogContentText } from "@material-ui/core";

class TaskDetailsDialog extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
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
            autoFocus
            onClick={this.props.onClose}
            color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default TaskDetailsDialog;