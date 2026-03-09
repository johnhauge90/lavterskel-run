import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, CheckCircle2, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "6 uker til Nordsjørittet 2026: minimumsprogrammet",
  description:
    "Nordsjørittet 13. juni 2026. 6 uker igjen. Her er det absolutt minste du kan gjøre for å komme i mål – konkret ukesplan uten snikksnakk.",
  keywords: [
    "Nordsjørittet trening",
    "Nordsjørittet 2026 forberedelse",
    "sykkeltrening 6 uker",
    "Nordsjørittet nybegynner",
    "trene til sykkelritt",
    "sykkelprogram mosjonist",
  ],
};

const weeks = [
  {
    week: 1,
    title: "Bli kjent med sykkelen",
    focus: "Volum under komfortsonen",
    sessions: [
      { day: "Tirsdag", duration: "30–40 min", note: "Rolig tur, lav puls. Test om sykkelen sitter." },
      { day: "Torsdag", duration: "30–40 min", note: "Samme tempo. Fokus på pedalomdreininger." },
      { day: "Lørdag", duration: "60 min", note: "Langtur med en venn. No-drop." },
    ],
    total: "2–2,5 timer",
    warning: null,
  },
  {
    week: 2,
    title: "Bygg rytmen",
    focus: "Tre faste dager",
    sessions: [
      { day: "Tirsdag", duration: "40 min", note: "Inkluder en bakke. Ikke push deg." },
      { day: "Torsdag", duration: "40 min", note: "Flatt underlag, høy kadense (90+ omdr/min)." },
      { day: "Lørdag", duration: "75 min", note: "Langtur. Spis noe underveis – prøv gels eller banan." },
    ],
    total: "2,5–3 timer",
    warning: null,
  },
  {
    week: 3,
    title: "Første langtur",
    focus: "Test av 2+ timer",
    sessions: [
      { day: "Tirsdag", duration: "45 min", note: "Intervaller: 3 × 5 min i litt høyere tempo." },
      { day: "Torsdag", duration: "30 min", note: "Lett restitusjon. Ikke hopp over denne." },
      { day: "Lørdag", duration: "2 t 15 min", note: "Målet er Sørmarka eller tilsvarende. Spis hvert 30. min." },
    ],
    total: "3,5–4 timer",
    warning: "Vær obs på knær. Senk sadelen 3 mm om de gjør vondt.",
  },
  {
    week: 4,
    title: "Rolig uke (deload)",
    focus: "Restitusjon er trening",
    sessions: [
      { day: "Tirsdag", duration: "30 min", note: "Rolig. Kroppen reparerer seg denne uken." },
      { day: "Torsdag", duration: "30 min", note: "Lett tur. Ingen press." },
      { day: "Lørdag", duration: "60 min", note: "Kosedag. Ha det gøy." },
    ],
    total: "2 timer",
    warning: null,
  },
  {
    week: 5,
    title: "Simuler rittet",
    focus: "Gjøre det ukjente kjent",
    sessions: [
      { day: "Tirsdag", duration: "50 min", note: "Intervaller: 2 × 10 min i rittempo." },
      { day: "Torsdag", duration: "40 min", note: "Teknisk tur – prøv å sykle noen av bakkene i Nordsjørittet-ruten." },
      { day: "Lørdag", duration: "3 timer", note: "Lang simuleringstur. Test alt du skal bruke på rittet – mat, klær, sko." },
    ],
    total: "4,5 timer",
    warning: "Test utstyret nøye nå. Ikke prøv noe nytt på selve rittet.",
  },
  {
    week: 6,
    title: "Nedtrapping mot start",
    focus: "Ankomme frisk, ikke sliten",
    sessions: [
      { day: "Mandag", duration: "30 min", note: "Rolig. Beina må kjenne sykkelen." },
      { day: "Onsdag", duration: "20 min", note: "Kort, lett tur. Ingen belastning." },
      { day: "Fredag", duration: "15 min", note: "Lett spinning for å åpne beina dagen før." },
      { day: "Lørdag", duration: "NORDSJØRITTET 🎉", note: "Start rolig. Ritt videre enn du tror." },
    ],
    total: "65 min + ritt",
    warning: "Ikke tren hardt denne uken. Det hjelper deg ingenting nå.",
  },
];

