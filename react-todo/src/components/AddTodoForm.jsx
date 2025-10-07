// src/components/AddTodoForm.jsx
import React, { useState } from 'react';

export default function AddTodoForm({ onAdd }) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit} aria-label="add-todo-form" className="mb-4">
      <input
        aria-label="todo-input"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Add a new todo"
        className="border p-2 rounded mr-2"
      />
      <button type="submit" aria-label="add-button" className="px-3 py-2 bg-blue-600 text-white rounded">
        Add
      </button>
    </form>
  );
}
