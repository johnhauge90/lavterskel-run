// Server Component — tynn assembler.
// Henter workout-completions, helsestatus, program og broadcast-meldinger parallelt.
// Viser "Finn ditt program"-CTA hvis user_programs mangler.

import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ArrowRight, Megaphone } from 'lucide-react';
import { createClient } from '@/app/utils/supabase/server';
import ProgressHeader from '@/components/dashboard/ProgressHeader';
import WorkoutCard from '@/components/dashboard/WorkoutCard';
import PodcastCard from '@/components/dashboard/PodcastCard';
import DiscountCard from '@/components/dashboard/DiscountCard';
import SykEllerSkadetButton from '@/components/dashboard/SykEllerSkadetButton';
import RecoveryBanner from '@/components/dashboard/RecoveryBanner';
import type { WorkoutStatus } from '@/components/dashboard/WorkoutCard';
import type { HealthStatus } from '@/app/actions/health';

// Statiske UUIDs for treningsøktene i uke 3.
const WORKOUT_IDS = {
  tirsdag: 'c3d4e5f6-0003-0003-0003-000000000001',
  torsdag: 'c3d4e5f6-0003-0003-0003-000000000002',
  sondag:  'c3d4e5f6-0003-0003-0003-000000000003',
} as const;

function resolveStatus(
  workoutId: string,
  orderedIds: string[],
  completedIds: Set<string>,
  isRecovering: boolean,
): WorkoutStatus {
  if (completedIds.has(workoutId)) return 'completed';
  if (isRecovering) return 'future';
  const firstIncomplete = orderedIds.find((id) => !completedIds.has(id));
  return firstIncomplete === workoutId ? 'active' : 'future';
}

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  // Fire parallelle Supabase-kall
  const [completionsResult, healthResult, programResult, broadcastResult] = await Promise.all([
    supabase
      .from('workout_completions')
      .select('workout_id')
      .eq('user_id', user.id),
    supabase
      .from('user_health_status')
      .select('status')
      .eq('user_id', user.id)
      .maybeSingle(),
    supabase
      .from('user_programs')
      .select('program_name, current_week, total_weeks')
      .eq('user_id', user.id)
      .maybeSingle(),
    supabase
      .from('broadcast_messages')
      .select('title, body')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle(),
  ]);

  const completedIds = new Set(completionsResult.data?.map((c) => c.workout_id) ?? []);
  const healthStatus = (healthResult.data?.status ?? null) as HealthStatus | null;
  const isRecovering = healthStatus !== null;
  const userProgram = programResult.data ?? null;
  const announcement = broadcastResult.data ?? null;

  const orderedIds = [WORKOUT_IDS.tirsdag, WORKOUT_IDS.torsdag, WORKOUT_IDS.sondag];

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">

      {/* Broadcast-banner (kun hvis aktiv melding) */}
      {announcement && (
        <div className="bg-forest-900 text-white rounded-2xl px-6 py-4 flex items-start gap-4 mb-8 shadow-md">
          <Megaphone className="w-5 h-5 text-forest-100 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-sm">{announcement.title}</p>
            <p className="text-forest-100/80 text-sm mt-0.5">{announcement.body}</p>
          </div>
        </div>
      )}

      {/* Ingen program: vis CTA til quiz */}
      {!userProgram ? (
        <div className="bg-forest-950 text-white p-8 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-bold text-forest-100/40 uppercase tracking-widest mb-1">
              Kom i gang
            </p>
            <h2 className="font-serif text-2xl font-bold">Du har ikke valgt et program ennå.</h2>
            <p className="text-forest-100/60 mt-1 text-sm">
              Ta quizen for å få et skreddersydd program på under 2 minutter.
            </p>
          </div>
          <Link
            href="/quiz"
            className="shrink-0 bg-white text-forest-950 px-6 py-3 rounded-xl font-bold text-sm hover:bg-stone-100 transition-colors flex items-center gap-2"
          >
            Finn ditt program
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <ProgressHeader
          userName={user.email?.split('@')[0] ?? 'Løper'}
          programName={userProgram.program_name}
          currentWeek={userProgram.current_week}
          totalWeeks={userProgram.total_weeks}
        />
      )}

      {/* Vises kun under restitusjon */}
      {isRecovering && healthStatus && (
        <RecoveryBanner status={healthStatus} />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* VENSTRE KOLONNE: Ukens Økter */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold">Ukens økter</h2>
            {!isRecovering && <SykEllerSkadetButton />}
          </div>

          <WorkoutCard
            workoutId={WORKOUT_IDS.tirsdag}
            status={resolveStatus(WORKOUT_IDS.tirsdag, orderedIds, completedIds, isRecovering)}
            dayLabel="Tirsdag"
            statusLabel="Fullført"
            title="Rolig Sone 2 (45 min)"
            description="Husk at du skal kunne prate i telefonen på denne økten. Gå i bakkene hvis pulsen stiger."
          />

          <WorkoutCard
            workoutId={WORKOUT_IDS.torsdag}
            status={resolveStatus(WORKOUT_IDS.torsdag, orderedIds, completedIds, isRecovering)}
            dayLabel="Torsdag"
            statusLabel="I dag"
            title="Terskelfart (4 x 4 min)"
            description=""
            coachNote="Varm opp i 15 minutter. Dragene skal være krevende, men du skal ikke stivne helt. 2 minutter aktiv pause mellom dragene."
          />

          <WorkoutCard
            workoutId={WORKOUT_IDS.sondag}
            status={resolveStatus(WORKOUT_IDS.sondag, orderedIds, completedIds, isRecovering)}
            dayLabel="Søndag"
            title="Langtur (90 min)"
            description="Ukas viktigste økt for å bygge utholdenhet. Finn en fin løype og nyt turen."
          />
        </div>

        {/* HØYRE KOLONNE: Feed */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold mb-2">Nytt fra oss</h2>

          <PodcastCard
            episodeTitle="Dypdykk: Slik spiser du før langkjøring"
            episodeDescription="Vi går gjennom nøyaktig hva du bør ha i deg før søndagsturen."
            durationMin={34}
          />

          <DiscountCard
            partnerName="HOKA"
            discountPct={15}
            description="Siden du er over halvveis i programmet, har vi fikset en rabattkode på nye sko til deg!"
            code="LAVTERSKEL15"
          />
        </div>

      </div>
    </div>
  );
}
