import Link from 'next/link';
import { createAdminClient } from '@/app/utils/supabase/admin';
import { Users, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

type StatCardProps = {
  label: string;
  value: string | number;
  sub?: string;
  icon: React.ReactNode;
  href?: string;
  accent?: boolean;
};

function StatCard({ label, value, sub, icon, href, accent }: StatCardProps) {
  const inner = (
    <div className={`bg-white border rounded-2xl p-6 shadow-sm flex items-start gap-4 ${accent ? 'border-forest-200 bg-forest-50' : 'border-stone-200'}`}>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${accent ? 'bg-forest-900 text-white' : 'bg-stone-100 text-stone-500'}`}>
        {icon}
      </div>
      <div>
        <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">{label}</p>
        <p className="text-3xl font-bold text-stone-900">{value}</p>
        {sub && <p className="text-sm text-stone-500 mt-0.5">{sub}</p>}
      </div>
    </div>
  );

  if (href) return <Link href={href}>{inner}</Link>;
  return inner;
}

export default async function AdminOverviewPage() {
  const admin = createAdminClient();

  // Hent alle data parallelt
  const [
    { data: authData },
    { data: programs },
    { data: completions },
    { data: healthStatuses },
  ] = await Promise.all([
    admin.auth.admin.listUsers({ perPage: 1000 }),
    admin.from('user_programs').select('program_slug, payment_status, paid_at, price_nok'),
    admin.from('workout_completions').select('id', { count: 'exact', head: true }),
    admin.from('user_health_status').select('id', { count: 'exact', head: true }),
  ]);

  const totalUsers = authData?.users.length ?? 0;
  const paidUsers = programs?.filter(p => p.paid_at || p.payment_status === 'paid') ?? [];
  const totalRevenue = paidUsers.reduce((sum, p) => sum + (p.price_nok ?? 0), 0);
  const pendingUsers = programs?.filter(p => !p.paid_at && p.payment_status === 'pending') ?? [];
  const totalCompletions = completions ?? 0;
  const sickCount = healthStatuses ?? 0;

  // Fordeling per program
  const programCounts: Record<string, number> = {};
  programs?.forEach(p => {
    programCounts[p.program_slug] = (programCounts[p.program_slug] ?? 0) + 1;
  });
  const topPrograms = Object.entries(programCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="p-8 max-w-6xl">
      <div className="mb-10">
        <h1 className="font-serif text-4xl font-bold text-stone-900 mb-2">Oversikt</h1>
        <p className="text-stone-500">Sanntid — alle tall hentes direkte fra databasen.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard
          label="Totalt brukere"
          value={totalUsers}
          icon={<Users className="w-5 h-5" />}
          href="/admin/users"
        />
        <StatCard
          label="Betalende"
          value={paidUsers.length}
          sub={`av ${programs?.length ?? 0} med program`}
          icon={<CheckCircle2 className="w-5 h-5" />}
          accent
        />
        <StatCard
          label="Total inntekt"
          value={`${totalRevenue.toLocaleString('nb-NO')} kr`}
          sub="manuell + Stripe"
          icon={<TrendingUp className="w-5 h-5" />}
          accent
        />
        <StatCard
          label="Syk / Skadet nå"
          value={sickCount}
          icon={<AlertTriangle className="w-5 h-5" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ventende betaling */}
        <section className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
          <h2 className="font-bold text-stone-900 mb-1">
            Venter på betaling
            {pendingUsers.length > 0 && (
              <span className="ml-2 bg-amber-100 text-amber-700 text-xs font-bold px-2 py-0.5 rounded-full">
                {pendingUsers.length}
              </span>
            )}
          </h2>
          <p className="text-sm text-stone-500 mb-4">Brukere med program men uten bekreftet betaling. Marker som betalt etter Vipps-kvittering.</p>
          {pendingUsers.length === 0 ? (
            <p className="text-sm text-stone-400 italic">Ingen ventende betalinger.</p>
          ) : (
            <ul className="space-y-2">
              {pendingUsers.slice(0, 8).map((p, i) => (
                <li key={i} className="flex items-center justify-between text-sm">
                  <span className="font-mono text-stone-500 text-xs">{p.program_slug}</span>
                  <Link
                    href="/admin/users"
                    className="text-forest-700 font-bold hover:text-forest-900 text-xs"
                  >
                    Marker betalt →
                  </Link>
                </li>
              ))}
              {pendingUsers.length > 8 && (
                <li className="text-xs text-stone-400">+{pendingUsers.length - 8} til</li>
              )}
            </ul>
          )}
        </section>

        {/* Populære programmer */}
        <section className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
          <h2 className="font-bold text-stone-900 mb-4">Populære programmer</h2>
          {topPrograms.length === 0 ? (
            <p className="text-sm text-stone-400 italic">Ingen programdata ennå.</p>
          ) : (
            <ul className="space-y-3">
              {topPrograms.map(([slug, count]) => (
                <li key={slug} className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-stone-700">{slug}</span>
                      <span className="text-xs font-bold text-stone-500">{count}</span>
                    </div>
                    <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-forest-700 rounded-full"
                        style={{ width: `${Math.min(100, (count / (programs?.length || 1)) * 100)}%` }}
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {/* Snarveier */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link href="/admin/users" className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all text-center">
          <Users className="w-6 h-6 text-forest-700 mx-auto mb-2" />
          <p className="font-bold text-stone-900 text-sm">Administrer kunder</p>
          <p className="text-xs text-stone-500 mt-1">Se alle, marker betalt, bytt program, slett</p>
        </Link>
        <Link href="/admin/messages" className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all text-center">
          <svg className="w-6 h-6 text-forest-700 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
          <p className="font-bold text-stone-900 text-sm">Send melding</p>
          <p className="text-xs text-stone-500 mt-1">Broadcast til alle dashboards</p>
        </Link>
        <div className="bg-stone-50 border border-dashed border-stone-300 rounded-2xl p-5 text-center opacity-60">
          <TrendingUp className="w-6 h-6 text-stone-400 mx-auto mb-2" />
          <p className="font-bold text-stone-500 text-sm">Inntektsrapport</p>
          <p className="text-xs text-stone-400 mt-1">Kommer i Fase 2</p>
        </div>
      </div>
    </div>
  );
}
