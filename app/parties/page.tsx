import React from "react";
import { parties } from "@/lib/mockData";
import PartyCard from "@/components/dashboard/PartyCard";

export default function PartiesPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Parteien</h1>
          <p className="text-slate-600">Übersicht aller erfassten Parteien</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {parties.map((party) => (
            <PartyCard key={party.id} party={party} />
          ))}
        </div>
      </div>
    </main>
  );
}
