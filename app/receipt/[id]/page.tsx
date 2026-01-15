'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
// FEHLER BEHOBEN: Share2 aus dem Import entfernt
import { ArrowLeft } from 'lucide-react';
import { receipts, parties } from '@/lib/mockData';
import StatusBadge from '@/components/ui/StatusBadge';
import ResponsibilityMap from '@/components/receipt/ResponsibilityMap';

export default function ReceiptDetailPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const receipt = receipts.find(r => r.id === id);
  const party = receipt ? parties.find(p => p.id === receipt.party_id) : null;

  if (!receipt || !party) {
    return <div className="min-h-screen flex items-center justify-center">Quittung nicht gefunden.</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm transition-all">
            <ArrowLeft className="w-4 h-4" />
            Zurück
          </Link>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-slate-50/50 p-6 md:p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-start justify-between gap-4">
             <div>
                <div className="flex items-center gap-2 mb-3">
                   <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{receipt.topic}</span>
                   <span className="text-slate-300">•</span>
                   <span className="text-xs font-bold text-slate-400">{receipt.date}</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">{receipt.title}</h1>
             </div>
             <div className="shrink-0">
                <StatusBadge status={receipt.status} />
             </div>
          </div>

          <div className="p-6 md:p-8 space-y-10">
            {/* Promise */}
            <div className="relative pl-6 border-l-4 border-emerald-500/30">
               <h3 className="text-xs font-bold text-emerald-700 uppercase mb-2 tracking-wide">Das Versprechen</h3>
               {/* FEHLER BEHOBEN: &quot; statt " benutzt */}
               <p className="text-xl md:text-2xl font-serif text-slate-700 italic leading-relaxed">
                 &quot;{receipt.quote}&quot;
               </p>
            </div>

            {/* Reality */}
            <div className="relative pl-6 border-l-4 border-slate-200">
               <h3 className="text-xs font-bold text-slate-500 uppercase mb-2 tracking-wide">Die Realität</h3>
               <p className="text-slate-700 leading-relaxed text-lg">
                 {receipt.description}
               </p>
            </div>
          </div>
          
          {/* Footer */}
          <div className="bg-slate-50 p-5 flex items-center gap-4 border-t border-slate-100">
             <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-sm" style={{ backgroundColor: party.color }}>
                {party.abbreviation.substring(0,1)}
             </div>
             <div>
                <div className="font-bold text-slate-900">{party.name}</div>
                <div className="text-xs text-slate-500">Verantwortliche Partei</div>
             </div>
          </div>
        </div>

        <ResponsibilityMap partyName={party.abbreviation} />
      </div>
    </div>
  );
}