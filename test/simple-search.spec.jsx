import { test, expect, vi } from "vitest";
import { screen, render, fireEvent } from "@testing-library/react";
import { SimpleSearch } from "../src/components/sidebar-search/simple-search";
import "@testing-library/jest-dom/vitest";

test("should render SimpleSearch with placeholder text", () => {
  render(<SimpleSearch value="" onChange={() => {}} />);
  const input = screen.getByPlaceholderText("Digite o nome da rádio");
  expect(input).toBeInTheDocument();
});

test("should call onChange when input value changes", () => {
  const handleChange = vi.fn();
  render(<SimpleSearch value="" onChange={handleChange} />);
  
  const input = screen.getByPlaceholderText("Digite o nome da rádio");
  fireEvent.change(input, { target: { value: "New Radio" } });
  
  expect(handleChange).toHaveBeenCalledWith("New Radio");
});