import { RadioCard } from "../sidebar-search/radio-card";
import { useFavorites } from "@/contexts/favorites-context";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

const ITEMS_PER_PAGE = 10;

export function FavoritesList() {
  const { favorites } = useFavorites();
  const [currentPage, setCurrentPage] = useState(1);

  if (favorites.length === 0) {
    return (
      <div className="text-center flex h-screen flex-col items-center justify-center text-muted-foreground py-8">
        <p>Você ainda não tem rádios favoritas.</p>
        <p className="text-sm">
          Use a busca para encontrar e adicionar suas rádios favoritas.
        </p>
      </div>
    );
  }

  const totalPages = Math.max(Math.ceil(favorites.length / ITEMS_PER_PAGE), 1);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentFavorites = favorites.slice(startIndex, endIndex);

  return (
    <div className="grid gap-4">
      <h1 className="text-2xl space-x-4 font-medium">Rádios favoritas</h1>
      <div className="space-y-4">
        {currentFavorites.map((radio) => (
          <RadioCard key={radio.stationuuid} {...radio} />
        ))}
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              aria-disabled={currentPage <= 1}
              tabIndex={currentPage <= 1 ? -1 : undefined}
              className={
                currentPage <= 1 ? "pointer-events-none opacity-50" : undefined
              }
              onClick={() => setCurrentPage(currentPage - 1)}
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, i) => {
            const page = i + 1;
            return (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => setCurrentPage(page)}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          <PaginationItem>
            <PaginationNext
              onClick={() => setCurrentPage(currentPage + 1)}
              aria-disabled={currentPage === totalPages}
              tabIndex={currentPage <= 1 ? -1 : undefined}
              className={
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : undefined
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
