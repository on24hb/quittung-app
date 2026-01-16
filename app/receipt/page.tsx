'use client';

import Link from 'next/link';
import { receipts } from '@/lib/mockData'; // FIX: Named Import
import StatusBadge from '@/components/ui/StatusBadge'; // Default Import (angepasst an deine Struktur)
import SearchBar from '@/components/dashboard/SearchBar';
import { ReceiptData } from '@/types'; // Importiere den Type für Typsicherheit
import TopicChips from '@/components/dashboard/TopicChips';
import { useState } from 'react';

export default function ReceiptsPage() {
   const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Alle Quittungen</h1>
          <p className="text-slate-600">Das Archiv der politischen Verantwortung.</p>
        </div>

        {/* Filter / Suche */}
        <div className="mb-8 max-w-xl">
             <SearchBar placeholder="Suche nach Themen, Politikern oder Parteien..." />
        </div>

        {/* Grid View */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {receipts.map((receipt: ReceiptData) => ( // FIX: Typisierung und Variable 'receipts'
            <Link href={`/receipt/${receipt.id}`} key={receipt.id}>
              <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow h-full flex flex-col group">
                
                {/* Meta Header */}
                <div className="flex justify-between items-start mb-4">
                  <StatusBadge status={receipt.status} />
                  <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                    {receipt.date}
                  </span>
                </div>

                {/* Content */}
                <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {receipt.title}
                </h3>
                {/* FIX: HTML Entities für Anführungszeichen */}
                <p className="text-sm text-slate-500 mb-4 line-clamp-3 flex-1 italic">
                  &bdquo;{receipt.quote}&ldquo;
                </p>

                {/* Footer */}
                <div className="flex items-center gap-2 mt-auto pt-4 border-t border-slate-50">
                    <span className="text-xs text-slate-500 font-medium truncate">
                       {/* Fallback falls politicianName nicht existiert */}
                        {receipt.politician_id ? "Politiker-Profil" : "Partei-Profil"}
                    </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}