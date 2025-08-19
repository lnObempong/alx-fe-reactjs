import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "../components/TodoList";

// Initial render
test("renders initial todos", () => {
  render(<TodoList />);
  expect(screen.getByText("Learn React")).toBeInTheDocument();
  expect(screen.getByText("Build a Todo App")).toBeInTheDocument();
  expect(screen.getByText("Write tests")).toBeInTheDocument();
});

// Adding todos
test("can add a new todo", () => {
  render(<TodoList />);
  const input = screen.getByPlaceholderText("Add a new todo");
  const button = screen.getByText("Add");

  fireEvent.change(input, { target: { value: "New Task" } });
  fireEvent.click(button);

  expect(screen.getByText("New Task")).toBeInTheDocument();
});

// Toggling todos
test("can toggle a todo", () => {
  render(<TodoList />);
  const todo = screen.getByText("Learn React");
  fireEvent.click(todo);
  expect(todo).toHaveStyle("text-decoration: line-through");
});

// Deleting todos
test("can delete a todo", () => {
  render(<TodoList />);
  const todo = screen.getByText("Build a Todo App");
  const deleteButton = todo.querySelector("button");
  fireEvent.click(deleteButton);
  expect(todo).not.toBeInTheDocument();
});
