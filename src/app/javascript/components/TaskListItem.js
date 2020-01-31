import React from "react";
import { ListItem, Chip } from "@material-ui/core";
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
      dialogOpen: false,
      tags: []
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

  requestTags = async () => {
    let token = localStorage.getItem("token");
    const response = await fetch(this.props.task.relationships.tags.links.related, {
      method: "GET",
      headers: {
        "Content-Type": "application/vnd.api+json",
        "Authorization": token
      }
    })
    const { data } = await response.json();
    if (response.status === 500) {
      // Not logged in
      navigate("/login")
    } else {
      this.setState({
        tags: data
      });
    }
  };

  componentDidMount() {
    this.requestTags();
  }

  render() {
    var taskClass = this.props.task.attributes['is_completed'] ? "done" : "not-done";
    return (
      <React.Fragment>
        <ListItem
          button
          onClick={this.viewDetails}>
          <div>
            <h2>{this.props.task.attributes.name}</h2>
            <Chip
              icon={<DateRangeIcon />}
              label={moment(this.props.task.attributes['due-date']).format('D MMMM YYYY')}
              variant="outlined" />
            {this.state.tags.map((tag, index) => {
              return(
                <Chip
                  className="tag"
                  key={index}
                  label={tag.attributes.name} />
              );
            })}
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