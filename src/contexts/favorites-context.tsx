import { createContext, useContext, useEffect, useState } from "react";
import { RadioStation } from "@/interfaces/radio-data";

interface FavoritesContextData {
  favorites: RadioStation[];
  addFavorite: (radio: RadioStation) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  updateFavorite: (radio: RadioStation) => void;
}

const FavoritesContext = createContext<FavoritesContextData>(
  {} as FavoritesContextData
);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<RadioStation[]>(() => {
    const stored = localStorage.getItem("@radio-app:favorites");
    if (stored) {
      return JSON.parse(stored);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("@radio-app:favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (radio: RadioStation) => {
    setFavorites((prev) => [...prev, radio]);
  };

  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((radio) => radio.stationuuid !== id));
  };

  const isFavorite = (id: string) => {
    return favorites.some((radio) => radio.stationuuid === id);
  };

  const updateFavorite = (updatedRadio: RadioStation) => {
    setFavorites((prev) =>
      prev.map((radio) =>
        radio.stationuuid === updatedRadio.stationuuid ? updatedRadio : radio
      )
    );
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        updateFavorite,
      }}
    >
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
