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

export function RadioCard(data: RadioStation) {
  return (
    <div className=" flex items-center space-x-4 rounded-md border p-4">
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
            <DropdownMenuItem>Reproduzir</DropdownMenuItem>
            <DropdownMenuItem>Salvar favorito</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
