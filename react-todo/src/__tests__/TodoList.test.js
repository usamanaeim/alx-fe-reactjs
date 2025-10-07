import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "../components/TodoList";

test("renders initial todos", () => {
  render(<TodoList />);
  expect(screen.getByText(/Learn React/i)).toBeInTheDocument();
});

test("adds a new todo", () => {
  render(<TodoList />);
  const input = screen.getByPlaceholderText(/Add new todo/i);
  const button = screen.getByText(/Add/i);

  fireEvent.change(input, { target: { value: "Test new todo" } });
  fireEvent.click(button);

  expect(screen.getByText(/Test new todo/i)).toBeInTheDocument();
});

test("toggles todo completion", () => {
  render(<TodoList />);
  const todo = screen.getByText(/Learn React/i);
  fireEvent.click(todo);
  expect(todo).toHaveClass("line-through");
});

test("deletes a todo", () => {
  render(<TodoList />);
  const deleteBtn = screen.getAllByText(/Delete/i)[0];
  fireEvent.click(deleteBtn);
  expect(screen.queryByText(/Learn React/i)).not.toBeInTheDocument();
});
