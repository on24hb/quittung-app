'use client';

import React, { useState } from 'react';
import { Users, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { politicians, parties } from '@/lib/mockData';
import SearchBar from '@/components/dashboard/SearchBar';
import PoliticianCard from '@/components/politician/PoliticianCard';

export default function PoliticiansPage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Einfacher Filter (erweitert aus deinem Code)
  const filteredPoliticians = politicians.filter(p => 
    !searchQuery || 
    p.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.party_id === parties.find(party => party.abbreviation.toLowerCase().includes(searchQuery.toLowerCase()))?.id
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center text-white">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Politiker</h1>
              <p className="text-slate-500">Persönliche Verantwortlichkeit im Fokus</p>
            </div>
          </div>
          
          <div className="max-w-2xl">
             <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
            <div className="text-sm text-slate-500">{filteredPoliticians.length} Politiker gefunden</div>
            <Button variant="outline" size="sm" className="gap-2">
                <Filter className="w-4 h-4" /> Filter
            </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
            {filteredPoliticians.map(politician => (
              <PoliticianCard 
                key={politician.id} 
                politician={politician} 
                party={parties.find(p => p.id === politician.party_id)} 
              />
            ))}
        </div>
      </div>
    </div>
  );
}