export default function SeksUkerPage() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-3xl px-6 py-12">

        {/* Tilbake */}
        <div className="mb-8">
          <Link
            href="/bibliotek/mosjonisten"
            className="inline-flex items-center gap-2 text-sm text-ink-3 transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            Mosjonisten
          </Link>
        </div>

        {/* Header */}
        <header className="mb-10">
          <div className="mb-3 flex flex-wrap gap-2">
            <span className="border border-gold/30 px-3 py-1 text-xs font-medium text-gold">
              Treningsplan
            </span>
            <span className="border border-gold/30 px-3 py-1 text-xs font-medium text-gold">
              Nordsjørittet
            </span>
          </div>
          <h1 className="mb-4 text-4xl leading-tight text-ink md:text-5xl">
            6 uker til Nordsjørittet
          </h1>
          <p className="text-xl leading-relaxed text-ink-3">
            13. juni 2026. 130 km fra Stavanger til Haugesund. Her er det absolutt
            minste du kan gjøre for å komme i mål – selv om du ikke har syklet
            siden i fjor.
          </p>
          <p className="mt-3 text-sm text-ink-4">8 minutters lesetid</p>
        </header>

        <article className="space-y-10 text-base leading-relaxed text-ink-2">

          {/* Premiss */}
          <section>
            <h2 className="mb-4 text-2xl text-ink">Premisset</h2>
            <p className="mb-4">
              Dette er ikke et program for eliteutøvere. Det er et program for deg
              som kanskje sist syklet skikkelig for ett år siden, men har meldt deg
              på Nordsjørittet og nå lurer på hva du har gjort.
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { label: "3 treningsøkter/uke", icon: "📅" },
                { label: "Ingen intervaller uke 1–2", icon: "🚫" },
                { label: "Én lang tur hver uke", icon: "🚲" },
              ].map(({ label, icon }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-lg border border-cream-border bg-cream-2 px-4 py-3 text-sm"
                >
                  <span className="text-xl">{icon}</span>
                  <span className="font-medium text-ink">{label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Ukene */}
          <section className="space-y-6">
            <h2 className="text-2xl text-ink">Programmet</h2>

            {weeks.map((w) => (
              <div
                key={w.week}
                className="rounded-xl border border-cream-border bg-cream-2 overflow-hidden"
              >
                <div className="flex items-center justify-between border-b border-cream-border bg-cream-2 px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/10 text-sm font-bold text-gold">
                      {w.week}
                    </div>
                    <div>
                      <div className="font-bold text-ink">{w.title}</div>
                      <div className="text-xs text-ink-4">{w.focus}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 border border-cream-border px-3 py-1 text-xs text-ink-2">
                    <TrendingUp className="h-3 w-3" />
                    {w.total}
                  </div>
                </div>

                <div className="divide-y divide-cream-border px-5">
                  {w.sessions.map((s) => (
                    <div key={s.day} className="flex gap-4 py-4">
                      <div className="w-24 shrink-0">
                        <div className="text-sm font-medium text-gold">{s.day}</div>
                        <div className="text-xs text-ink-4">{s.duration}</div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-ink-4" />
                        <span className="text-sm text-ink-2">{s.note}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {w.warning && (
                  <div className="border-t border-amber/20 bg-amber/5 px-5 py-3 text-sm text-amber">
                    ⚠️ {w.warning}
                  </div>
                )}
              </div>
            ))}
          </section>

          {/* Ernæring */}
          <section>
            <h2 className="mb-4 text-2xl text-ink">
              Mat og drikke – det enkle
            </h2>
            <p className="mb-4">
              For turer under 1,5 timer: ingenting spesielt. Vann holder.
              For turer over 1,5 timer: spis hvert 30. minutt. 30–60 gram karbohydrat
              per time. Det tilsvarer én banan eller to energigels.
            </p>
            <div className="rounded-xl border border-cream-border bg-cream-2 p-5">
              <div className="mb-3 font-semibold text-ink">Dagen før Nordsjørittet</div>
              <ul className="space-y-2 text-sm text-ink-2">
                {[
                  "Spis mye karbohydrat til middag (pasta, ris)",
                  "Drikk rikelig – men ikke overdrevet",
                  "Legg ut alt utstyret kvelden før",
                  "Sov. Du sover sannsynligvis dårlig den natten – det er ok.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <div className="rounded-xl border border-cream-border bg-cream-2 p-5 text-sm text-ink-3">
            <strong className="text-ink">Kilde:</strong> Treningsprinsipper basert på
            ACSM (American College of Sports Medicine) retningslinjer for mosjonister,
            og Syklistenes Landsforening sin nybegynnerguide til Nordsjørittet.
            Individuell tilpasning anbefales ved helseutfordringer.
          </div>
        </article>

        {/* CTA */}
        <div className="mt-12 border border-gold/20 bg-gold/5 p-8 text-center">
          <h3 className="mb-3 text-2xl text-ink">
            Vil du ha følge?
          </h3>
          <p className="mb-6 text-ink-3">
            Morgenbruddet arrangerer langturer i opptrekket mot Nordsjørittet.
            No-drop – ingen blir liggende igjen.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/onboarding"
              className="bg-gold px-6 py-3 text-sm font-bold uppercase tracking-widest text-ink transition-colors hover:bg-gold-h"
            >
              Bli med på tur
            </Link>
            <a
              href="https://www.nordsjorittet.no"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-cream-border px-6 py-3 text-sm font-medium uppercase tracking-widest text-ink-2 transition-colors hover:border-ink hover:text-ink"
            >
              Nordsjørittet.no ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
