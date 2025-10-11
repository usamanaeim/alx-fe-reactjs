// src/components/AddTodoForm.jsx
import React, { useState } from 'react';

export default function AddTodoForm({ onAdd }) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = value.trim();
    if (!text) return;
    onAdd(text);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit} aria-label="add-todo-form" className="mb-4">
      <input
        aria-label="todo-input"
        placeholder="Add new todo"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border p-2 rounded mr-2"
      />
      <button aria-label="add-button" type="submit" className="px-3 py-2 bg-blue-600 text-white rounded">
        Add
      </button>
    </form>
  );
}
