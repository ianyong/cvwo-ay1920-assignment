import React from "react";
import { Router } from "@reach/router";
import TaskList from "./pages/TaskList";
import AddTask from "./pages/AddTask";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Router>
      <TaskList path="/" />
      <AddTask path="/add" />
      <LoginPage path="/login" />
    </Router>
  );
}

export default App;