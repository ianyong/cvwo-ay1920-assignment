import React from "react";
import { Router } from "@reach/router";
import TaskListPage from "./pages/TaskListPage";
import AddTask from "./pages/AddTask";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Router>
      <TaskListPage path="/" />
      <AddTask path="/add" />
      <LoginPage path="/login" />
    </Router>
  );
}

export default App;