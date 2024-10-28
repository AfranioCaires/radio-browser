import { test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SearchRadios } from "../src/components/sidebar-search";
import "@testing-library/jest-dom/vitest";
import "./setup/match-media.mock";

vi.mock("@/hooks/use-radio-search", () => ({
  useRadioSearch: () => ({
    simpleSearch: "",
    advancedParams: { name: "", country: "", language: "" },
    loading: false,
    radios: [],
    hasMore: false,
    handleSimpleSearchChange: vi.fn(),
    handleAdvancedParamChange: vi.fn(),
    handleAdvancedSearch: vi.fn(),
    loadMore: vi.fn(),
  }),
}));

test("should render search tabs correctly", () => {
  render(<SearchRadios />);
  expect(screen.getByText("Busca simples")).toBeInTheDocument();
  expect(screen.getByText("Busca avançada")).toBeInTheDocument();
});

test("should show empty state initially", () => {
render(<SearchRadios />);
expect(screen.getByText("Digite o nome da rádio para começar.")).toBeInTheDocument();
});