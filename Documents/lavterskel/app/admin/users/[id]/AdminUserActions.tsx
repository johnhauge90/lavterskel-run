'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
  markUserAsPaid,
  changeUserProgram,
  assignProgramToUser,
  deleteUser,
  setUserWeek,
} from '@/app/actions/admin';
import { CheckCircle2, Trash2, RefreshCw, ArrowUpDown, Loader2 } from 'lucide-react';

type Program = { slug: string; name: string };

type Props = {
  userId: string;
  userEmail: string;
  isPaid: boolean;
  hasProgram: boolean;
  currentProgramSlug: string | null;
  currentWeek: number | null;
  totalWeeks: number | null;
  allPrograms: Program[];
};

export default function AdminUserActions({
  userId,
  userEmail,
  isPaid,
  hasProgram,
  currentProgramSlug,
  currentWeek,
  totalWeeks,
  allPrograms,
}: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [selectedSlug, setSelectedSlug] = useState(currentProgramSlug ?? allPrograms[0]?.slug ?? '');
  const [weekInput, setWeekInput] = useState(String(currentWeek ?? 1));
  const [confirmDelete, setConfirmDelete] = useState(false);

  const run = (action: () => Promise<void>, successMsg: string) => {
    setError(null);
    setSuccess(null);
    startTransition(async () => {
      try {
        await action();
        setSuccess(successMsg);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Ukjent feil');
      }
    });
  };

  return (
    <section className="mt-6 bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-6">
      <h2 className="font-bold text-stone-900">Admin-handlinger</h2>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-sm font-medium">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-forest-50 border border-forest-100 text-forest-900 p-3 rounded-xl text-sm font-medium">
          {success}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* Marker som betalt */}
        {!isPaid && hasProgram && (
          <div className="border border-stone-200 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-forest-700" />
              <h3 className="font-bold text-sm text-stone-900">Marker som betalt</h3>
            </div>
            <p className="text-xs text-stone-500">Brukes etter manuell Vipps-betaling.</p>
            <button
              onClick={() => run(() => markUserAsPaid(userId), 'Bruker markert som betalt ✓')}
              disabled={pending}
              className="w-full bg-forest-900 text-white py-2.5 rounded-xl text-sm font-bold hover:bg-forest-800 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {pending ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
              Bekreft betaling
            </button>
          </div>
        )}

        {/* Bytt program */}
        <div className="border border-stone-200 rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-stone-500" />
            <h3 className="font-bold text-sm text-stone-900">
              {hasProgram ? 'Bytt program' : 'Tildel program'}
            </h3>
          </div>
          <select
            value={selectedSlug}
            onChange={(e) => setSelectedSlug(e.target.value)}
            className="w-full bg-stone-50 border border-stone-200 rounded-xl py-2 px-3 text-sm outline-none focus:border-forest-900 transition-all"
          >
            {allPrograms.map(p => (
              <option key={p.slug} value={p.slug}>{p.slug}</option>
            ))}
          </select>
          <button
            onClick={() => run(
              () => hasProgram
                ? changeUserProgram(userId, selectedSlug)
                : assignProgramToUser(userId, selectedSlug),
              `Program endret til ${selectedSlug} ✓`
            )}
            disabled={pending || selectedSlug === currentProgramSlug}
            className="w-full bg-stone-900 text-white py-2.5 rounded-xl text-sm font-bold hover:bg-stone-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {pending ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {hasProgram ? 'Bytt program' : 'Tildel program'}
          </button>
        </div>

        {/* Sett aktiv uke */}
        {hasProgram && totalWeeks && (
          <div className="border border-stone-200 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-stone-500" />
              <h3 className="font-bold text-sm text-stone-900">Sett aktiv uke</h3>
            </div>
            <input
              type="number"
              min={1}
              max={totalWeeks}
              value={weekInput}
              onChange={(e) => setWeekInput(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl py-2 px-3 text-sm outline-none focus:border-forest-900 transition-all"
            />
            <button
              onClick={() => run(
                () => setUserWeek(userId, parseInt(weekInput)),
                `Uke satt til ${weekInput} ✓`
              )}
              disabled={pending}
              className="w-full bg-stone-900 text-white py-2.5 rounded-xl text-sm font-bold hover:bg-stone-700 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {pending ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              Oppdater uke
            </button>
          </div>
        )}

        {/* Slett bruker */}
        <div className="border border-red-100 bg-red-50/50 rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Trash2 className="w-4 h-4 text-red-500" />
            <h3 className="font-bold text-sm text-red-700">Slett bruker</h3>
          </div>
          <p className="text-xs text-red-500">Sletter auth-konto + alle tilknyttede data. Kan ikke angres.</p>
          {!confirmDelete ? (
            <button
              onClick={() => setConfirmDelete(true)}
              className="w-full border border-red-200 text-red-600 py-2.5 rounded-xl text-sm font-bold hover:bg-red-50 transition-colors"
            >
              Slett {userEmail}
            </button>
          ) : (
            <div className="space-y-2">
              <p className="text-xs font-bold text-red-700">Er du 100% sikker?</p>
              <div className="flex gap-2">
                <button
                  onClick={() => run(async () => {
                    await deleteUser(userId);
                    router.push('/admin/users');
                  }, 'Bruker slettet')}
                  disabled={pending}
                  className="flex-1 bg-red-600 text-white py-2 rounded-xl text-sm font-bold hover:bg-red-700 transition-colors disabled:opacity-70"
                >
                  Ja, slett
                </button>
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="flex-1 border border-stone-200 text-stone-600 py-2 rounded-xl text-sm font-bold hover:bg-stone-50"
                >
                  Avbryt
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
