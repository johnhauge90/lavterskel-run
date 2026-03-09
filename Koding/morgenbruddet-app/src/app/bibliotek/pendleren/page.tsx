import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Briefcase, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Pendleren – Sykkel til jobb i Rogaland",
  description:
    "Alt om sykkelpendling i Rogaland. Beste ruter Stavanger-Sandnes, regntøy som fungerer, elsykkel-kalkulator og tips for å komme tørr og blid på jobb.",
  keywords: [
    "sykkel til jobb",
    "sykkelpendling Stavanger",
    "sykkelruter Sandnes",
    "pendler sykkel",
    "sykkelstamveien",
    "elsykkel jobb",
  ],
};

const articles = [
  {
    slug: "sykkelruter-stavanger-sandnes",
    title: "De beste sykkelrutene Stavanger–Sandnes",
    excerpt:
      "Sykkelstamveien, Sørmarka og alternativruter. Interaktiv oversikt over 8 ruter med høydemetre, underlag og trygghetsvurdering.",
    readTime: "8 min",
    tags: ["Ruter", "Kart"],
  },
  {
    slug: "regntoy-guide",
    title: "Regntøy og vindtøy: den ærlige guiden",
    excerpt:
      "Rogaland regner 200 dager i året. Hva er faktisk forskjellen på vanntett og vindtett – og hva trenger du egentlig?",
    readTime: "6 min",
    tags: ["Utstyr", "Vær"],
  },
  {
    slug: "elsykkel-til-jobb",
    title: "Elsykkel til jobb: er det verdt pengene?",
    excerpt:
      "En elsykkel koster fra 8 000 til 50 000 kr. Kalkulatoren viser hva du sparer på parkeringskutt, bompenger og treningskort.",
    readTime: "5 min",
    tags: ["Elsykkel", "Økonomi"],
  },
  {
    slug: "parkering-forus",
    title: "Parkeringskutt på Forus: hva betyr det for deg?",
    excerpt:
      "Forus reduserer parkeringen til 0,5 plasser per 100 m². Equinor kutter 90%. Hva er alternativene – og sykkel er ett av dem.",
    readTime: "4 min",
    tags: ["Mobilitetspress", "Forus"],
  },
  {
    slug: "sykkelvett-pa-jobb",
    title: "Sykkelvett på jobb: ankommer du blid og presentabel?",
    excerpt:
      "Dusj, bagasje, klær og planlegging. De praktiske tingene ingen sier deg, men alle lurer på.",
    readTime: "5 min",
    tags: ["Praktisk", "Jobb"],
  },
];

export default function PendlerenPage() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-4xl px-6 py-12">

        {/* Tilbake */}
        <div className="mb-8">
          <Link
            href="/bibliotek"
            className="inline-flex items-center gap-2 text-sm text-ink-4 transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            Biblioteket
          </Link>
        </div>

        {/* Header */}
        <header className="mb-12">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center border border-cream-border bg-cream-2">
              <Briefcase className="h-5 w-5 text-blue-accent" />
            </div>
            <span className="text-sm font-medium uppercase tracking-widest text-blue-accent">
              Pendleren
            </span>
          </div>
          <h1 className="mb-4 text-ink">
            Sykkel til jobb
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-ink-3">
            52 % av alle pendlerreiser i Rogaland er under 10 km. Sykkel er ikke
            bare mulig – det er raskere enn buss i rushtid på mange strekninger.
            Her er alt du trenger for å starte.
          </p>

          {/* Statistikk-chips */}
          <div className="mt-6 flex flex-wrap gap-3">
            {[
              "52% av reiser er under 10 km (RVU 2024)",
              "25% av rogalendingene eier elsykkel",
              "29 kr/km i helsegevinst (Helsedirektoratet)",
            ].map((stat) => (
              <span
                key={stat}
                className="border border-cream-border bg-cream-2 px-4 py-1.5 text-xs text-ink-4"
              >
                {stat}
              </span>
            ))}
          </div>
        </header>

        {/* Artikkelliste */}
        <section className="space-y-3">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/bibliotek/${article.slug}`}
              className="group flex flex-col gap-3 border border-cream-border bg-cream p-6 transition-all hover:border-ink hover:bg-cream-2"
            >
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-cream-border px-3 py-0.5 text-xs font-medium text-ink-4"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h2 className="mb-2 text-lg font-semibold text-ink transition-colors group-hover:text-gold">
                    {article.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-ink-3">
                    {article.excerpt}
                  </p>
                </div>
                <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-ink-4 transition-colors group-hover:text-gold" />
              </div>

              <div className="flex items-center gap-1.5 text-xs text-ink-4">
                <Clock className="h-3.5 w-3.5" />
                {article.readTime} lesetid
              </div>
            </Link>
          ))}
        </section>

        {/* CTA */}
        <div className="mt-16 border border-cream-border bg-cream-2 p-8 text-center">
          <h3 className="mb-3 text-2xl font-bold text-ink">
            Jobb i Rogaland?
          </h3>
          <p className="mb-6 text-ink-3">
            Nordsjøløftet hjelper bedrifter i Rogaland å bygge sykkelkultur.
            Spør HR-avdelingen din om de er med.
          </p>
          <Link
            href="/start"
            className="inline-flex items-center gap-2 bg-gold px-6 py-3 font-bold uppercase tracking-widest text-sm text-ink transition-colors hover:bg-gold-h"
          >
            Nordsjøløftet for bedrifter →
          </Link>
        </div>
      </div>
    </div>
  );
}
