import React from "react";
import TaskListItem from "./TaskListItem";
import { navigate } from "@reach/router";
import { Paper } from "@material-ui/core";
import moment from "moment";

class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.removeTask = this.removeTask.bind(this);
    this.markAsDone = this.markAsDone.bind(this);
    this.state = {
      tasks: []
    };
  }

  removeTask(index) {

  }

  markAsDone(index) {

  }

  requestTasks = async () => {
    let token = localStorage.getItem("token");
    let params = "?sort=due_date";

    switch (this.props.dateRange) {
      case 0:
        params += "&filter[until_date]=" + moment(new Date()).format('YYYY-MM-DD');
        break;
      case 1:
        let date = new Date();
        date.setDate(date.getDate() + 7);
        params += "&filter[until_date]=" + moment(date).format('YYYY-MM-DD');
        break;
      case 2:
        break;
    }

    switch (this.props.showCompleted) {
      case 0:
        params += "&filter[is_completed]=f";
        break;
      case 1:
        break;
    }
    
    const response = await fetch("/api/tasks" + params, {
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
        tasks: data
      });
    }
  };

  componentDidMount() {
    this.requestTasks();
  }

  componentDidUpdate(prevProps) {
    if (this.props.dateRange != prevProps.dateRange || this.props.showCompleted != prevProps.showCompleted) {
      this.requestTasks();
    }
  }

  render() {
    return (
      <Paper className="list">
        {this.state.tasks.map((task, index) => {
          return (
            <TaskListItem
              key={index}
              task={task}
              index={index}
              removeTask={this.props.removeTask}
              markAsDone={this.props.markAsDone} />
          );
        })}
      </Paper>
    );
  }
}

export default TaskList;