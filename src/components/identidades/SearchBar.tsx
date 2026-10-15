import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export function SearchBar({ value, onChange }: Props) {
  return (
    <div className="flex w-full items-center gap-3 border-2 border-white/30 bg-black/60 px-5 py-3 backdrop-blur-xl">
      <Search className="size-4 text-muted-foreground" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar identidade..."
        className="w-full bg-transparent text-sm uppercase tracking-wide text-white placeholder:text-muted-foreground focus:outline-none"
      />
    </div>
  );
}
