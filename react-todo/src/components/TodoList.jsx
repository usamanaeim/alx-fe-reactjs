// src/components/TodoList.jsx
import React, { useState } from 'react';
import AddTodoForm from './AddTodoForm';

export default function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Write tests', completed: false }
  ]);

  const addTodo = (text) => {
    const newTodo = { id: Date.now(), text, completed: false };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const toggleTodo = (id) => {
    setTodos((prev) => prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter(t => t.id !== id));
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>

      <AddTodoForm onAdd={addTodo} />

      <ul aria-label="todos-list" className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            data-testid={`todo-${todo.id}`}
            className={`flex items-center justify-between p-2 border rounded ${todo.completed ? 'line-through opacity-60' : ''}`}
          >
            <div className="flex items-center gap-3">
              <input
                aria-label={`toggle-${todo.id}`}
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <span onClick={() => toggleTodo(todo.id)} style={{ cursor: 'pointer' }}>{todo.text}</span>
            </div>

            <div>
              <button
                aria-label={`delete-${todo.id}`}
                onClick={() => deleteTodo(todo.id)}
                className="text-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
