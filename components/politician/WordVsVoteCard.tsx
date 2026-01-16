import React from 'react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
// FEHLER BEHOBEN: Scale entfernt, da nicht genutzt
import { CheckCircle, XCircle, HelpCircle, ExternalLink, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Statement, Vote } from '@/types';

interface CardProps {
  statement: Statement & { alignment?: 'consistent' | 'contradicted' | 'unclear', source_type?: string, quote?: string, source_url?: string }; 
  vote?: Vote & { party_position?: 'yes' | 'no' | 'abstain', source_url?: string };
}

export default function WordVsVoteCard({ statement, vote }: CardProps) {
  const alignmentConfig = {
    consistent: {
      icon: CheckCircle,
      color: 'emerald',
      label: 'Konsistent',
      bgClass: 'bg-emerald-50',
      textClass: 'text-emerald-700',
      borderClass: 'border-emerald-200'
    },
    contradicted: {
      icon: XCircle,
      color: 'rose',
      label: 'Widerspruch',
      bgClass: 'bg-rose-50',
      textClass: 'text-rose-700',
      borderClass: 'border-rose-200'
    },
    unclear: {
      icon: HelpCircle,
      color: 'slate',
      label: 'Unklar',
      bgClass: 'bg-slate-50',
      textClass: 'text-slate-600',
      borderClass: 'border-slate-200'
    }
  };

  const config = alignmentConfig[statement.alignment || 'unclear'];
  const Icon = config.icon;
  const quoteText = statement.quote || statement.text;

  return (
    <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
      <div className="px-4 py-2 bg-slate-50 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500">
            {statement.date && format(new Date(statement.date), 'dd. MMMM yyyy', { locale: de })}
          </span>
          <span className={cn(
            'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border',
            config.bgClass,
            config.textClass,
            config.borderClass
          )}>
            <Icon className="w-3 h-3" />
            {config.label}
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                <FileText className="w-4 h-4 text-slate-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Das Wort</p>
                <p className="text-xs text-slate-500 capitalize">
                  {statement.source_type?.replace('_', ' ') || 'Aussage'}
                </p>
              </div>
            </div>
            
            {/* FEHLER BEHOBEN: &quot; */}
            <blockquote className="text-sm text-slate-700 italic border-l-2 border-slate-200 pl-3">
              &quot;{quoteText}&quot;
            </blockquote>

            {statement.source_url && (
              <a href={statement.source_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800">
                Kontext ansehen <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                <Icon className={cn('w-4 h-4', config.textClass)} />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Die Abstimmung</p>
                <p className="text-xs text-slate-500">
                  {vote?.date && format(new Date(vote.date), 'dd.MM.yyyy', { locale: de })}
                </p>
              </div>
            </div>

            {vote ? (
              <>
                <p className="text-sm font-medium text-slate-800">{vote.title}</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-medium',
                    vote.party_position === 'yes' ? 'bg-emerald-100 text-emerald-700' :
                    vote.party_position === 'no' ? 'bg-rose-100 text-rose-700' :
                    'bg-slate-100 text-slate-700'
                  )}>
                    {vote.party_position === 'yes' ? 'Ja-Stimme' :
                     vote.party_position === 'no' ? 'Nein-Stimme' : 'Enthaltung'}
                  </div>
                </div>
              </>
            ) : (
              <p className="text-sm text-slate-500 italic">Keine Abstimmung erfasst</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}