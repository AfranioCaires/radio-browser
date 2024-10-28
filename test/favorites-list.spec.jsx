import { test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { FavoritesList } from "../src/components/favorites/favorites-list";
import { FavoritesProvider } from "../src/contexts/favorites-context";
import { PlayerProvider } from "@/contexts/player-context";
import "@testing-library/jest-dom/vitest";
import "./setup/match-media.mock";

const mockFavorites = [
  { name: "Radio 1", stationuuid: "1" },
  { name: "Radio 2", stationuuid: "2" },
];

beforeEach(() => {
  Storage.prototype.getItem = vi.fn(() => JSON.stringify(mockFavorites));
});

const renderWithProviders = () => {
  return render(
    <PlayerProvider>
      <FavoritesProvider>
        <FavoritesList />
      </FavoritesProvider>
    </PlayerProvider>
  );
};

test("should render empty state when no favorites", () => {
  Storage.prototype.getItem = vi.fn(() => null);
  renderWithProviders();
  expect(screen.getByText("Você ainda não tem rádios favoritas.")).toBeInTheDocument();
});

test("should render favorites list", () => {
  renderWithProviders();
  expect(screen.getByText("Radio 1")).toBeInTheDocument();
  expect(screen.getByText("Radio 2")).toBeInTheDocument();
});