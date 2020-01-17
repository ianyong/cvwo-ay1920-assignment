import React from "react";
import TaskListItem from "./TaskListItem";
import { navigate } from "@reach/router";
import { Paper } from "@material-ui/core";

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

  componentDidMount() {
    const requestTasks = async () => {
      let token = localStorage.getItem("token");
      const response = await fetch("/api/tasks", {
        method: "GET",
        headers: {
          Authorization: token
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
    requestTasks();
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