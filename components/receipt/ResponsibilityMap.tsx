import { FileText, Vote, Scale } from 'lucide-react';

export default function ResponsibilityMap({ partyName }: { partyName?: string }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 my-6">
      <h3 className="font-semibold text-slate-800 mb-6">Kausalitäts-Kette</h3>
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative">
        {/* Step 1 */}
        <div className="flex flex-col items-center text-center z-10 w-full md:w-1/3">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-3 border border-emerald-100">
            <FileText className="w-5 h-5" />
          </div>
          <div className="text-sm font-bold text-slate-800">Wahlprogramm</div>
        </div>

        {/* Connector */}
        <div className="hidden md:block absolute top-6 left-0 w-full h-0.5 bg-slate-100 -z-0"></div>

        {/* Step 2 */}
        <div className="flex flex-col items-center text-center z-10 w-full md:w-1/3">
          <div className="w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center mb-3 border border-slate-800">
            <Vote className="w-5 h-5" />
          </div>
          <div className="text-sm font-bold text-slate-800">Abstimmung</div>
          <div className="text-xs text-slate-500 mt-1">{partyName} stimmt ab</div>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-center text-center z-10 w-full md:w-1/3">
          <div className="w-12 h-12 bg-white text-slate-400 rounded-full flex items-center justify-center mb-3 border border-slate-200">
            <Scale className="w-5 h-5" />
          </div>
          <div className="text-sm font-bold text-slate-400">Ergebnis</div>
        </div>
      </div>
    </div>
  );
}