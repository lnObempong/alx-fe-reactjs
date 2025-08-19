import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the main TodoList component in App", () => {
  render(<App />);
  expect(screen.getByText("Todo List")).toBeInTheDocument();
});
