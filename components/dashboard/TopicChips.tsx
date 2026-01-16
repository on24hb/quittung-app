import React from 'react';
import { cn } from '@/lib/utils';
import { 
  Zap, Heart, GraduationCap, Stethoscope, Users, 
  TrendingUp, Leaf, Wifi, Shield, HandHeart, LucideIcon 
} from 'lucide-react';

interface TopicConfigItem {
  label: string;
  icon: LucideIcon;
  color: string;
}

interface TopicChipsProps {
  selectedTopic: string | null;
  onSelect: (topic: string | null) => void;
}

const topicConfig: Record<string, TopicConfigItem> = {
  energie: { label: 'Energie', icon: Zap, color: 'bg-amber-50 text-amber-700 hover:bg-amber-100' },
  rente: { label: 'Rente', icon: Heart, color: 'bg-rose-50 text-rose-700 hover:bg-rose-100' },
  bildung: { label: 'Bildung', icon: GraduationCap, color: 'bg-blue-50 text-blue-700 hover:bg-blue-100' },
  gesundheit: { label: 'Gesundheit', icon: Stethoscope, color: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' },
  migration: { label: 'Migration', icon: Users, color: 'bg-purple-50 text-purple-700 hover:bg-purple-100' },
  wirtschaft: { label: 'Wirtschaft', icon: TrendingUp, color: 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100' },
  umwelt: { label: 'Umwelt', icon: Leaf, color: 'bg-green-50 text-green-700 hover:bg-green-100' },
  digitalisierung: { label: 'Digitalisierung', icon: Wifi, color: 'bg-cyan-50 text-cyan-700 hover:bg-cyan-100' },
  sicherheit: { label: 'Sicherheit', icon: Shield, color: 'bg-slate-100 text-slate-700 hover:bg-slate-200' },
  soziales: { label: 'Soziales', icon: HandHeart, color: 'bg-pink-50 text-pink-700 hover:bg-pink-100' },
  // Fallbacks
  Klima: { label: 'Klima', icon: Leaf, color: 'bg-green-50 text-green-700 hover:bg-green-100' },
  Finanzen: { label: 'Finanzen', icon: TrendingUp, color: 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100' },
  Soziales: { label: 'Soziales', icon: HandHeart, color: 'bg-pink-50 text-pink-700 hover:bg-pink-100' },
};

export default function TopicChips({ selectedTopic, onSelect }: TopicChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect(null)}
        className={cn(
          'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
          !selectedTopic 
            ? 'bg-slate-800 text-white' 
            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
        )}
      >
        Alle
      </button>
      {Object.entries(topicConfig).map(([key, config]) => {
        const Icon = config.icon;
        return (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className={cn(
              'inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
              selectedTopic === key 
                ? 'bg-slate-800 text-white' 
                : config.color
            )}
          >
            <Icon className="w-4 h-4" />
            {config.label}
          </button>
        );
      })}
    </div>
  );
}