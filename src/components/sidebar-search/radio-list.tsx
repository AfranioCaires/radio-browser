import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { RadioCard } from "./radio-card";
import { RadioStation } from "@/interfaces/radio-data";

interface RadioListProps {
  radios: RadioStation[];
  loading: boolean;
  hasMore: boolean;
  tab: "simple" | "advanced";
  onLoadMore: () => void;
  hasSearched?: boolean;
}

export function RadioList({
  radios,
  loading,
  hasMore,
  tab,
  onLoadMore,
  hasSearched = false,
}: RadioListProps) {
  const size = tab == "simple" ? "h-[70vh]" : "h-[60vh]";

  if (loading && !radios.length) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] text-center p-4">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  if (!hasSearched) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] text-center p-4">
        <p className="text-muted-foreground mb-2">
          Digite o nome da rádio para começar.
        </p>
      </div>
    );
  }

  if (hasSearched && !loading && radios.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] text-center p-4">
        <p className="text-muted-foreground mb-2">Nenhuma rádio encontrada</p>
        <p className="text-sm text-muted-foreground">
          Tente ajustar seus critérios de busca.
        </p>
      </div>
    );
  }

  return (
    <ScrollArea className={`${size} w-full rounded-md`}>
      <div className="space-y-1 p-1">
        {radios.map((radio) => (
          <RadioCard key={radio.stationuuid} {...radio} />
        ))}
        {hasMore && (
          <Button
            onClick={onLoadMore}
            variant="outline"
            className="w-full mt-4"
            disabled={loading}
          >
            {loading ? "Carregando..." : "Carregar mais"}
          </Button>
        )}
      </div>
    </ScrollArea>
  );
}
