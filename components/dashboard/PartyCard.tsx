import React from 'react';
import Link from 'next/link';
import { Party } from '@/types';
import ConsistencyGauge from '@/components/ui/ConsistencyGauge'; // Wir brauchen diesen Import
import { ChevronRight } from 'lucide-react';

export default function PartyCard({ party }: { party: Party }) {
  return (
    <Link href={`/parties/${party.id}`} className="block h-full group">
      <div className="min-w-[160px] h-full bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-300 flex flex-col items-center text-center">
        
        {/* Base 44 Design: Großes Logo */}
        <div 
          className="w-14 h-14 rounded-xl mb-4 flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:scale-105 transition-transform"
          style={{ backgroundColor: party.color }}
        >
          {party.abbreviation.substring(0, 1)}
        </div>
        
        <h3 className="font-semibold text-slate-800 text-sm mb-3 line-clamp-1">
            {party.abbreviation}
        </h3>

        {/* Base 44 Design: Das Kreisdiagramm */}
        <div className="mb-2">
           <ConsistencyGauge score={party.consistency_score} size={70} strokeWidth={5} />
        </div>
        
        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wide mt-1">Konsistenz</p>
        
        <div className="flex items-center gap-1 mt-4 text-xs text-emerald-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            <span>Details</span>
            <ChevronRight className="w-3 h-3" />
        </div>
      </div>
    </Link>
  );
}