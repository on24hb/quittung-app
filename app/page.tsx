'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Receipt as ReceiptIcon, TrendingUp, FileSearch, Users } from 'lucide-react';

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

  const filteredReceipts = receipts.filter(r => {
    const matchesSearch = !searchQuery || 
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.quote.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTopic = !selectedTopic || r.topic === selectedTopic;
    return matchesSearch && matchesTopic;
  });

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* 1. HERO SECTION - Angepasst an Base 44 (kompakter) */}
      <div className="bg-slate-900 text-white rounded-b-[2.5rem] shadow-xl relative overflow-hidden">
        {/* Padding reduziert von py-24 auf py-12 */}
        <div className="max-w-6xl mx-auto px-4 py-12 relative z-10 text-center">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/10 rounded-full text-xs font-semibold mb-6 backdrop-blur-md tracking-wide uppercase">
              <ReceiptIcon className="w-3 h-3" />
              <span>Politische Kausalität</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight leading-tight">
              QUITTUNG
            </h1>
            
            <p className="text-base md:text-lg text-slate-300 mb-8 max-w-lg mx-auto leading-relaxed">
              Vergleiche politische Rhetorik mit dem realen Abstimmungsverhalten im Bundestag.
            </p>

            <div className="max-w-lg mx-auto mb-6 space-y-4">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
              
              <div className="flex justify-center pt-2">
                 <Button 
                   variant="outline" 
                   // Base 44 Style: Helle Umrandung, Hover-Effekt
                   className="bg-white/5 border-white/20 text-white hover:bg-white/10 gap-2 h-12 px-6 rounded-xl font-medium w-full md:w-auto transition-all"
                   onClick={() => setIsModalOpen(true)}
                 >
                   <FileSearch className="w-4 h-4" />
                   Aussage live prüfen
                 </Button>
              </div>
            </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
        
        {/* 2. PARTEIEN ÜBERSICHT */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-800">Parteien-Index</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            {parties.map(party => (
              <PartyCard key={party.id} party={party} />
            ))}
          </div>
        </section>

        {/* 3. POLITIKER CTA */}
        <section>
          <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm hover:border-slate-300 transition-colors">
            <div className="flex items-center gap-4">
              <div className="bg-slate-50 p-3 rounded-xl hidden md:block border border-slate-100">
                <Users className="w-6 h-6 text-slate-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800 mb-1">Politiker im Check</h2>
                <p className="text-slate-500 text-sm">Persönliche Scores & Abweichler-Analysen.</p>
              </div>
            </div>
            <Link href="/politicians" className="w-full md:w-auto">
              <Button className="bg-slate-900 text-white hover:bg-slate-800 font-bold w-full h-11 rounded-xl">
                Alle Politiker anzeigen <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </section>

        {/* 4. QUITTUNGEN LISTE */}
        <section>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h2 className="text-lg font-bold text-slate-800">Aktuelle Quittungen</h2>
            <TopicChips selectedTopic={selectedTopic} onSelect={setSelectedTopic} />
          </div>

          {filteredReceipts.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {filteredReceipts.map((receipt, index) => (
                <motion.div
                  key={receipt.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link href={`/receipt/${receipt.id}`}>
                    <div className="bg-white rounded-2xl p-5 border border-slate-100 hover:border-slate-300 hover:shadow-md transition-all duration-300 h-full group cursor-pointer relative overflow-hidden">
                      <div className="flex items-start justify-between mb-3">
                        <StatusBadge status={receipt.status} />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 px-2 py-1 rounded-md">{receipt.topic}</span>
                      </div>
                      
                      <h3 className="text-base font-bold text-slate-800 mb-2 group-hover:text-emerald-700 transition-colors leading-snug">
                        {receipt.title}
                      </h3>
                      <p className="text-slate-500 text-sm italic mb-4 line-clamp-2 leading-relaxed">&quot;{receipt.quote}&quot;</p>
                      
                      <div className="flex items-center text-xs text-slate-400 mt-auto pt-3 border-t border-slate-50">
                        <span>{receipt.date}</span>
                        <ArrowRight className="w-3 h-3 ml-auto text-slate-300 group-hover:text-emerald-600 transition-colors" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white border border-slate-100 rounded-2xl">
              <TrendingUp className="w-10 h-10 mx-auto mb-3 text-slate-200" />
              <p className="text-slate-500 font-medium text-sm">Keine Quittungen gefunden.</p>
            </div>
          )}
        </section>
      </div>

      <FactCheckModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
}