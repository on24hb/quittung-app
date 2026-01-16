import React from 'react';
import { Shield, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoyaltyProps {
  loyaltyScore: number;
  rebellionCount: number;
  rebellionReason?: string;
}

export default function LoyaltyMeter({ loyaltyScore, rebellionCount, rebellionReason }: LoyaltyProps) {
  const getColor = (score: number) => {
    if (score >= 90) return 'emerald';
    if (score >= 70) return 'blue';
    if (score >= 50) return 'amber';
    return 'rose';
  };

  const color = getColor(loyaltyScore);
  const rebellionRate = 100 - loyaltyScore;

  const bgBarColor = color === 'emerald' ? 'bg-emerald-500' : 
                     color === 'blue' ? 'bg-blue-500' : 
                     color === 'amber' ? 'bg-amber-500' : 'bg-rose-500';
                     
  const textColor = color === 'emerald' ? 'text-emerald-600' : 
                    color === 'blue' ? 'text-blue-600' : 
                    color === 'amber' ? 'text-amber-600' : 'text-rose-600';

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
          <Shield className="w-5 h-5 text-slate-600" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-800">Fraktionsdisziplin</h3>
          <p className="text-xs text-slate-500">Abstimmungsverhalten im Vergleich zur Parteilinie</p>
        </div>
      </div>

      {/* Loyalty Bar */}
      <div className="relative mb-4">
        <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className={cn(
              'h-full transition-all duration-700',
              bgBarColor
            )}
            style={{ width: `${loyaltyScore}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-sm">
          <span className={cn("font-semibold", textColor)}>
            {loyaltyScore}% Parteitreu
          </span>
          <span className="text-slate-500">
            {rebellionRate}% Abweichung
          </span>
        </div>
      </div>

      {/* Rebellion Info */}
      {rebellionCount > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
              <TrendingDown className="w-4 h-4 text-amber-700" />
            </div>
            <div className="flex-1">
              {/* FEHLER BEHOBEN: &quot; statt " */}
              <p className="text-sm font-medium text-amber-900 mb-1">
                {rebellionCount} {rebellionCount === 1 ? 'Abstimmung' : 'Abstimmungen'} gegen die Parteilinie
              </p>
              {rebellionReason && (
                <div className="bg-white/50 rounded-lg p-3 mt-2">
                  <p className="text-xs text-slate-600 font-medium mb-1">Begründung:</p>
                  {/* FEHLER BEHOBEN: &quot; statt " */}
                  <p className="text-xs text-slate-700 italic">&quot;{rebellionReason}&quot;</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}