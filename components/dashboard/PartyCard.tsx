import React from 'react';
import Link from 'next/link';
import { Party } from '@/types';

export default function PartyCard({ party }: { party: Party }) {
  const scoreColor = party.consistency_score >= 80 ? 'text-emerald-600' :
                     party.consistency_score >= 60 ? 'text-amber-600' : 'text-crimson-600';

  return (
    <Link href={`/parties/${party.id}`} className="block h-full">
      <div className="min-w-[140px] h-full bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col items-center text-center hover:border-slate-300">
        <div 
          className="w-12 h-12 rounded-full mb-3 flex items-center justify-center text-white font-bold text-sm shadow-sm"
          style={{ backgroundColor: party.color }}
        >
          {party.abbreviation.substring(0, 1)}
        </div>
        <h3 className="font-bold text-slate-800 text-sm mb-1">{party.abbreviation}</h3>
        <div className="text-xs text-slate-500 font-medium">
          Score: <span className={scoreColor}>{party.consistency_score}%</span>
        </div>
      </div>
    </Link>
  );
}