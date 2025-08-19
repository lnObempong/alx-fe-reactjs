import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TestingComponent from "../components/TestingComponent";

describe("TestingComponent", () => {
  test("renders TodoList inside TestingComponent", () => {
    render(<TestingComponent />);
    expect(screen.getByText("Todo List")).toBeInTheDocument();
    expect(screen.getByText("Learn React")).toBeInTheDocument();
  });

  test("can add a new todo", () => {
    render(<TestingComponent />);
    const input = screen.getByPlaceholderText("Add new todo");
    fireEvent.change(input, { target: { value: "Extra Task" } });
    fireEvent.click(screen.getByText("Add"));
    expect(screen.getByText("Extra Task")).toBeInTheDocument();
  });

  test("can toggle a todo", () => {
    render(<TestingComponent />);
    const todo = screen.getByText("Learn React");
    fireEvent.click(todo);
    expect(todo).toHaveStyle("text-decoration: line-through");
  });

  test("can delete a todo", () => {
    render(<TestingComponent />);
    const deleteButton = screen.getAllByText("Delete")[0];
    fireEvent.click(deleteButton);
    expect(screen.queryByText("Learn React")).not.toBeInTheDocument();
  });
});
