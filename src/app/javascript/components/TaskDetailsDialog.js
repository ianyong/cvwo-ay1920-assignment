import React from "react";
import { Dialog, DialogTitle, DialogActions, Button, DialogContent, Chip, Snackbar } from "@material-ui/core";
import AddUpdateTaskDialog from "./AddUpdateTaskDialog";
import DeleteTaskDialog from "./DeleteTaskDialog";
import DateRangeOutlinedIcon from "@material-ui/icons/DateRangeOutlined";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";
import moment from "moment";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class TaskDetailsDialog extends React.Component {
  constructor(props) {
    super(props);
    this.openEditDialog = this.openEditDialog.bind(this);
    this.closeEditDialog = this.closeEditDialog.bind(this);
    this.openDeleteDialog = this.openDeleteDialog.bind(this);
    this.closeDeleteDialog = this.closeDeleteDialog.bind(this);
    this.openEditAlert = this.openEditAlert.bind(this);
    this.closeEditAlert = this.closeEditAlert.bind(this);
    this.state = {
      editDialogOpen: false,
      deleteDialogOpen: false,
      editAlertOpen: false
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

  openEditAlert() {
    this.setState({
      editAlertOpen: true
    });
  }

  closeEditAlert() {
    this.setState({
      editAlertOpen: false
    });
  }
  
  render() {
    let tags;
    if (this.props.task.attributes['tag-list'] === "") {
      tags = <span className="none-tag">No tags</span>;
    } else {
      tags = this.props.task.attributes['tag-list'].split("\u0000").sort().filter(e => e !== "").map((tag, index) => {
        return(
          <Chip
            className="tag"
            key={index}
            label={tag} />
        );
      })
    }
    return (
      <React.Fragment>
        <Dialog
          open={this.props.open}
          onClose={this.props.onClose} // Responsive full-screen
          fullWidth={true}
          maxWidth="md"
          scroll="paper">
          <DialogTitle>
            {this.props.task.attributes.name}
          </DialogTitle>
          <DialogContent>
            <div className="column">
              <div className="row">
                <DateRangeOutlinedIcon
                  className="icon-right-padding"
                  color="primary" />
                {moment(this.props.task.attributes['due-date']).format('D MMMM YYYY')}
              </div>
              <div className="row details-top-padding">
                <DescriptionOutlinedIcon
                  className="icon-right-padding"
                  color="primary" />
                <div className="column">
                  {this.props.task.attributes.description.split('\n').map((line, i) => <div key={i}>{line}</div>)}
                </div>
              </div>
              <div className="row details-top-padding">
                <LabelOutlinedIcon
                  className="icon-right-padding"
                  color="primary" />
                <div className="row-wrap">
                  {tags}
                </div>
              </div>
            </div>
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
          refreshTaskList={this.props.refreshTaskList}
          openEditAlert={this.openEditAlert} />
        <DeleteTaskDialog
          task={this.props.task}
          open={this.state.deleteDialogOpen}
          onClose={this.closeDeleteDialog}
          refreshTaskList={this.props.refreshTaskList}
          openDeleteAlert={this.props.openDeleteAlert} />
        <Snackbar
          open={this.state.editAlertOpen}
          autoHideDuration={2000}
          onClose={this.closeEditAlert}>
          <Alert
            onClose={this.closeEditAlert}
            severity="success">
            Successfully edited task
          </Alert>
        </Snackbar>
      </React.Fragment>
    );
  }
}

export default TaskDetailsDialog;