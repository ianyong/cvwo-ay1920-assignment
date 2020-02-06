import React from "react";
import TaskListItem from "./TaskListItem";
import { navigate } from "@reach/router";
import { Paper, Divider } from "@material-ui/core";
import moment from "moment";

class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      setUp: false // prevent flashing of "No tasks" before getting response from server
    };
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
        params += "&filter[remove_old]";
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
    if (response.status === 200) {
      this.setState({
        tasks: data,
        setUp: true
      });
    } else {
      navigate("/login");
    }
  };

  componentDidMount() {
    this.requestTasks();
  }

  componentDidUpdate(prevProps) {
    if (this.props.dateRange != prevProps.dateRange
        || this.props.showCompleted != prevProps.showCompleted
        || this.props.update != prevProps.update) {
      this.requestTasks();
    }
  }

  render() {
    if (this.state.tasks.length === 0 && this.state.setUp) {
      this.props.setEmptyDisplay(true);
      return (
        <div className="no-tasks-container">
          <span className="no-tasks">
            No tasks to be displayed
          </span>
        </div>
      );
    } else {
      this.props.setEmptyDisplay(false);
      return (
        <Paper className="list">
          {this.state.tasks.map((task, index) => {
            return (
              <React.Fragment key={index}>
                {index === 0 ? "" : <Divider />}
                <TaskListItem
                  key={index}
                  task={task}
                  index={index}
                  refreshTaskList={this.props.refreshTaskList} />
              </React.Fragment>
            );
          })}
        </Paper>
      );
    }
  }
}

export default TaskList;