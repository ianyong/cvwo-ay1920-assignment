import React from "react";
import { Router } from "@reach/router";
import TaskListPage from "./pages/TaskListPage";
import AuthenticationPage from "./pages/AuthenticationPage";

function App() {
  return (
    <Router>
      <TaskListPage path="/" />
      <AuthenticationPage path="/login" />
    </Router>
  );
}

export default App;