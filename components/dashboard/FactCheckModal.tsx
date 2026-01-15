import React, { useState } from 'react';
import { Search, Loader2, FileSearch, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StatusBadge from '@/components/ui/StatusBadge';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Response Type
interface CheckResult {
  assessment: 'consistent' | 'contradicted' | 'partial' | 'pending';
  topics: string[];
  explanation: string;
  related_votes: { title: string; date: string; relevance: string }[];
}

export default function FactCheckModal({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<CheckResult | null>(null);

  const handleCheck = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setResults(null);
    
    // SIMULATION: Wir tun so, als würde die KI antworten
    setTimeout(() => {
      setResults({
        assessment: 'contradicted',
        topics: ['Finanzen', 'Verkehr'],
        explanation: 'Die Aussage widerspricht dem Abstimmungsverhalten zum Haushaltsgesetz 2023, wo Kürzungen zugestimmt wurde.',
        related_votes: [
            { title: "Haushaltsgesetz 2023", date: "2023-11-20", relevance: "Direkter Widerspruch" }
        ]
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => onOpenChange(false)}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />
          
          {/* Modal Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
            className="relative bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <div className="flex items-center gap-2 font-bold text-lg text-slate-800">
                    <FileSearch className="w-5 h-5 text-slate-500" />
                    Fakten-Check Modus
                </div>
                <button onClick={() => onOpenChange(false)} className="text-slate-400 hover:text-slate-800">
                    <X className="w-5 h-5" />
                </button>
            </div>

            <div className="p-6 space-y-4">
              <textarea
                placeholder="Politische Aussage hier einfügen (z.B. aus einem Video oder Artikel)..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full min-h-[120px] p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 resize-none"
              />

              <Button onClick={handleCheck} disabled={loading || !text.trim()} className="w-full">
                {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Analysiere...</> : <><Search className="w-4 h-4 mr-2" /> Prüfen</>}
              </Button>

              {results && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-50 rounded-xl p-4 space-y-4 border border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-600">Ergebnis</span>
                    <StatusBadge status={results.assessment} />
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">{results.explanation}</p>
                  
                  {results.related_votes.length > 0 && (
                      <div className="pt-2 border-t border-slate-200">
                          <p className="text-xs text-slate-400 uppercase font-bold mb-2">Gefundene Beweise</p>
                          {results.related_votes.map((vote, i) => (
                             <div key={i} className="bg-white p-2 rounded border border-slate-200 text-xs text-slate-600">
                                {vote.title} ({vote.date})
                             </div> 
                          ))}
                      </div>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}