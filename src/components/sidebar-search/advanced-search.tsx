import { SearchParams } from "@/interfaces/search-params";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { CountrySelect } from "./country-select";
import { LanguageSelect } from "./language-select";

interface AdvancedSearchProps {
  params: SearchParams;
  onParamChange: (field: keyof SearchParams, value: string) => void;
  onSearch: () => void;
  disabled: boolean;
}

export function AdvancedSearch({
  params,
  onParamChange,
  onSearch,
  disabled,
}: AdvancedSearchProps) {
  return (
    <div className="grid w-full items-center gap-3">
      <div className="space-y-1">
        <Input
          type="text"
          value={params.name}
          onChange={(e) => onParamChange("name", e.target.value)}
          placeholder="Digite o nome da rádio"
        />
      </div>
      <div className="flex gap-2 items-center">
        <div className="space-y-1">
          <CountrySelect
            value={params.country}
            onChange={(value) => onParamChange("country", value)}
          />
        </div>
        <div className="space-y-1">
          <LanguageSelect
            value={params.language}
            onChange={(value) => onParamChange("language", value)}
          />
        </div>
      </div>
      <Button onClick={onSearch} className="w-full" disabled={disabled}>
        Buscar
      </Button>
    </div>
  );
}
