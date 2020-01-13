import React, { useEffect, useState } from "react";
import { navigate } from "@reach/router";
import TaskList from "../components/TaskList";

function TaskListPage() {
  return (
    <React.Fragment>
      <TaskList />
    </React.Fragment>
  );
}

export default TaskListPage;