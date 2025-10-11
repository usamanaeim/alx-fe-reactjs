import React, { useState } from "react";
import AddTodoForm from "./AddTodoForm.jsx";

const initialTodos = [
  { id: 1, text: "Buy milk", completed: false },
  { id: 2, text: "Read a chapter", completed: false },
];

export default function TodoList() {
  const [todos, setTodos] = useState(initialTodos);

  const addTodo = (text) => {
    const id = Math.max(0, ...todos.map(t => t.id)) + 1;
    setTodos([...todos, { id, text, completed: false }]);
  };

  const toggleTodo = (id) => {
    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <AddTodoForm onAdd={addTodo} />
      <ul>
        {todos.map(todo => (
          <li key={todo.id} style={{ display: "flex", gap: 8 }}>
            <span
              role="button"
              data-testid={`todo-text-${todo.id}`}
              onClick={() => toggleTodo(todo.id)}
              style={{
                cursor: "pointer",
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.text}
            </span>
            <button
              aria-label={`delete-${todo.id}`}
              onClick={() => deleteTodo(todo.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}