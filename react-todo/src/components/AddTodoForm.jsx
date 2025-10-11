import React, { useState } from "react";

export default function AddTodoForm({ onAdd }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = value.trim();
    if (!text) return;
    onAdd(text);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Add new todo"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-label="add-todo-input"
      />
      <button type="submit">Add</button>
    </form>
  );
}