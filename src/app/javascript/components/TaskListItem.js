import React from "react";
import { ListItem } from "@material-ui/core";
import TaskDetailsDialog from "./TaskDetailsDialog";

class TaskListItem extends React.Component {
  constructor(props) {
    super(props);
    this.onClickClose = this.onClickClose.bind(this);
    this.onClickDone = this.onClickDone.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.state = {
      dialogOpen: false
    };
  }

  onClickClose() {
    this.props.removeTask(parseInt(this.props.index));
  }

  onClickDone() {
    this.props.markAsDone(parseInt(this.props.index));
  }

  viewDetails() {
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
    var taskClass = this.props.task.done ? "done" : "not-done";
    return (
      <React.Fragment>
        <ListItem
          button
          onClick={this.viewDetails.bind(this)}>
          <div className="taskClass">
            <h2>{this.props.task.attributes.name}</h2>
          </div>
        </ListItem>
        <TaskDetailsDialog
          task={this.props.task}
          open={this.state.dialogOpen}
          onClose={this.closeDialog} />
      </React.Fragment>
    );
  }
}

export default TaskListItem;