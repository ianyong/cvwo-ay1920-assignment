import React from "react";
import { Router } from "@reach/router";
import TaskList from "./TaskList";
import AddTask from "./AddTask";

function App() {
  return (
    <Router>
      <TaskList path="/" />
      <AddTask path="/add" />
    </Router>
  );
}

export default App;