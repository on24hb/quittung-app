'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, User, MapPin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { politicians, parties, statements, votes } from '@/lib/mockData';
import ConsistencyMeter from '@/components/ui/ConsistencyMeter';
import LoyaltyMeter from '@/components/politician/LoyaltyMeter';
import WordVsVoteCard from '@/components/politician/WordVsVoteCard';

export default function PoliticianProfilePage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const politician = politicians.find(p => p.id === id);
  const party = politician ? parties.find(p => p.id === politician.party_id) : null;
  const politicianStatements = statements.filter(s => s.politician_id === id);

  if (!politician) return <div className="p-10 text-center">Politiker nicht gefunden.</div>;

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Header bleibt gleich ... */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link href="/politicians">
            <Button variant="ghost" size="sm" className="gap-2 mb-6">
              <ArrowLeft className="w-4 h-4" />
              Alle Politiker
            </Button>
          </Link>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Portrait */}
            <div className="shrink-0">
              <div className="w-32 h-32 rounded-2xl bg-slate-100 flex items-center justify-center overflow-hidden border-4 border-slate-50 shadow-inner">
                 {politician.portrait_url ? (
                     /* eslint-disable-next-line @next/next/no-img-element */
                     <img src={politician.portrait_url} alt={politician.full_name} className="w-full h-full object-cover" />
                 ) : <User className="w-12 h-12 text-slate-300" />}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h1 className="text-3xl font-bold text-slate-800 mb-1">{politician.full_name}</h1>
                  <p className="text-lg text-slate-600 mb-2">{politician.position}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                     {politician.wahlkreis && (
                        <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Wahlkreis: {politician.wahlkreis}</div>
                     )}
                     {politician.bundestag_email && (
                        <div className="flex items-center gap-1.5"><Mail className="w-4 h-4" /> Kontakt</div>
                     )}
                  </div>
                </div>
                
                {party && (
                    <div className="px-4 py-2 rounded-xl text-white font-bold text-sm shadow-sm" style={{ backgroundColor: party.color }}>
                      {party.abbreviation}
                    </div>
                )}
              </div>

              {politician.ausschuss && (
                  <div className="flex flex-wrap gap-2 mt-4">
                      {politician.ausschuss.map((a, i) => (
                          <span key={i} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-lg font-medium">{a}</span>
                      ))}
                  </div>
              )}
            </div>

            {/* Score mit neuem Popover */}
            <div className="shrink-0 flex flex-col items-center">
              <ConsistencyMeter score={politician.personal_consistency_score} size={80} strokeWidth={6} />
              <p className="text-xs font-bold text-slate-500 mt-2 uppercase tracking-wide">Konsistenz</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        
        {/* NEU: Loyalty Meter */}
        <LoyaltyMeter 
           loyaltyScore={politician.party_loyalty_score} 
           rebellionCount={politician.rebellion_count} 
           rebellionReason="Abweichung bei der Abstimmung zum Sondervermögen aus Gewissensgründen."
        />

        {/* NEU: Word vs Vote Cards */}
        <div>
            <h2 className="text-lg font-bold text-slate-800 mb-6">Wort vs. Tat Timeline</h2>
            
            {politicianStatements.length > 0 ? (
                <div className="space-y-6">
                    {politicianStatements.map(stmt => {
                        // Passende Abstimmung finden
                        const vote = votes.find(v => v.id === stmt.vote_id);
                        return (
                            <WordVsVoteCard 
                                key={stmt.id} 
                                statement={stmt} 
                                vote={vote} 
                            />
                        );
                    })}
                </div>
            ) : (
                <div className="text-center py-10 text-slate-400">Keine Daten verfügbar</div>
            )}
        </div>
      </div>
    </div>
  );
}