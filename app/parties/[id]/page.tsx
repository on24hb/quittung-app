'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { parties, receipts, politicians } from '@/lib/mockData';
import ConsistencyMeter from '@/components/ui/ConsistencyMeter';
import StatusBadge from '@/components/ui/StatusBadge';
import TopicChips from '@/components/dashboard/TopicChips';
import PoliticianCard from '@/components/politician/PoliticianCard';

export default function PartyDetailPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const party = parties.find(p => p.id === id);
  
  // Alle Quittungen dieser Partei holen
  const partyReceipts = receipts.filter(r => r.party_id === id);
  
  // Alle Politiker dieser Partei holen
  const partyPoliticians = politicians.filter(p => p.party_id === id);

  // Filtern nach Topic
  const filteredReceipts = partyReceipts.filter(r => !selectedTopic || r.topic === selectedTopic);

  // Statistiken berechnen
  const stats = {
    consistent: partyReceipts.filter(r => r.status === 'consistent').length,
    contradicted: partyReceipts.filter(r => r.status === 'contradicted').length,
    partial: partyReceipts.filter(r => r.status === 'partial').length,
    pending: partyReceipts.filter(r => r.status === 'pending').length,
  };

  if (!party) return <div className="p-10 text-center">Partei nicht gefunden.</div>;

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      
      {/* Dynamic Header Background based on Party Color */}
      <div 
        className="text-white relative overflow-hidden"
        style={{ 
          background: `linear-gradient(135deg, ${party.color} 0%, ${party.color}dd 100%)`
        }}
      >
        <div className="absolute inset-0 bg-black/10"></div>
        
        <div className="max-w-6xl mx-auto px-4 py-8 relative z-10">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2 text-white/90 hover:text-white hover:bg-white/20 mb-8">
              <ArrowLeft className="w-4 h-4" />
              Zurück zur Übersicht
            </Button>
          </Link>

          <div className="flex flex-col md:flex-row md:items-center gap-8">
            <div className="w-24 h-24 rounded-2xl flex items-center justify-center text-white font-bold text-4xl bg-white/20 backdrop-blur-md border border-white/20 shadow-xl">
              {party.abbreviation.substring(0, 1)}
            </div>
            
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">{party.name}</h1>
              <p className="text-white/80 text-lg">
                {partyReceipts.length} erfasste Versprechen & Quittungen
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex flex-col items-center">
              <ConsistencyMeter score={party.consistency_score} size={80} strokeWidth={6} />
              <p className="text-center text-xs font-bold text-white/90 mt-2 uppercase tracking-wide">Konsistenz</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        
        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Konsistent', value: stats.consistent, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Widerspruch', value: stats.contradicted, color: 'text-rose-600', bg: 'bg-rose-50' },
            { label: 'Teilweise', value: stats.partial, color: 'text-amber-600', bg: 'bg-amber-50' },
            { label: 'Ausstehend', value: stats.pending, color: 'text-slate-600', bg: 'bg-slate-100' }
          ].map(stat => (
            <div key={stat.label} className={`rounded-xl p-4 border border-slate-100 ${stat.bg} bg-opacity-50`}>
              <p className="text-xs font-bold text-slate-500 uppercase mb-1">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Content Tabs / Filter */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800">Versprechen & Taten</h2>
            <TopicChips selectedTopic={selectedTopic} onSelect={setSelectedTopic} />
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
            {filteredReceipts.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {filteredReceipts.map((receipt) => (
                  <Link 
                    key={receipt.id}
                    href={`/receipt/${receipt.id}`}
                    className="block p-5 hover:bg-slate-50 transition-colors group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <StatusBadge status={receipt.status} />
                          <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                            {receipt.topic}
                          </span>
                        </div>
                        <h3 className="font-bold text-slate-800 mb-1 group-hover:text-emerald-700 transition-colors">
                            {receipt.title}
                        </h3>
                        <p className="text-sm text-slate-500 line-clamp-1 italic">
                            &quot;{receipt.quote}&quot;
                        </p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors shrink-0" />
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center text-slate-400">
                Keine Einträge für diesen Filter gefunden.
              </div>
            )}
          </div>
        </div>

        {/* Top Politicians Section */}
        {partyPoliticians.length > 0 && (
            <div className="space-y-6 pt-6 border-t border-slate-200">
                <h2 className="text-xl font-bold text-slate-800">Spitzenpolitiker der {party.abbreviation}</h2>
                <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {partyPoliticians.map(pol => (
                        <PoliticianCard key={pol.id} politician={pol} party={party} />
                    ))}
                </div>
            </div>
        )}

      </div>
    </div>
  );
}