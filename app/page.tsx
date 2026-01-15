'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Receipt as ReceiptIcon, TrendingUp, FileSearch, Users } from 'lucide-react';

// Daten Import
import { parties, receipts } from '@/lib/mockData';

// Komponenten Import
import SearchBar from '@/components/dashboard/SearchBar';
import PartyCard from '@/components/dashboard/PartyCard';
import TopicChips from '@/components/dashboard/TopicChips';
import StatusBadge from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/button';
import FactCheckModal from '@/components/dashboard/FactCheckModal';

export default function Home() {
  // State Management
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter-Logik für die Quittungen
  const filteredReceipts = receipts.filter(r => {
    const matchesSearch = !searchQuery || 
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.quote.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTopic = !selectedTopic || r.topic === selectedTopic;

    return matchesSearch && matchesTopic;
  });

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* 1. HERO SECTION */}
      <div className="bg-slate-900 text-white rounded-b-[2.5rem] shadow-2xl relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 relative z-10 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/10 rounded-full text-xs font-semibold mb-8 backdrop-blur-sm tracking-wide uppercase">
              <ReceiptIcon className="w-3 h-3" />
              <span>Politische Transparenz</span>
            </div>
            
            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">QUITTUNG</h1>
            <p className="text-lg text-slate-300 mb-10 max-w-lg mx-auto">
              Vergleiche politische Rhetorik mit dem realen Abstimmungsverhalten.
            </p>

            {/* Suche & Live-Check */}
            <div className="max-w-lg mx-auto mb-8 space-y-6">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
              
              <div className="flex justify-center">
                 <Button 
                   variant="outline" 
                   className="bg-white/10 border-white/20 text-white hover:bg-white/20 gap-2 px-6 py-6 text-md h-auto"
                   onClick={() => setIsModalOpen(true)}
                 >
                   <FileSearch className="w-5 h-5" />
                   Aussage live prüfen
                 </Button>
              </div>
            </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-16">
        
        {/* 2. PARTEIEN ÜBERSICHT */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-800">Parteien-Index</h2>
          </div>
          {/* Scrollbarer Container für Parteien */}
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            {parties.map(party => (
              <PartyCard key={party.id} party={party} />
            ))}
          </div>
        </section>

        {/* 3. POLITIKER CTA (Neu hinzugefügt) */}
        <section>
          <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="bg-slate-100 p-3 rounded-full hidden md:block">
                <Users className="w-6 h-6 text-slate-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800 mb-1">Politiker im Check</h2>
                <p className="text-slate-500 text-sm">Schau dir Profile und Scores einzelner Abgeordneter an.</p>
              </div>
            </div>
            <Link href="/politicians">
              <Button className="bg-slate-900 text-white hover:bg-slate-800 font-bold w-full md:w-auto">
                Alle Politiker anzeigen <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </section>

        {/* 4. QUITTUNGEN LISTE */}
        <section>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h2 className="text-xl font-bold text-slate-800">Aktuelle Quittungen</h2>
            <TopicChips selectedTopic={selectedTopic} onSelect={setSelectedTopic} />
          </div>

          {filteredReceipts.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {filteredReceipts.map((receipt, index) => (
                <motion.div
                  key={receipt.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link href={`/receipt/${receipt.id}`}>
                    <div className="bg-white rounded-2xl p-6 border border-slate-100 hover:border-slate-300 hover:shadow-lg transition-all duration-300 h-full group cursor-pointer">
                      <div className="flex items-start justify-between mb-4">
                        <StatusBadge status={receipt.status} />
                        <span className="text-xs text-slate-400 font-medium uppercase">{receipt.topic}</span>
                      </div>
                      
                      <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-emerald-700 transition-colors">
                        {receipt.title}
                      </h3>
                      <p className="text-slate-500 italic mb-4 line-clamp-2">&quot;{receipt.quote}&quot;</p>
                      
                      <div className="flex items-center text-xs text-slate-400 mt-auto pt-4 border-t border-slate-50">
                        <span>Abgleich vom {receipt.date}</span>
                        <ArrowRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white border border-slate-100 rounded-2xl">
              <TrendingUp className="w-12 h-12 mx-auto mb-3 text-slate-200" />
              <p className="text-slate-500 font-medium">Keine Ergebnisse gefunden.</p>
            </div>
          )}
        </section>
      </div>

      {/* 5. DAS MODAL (Unsichtbar, bis Button geklickt wird) */}
      <FactCheckModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
}