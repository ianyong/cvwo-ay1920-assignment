import React from "react";
import { navigate } from "@reach/router";
import clsx from "clsx";
import { ListItem, Chip, Checkbox } from "@material-ui/core";
import TaskDetailsDialog from "./TaskDetailsDialog";
import DateRangeIcon from "@material-ui/icons/DateRange";
import moment from "moment";

class TaskListItem extends React.Component {
  constructor(props) {
    super(props);
    this.viewDetails = this.viewDetails.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.state = {
      dialogOpen: false,
      isCompleted: this.props.task.attributes['is-completed']
    };
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

  componentDidUpdate(nextProps) {
    if (this.props.task.attributes['is-completed'] !== nextProps.task.attributes['is-completed']) {
      this.setState({
        isCompleted: !nextProps.task.attributes['is-completed']
      });
    }
  }

  handleUpdate(e) {
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
      if (response.status === 200) {
        // Successfully updated task
      } else {
        // Failed to update task
        navigate("/login");
      }
    };
    this.props.task.attributes['is-completed'] = !this.props.task.attributes['is-completed'];
    updateTask();
    this.setState({
      isCompleted: this.props.task.attributes['is-completed']
    });

    // Prevent touch event from being propagated to ListItem
    e.stopPropagation();
  };

  render() {
    return (
      <React.Fragment>
        <ListItem
          className={this.props.task.attributes['is-completed'] ? "done"
                    : this.props.task.attributes['due-date'] < moment(new Date()).format("YYYY-MM-DD")
                    ? "overdue" : ""}
          button
          onClick={this.viewDetails}>
          <Checkbox
            checked={this.state.isCompleted}
            onClick={this.handleUpdate} />
          <div className="column list-item-left-padding list-item-side-padding">
            <span
              className={clsx("list-item-text", {
                "list-item-text-done": this.props.task.attributes['is-completed']
              })}>
              {this.props.task.attributes.name}
            </span>
            <div className="row list-item-middle-padding">
              <Chip
                className="tag cursor-pointer"
                icon={<DateRangeIcon />}
                label={moment(this.props.task.attributes['due-date']).format('D MMMM YYYY')}
                variant="outlined" />
              <div>
                {this.props.task.attributes['tag-list'].split("\u0000").sort().filter(e => e !== "").map((tag, index) => {
                  return(
                    <Chip
                      className="tag cursor-pointer"
                      key={index}
                      label={tag}
                      color="primary" />
                  );
                })}
              </div>
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