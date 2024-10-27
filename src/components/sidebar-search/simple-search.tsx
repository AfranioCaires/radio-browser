import { Input } from "../ui/input";

interface SimpleSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function SimpleSearch({ value, onChange }: SimpleSearchProps) {
  return (
    <div className="grid w-full items-center gap-1.5">
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Digite o nome da rádio"
      />
    </div>
  );
}
