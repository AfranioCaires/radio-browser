import { createContext, useContext, useEffect, useState } from "react";
import { RadioStation } from "@/interfaces/radio-data";

type FavoritesContextType = {
  favorites: RadioStation[];
  addFavorite: (radio: RadioStation) => void;
  removeFavorite: (stationuuid: string) => void;
  isFavorite: (stationuuid: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | null>(null);

const STORAGE_KEY = "radio-browser:favorites";

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<RadioStation[]>(() => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (radio: RadioStation) => {
    setFavorites((prev) => {
      if (prev.some((fav) => fav.stationuuid === radio.stationuuid)) {
        return prev;
      }
      return [...prev, radio];
    });
  };

  const removeFavorite = (stationuuid: string) => {
    setFavorites((prev) =>
      prev.filter((radio) => radio.stationuuid !== stationuuid)
    );
  };

  const isFavorite = (stationuuid: string) => {
    return favorites.some((radio) => radio.stationuuid === stationuuid);
  };

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
