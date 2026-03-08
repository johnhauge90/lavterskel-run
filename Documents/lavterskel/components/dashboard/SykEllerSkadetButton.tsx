'use client';

// "use client" — håndterer modal-tilstand + Server Action via useTransition.
// Vises kun når bruker IKKE allerede har en aktiv helsestatus.
// UX-filosofi: skulderfri, varm tone. Ingen skyldfølelse.

import { useState, useTransition } from 'react';
import { AlertCircle, X, Thermometer, Bandage, CheckCircle2 } from 'lucide-react';
import { reportHealthStatus } from '@/app/actions/health';
import type { HealthStatus } from '@/app/actions/health';

type Step = 'lukket' | 'velg' | 'bekreftet';

const COPY: Record<HealthStatus, { tittel: string; melding: string; emoji: string }> = {
  syk: {
    emoji: '🤒',
    tittel: 'Ta vare på deg selv.',
    melding:
      'Programmet ditt venter tålmodig. Kroppen din vet hva den gjør — hvile er ikke å gi opp, det er å investere i neste økt.',
  },
  skadet: {
    emoji: '🩹',
    tittel: 'Hvile er også trening.',
    melding:
      'Vi pauser planen din til du er klar. Vedvarer smertene, er en time hos fysioterapeut alltid verdt det.',
  },
};

export default function SykEllerSkadetButton() {
  const [step, setStep] = useState<Step>('lukket');
  const [valgtStatus, setValgtStatus] = useState<HealthStatus | null>(null);
  const [isPending, startTransition] = useTransition();

  function velg(status: HealthStatus) {
    setValgtStatus(status);
    startTransition(async () => {
      await reportHealthStatus(status);
      setStep('bekreftet');
    });
  }

  function lukk() {
    setStep('lukket');
    setValgtStatus(null);
  }

  return (
    <>
      {/* ── TRIGGER-KNAPP ────────────────────────────────────── */}
      <button
        onClick={() => setStep('velg')}
        className="text-sm font-bold text-neutral-500 hover:text-neutral-900 flex items-center gap-2 transition-colors"
      >
        <AlertCircle className="w-4 h-4" strokeWidth={1.5} />
        Syk eller skadet?
      </button>

      {/* ── MODAL OVERLAY ────────────────────────────────────── */}
      {step !== 'lukket' && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-sm"
          onClick={lukk}
        >
          <div
            className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >

            {/* ── VELG-STEG ────────────────────────────────── */}
            {step === 'velg' && (
              <>
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold tracking-tight">
                      Hva skjer?
                    </h2>
                    <p className="text-neutral-500 text-sm mt-1">
                      Vi pauser planen til du er klar igjen.
                    </p>
                  </div>
                  <button
                    onClick={lukk}
                    className="text-neutral-400 hover:text-neutral-900 transition-colors p-1"
                  >
                    <X className="w-5 h-5" strokeWidth={1.5} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => velg('syk')}
                    disabled={isPending}
                    className="flex flex-col items-center gap-3 p-6 bg-neutral-50 border-2 border-neutral-100 rounded-2xl hover:border-neutral-900 hover:bg-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    <Thermometer
                      className="w-8 h-8 text-neutral-400 group-hover:text-neutral-900 transition-colors"
                      strokeWidth={1.5}
                    />
                    <span className="font-bold text-sm">Syk</span>
                    <span className="text-xs text-neutral-400 text-center leading-snug">
                      Forkjølet, mage eller utmattet
                    </span>
                  </button>

                  <button
                    onClick={() => velg('skadet')}
                    disabled={isPending}
                    className="flex flex-col items-center gap-3 p-6 bg-neutral-50 border-2 border-neutral-100 rounded-2xl hover:border-neutral-900 hover:bg-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    <Bandage
                      className="w-8 h-8 text-neutral-400 group-hover:text-neutral-900 transition-colors"
                      strokeWidth={1.5}
                    />
                    <span className="font-bold text-sm">Skadet</span>
                    <span className="text-xs text-neutral-400 text-center leading-snug">
                      Noe gjør vondt under eller etter løping
                    </span>
                  </button>
                </div>
              </>
            )}

            {/* ── BEKREFTET-STEG ───────────────────────────── */}
            {step === 'bekreftet' && valgtStatus && (
              <div className="text-center py-2">
                <span className="text-5xl mb-6 block">{COPY[valgtStatus].emoji}</span>
                <CheckCircle2
                  className="w-6 h-6 text-emerald-500 mx-auto mb-4"
                  strokeWidth={1.5}
                />
                <h2 className="text-xl font-bold tracking-tight mb-3">
                  {COPY[valgtStatus].tittel}
                </h2>
                <p className="text-neutral-500 text-sm leading-relaxed mb-8 max-w-xs mx-auto">
                  {COPY[valgtStatus].melding}
                </p>
                <button
                  onClick={lukk}
                  className="w-full bg-neutral-900 text-white py-3.5 rounded-xl font-bold hover:bg-neutral-800 transition-colors"
                >
                  Lukk
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
}
