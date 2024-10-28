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
  const handleInputChange = (field: keyof SearchParams, value: string) => {
    onParamChange(field, value.trim());
  };

  const handleSelectChange = (field: keyof SearchParams, value: string) => {
    onParamChange(field, value === "__CLEAR__" ? "" : value);
  };

  return (
    <div className="grid w-full items-center gap-3">
      <div className="space-y-1">
        <Input
          type="text"
          value={params.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          placeholder="Digite o nome da rádio"
        />
      </div>
      <div className="flex flex-col gap-2 items-center">
        <div className="space-y-1 w-full">
          <CountrySelect
            value={params.country}
            onChange={(value) => handleSelectChange("country", value)}
          />
        </div>
        <div className="space-y-1 w-full">
          <LanguageSelect
            value={params.language}
            onChange={(value) => handleSelectChange("language", value)}
          />
        </div>
      </div>
      <Button
        onClick={onSearch}
        className="w-full"
        disabled={
          disabled ||
          (!params.name.trim() && !params.country && !params.language)
        }
      >
        Buscar
      </Button>
    </div>
  );
}
