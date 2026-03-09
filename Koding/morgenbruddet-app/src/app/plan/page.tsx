import Link from "next/link";
import { ArrowLeft, Car, Activity, Wrench, Calendar, CheckCircle2 } from "lucide-react";
import TrackEventOnMount from "@/components/analytics/TrackEventOnMount";
import TrackEventLink from "@/components/analytics/TrackEventLink";
import { normalizeOnboardingVariant } from "@/lib/ab";

type SearchParams = {
  fokus?: string;
  profil?: string;
  variant?: string;
};

const fokusInfo = {
  trafikk: {
    icon: Car,
    title: "Trafikk-trygghet",
    intro: "Du starter på bilfrie eller rolig trafikkerte strekk med kaptein foran og bakerst.",
    checklist: ["Velg bilfri rute", "Øv på tydelig tegnbruk", "Sykle i gruppe med no-drop"],
    readMore: "/bibliotek/sykkel-i-trafikken",
  },
  form: {
    icon: Activity,
    title: "Fysisk form",
    intro: "Du bygger kapasitet i pratefart. Målet er kontinuitet, ikke heroiske økter.",
    checklist: ["Hold snakketempo", "Tre korte økter i uka", "Én rolig langtur med pause"],
    readMore: "/bibliotek/6-uker-til-nordsjorittet",
  },
  utstyr: {
    icon: Wrench,
    title: "Utstyr og klær",
    intro: "Du kommer som du er og bruker en enkel utstyrssjekk tilpasset været i Rogaland.",
    checklist: ["Hjelm, lys og lås", "Lag-på-lag etter vær", "Test utstyr før langtur"],
    readMore: "/bibliotek/utstyrsliste-nybegynner",
  },
} as const;

const profilInfo = {
  fersk: {
    title: "Helt fersk",
    rhythm: "2 økter + 1 sosial tur",
    rideDurations: ["20-30 min", "25-35 min", "45-60 min"],
  },
  igang: {
    title: "Komme i gang igjen",
    rhythm: "3 økter med rolig progresjon",
    rideDurations: ["30-40 min", "35-45 min", "60-75 min"],
  },
  ritt: {
    title: "Mot ritt",
    rhythm: "3 økter + 1 strukturert langtur",
    rideDurations: ["40-50 min", "45-60 min", "90-120 min"],
  },
} as const;

function normalizeFokus(fokus?: string) {
  if (fokus === "trafikk" || fokus === "form" || fokus === "utstyr") {
    return fokus;
  }
  return "trafikk";
}

function normalizeProfil(profil?: string) {
  if (profil === "fersk" || profil === "igang" || profil === "ritt") {
    return profil;
  }
  return "fersk";
}

