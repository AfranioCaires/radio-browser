import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { RadioStation } from "@/interfaces/radio-data";
import { usePlayer } from "@/contexts/player-context";
import { useFavorites } from "@/contexts/favorites-context";

export function RadioCard(data: RadioStation) {
  const { playRadio, currentRadio, isPlaying } = usePlayer();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(data.stationuuid);

  const handlePlay = () => {
    if (currentRadio?.stationuuid === data.stationuuid && isPlaying) return;
    playRadio(data);
  };

  const toggleFavorite = () => {
    if (favorite) {
      removeFavorite(data.stationuuid);
    } else {
      addFavorite(data);
    }
  };

  return (
    <div className="flex items-center space-x-4 rounded-md border p-4">
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium">{data.name}</p>
      </div>
      <div className="flex gap-2 items-center justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <ChevronDown className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handlePlay}>
              {currentRadio?.stationuuid === data.stationuuid && isPlaying
                ? "Reproduzindo"
                : "Reproduzir"}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={toggleFavorite}>
              {favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
