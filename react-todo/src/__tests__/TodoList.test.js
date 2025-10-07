// src/__tests__/TodoList.test.js
import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import TodoList from '../components/TodoList';
import '@testing-library/jest-dom';

describe('TodoList component', () => {
  test('renders initial todos', () => {
    render(<TodoList />);
    expect(screen.getByText('Buy milk')).toBeInTheDocument();
    expect(screen.getByText('Walk the dog')).toBeInTheDocument();
  });

  test('adds a new todo', () => {
    render(<TodoList />);
    const input = screen.getByLabelText('todo-input');
    const addButton = screen.getByLabelText('add-button');

    fireEvent.change(input, { target: { value: 'New task' }});
    fireEvent.click(addButton);

    expect(screen.getByText('New task')).toBeInTheDocument();
  });

  test('toggles a todo when checkbox clicked', () => {
    render(<TodoList />);
    const todoItem = screen.getByText('Buy milk').closest('li');
    const checkbox = within(todoItem).getByRole('checkbox');

    // Initially unchecked
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    // The LI should now have line-through (we check by class or style)
    expect(todoItem).toHaveClass('line-through');
  });

  test('deletes a todo', () => {
    render(<TodoList />);

    // find the first todo "Buy milk"
    const toDelete = screen.getByText('Buy milk');
    const todoItem = toDelete.closest('li');
    const deleteButton = within(todoItem).getByLabelText(/^delete-/i);

    fireEvent.click(deleteButton);

    expect(screen.queryByText('Buy milk')).not.toBeInTheDocument();
  });
});
