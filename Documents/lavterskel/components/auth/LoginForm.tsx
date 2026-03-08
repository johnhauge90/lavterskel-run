'use client';

// "use client" — bruker useSearchParams for å lese ?mode=registrer fra URL.
// Separert ut fra login/page.tsx fordi useSearchParams krever Suspense-grense i App Router.
// Initialiserer isLogin basert på URL-param: ?mode=registrer → registreringsskjema.

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowRight, Mail, Lock, AlertCircle, Loader2 } from 'lucide-react';
import { createClient } from '@/app/utils/supabase/client';
import { assignProgram } from '@/app/actions/programs';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Initialiseres én gang: ?mode=registrer → false (viser registreringsskjema)
  const [isLogin, setIsLogin] = useState(searchParams.get('mode') !== 'registrer');
  // ?program=sofa-5km — leses én gang, brukes ved signup
  const programSlug = searchParams.get('program') ?? '';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getPostAuthPath = async (): Promise<string> => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('user_programs')
      .select('paid_at, payment_status')
      .maybeSingle();

    if (error) {
      return programSlug ? '/checkout' : '/quiz';
    }

    if (!data) return programSlug ? '/checkout' : '/quiz';

    const hasPaidAccess = Boolean(data.paid_at) || data.payment_status === 'paid';
    return hasPaidAccess ? '/dashboard' : '/checkout';
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        if (programSlug) {
          await assignProgram(programSlug);
        }
        const nextPath = await getPostAuthPath();
        router.push(nextPath);
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        if (programSlug) await assignProgram(programSlug);
        const nextPath = await getPostAuthPath();
        router.push(nextPath);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Det skjedde en feil. Prøv igjen.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[80vh] bg-white flex items-center justify-center py-24 px-4">
      <div className="max-w-md w-full">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl font-bold tracking-tight mb-3">
            {isLogin ? 'Velkommen tilbake' : 'Bli med i gjengen'}
          </h1>
          <p className="text-stone-500">
            {isLogin
              ? 'Logg inn for å se treningsprogrammet ditt.'
              : 'Opprett en bruker for å starte reisen din.'}
          </p>
        </div>

        {/* Form */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200">
          <form onSubmit={handleAuth} className="space-y-6">

            {/* Feilmelding */}
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm flex items-center gap-3 font-medium">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p>{error}</p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2 block">
                  E-post
                </label>
                <div className="relative">
                  <Mail className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="kalle@lavterskel.no"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-forest-900 focus:ring-1 focus:ring-forest-900 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2 block">
                  Passord
                </label>
                <div className="relative">
                  <Lock className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-forest-900 focus:ring-1 focus:ring-forest-900 transition-all"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-forest-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-forest-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {isLogin ? 'Logg inn' : 'Opprett konto'}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Toggle */}
        <div className="mt-8 text-center">
          <button
            onClick={() => { setIsLogin(!isLogin); setError(null); }}
            className="text-stone-500 hover:text-stone-900 font-medium transition-colors"
          >
            {isLogin
              ? 'Har du ikke konto? Opprett en her.'
              : 'Har du allerede konto? Logg inn.'}
          </button>
        </div>

      </div>
    </main>
  );
}
