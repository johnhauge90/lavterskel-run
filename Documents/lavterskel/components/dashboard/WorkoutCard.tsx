// Server Component.
// Tre visuelle tilstander styrt av `status`-prop.
// "active"-kortet delegerer CTA til CompleteButton (client component).

import { CheckCircle2, Circle, Info } from 'lucide-react';
import CompleteButton from './CompleteButton';

export type WorkoutStatus = 'completed' | 'active' | 'future';

type Props = {
  workoutId: string;       // UUID — brukes av CompleteButton for Supabase-persistens
  status: WorkoutStatus;
  dayLabel: string;
  statusLabel?: string;
  title: string;
  description: string;
  coachNote?: string;
};

export default function WorkoutCard({
  workoutId,
  status,
  dayLabel,
  statusLabel,
  title,
  description,
  coachNote,
}: Props) {

  if (status === 'completed') {
    return (
      <div className="bg-white p-6 rounded-3xl border border-neutral-200/60 shadow-sm relative overflow-hidden">
        {/* Grønn venstremarg-stripe = visuell "ferdig"-markør */}
        <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500" />
        <div className="flex justify-between items-start mb-4 pl-4">
          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-1 block">
              {dayLabel}{statusLabel ? ` • ${statusLabel}` : ''}
            </span>
            <h3 className="text-lg font-bold">{title}</h3>
          </div>
          <CheckCircle2 className="w-8 h-8 text-emerald-500 shrink-0" />
        </div>
        <p className="text-neutral-500 text-sm pl-4">{description}</p>
      </div>
    );
  }

  if (status === 'active') {
    return (
      <div className="bg-white p-6 rounded-3xl border-2 border-neutral-900 shadow-sm relative overflow-hidden">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1 block">
              {dayLabel}{statusLabel ? ` • ${statusLabel}` : ''}
            </span>
            <h3 className="text-lg font-bold">{title}</h3>
          </div>
        </div>
        {coachNote && (
          <div className="bg-neutral-50 p-4 rounded-2xl mb-6 text-sm text-neutral-600 flex gap-3 border border-neutral-100">
            <Info className="w-5 h-5 text-neutral-400 shrink-0 mt-0.5" />
            <p>{coachNote}</p>
          </div>
        )}
        <CompleteButton workoutId={workoutId} />
      </div>
    );
  }

  // status === 'future'
  return (
    <div className="bg-white p-6 rounded-3xl border border-neutral-200/60 shadow-sm opacity-60">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1 block">
            {dayLabel}
          </span>
          <h3 className="text-lg font-bold">{title}</h3>
        </div>
        <Circle className="w-8 h-8 text-neutral-200 shrink-0" />
      </div>
      <p className="text-neutral-500 text-sm">{description}</p>
    </div>
  );
}
