import Link from 'next/link';
import { createAdminClient } from '@/app/utils/supabase/admin';
import { CheckCircle2, Clock, User, ChevronRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminUsersPage() {
  const admin = createAdminClient();

  const [{ data: authData }, { data: programs }] = await Promise.all([
    admin.auth.admin.listUsers({ perPage: 1000 }),
    admin.from('user_programs').select('user_id, program_slug, program_name, payment_status, paid_at, price_nok, current_week, total_weeks, started_at'),
  ]);

  const users = authData?.users ?? [];
  const programByUserId = Object.fromEntries(
    (programs ?? []).map(p => [p.user_id, p])
  );

  // Sorter: betalende øverst, deretter sist registrert
  const sorted = [...users].sort((a, b) => {
    const pA = programByUserId[a.id];
    const pB = programByUserId[b.id];
    const paidA = pA?.paid_at ? 1 : 0;
    const paidB = pB?.paid_at ? 1 : 0;
    if (paidB !== paidA) return paidB - paidA;
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-4xl font-bold text-stone-900 mb-1">Kunder</h1>
          <p className="text-stone-500">{users.length} brukere totalt</p>
        </div>
      </div>

      <div className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-[1fr_1fr_auto_auto] gap-x-4 px-6 py-3 border-b border-stone-100 bg-stone-50">
          <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">Bruker</span>
          <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">Program</span>
          <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">Status</span>
          <span className="text-xs font-bold text-stone-400 uppercase tracking-widest"></span>
        </div>

        {sorted.length === 0 && (
          <div className="px-6 py-12 text-center text-stone-400">Ingen brukere ennå.</div>
        )}

        {sorted.map((user) => {
          const prog = programByUserId[user.id];
          const isPaid = prog?.paid_at || prog?.payment_status === 'paid';
          const isPending = prog && !isPaid;

          return (
            <Link
              key={user.id}
              href={`/admin/users/${user.id}`}
              className="grid grid-cols-[1fr_1fr_auto_auto] gap-x-4 px-6 py-4 border-b border-stone-100 hover:bg-stone-50 transition-colors items-center"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 bg-stone-100 rounded-full flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-stone-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-stone-900 truncate">{user.email}</p>
                  <p className="text-xs text-stone-400">
                    Registrert {new Date(user.created_at).toLocaleDateString('nb-NO')}
                  </p>
                </div>
              </div>

              <div className="min-w-0">
                {prog ? (
                  <>
                    <p className="text-sm font-medium text-stone-700 truncate">{prog.program_name}</p>
                    <p className="text-xs text-stone-400">Uke {prog.current_week} av {prog.total_weeks}</p>
                  </>
                ) : (
                  <span className="text-xs text-stone-400 italic">Intet program</span>
                )}
              </div>

              <div>
                {isPaid ? (
                  <span className="inline-flex items-center gap-1.5 bg-forest-100 text-forest-900 text-xs font-bold px-2.5 py-1 rounded-full">
                    <CheckCircle2 className="w-3 h-3" />
                    Betalt
                  </span>
                ) : isPending ? (
                  <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-full">
                    <Clock className="w-3 h-3" />
                    Venter
                  </span>
                ) : (
                  <span className="text-xs text-stone-400">—</span>
                )}
              </div>

              <ChevronRight className="w-4 h-4 text-stone-400" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
