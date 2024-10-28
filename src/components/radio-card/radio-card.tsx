import { ChevronDown } from "lucide-react";
import { toast } from "sonner";
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
import { useState } from "react";
import { EditRadio } from "../edit-radio";

export function RadioCard(data: RadioStation) {
  const { playRadio, currentRadio, isPlaying, stopAudio, updateCurrentRadio } =
    usePlayer();
  const { addFavorite, removeFavorite, isFavorite, updateFavorite } =
    useFavorites();
  const favorite = isFavorite(data.stationuuid);
  const [editOpen, setEditOpen] = useState(false);

  const handlePlay = () => {
    if (currentRadio?.stationuuid === data.stationuuid && isPlaying) {
      stopAudio();
      return;
    }
    playRadio(data);
  };

  const toggleFavorite = () => {
    if (favorite) {
      removeFavorite(data.stationuuid);
      toast("Rádio removida", {
        description: `${data.name} foi removida dos favoritos`,
      });
    } else {
      addFavorite(data);
      toast("Rádio salva", {
        description: `${data.name} foi adicionada aos favoritos`,
      });
    }
  };

  return (
    <>
      <div className="flex items-center space-x-4 rounded-md border p-4">
        <div className="flex-1 space-y-1">
          <p className="text-sm font-medium">{data.name}</p>
        </div>
        <div className="flex gap-2 items-center justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <ChevronDown className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-5">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handlePlay}>
                {currentRadio?.stationuuid === data.stationuuid && isPlaying
                  ? "Parar"
                  : "Reproduzir"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={toggleFavorite}>
                {favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
              </DropdownMenuItem>
              {favorite && (
                <DropdownMenuItem onClick={() => setEditOpen(true)}>
                  Editar
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {favorite && (
        <EditRadio
          radio={data}
          open={editOpen}
          onOpenChange={setEditOpen}
          onSave={(updatedRadio) => {
            updateFavorite(updatedRadio);
            updateCurrentRadio(updatedRadio);
            toast("Rádio atualizada", {
              description: `${updatedRadio.name} foi atualizada com sucesso`,
            });
            setEditOpen(false);
          }}
        />
      )}
    </>
  );
}
