import { CheckCircle2, XCircle, AlertTriangle, Clock } from 'lucide-react';
import { Status } from '@/types';

export default function StatusBadge({ status }: { status: Status }) {
  const styles = {
    consistent: "bg-emerald-100 text-emerald-800 border-emerald-200",
    contradicted: "bg-crimson-50 text-crimson-600 border-crimson-100", // Nutzt unsere Config Farbe
    partial: "bg-amber-100 text-amber-800 border-amber-200",
    pending: "bg-slate-100 text-slate-600 border-slate-200"
  };

  const icons = {
    consistent: <CheckCircle2 className="w-3 h-3" />,
    contradicted: <XCircle className="w-3 h-3" />,
    partial: <AlertTriangle className="w-3 h-3" />,
    pending: <Clock className="w-3 h-3" />
  };

  const labels = {
    consistent: "Konsistent",
    contradicted: "Widerspruch",
    partial: "Teilweise",
    pending: "Ausstehend"
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles[status]}`}>
      {icons[status]}
      {labels[status]}
    </span>
  );
}