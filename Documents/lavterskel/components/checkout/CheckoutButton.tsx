'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Loader2 } from 'lucide-react';

export default function CheckoutButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const startCheckout = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
      });

      const data = (await response.json()) as {
        url?: string;
        redirectTo?: string;
        error?: string;
      };

      if (data.redirectTo) {
        router.push(data.redirectTo);
        return;
      }

      if (!response.ok || !data.url) {
        throw new Error(data.error ?? 'Kunne ikke starte betalingen.');
      }

      window.location.href = data.url;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Kunne ikke starte betalingen.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={startCheckout}
        disabled={loading}
        className="w-full bg-neutral-900 text-white px-6 py-4 rounded-full font-bold text-base hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Starter betaling...
          </>
        ) : (
          <>
            Gå til betaling
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>

      {error && (
        <p className="text-sm text-red-600 text-center">{error}</p>
      )}
    </div>
  );
}
