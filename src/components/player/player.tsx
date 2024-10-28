import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { usePlayer } from "@/contexts/player-context";
import { Volume2, Play, Pause, Square } from "lucide-react";

export default function Player() {
  const {
    isPlaying,
    volume,
    currentRadio,
    togglePlayPause,
    stopAudio,
    handleVolumeChange,
  } = usePlayer();

  return (
    <div className="w-full border rounded-md px-6 py-2">
      <div className="flex items-center">
        <p className="text-sm truncate font-medium flex-1">
          {currentRadio?.name || "Selecione uma rádio"}
        </p>
        <div className="flex gap-2 items-center">
          <Button
            onClick={togglePlayPause}
            variant="outline"
            size="icon"
            disabled={!currentRadio}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>
          <Button
            onClick={stopAudio}
            variant="outline"
            size="icon"
            disabled={!currentRadio}
            aria-label="Stop"
          >
            <Square className="h-4 w-4" />
          </Button>
          <div className="flex gap-1 items-center ml-2">
            <Volume2 className="h-4 w-4" />
            <Slider
              className="w-20"
              value={[volume]}
              max={1}
              step={0.01}
              onValueChange={(value) => handleVolumeChange(value[0])}
              aria-label="Adjust volume"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
