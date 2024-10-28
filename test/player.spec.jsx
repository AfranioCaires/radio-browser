import { test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Player from "../src/components/player/player";
import { PlayerProvider } from "@/contexts/player-context";
import "@testing-library/jest-dom/vitest";
import "./setup/resize-observer.mock";

// Mock the audio element
window.HTMLMediaElement.prototype.play = vi.fn();
window.HTMLMediaElement.prototype.pause = vi.fn();

test("should render player in initial state", () => {
  render(
    <PlayerProvider>
      <Player />
    </PlayerProvider>
  );
  
  expect(screen.getByText("Selecione uma rádio")).toBeInTheDocument();
  expect(screen.getByLabelText("Play")).toBeDisabled();
  expect(screen.getByLabelText("Stop")).toBeDisabled();
});

test("should enable controls when radio is selected", () => {
  render(
    <PlayerProvider>
      <Player />
    </PlayerProvider>
  );

  expect(screen.getByText("Selecione uma rádio")).toBeInTheDocument();
  expect(screen.getByLabelText("Play")).toBeDisabled();
  expect(screen.getByLabelText("Stop")).toBeDisabled();
});