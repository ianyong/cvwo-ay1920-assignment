import React from "react";
import { ListItem } from "@material-ui/core";

class TaskListItem extends React.Component {
  constructor(props) {
    super(props);
    this.onClickClose = this.onClickClose.bind(this);
    this.onClickDone = this.onClickDone.bind(this);
  }

  onClickClose() {
    this.props.removeTask(parseInt(this.props.index));
  }

  onClickDone() {
    this.props.markAsDone(parseInt(this.props.index));
  }

  render() {
    var taskClass = this.props.task.done ? "done" : "not-done";
    return (
      <ListItem>
        <div className="taskClass">
          <h2>{this.props.task.attributes.name}</h2>
        </div>
      </ListItem>
    );
  }
}

export default TaskListItem;