import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { getCountries } from "@/services/api/countries";
import { Country } from "@/interfaces/countries-data";

interface CountrySelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function CountrySelect({ value, onChange }: CountrySelectProps) {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    getCountries().then(setCountries);
  }, []);

  return (
    <Select value={value || "__CLEAR__"} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="País" />
      </SelectTrigger>
      <SelectContent className="max-w-56">
        <SelectItem value="__CLEAR__">Todos os países</SelectItem>
        {countries.map((country) => (
          <SelectItem key={country.iso_3166_1} value={country.name}>
            {country.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
