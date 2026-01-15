import React from 'react';
import Link from 'next/link';
import { User } from 'lucide-react';
import { Politician, Party } from '@/types';
// ConsistencyGauge Import entfernt, da nicht genutzt (wir nutzen nur den Score als Text hier)

export default function PoliticianCard({ politician, party }: { politician: Politician, party?: Party }) {
  return (
    <Link href={`/politicians/${politician.id}`}>
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all h-full flex flex-col items-center text-center group">
        <div className="w-20 h-20 rounded-full bg-slate-100 mb-4 flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
           {politician.portrait_url ? (
               /* eslint-disable-next-line @next/next/no-img-element */
               <img src={politician.portrait_url} alt={politician.full_name} className="w-full h-full object-cover" />
           ) : (
               <User className="w-8 h-8 text-slate-300" />
           )}
        </div>
        
        <h3 className="font-bold text-slate-800 mb-1 group-hover:text-emerald-700 transition-colors">{politician.full_name}</h3>
        <p className="text-xs text-slate-500 mb-3">{politician.position}</p>
        
        {party && (
            <span className="px-2 py-0.5 rounded text-[10px] font-bold text-white mb-4" style={{ backgroundColor: party.color }}>
                {party.abbreviation}
            </span>
        )}
        
        <div className="mt-auto pt-3 border-t border-slate-50 w-full flex justify-between items-center px-2">
            <span className="text-xs text-slate-400">Score</span>
            <span className={`text-sm font-bold ${politician.personal_consistency_score > 70 ? 'text-emerald-600' : 'text-amber-600'}`}>
                {politician.personal_consistency_score}%
            </span>
        </div>
      </div>
    </Link>
  );
}