import Link from 'next/link';
import { redirect } from 'next/navigation';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import CheckoutButton from '@/components/checkout/CheckoutButton';
import { createClient } from '@/app/utils/supabase/server';
import { getProgram } from '@/lib/programs/registry';

type Props = {
  searchParams: Promise<{ status?: string }>;
};

export default async function CheckoutPage({ searchParams }: Props) {
  const { status } = await searchParams;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: userProgram, error } = await supabase
    .from('user_programs')
    .select('program_slug, payment_status, paid_at')
    .eq('user_id', user.id)
    .maybeSingle();

  if (error) {
    throw new Error('Kunne ikke hente programinformasjon');
  }

  if (!userProgram) {
    redirect('/quiz');
  }

  const hasPaidAccess = Boolean(userProgram.paid_at) || userProgram.payment_status === 'paid';
  if (hasPaidAccess) {
    redirect('/dashboard');
  }

  const program = getProgram(userProgram.program_slug);
  if (!program) {
    redirect('/quiz');
  }

  return (
    <main className="min-h-[80vh] bg-white flex items-center justify-center py-24 px-4">
      <div className="max-w-xl w-full space-y-6">
        <div className="text-center">
          <h1 className="font-serif text-4xl font-bold tracking-tight mb-3">Fullfør kjøpet</h1>
          <p className="text-stone-500">Du er ett steg unna tilgang til dashboardet ditt.</p>
        </div>

        {status === 'cancel' && (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl text-sm flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            Betalingen ble avbrutt. Du kan prøve igjen når du er klar.
          </div>
        )}

        {status === 'success' && (
          <div className="bg-forest-50 border border-forest-100 text-forest-900 p-4 rounded-xl text-sm flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            Betaling registrert. Hvis dashboardet ikke åpner med en gang, vent noen sekunder og prøv igjen.
          </div>
        )}

        <section className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm space-y-6">
          <div>
            <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">Ditt program</p>
            <h2 className="font-serif text-2xl font-bold tracking-tight text-stone-900">{program.name}</h2>
            <p className="text-stone-500 mt-2">{program.description}</p>
          </div>

          <div className="bg-stone-50 border border-stone-200 rounded-xl px-5 py-4 flex items-center justify-between">
            <span className="text-sm text-stone-500">Engangsbetaling</span>
            <span className="text-xl font-bold text-stone-900">{program.price},- NOK</span>
          </div>

          <CheckoutButton />

          <p className="text-xs text-stone-400 text-center">
            Har du valgt feil program? <Link href="/quiz" className="underline hover:text-stone-900">Ta quizen på nytt</Link>
          </p>
        </section>
      </div>
    </main>
  );
}
