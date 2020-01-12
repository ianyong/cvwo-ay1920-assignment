import React from "react";
import { Router } from "@reach/router";
import TaskList from "./pages/TaskList";
import AddTask from "./pages/AddTask";
import Login from "./pages/Login";

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