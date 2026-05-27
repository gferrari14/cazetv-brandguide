import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export function SearchBar({ value, onChange }: Props) {
  return (
    <div className="pointer-events-none sticky bottom-6 z-40 flex justify-center px-4 pb-2">
      <div className="pointer-events-auto flex w-full max-w-md items-center gap-3 border border-white/20 bg-black/60 px-5 py-3 backdrop-blur-xl">
        <Search className="size-4 text-white/60" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Buscar identidade..."
          className="w-full bg-transparent text-sm uppercase tracking-wide text-white placeholder:text-white/40 focus:outline-none"
        />
      </div>
    </div>
  );
}
