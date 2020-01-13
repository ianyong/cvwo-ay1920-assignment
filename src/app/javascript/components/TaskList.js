import React from "react";
import TaskListItem from "./TaskListItem";

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
      if(response.status === 500) {
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
      <React.Fragment>
        {this.state.tasks.map((task, index) => {
          return (
            <TaskListItem
              task={task}
              index={index}
              removeTask={this.props.removeTask}
              markAsDone={this.props.markAsDone} />
          );
        })}
      </React.Fragment>
    );
  }
}

export default TaskList;