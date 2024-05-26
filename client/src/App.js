import React from "react";
import { Routes, Route } from "react-router";
import Landing from "./pages/landing/Landing";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import TodoList from "./pages/todoList/ToDoList";
import "./App.css";
import "antd/dist/reset.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/todolist" element={<TodoList />} />
    </Routes>
  );
}

export default App;
