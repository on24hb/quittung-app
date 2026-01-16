import React, { useState } from 'react';
import { Search, Loader2, FileSearch, X, ExternalLink } from 'lucide-react'; // FIX: ArrowRight entfernt
import { Button } from '@/components/ui/button';
import StatusBadge from '@/components/ui/StatusBadge';
import { motion, AnimatePresence } from 'framer-motion';

// Erweiterte Struktur gemäß Base 44
interface CheckResult {
  assessment: 'consistent' | 'contradicted' | 'partial' | 'pending';
  topics: string[];
  explanation: string;
  related_votes: { title: string; date: string; relevance: string; result?: string }[];
}

export default function FactCheckModal({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<CheckResult | null>(null);

  const handleCheck = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setResults(null);
    
    // SIMULATION: Ausführlichere Base-44 Antwort
    setTimeout(() => {
      setResults({
        assessment: 'contradicted',
        topics: ['Finanzen', 'Verkehr', 'Klimaschutz'],
        explanation: 'Die Aussage suggeriert eine generelle Ablehnung von Subventionskürzungen. Dies steht im Widerspruch zum Abstimmungsverhalten beim Haushaltsfinanzierungsgesetz 2024, wo der Streichung des Dieselprivilegs für Agrardiesel (schrittweise) zugestimmt wurde.',
        related_votes: [
            { title: "Zweites Haushaltsfinanzierungsgesetz 2024", date: "2024-02-02", relevance: "Direkter Widerspruch zur Aussage", result: "Zugestimmt" },
            { title: "Antrag: Beibehaltung der Agrardieselrückvergütung", date: "2024-01-18", relevance: "Kontextuell relevant", result: "Abgelehnt" }
        ]
      });
      setLoading(false);
    }, 2500);
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => onOpenChange(false)}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div className="flex items-center gap-2 font-bold text-lg text-slate-800">
                    <FileSearch className="w-5 h-5 text-slate-600" />
                    Fakten-Check
                </div>
                <button onClick={() => onOpenChange(false)} className="text-slate-400 hover:text-slate-800 transition-colors p-1 bg-white rounded-full border border-slate-200 hover:border-slate-300">
                    <X className="w-4 h-4" />
                </button>
            </div>

            <div className="p-5 space-y-5 overflow-y-auto">
              {!results ? (
                // Eingabe-Phase
                <div className="space-y-4">
                   <p className="text-sm text-slate-500">
                     Füge eine politische Aussage (z.B. aus einem Interview oder Tweet) ein. Wir prüfen sie gegen die Datenbank.
                   </p>
                   <textarea
                    placeholder="Z.B.: 'Wir haben immer gegen Steuererhöhungen gestimmt...'"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full min-h-[140px] p-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 resize-none text-slate-800 bg-slate-50 focus:bg-white transition-colors text-base"
                  />
                  <Button 
                    onClick={handleCheck} 
                    disabled={loading || !text.trim()} 
                    className="w-full h-12 rounded-xl text-base bg-slate-900 hover:bg-slate-800"
                  >
                    {loading ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Analysiere Datenbank...</> : <><Search className="w-5 h-5 mr-2" /> Aussage prüfen</>}
                  </Button>
                </div>
              ) : (
                // Ergebnis-Phase (Base 44 Style)
                <div className="space-y-6 animate-in fade-in duration-500">
                  
                  {/* Assessment Header */}
                  <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <span className="text-sm font-semibold text-slate-600">Ergebnis der Analyse</span>
                    <StatusBadge status={results.assessment} />
                  </div>

                  {/* Erklärung */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Kontext & Einordnung</h4>
                    <p className="text-sm text-slate-800 leading-relaxed bg-white border border-slate-100 p-4 rounded-xl shadow-sm">
                      {results.explanation}
                    </p>
                  </div>
                  
                  {/* Themen */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Betroffene Themen</h4>
                    <div className="flex flex-wrap gap-2">
                      {results.topics.map((t, i) => (
                        <span key={i} className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium border border-slate-200">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Beweise / Votes */}
                  <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Relevante Abstimmungen</h4>
                      <div className="space-y-3">
                          {results.related_votes.map((vote, i) => (
                             <div key={i} className="bg-white p-3 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors">
                                <div className="flex justify-between items-start mb-1">
                                  <h5 className="text-sm font-bold text-slate-800 leading-tight">{vote.title}</h5>
                                  <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 whitespace-nowrap ml-2">{vote.date}</span>
                                </div>
                                <p className="text-xs text-slate-500 mb-2">{vote.relevance}</p>
                                <div className="flex items-center gap-2 mt-2">
                                   <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                      vote.result === 'Zugestimmt' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                                   }`}>
                                     {vote.result}
                                   </span>
                                   <button className="ml-auto text-xs text-blue-600 flex items-center gap-1 hover:underline">
                                      Protokoll <ExternalLink className="w-3 h-3" />
                                   </button>
                                </div>
                             </div> 
                          ))}
                      </div>
                  </div>

                  <Button variant="outline" onClick={() => setResults(null)} className="w-full border-slate-200 text-slate-600 hover:bg-slate-50 h-11 rounded-xl">
                    Neue Prüfung starten
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}