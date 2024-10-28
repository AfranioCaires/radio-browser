import { createContext, useContext, useRef, useState } from "react";
import { RadioStation } from "@/interfaces/radio-data";

interface PlayerContextType {
  isPlaying: boolean;
  volume: number;
  currentRadio: RadioStation | null;
  playRadio: (radio: RadioStation) => void;
  togglePlayPause: () => void;
  stopAudio: () => void;
  handleVolumeChange: (volume: number) => void;
}

const PlayerContext = createContext<PlayerContextType | null>(null);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentRadio, setCurrentRadio] = useState<RadioStation | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const playRadio = (radio: RadioStation) => {
    if (!audioRef.current) return;

    audioRef.current.src = radio.url_resolved;
    audioRef.current.play();
    setIsPlaying(true);
    setCurrentRadio(radio);
  };

  const togglePlayPause = () => {
    if (!audioRef.current || !currentRadio) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    audioRef.current.play();
    setIsPlaying(true);
  };

  const stopAudio = () => {
    if (!audioRef.current) return;

    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    audioRef.current.src = "";
    setIsPlaying(false);
    setCurrentRadio(null);
  };

  const handleVolumeChange = (newVolume: number) => {
    if (!audioRef.current) return;

    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  return (
    <PlayerContext.Provider
      value={{
        isPlaying,
        volume,
        currentRadio,
        playRadio,
        togglePlayPause,
        stopAudio,
        handleVolumeChange,
      }}
    >
      {children}
      <audio ref={audioRef} />
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
}
