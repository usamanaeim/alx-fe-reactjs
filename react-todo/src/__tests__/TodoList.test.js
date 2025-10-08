// src/__tests__/TodoList.test.js
import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';

describe('TodoList component', () => {
  test('renders initial todos', () => {
    render(<TodoList />);
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Write tests')).toBeInTheDocument();
  });

  test('adds a new todo', () => {
    render(<TodoList />);
    const input = screen.getByLabelText('todo-input');
    const addBtn = screen.getByLabelText('add-button');

    fireEvent.change(input, { target: { value: 'New task' } });
    fireEvent.click(addBtn);

    expect(screen.getByText('New task')).toBeInTheDocument();
  });

  test('toggles a todo when checkbox clicked', () => {
    render(<TodoList />);
    const todoItem = screen.getByText('Learn React').closest('li');
    const checkbox = within(todoItem).getByRole('checkbox');

    // initially unchecked
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(todoItem).toHaveClass('line-through');
  });

  test('deletes a todo', () => {
    render(<TodoList />);
    const toDelete = screen.getByText('Learn React');
    const todoItem = toDelete.closest('li');
    const deleteButton = within(todoItem).getByLabelText(/^delete-/i);

    fireEvent.click(deleteButton);

    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
  });
});
