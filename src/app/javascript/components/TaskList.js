import React, { useEffect, useState } from "react";

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const requestTasks = async () => {
      const response = await fetch("/api/tasks")
      const { data } = await response.json();
      setTasks(data);
    };
    requestTasks();
  }, []);

  return tasks.map(task => <div>{task.attributes.name}</div>);
}

export default TaskList;