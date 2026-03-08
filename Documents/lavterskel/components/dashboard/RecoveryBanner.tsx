'use client';

// "use client" — eneste grunn: "Jeg er klar igjen"-knapp kaller Server Action.
// Vises øverst i dashbordet når bruker har aktiv helsestatus.
// Tone: varm, ikke nedlatende. Ingen skyldfølelse.

import { useTransition } from 'react';
import { Loader2, Sparkles } from 'lucide-react';
import { clearHealthStatus } from '@/app/actions/health';
import type { HealthStatus } from '@/app/actions/health';

const BANNER_COPY: Record<HealthStatus, { ikon: string; tekst: string }> = {
  syk: {
    ikon: '🤒',
    tekst: 'Du hviler denne uken. Programmet starter opp igjen når du er klar.',
  },
  skadet: {
    ikon: '🩹',
    tekst: 'Planen er satt på pause. Ta den tiden du trenger — vi er her når du er klar.',
  },
};

type Props = {
  status: HealthStatus;
};

export default function RecoveryBanner({ status }: Props) {
  const [isPending, startTransition] = useTransition();
  const { ikon, tekst } = BANNER_COPY[status];

  function handleKlarIgjen() {
    startTransition(() => clearHealthStatus());
  }

  return (
    <div className="bg-[#F7F7F5] border border-neutral-200/60 rounded-2xl p-5 mb-8 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <span className="text-2xl">{ikon}</span>
        <p className="text-sm text-neutral-600 leading-snug max-w-sm">{tekst}</p>
      </div>

      <button
        onClick={handleKlarIgjen}
        disabled={isPending}
        className="shrink-0 flex items-center gap-2 bg-neutral-900 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-neutral-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isPending ? (
          <Loader2 className="w-4 h-4 animate-spin" strokeWidth={1.5} />
        ) : (
          <Sparkles className="w-4 h-4" strokeWidth={1.5} />
        )}
        {isPending ? 'Oppdaterer...' : 'Jeg er klar igjen'}
      </button>
    </div>
  );
}
