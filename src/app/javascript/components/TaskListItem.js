import React from "react";
import clsx from "clsx";
import { ListItem, Chip, Checkbox } from "@material-ui/core";
import TaskDetailsDialog from "./TaskDetailsDialog";
import DateRangeIcon from '@material-ui/icons/DateRange';
import moment from "moment";

class TaskListItem extends React.Component {
  constructor(props) {
    super(props);
    this.onClickClose = this.onClickClose.bind(this);
    this.onClickDone = this.onClickDone.bind(this);
    this.viewDetails = this.viewDetails.bind(this);
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
          is_completed: this.props.task.attributes['is-completed']
        })
      })
      const { data } = await response.json();
      if (response.status === 500) {
        // Not logged in
        navigate("/login")
      } else if (response.status === 200) {
        // Successfully updated task
      } else {
        // Failed to update task
        console.log(response);
      }
    };
    this.props.task.attributes['is-completed'] = !this.props.task.attributes['is-completed'];
    updateTask();
  };

  render() {
    return (
      <React.Fragment>
        <ListItem
          className={this.props.task.attributes['is-completed'] ? "done" : ""}
          button
          onClick={this.viewDetails}>
          <Checkbox
            checked={this.props.task.attributes['is-completed']}
            onChange={this.handleUpdate} />
          <div className="column list-item-left-padding list-item-side-padding">
            <span
              className={clsx("list-item-text", {
                "list-item-text-done": this.props.task.attributes['is-completed']
              })}>
              {this.props.task.attributes.name}
            </span>
            <div className="row list-item-middle-padding">
              <Chip
                icon={<DateRangeIcon />}
                label={moment(this.props.task.attributes['due-date']).format('D MMMM YYYY')}
                variant="outlined" />
              {this.props.task.attributes['tag-list'].split("; ").filter(e => e !== "").map((tag, index) => {
                return(
                  <Chip
                    className="tag"
                    key={index}
                    label={tag} />
                );
              })}
            </div>
          </div>
        </ListItem>
        <TaskDetailsDialog
          task={this.props.task}
          open={this.state.dialogOpen}
          onClose={this.closeDialog}
          refreshTaskList={this.props.refreshTaskList} />
      </React.Fragment>
    );
  }
}

export default TaskListItem;