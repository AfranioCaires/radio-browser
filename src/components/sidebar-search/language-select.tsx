import { useEffect, useState } from "react";
import { getLanguages } from "@/services/api/languages";
import { Language } from "@/interfaces/languages";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const CLEAR_VALUE = "__CLEAR__";

interface LanguageSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function LanguageSelect({ value, onChange }: LanguageSelectProps) {
  const [languages, setLanguages] = useState<Language[]>([]);

  useEffect(() => {
    getLanguages().then(setLanguages);
  }, []);

  return (
    <Select value={value || CLEAR_VALUE} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Idioma" />
      </SelectTrigger>
      <SelectContent className="max-w-56">
        <SelectItem value={CLEAR_VALUE}>Todos os idiomas</SelectItem>
        {languages.map((language) => (
          <SelectItem key={language.name} value={language.name}>
            {language.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
