import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchInputProps {
  onSearch: (query: string) => void;
}

export default function SearchInput({ onSearch }: SearchInputProps) {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
    if (!isSearchVisible && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  useEffect(() => {
    if (isSearchVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchVisible]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <div className="flex items-center justify-end p-4 bg-background">
      <div className="flex items-center">
        <div className="relative flex items-center">
          <Input
            ref={inputRef}
            type="text"
            placeholder="Buscar..."
            onChange={handleSearch}
            className={`absolute right-0 transition-all duration-300 ease-in-out ${
              isSearchVisible
                ? "w-32 opacity-100 mr-2"
                : "w-0 opacity-0 p-0 border-0"
            }`}
            aria-label="Search input"
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={toggleSearch}
          aria-label="Toggle search"
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
