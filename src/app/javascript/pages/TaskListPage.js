import React from "react";
import TaskList from "../components/TaskList";
import PersistentDrawer from "../components/PersistentDrawer";

function TaskListPage() {
  return (
    <React.Fragment>
      <PersistentDrawer />
      <TaskList className="list" />
    </React.Fragment>
  );
}

export default TaskListPage;