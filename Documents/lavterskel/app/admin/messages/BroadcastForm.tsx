'use client';

import { useState, useTransition } from 'react';
import { sendBroadcastMessage, deactivateBroadcastMessage } from '@/app/actions/admin';
import { Send, Loader2 } from 'lucide-react';

type Props = { adminUserId: string };

export default function BroadcastForm({ adminUserId }: Props) {
  const [pending, startTransition] = useTransition();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    setError(null);
    setSuccess(false);
    startTransition(async () => {
      try {
        await sendBroadcastMessage(title.trim(), body.trim(), adminUserId);
        setTitle('');
        setBody('');
        setSuccess(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Feil ved sending');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-sm">{error}</div>
      )}
      {success && (
        <div className="bg-forest-50 border border-forest-100 text-forest-900 p-3 rounded-xl text-sm font-medium">
          Melding sendt og aktivert på alle dashboards ✓
        </div>
      )}

      <div>
        <label className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2 block">Tittel</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Ny ukesplan er klar!"
          className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3 px-4 text-sm outline-none focus:border-forest-900 transition-all"
        />
      </div>

      <div>
        <label className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2 block">Melding</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          rows={3}
          placeholder="Denne uken fokuserer vi på rolig langkjøring. Sjekk dashboardet ditt for detaljer."
          className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3 px-4 text-sm outline-none focus:border-forest-900 transition-all resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={pending || !title.trim() || !body.trim()}
        className="flex items-center gap-2 bg-forest-900 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-forest-800 transition-colors disabled:opacity-70"
      >
        {pending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        Send til alle dashboards
      </button>
    </form>
  );
}
