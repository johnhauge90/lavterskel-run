import { notFound, redirect } from 'next/navigation';
import { createAdminClient } from '@/app/utils/supabase/admin';
import { PROGRAMS } from '@/lib/programs/registry';
import AdminUserActions from './AdminUserActions';
import {
  CheckCircle2,
  Clock,
  User,
  Activity,
  ShieldAlert,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

type Props = { params: Promise<{ id: string }> };

export default async function AdminUserDetailPage({ params }: Props) {
  const { id } = await params;
  const admin = createAdminClient();

  const [
    { data: userData, error: userError },
    { data: program },
    { data: completions },
    { data: healthStatus },
  ] = await Promise.all([
    admin.auth.admin.getUserById(id),
    admin.from('user_programs')
      .select('*')
      .eq('user_id', id)
      .maybeSingle(),
    admin.from('workout_completions')
      .select('workout_id, completed_at')
      .eq('user_id', id)
      .order('completed_at', { ascending: false }),
    admin.from('user_health_status')
      .select('status, note, updated_at')
      .eq('user_id', id)
      .maybeSingle(),
  ]);

  if (userError || !userData?.user) notFound();

  const user = userData.user;
  const isPaid = program?.paid_at || program?.payment_status === 'paid';

  return (
    <div className="p-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-14 h-14 bg-stone-100 rounded-full flex items-center justify-center">
            <User className="w-7 h-7 text-stone-400" />
          </div>
          <div>
            <h1 className="font-serif text-3xl font-bold text-stone-900">{user.email}</h1>
            <p className="text-stone-500 text-sm">
              Registrert {new Date(user.created_at).toLocaleDateString('nb-NO', { day: 'numeric', month: 'long', year: 'numeric' })}
              {user.last_sign_in_at && ` · Sist innlogget ${new Date(user.last_sign_in_at).toLocaleDateString('nb-NO')}`}
            </p>
          </div>
        </div>

        {/* Status badges */}
        <div className="flex items-center gap-2 mt-4 flex-wrap">
          {isPaid ? (
            <span className="inline-flex items-center gap-1.5 bg-forest-100 text-forest-900 text-xs font-bold px-3 py-1 rounded-full">
              <CheckCircle2 className="w-3 h-3" /> Betalt
            </span>
          ) : program ? (
            <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full">
              <Clock className="w-3 h-3" /> Venter på betaling
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 bg-stone-100 text-stone-500 text-xs font-bold px-3 py-1 rounded-full">
              Intet program
            </span>
          )}

          {healthStatus && (
            <span className="inline-flex items-center gap-1.5 bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full">
              <ShieldAlert className="w-3 h-3" /> {healthStatus.status === 'sick' ? 'Syk' : 'Skadet'}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Program-info */}
        <section className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
          <h2 className="font-bold text-stone-900 mb-4">Program</h2>
          {program ? (
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-stone-500">Program</span>
                <span className="font-medium text-stone-900">{program.program_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Slug</span>
                <span className="font-mono text-xs text-stone-600">{program.program_slug}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Progresjon</span>
                <span className="font-medium">Uke {program.current_week} / {program.total_weeks}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Pris</span>
                <span className="font-medium">{program.price_nok ? `${program.price_nok} kr` : '—'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Betalt</span>
                <span className="font-medium">
                  {program.paid_at
                    ? new Date(program.paid_at).toLocaleDateString('nb-NO')
                    : program.payment_status === 'paid' ? 'Ja' : 'Nei'}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-sm text-stone-400 italic">Ingen program tildelt.</p>
          )}
        </section>

        {/* Aktivitet */}
        <section className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-4 h-4 text-stone-500" />
            <h2 className="font-bold text-stone-900">Aktivitet</h2>
            <span className="ml-auto text-xs text-stone-400">{completions?.length ?? 0} økt(er) fullført</span>
          </div>
          {!completions?.length ? (
            <p className="text-sm text-stone-400 italic">Ingen fullførte økter.</p>
          ) : (
            <ul className="space-y-2 max-h-48 overflow-y-auto">
              {completions.slice(0, 10).map((c) => (
                <li key={c.workout_id} className="text-sm text-stone-600 flex justify-between">
                  <span className="font-mono text-xs text-stone-400 truncate max-w-[180px]">{c.workout_id}</span>
                  <span className="text-xs text-stone-400 shrink-0 ml-2">
                    {new Date(c.completed_at).toLocaleDateString('nb-NO')}
                  </span>
                </li>
              ))}
              {(completions?.length ?? 0) > 10 && (
                <li className="text-xs text-stone-400">+{(completions?.length ?? 0) - 10} til</li>
              )}
            </ul>
          )}
        </section>
      </div>

      {/* Admin-handlinger (klient-komponent for interaktivitet) */}
      <AdminUserActions
        userId={id}
        userEmail={user.email ?? ''}
        isPaid={!!isPaid}
        hasProgram={!!program}
        currentProgramSlug={program?.program_slug ?? null}
        currentWeek={program?.current_week ?? null}
        totalWeeks={program?.total_weeks ?? null}
        allPrograms={Object.values(PROGRAMS).map(p => ({ slug: p.slug, name: p.name }))}
      />
    </div>
  );
}
