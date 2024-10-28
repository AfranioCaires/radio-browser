import { RadioCard } from "../radio-card/radio-card";
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
import SearchInput from "../search";
import useDebounce from "@/hooks/use-debounce";

const ITEMS_PER_PAGE = 10;

export function FavoritesList() {
  const { favorites } = useFavorites();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const filteredFavorites = favorites.filter((radio) =>
    radio.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
  );

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

  const totalPages = Math.max(
    Math.ceil(filteredFavorites.length / ITEMS_PER_PAGE),
    1
  );
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentFavorites = filteredFavorites.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col h-screen gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl space-x-4 font-medium">Rádios favoritas</h1>
        <SearchInput onSearch={setSearchQuery} />
      </div>
      {filteredFavorites.length === 0 ? (
        <div className="text-center text-muted-foreground py-8">
          <p>Nenhuma rádio encontrada com esse termo.</p>
        </div>
      ) : (
        <>
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
                    currentPage <= 1
                      ? "pointer-events-none opacity-50"
                      : undefined
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
                  tabIndex={currentPage === totalPages ? -1 : undefined}
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : undefined
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      )}
    </div>
  );
}
