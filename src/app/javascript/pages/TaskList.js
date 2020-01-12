import React, { useEffect, useState } from "react";
import { navigate } from "@reach/router";

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
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
        setTasks(data);
      }
    };
    requestTasks();
  }, []);

  return tasks.map(task => <div>{task.attributes.name}</div>);
}

export default TaskList;