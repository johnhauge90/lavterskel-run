import { createClient } from "@/utils/supabase/server";
import { funnelSteps } from "@/lib/funnel";

function percent(part: number, total: number) {
  if (total === 0) return "0%";
  return `${Math.round((part / total) * 100)}%`;
}

export default async function FunnelDashboardPage() {
  const now = new Date();
  const sevenDaysAgo = new Date(now);
  sevenDaysAgo.setDate(now.getDate() - 7);

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("funnel_events")
    .select("event_name, event_props, occurred_at")
    .in("event_name", [...funnelSteps])
    .gte("occurred_at", sevenDaysAgo.toISOString())
    .order("occurred_at", { ascending: false });

  const rows = data ?? [];

  const stepCounts = {
    onboarding_started: rows.filter((r) => r.event_name === "onboarding_started").length,
    plan_generated: rows.filter((r) => r.event_name === "plan_generated").length,
    book_meeting_clicked: rows.filter((r) => r.event_name === "book_meeting_clicked").length,
  };

  const onboardingToPlan = percent(stepCounts.plan_generated, stepCounts.onboarding_started);
  const planToMeeting = percent(stepCounts.book_meeting_clicked, stepCounts.plan_generated);
  const onboardingToMeeting = percent(stepCounts.book_meeting_clicked, stepCounts.onboarding_started);
  const dropA = stepCounts.onboarding_started - stepCounts.plan_generated;
  const dropB = stepCounts.plan_generated - stepCounts.book_meeting_clicked;
  const biggestDropStep = dropA >= dropB ? "onboarding_to_plan" : "plan_to_meeting";
  const biggestDropLabel =
    biggestDropStep === "onboarding_to_plan"
      ? "Onboarding → Plan"
      : "Plan → Book møte";
  const recommendation =
    biggestDropStep === "onboarding_to_plan"
      ? "Forenkle valget i onboarding ytterligere og push anbefalt 1-klikk plan."
      : "Styrk B2B-CTA i plan/start med mer konkret møteløfte og kortere bookingvei.";

  const dateRange = `${sevenDaysAgo.toLocaleDateString("nb-NO")} - ${now.toLocaleDateString("nb-NO")}`;
  const variants = ["control", "quickstart"] as const;
  const variantStats = variants.map((variant) => {
    const started = rows.filter(
      (r) =>
        r.event_name === "onboarding_started" &&
        (r.event_props as { ab_variant?: string } | null)?.ab_variant === variant
    ).length;
    const generated = rows.filter(
      (r) =>
        r.event_name === "plan_generated" &&
        (r.event_props as { ab_variant?: string } | null)?.ab_variant === variant
    ).length;

    return {
      variant,
      started,
      generated,
      conversion: percent(generated, started),
    };
  });

  return (
    <div className="min-h-screen bg-cream">
      <main className="mx-auto max-w-5xl px-6 py-12">
        <header className="mb-8 border border-cream-border bg-cream-2 p-8">
          <p className="mb-2 text-xs uppercase tracking-widest text-ink-4">Uke 1 baseline</p>
          <h1 className="mb-3 text-5xl text-ink md:text-6xl">Onboarding Funnel</h1>
          <p className="text-ink-3">Datoperiode: {dateRange}</p>
          {error ? (
            <p className="mt-3 border border-red-accent/30 bg-red-accent/5 p-3 text-sm text-red-accent">
              Kunne ikke hente funnel-data fra Supabase. Sjekk migrasjon/RLS.
            </p>
          ) : null}
        </header>

        <section className="mb-8 grid gap-4 md:grid-cols-3">
          <article className="border border-cream-border bg-cream p-6">
            <p className="text-xs uppercase tracking-widest text-ink-4">Steg 1</p>
            <h2 className="mt-2 text-3xl text-ink">Onboarding startet</h2>
            <p className="mt-2 text-4xl text-gold">{stepCounts.onboarding_started}</p>
          </article>

          <article className="border border-cream-border bg-cream p-6">
            <p className="text-xs uppercase tracking-widest text-ink-4">Steg 2</p>
            <h2 className="mt-2 text-3xl text-ink">Plan generert</h2>
            <p className="mt-2 text-4xl text-gold">{stepCounts.plan_generated}</p>
            <p className="mt-2 text-sm text-ink-3">Fra steg 1: {onboardingToPlan}</p>
          </article>

          <article className="border border-cream-border bg-cream p-6">
            <p className="text-xs uppercase tracking-widest text-ink-4">Steg 3</p>
            <h2 className="mt-2 text-3xl text-ink">Book møte klikk</h2>
            <p className="mt-2 text-4xl text-gold">{stepCounts.book_meeting_clicked}</p>
            <p className="mt-2 text-sm text-ink-3">Fra steg 2: {planToMeeting}</p>
          </article>
        </section>

        <section className="border border-ink bg-ink p-8">
          <h3 className="mb-2 text-4xl text-cream">Konvertering total</h3>
          <p className="text-lg text-ink-4">Onboarding startet til Book møte klikk: {onboardingToMeeting}</p>
        </section>

        <section className="mt-8 border border-gold/20 bg-gold/5 p-6">
          <p className="text-xs uppercase tracking-widest text-gold">Friksjonsdiagnose</p>
          <h3 className="mt-2 text-3xl text-ink">Største frafall: {biggestDropLabel}</h3>
          <p className="mt-2 text-sm text-ink-3">{recommendation}</p>
        </section>

        <section className="mt-8 border border-cream-border bg-cream p-6">
          <h3 className="mb-3 text-3xl text-ink">A/B-splitt: Onboarding → Plan</h3>
          <div className="overflow-x-auto border border-cream-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-cream-border bg-cream-2">
                  <th className="px-4 py-3 text-left font-medium text-ink">Variant</th>
                  <th className="px-4 py-3 text-left font-medium text-ink">Onboarding startet</th>
                  <th className="px-4 py-3 text-left font-medium text-ink">Plan generert</th>
                  <th className="px-4 py-3 text-left font-medium text-ink">Konvertering</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-border">
                {variantStats.map((row) => (
                  <tr key={row.variant}>
                    <td className="px-4 py-3 text-ink">{row.variant}</td>
                    <td className="px-4 py-3 text-ink-2">{row.started}</td>
                    <td className="px-4 py-3 text-ink-2">{row.generated}</td>
                    <td className="px-4 py-3 text-gold">{row.conversion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
