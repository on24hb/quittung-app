'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Receipt as ReceiptIcon, TrendingUp, Users } from 'lucide-react';

import { parties, receipts } from '@/lib/mockData';
import SearchBar from '@/components/dashboard/SearchBar';
import PartyCard from '@/components/dashboard/PartyCard'; 
import TopicChips from '@/components/dashboard/TopicChips';
import StatusBadge from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/button';
import FactCheckModal from '@/components/dashboard/FactCheckModal'; 

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Parteien für die Vorschau (z.B. die ersten 4)
  const featuredParties = parties.slice(0, 4);

  const filteredReceipts = receipts.filter(r => {
    const matchesSearch = !searchQuery || 
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.quote.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTopic = !selectedTopic || r.topic === selectedTopic;
    return matchesSearch && matchesTopic;
  });

  return (
    <main className="min-h-screen bg-white font-sans text-slate-900">
      
      {/* 1. HERO SECTION - Base 44 Design */}
      <section className="relative flex flex-col items-center justify-center pt-32 pb-20 px-4 md:px-6 max-w-5xl mx-auto text-center">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-200 rounded-full text-xs font-semibold mb-8 text-slate-600 tracking-wide uppercase">
            <ReceiptIcon className="w-3 h-3" />
            <span>Politische Kausalitäts-Engine</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
          Politik an ihren <span className="text-blue-600">Taten</span> messen.
        </h1>
        
        <p className="text-lg md:text-xl text-slate-500 max-w-2xl mb-10 leading-relaxed">
          Vergleiche Wahlversprechen mit dem realen Abstimmungsverhalten im Bundestag. 
          Schluss mit Rhetorik, her mit der Quittung.
        </p>

        <div className="w-full max-w-2xl mb-8 space-y-4">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          
          <div className="flex justify-center pt-2">
             <Button 
               variant="outline" 
               className="text-slate-600 hover:text-slate-900 hover:bg-slate-50 gap-2 h-10 px-6 rounded-full text-sm font-medium transition-all"
               onClick={() => setIsModalOpen(true)}
             >
               Eigene Aussage prüfen
             </Button>
          </div>
        </div>

      </section>

      {/* 2. PARTEIEN VORSCHAU */}
      <section className="py-16 px-4 md:px-6 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-8">
            <div>
                <h2 className="text-2xl font-bold text-slate-900">Parteien im Realitäts-Check</h2>
                <p className="text-slate-500 mt-1">Wer hält sich an sein Wort?</p>
            </div>
            <Link href="/parties">
                <Button variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                    Alle Parteien <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredParties.map((party) => (
              <PartyCard key={party.id} party={party} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. QUITTUNGEN FEED */}
      <section className="py-20 px-4 md:px-6 max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
            <div>
                <h2 className="text-2xl font-bold text-slate-900">Aktuelle Quittungen</h2>
                <p className="text-slate-500 mt-1">Die neuesten Abgleiche aus dem Parlament.</p>
            </div>
          </div>
          <div className="mb-8">
          <TopicChips selectedTopic={selectedTopic} onSelect={setSelectedTopic} />
          </div>

          {filteredReceipts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {filteredReceipts.map((receipt, index) => (
                <motion.div
                  key={receipt.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/receipt/${receipt.id}`} className="block h-full">
                    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 h-full flex flex-col group">
                      
                      <div className="flex items-start justify-between mb-4">
                        <StatusBadge status={receipt.status} />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 px-2 py-1 rounded-md">
                            {receipt.topic}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors leading-snug">
                        {receipt.title}
                      </h3>
                      
                      <blockquote className="text-slate-500 text-sm italic mb-6 line-clamp-2 pl-3 border-l-2 border-slate-100">
                        &quot;{receipt.quote}&quot;
                      </blockquote>
                      
                      <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between text-xs text-slate-400 font-medium">
                        <span>{receipt.date}</span>
                        <span className="group-hover:translate-x-1 transition-transform flex items-center gap-1 text-slate-300 group-hover:text-blue-500">
                            Details <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <TrendingUp className="w-12 h-12 mx-auto mb-4 text-slate-300" />
              <p className="text-slate-500 font-medium">Keine Quittungen für diese Filter gefunden.</p>
              <Button 
                variant="link" 
                onClick={() => {setSearchQuery(''); setSelectedTopic(null);}}
                className="text-blue-600 mt-2"
              >
                Filter zurücksetzen
              </Button>
            </div>
          )}
          
          <div className="mt-12 text-center">
             <Link href="/receipts">
                <Button variant="outline" size="lg" className="rounded-full px-8">
                    Alle Quittungen ansehen
                </Button>
             </Link>
          </div>
      </section>

      {/* 4. POLITIKER CTA */}
      <section className="py-16 px-4 md:px-6 bg-slate-900 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 mb-6">
                <Users className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Wer vertritt dich wirklich?</h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto text-lg">
                Schau dir die individuellen Abstimmungsprofile der Abgeordneten an. Wer folgt dem Fraktionszwang, wer bleibt seinen Versprechen treu?
            </p>
            <Link href="/politicians">
              <Button className="bg-white text-slate-900 hover:bg-slate-100 font-bold h-12 px-8 rounded-full">
                Politiker suchen
              </Button>
            </Link>
          </div>
      </section>

      <FactCheckModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen} 
      />
    </main>
  );
}