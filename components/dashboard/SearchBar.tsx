import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative group w-full">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
      </div>
      <input
        type="text"
        className="block w-full pl-11 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 backdrop-blur-md transition-all"
        placeholder="Thema, Partei oder Politiker suchen..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}