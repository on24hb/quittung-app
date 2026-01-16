import React from 'react';
import { Info } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import ConsistencyGauge from './ConsistencyGauge';

interface MeterProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  showFormula?: boolean;
}

export default function ConsistencyMeter({ score, size = 80, strokeWidth = 6, showFormula = true }: MeterProps) {
  return (
    <div className="relative inline-flex items-center justify-center">
      <ConsistencyGauge score={score} size={size} strokeWidth={strokeWidth} />
      
      {showFormula && (
        <Popover>
          <PopoverTrigger asChild>
            <button className="absolute -top-1 -right-1 w-6 h-6 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors group shadow-lg">
              <Info className="w-3.5 h-3.5 text-white" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-96" align="end">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">
                  Berechnungsmethode
                </h4>
                <p className="text-xs text-slate-600 mb-3">
                  Mathematische Neutralität durch transparente Algorithmen
                </p>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl font-mono text-xs text-slate-100 space-y-2">
                <div className="text-emerald-400">
                  Score = (M / R) × K
                </div>
                <div className="border-t border-slate-700 pt-2 space-y-1">
                  <div>
                    <span className="text-slate-400">M =</span>{' '}
                    <span className="text-white">Wahlprogramm-Matching</span>
                  </div>
                  <div>
                    <span className="text-slate-400">R =</span>{' '}
                    <span className="text-white">Abstimmungs-Realität</span>
                  </div>
                  <div>
                    <span className="text-slate-400">K =</span>{' '}
                    <span className="text-white">Kontext-Faktor</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1 shrink-0" />
                  <div>
                    <p className="font-medium text-slate-800">Wahlprogramm-Matching</p>
                    <p className="text-slate-600">Semantische Analyse der Wahlversprechen</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-1 shrink-0" />
                  <div>
                    <p className="font-medium text-slate-800">Abstimmungs-Realität</p>
                    <p className="text-slate-600">Dokumentierte Parlamentsentscheidungen</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-500 mt-1 shrink-0" />
                  <div>
                    <p className="font-medium text-slate-800">Kontext-Faktor</p>
                    <p className="text-slate-600">Berücksichtigt Koalitionszwänge und Sondersituationen</p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <p className="text-xs text-slate-500">
                  Alle Berechnungen sind Open Source und nachvollziehbar
                </p>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}