export default async function PlanPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const fokus = normalizeFokus(params.fokus);
  const profil = normalizeProfil(params.profil);
  const variant = normalizeOnboardingVariant(params.variant);
  const focus = fokusInfo[fokus];
  const profile = profilInfo[profil];
  const Icon = focus.icon;

  const weeks = [
    {
      week: 1,
      goal: "Skap trygg rytme",
      action: "Gjennomfør alle tre økter i lav intensitet.",
      checkpoint: "Du føler deg tryggere etter tur 2.",
    },
    {
      week: 2,
      goal: "Bygg vane",
      action: "Hold samme dager hver uke (forutsigbar kalender).",
      checkpoint: "Du sykler uten å vurdere å avlyse.",
    },
    {
      week: 3,
      goal: "Utvid komfortsonen",
      action: "Legg inn én litt lengre tur med pause halvveis.",
      checkpoint: "Du avslutter turen med overskudd.",
    },
    {
      week: 4,
      goal: "Rolig konsolidering",
      action: "Kutt total belastning med 20%, men behold rytmen.",
      checkpoint: "Du møter neste uke med friske bein.",
    },
    {
      week: 5,
      goal: "Trygg progresjon",
      action: "Øk langturen moderat i tid, ikke i fart.",
      checkpoint: "Du håndterer varighet uten stress.",
    },
    {
      week: 6,
      goal: "Klar for neste nivå",
      action: "Kjør en lett uke med fokus på flyt og mestring.",
      checkpoint: "Du er klar for din første faste Morgenbruddet-rute.",
    },
  ];

  return (
    <div className="min-h-screen bg-cream">
      <TrackEventOnMount
        eventName="plan_generated"
        props={{ fokus, profil, ab_variant: variant }}
      />
      <div className="px-6 py-6">
        <Link
          href={`/onboarding?fokus=${fokus}`}
          className="inline-flex items-center gap-2 text-ink-4 transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Tilbake</span>
        </Link>
      </div>

      <main className="mx-auto w-full max-w-5xl px-6 pb-16 pt-4">
        <header className="mb-10 border border-cream-border bg-cream-2 p-8">
          <p className="mb-2 text-xs uppercase tracking-widest text-ink-4">Din personlige plan</p>
          <h1 className="mb-3 text-5xl text-ink md:text-6xl">6 uker med trygg progresjon</h1>
          <p className="max-w-3xl text-lg text-ink-3">
            Fokus: {focus.title}. Profil: {profile.title}. Rytme: {profile.rhythm}.
          </p>
        </header>

        <section className="mb-8 grid gap-4 md:grid-cols-2">
          <div className="border border-gold/20 bg-gold/5 p-6">
            <div className="mb-3 inline-flex items-center gap-2 border border-gold/30 px-2 py-1 text-xs uppercase tracking-widest text-gold">
              <Icon className="h-3.5 w-3.5" />
              Trygghetsløfte
            </div>
            <p className="mb-4 text-ink">{focus.intro}</p>
            <ul className="space-y-2 text-sm text-ink-3">
              {focus.checklist.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-cream-border bg-cream p-6">
            <p className="mb-3 text-xs uppercase tracking-widest text-ink-4">Ukerytme</p>
            <div className="space-y-3">
              {["Økt 1", "Økt 2", "Langtur"].map((label, idx) => (
                <div key={label} className="flex items-center justify-between border border-cream-border bg-cream-2 px-4 py-3">
                  <span className="text-sm text-ink-3">{label}</span>
                  <span className="text-sm font-medium text-ink">{profile.rideDurations[idx]}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-3xl text-ink">Uke for uke</h2>
          <div className="space-y-3">
            {weeks.map((w) => (
              <div key={w.week} className="border border-cream-border bg-cream p-5">
                <div className="mb-2 flex items-center justify-between">
                  <span className="border border-gold/30 px-2 py-1 text-xs font-medium text-gold">Uke {w.week}</span>
                  <span className="text-sm text-ink-4">{w.goal}</span>
                </div>
                <p className="mb-2 text-sm text-ink-2">{w.action}</p>
                <p className="text-sm text-ink-4">Sjekkpunkt: {w.checkpoint}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border border-ink bg-ink p-8 text-center">
          <div className="mx-auto mb-3 inline-flex items-center gap-2 border border-gold/40 px-2 py-1 text-xs uppercase tracking-widest text-gold">
            <Calendar className="h-3.5 w-3.5" />
            Første tur
          </div>
          <h3 className="mb-3 text-4xl text-cream">Book din første Morgenbruddet-tur</h3>
          <p className="mx-auto mb-6 max-w-2xl text-ink-4">
            Målet nå er ikke fart. Målet er å møte opp én gang, sykle trygt i gruppe, og gå av sykkelen med mestring.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <TrackEventLink
              href="/dashboard"
              eventName="cta_clicked"
              eventProps={{ cta_id: "plan_find_next_ride", fokus, profil, ab_variant: variant }}
              className="bg-gold px-6 py-3 text-sm font-bold uppercase tracking-widest text-ink transition-colors hover:bg-gold-h"
            >
              Finn neste tur
            </TrackEventLink>
            <TrackEventLink
              href={focus.readMore}
              eventName="cta_clicked"
              eventProps={{ cta_id: "plan_read_guide", fokus, profil, ab_variant: variant }}
              className="border border-cream-border px-6 py-3 text-sm font-medium uppercase tracking-widest text-cream transition-colors hover:border-cream hover:text-cream"
            >
              Les relevant guide
            </TrackEventLink>
            <TrackEventLink
              href="/start"
              eventName="cta_clicked"
              eventProps={{ cta_id: "plan_b2b_entry", fokus, profil, ab_variant: variant }}
              className="border border-gold/40 px-6 py-3 text-sm font-medium uppercase tracking-widest text-gold transition-colors hover:border-gold hover:text-gold"
            >
              For bedrifter: pilotinfo
            </TrackEventLink>
          </div>
        </section>
      </main>
    </div>
  );
}
