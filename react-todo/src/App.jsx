// src/App.jsx
import React from "react";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">React Todo App</h1>
        <TodoList />
      </div>
    </div>
  );
}

export default App;
