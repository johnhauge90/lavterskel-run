import Link from "next/link";
import { ArrowLeft, Car, Activity, Wrench } from "lucide-react";
import TrackEventLink from "@/components/analytics/TrackEventLink";
import OnboardingProfileStep from "./OnboardingProfileStep";

type SearchParams = {
  fokus?: string;
};

const focusMap = {
  trafikk: {
    icon: Car,
    title: "Trafikk-trygghet",
    description: "Vi starter på bilfrie strekninger med kaptein foran og bak.",
  },
  form: {
    icon: Activity,
    title: "Fysisk form",
    description: "Du sykler i pratefart. No-drop betyr at gruppa alltid holder sammen.",
  },
  utstyr: {
    icon: Wrench,
    title: "Utstyr og klær",
    description: "Du får en enkel sjekkliste for vær, lys, hjelm og komfort.",
  },
} as const;

const profiles = [
  {
    id: "helt-fersk",
    value: "fersk",
    title: "Helt fersk",
    safety: "Trygghetsnivå: Maks",
    description: "Ingen forventning om fart. Målet er å bli trygg på korte turer.",
  },
  {
    id: "komme-igang-igjen",
    value: "igang",
    title: "Komme i gang igjen",
    safety: "Trygghetsnivå: Høy",
    description: "Du har syklet før, men trenger struktur og faste, rolige økter.",
  },
  {
    id: "mot-ritt",
    value: "ritt",
    title: "Mot ritt",
    safety: "Trygghetsnivå: Stabil",
    description: "Du vil bygge kontinuitet frem mot Nordsjørittet med trygg progresjon.",
  },
];

function normalizeFokus(fokus?: string) {
  if (fokus === "trafikk" || fokus === "form" || fokus === "utstyr") {
    return fokus;
  }
  return "trafikk";
}

export default async function OnboardingPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const valgtFokus = normalizeFokus(params.fokus);
  const active = focusMap[valgtFokus];
  const ActiveIcon = active.icon;

  return (
    <div className="min-h-screen bg-cream">
      <div className="px-6 py-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-ink-4 transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Tilbake</span>
        </Link>
      </div>

      <main className="mx-auto w-full max-w-5xl px-6 pb-16 pt-4">
        <section className="mb-10 border border-cream-border bg-cream-2 p-8">
          <p className="mb-2 text-xs uppercase tracking-widest text-ink-4">Morgenbruddet onboarding</p>
          <h1 className="mb-4 text-5xl text-ink md:text-6xl">Trygg start, der du er nå</h1>
          <p className="max-w-3xl text-lg text-ink-3">
            Velg først hva som stopper deg mest. Deretter velger du nivå, og vi gir deg en
            konkret 6-ukers plan med tydelig første steg.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-3xl text-ink">1. Hva vil du ha hjelp med?</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {(Object.keys(focusMap) as Array<keyof typeof focusMap>).map((key) => {
              const item = focusMap[key];
              const Icon = item.icon;
              const isActive = key === valgtFokus;
              return (
                <TrackEventLink
                  key={key}
                  href={`/onboarding?fokus=${key}`}
                  eventName="cta_clicked"
                  eventProps={{ cta_id: "onboarding_focus_card", fokus: key }}
                  className={`border p-6 transition-all ${
                    isActive
                      ? "border-gold bg-gold/5"
                      : "border-cream-border bg-cream hover:border-ink"
                  }`}
                >
                  <Icon className={`mb-3 h-8 w-8 ${isActive ? "text-gold" : "text-ink-3"}`} />
                  <h3 className="mb-2 text-xl text-ink">{item.title}</h3>
                  <p className="text-sm text-ink-3">{item.description}</p>
                </TrackEventLink>
              );
            })}
          </div>
        </section>

        <section className="mb-12 border border-gold/20 bg-gold/5 p-6">
          <div className="flex items-start gap-3">
            <ActiveIcon className="mt-0.5 h-5 w-5 text-gold" />
            <div>
              <p className="text-sm uppercase tracking-widest text-gold">Valgt fokus</p>
              <p className="text-base text-ink">{active.title}</p>
            </div>
          </div>
        </section>

        <OnboardingProfileStep fokus={valgtFokus} profiles={profiles} />
      </main>
    </div>
  );
}
