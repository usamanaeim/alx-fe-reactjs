import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "../components/TodoList.jsx";
import "@testing-library/jest-dom";

describe("TodoList Component", () => {
  test("renders initial todos", () => {
    render(<TodoList />);
    expect(screen.getByText("Buy milk")).toBeInTheDocument();
    expect(screen.getByText("Read a chapter")).toBeInTheDocument();
  });

  test("adds a new todo", () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText("Add new todo");
    fireEvent.change(input, { target: { value: "Walk dog" } });
    fireEvent.click(screen.getByText("Add"));
    expect(screen.getByText("Walk dog")).toBeInTheDocument();
  });

  test("toggles a todo", () => {
    render(<TodoList />);
    const todoText = screen.getByTestId("todo-text-1");
    expect(todoText).toHaveStyle("text-decoration: none");

    fireEvent.click(todoText);
    expect(todoText).toHaveStyle("text-decoration: line-through");

    fireEvent.click(todoText);
    expect(todoText).toHaveStyle("text-decoration: none");
  });

  test("deletes a todo", () => {
    render(<TodoList />);
    expect(screen.getByText("Buy milk")).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("delete-1"));
    expect(screen.queryByText("Buy milk")).not.toBeInTheDocument();
  });
});