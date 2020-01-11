import React from "react";
import { Router } from "@reach/router";
import TaskList from "./TaskList";
import AddTask from "./AddTask";
import Login from "./Login";

function App() {
  return (
    <Router>
      <TaskList path="/" />
      <AddTask path="/add" />
      <Login path="/login" />
    </Router>
  );
}

export default App;