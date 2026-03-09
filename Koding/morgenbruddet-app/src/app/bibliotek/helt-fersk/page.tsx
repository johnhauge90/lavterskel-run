import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, Sprout } from "lucide-react";

export const metadata: Metadata = {
  title: "Helt Fersk – Kom i gang med sykkel",
  description:
    "Alt du trenger å vite for å begynne å sykle i Rogaland. Sykkelvalg, utstyr, veiregler og trygg start. Ingen erfaring nødvendig.",
  keywords: [
    "begynne sykle",
    "nybegynner sykkel",
    "lære å sykle",
    "sykkel nybegynner guide",
    "første sykkel",
  ],
};

const articles = [
  {
    slug: "foerste-sykkel",
    title: "Slik velger du din første sykkel",
    excerpt:
      "Hybridisykkel, terrengsykkel eller elsykkel? Vi bryter ned alternativene slik at du kjøper riktig – og ikke for mye.",
    readTime: "6 min",
    tags: ["Utstyr", "Kjøpsguide"],
  },
  {
    slug: "utstyrsliste-nybegynner",
    title: "Den komplette utstyrslisten for nybegynnere",
    excerpt:
      "Hva er faktisk nødvendig, og hva er luksus? En ærlig gjennomgang av hjelm, lys, lås og klær.",
    readTime: "5 min",
    tags: ["Utstyr", "Sikkerhet"],
  },
  {
    slug: "sykkel-i-trafikken",
    title: "Sykkel i trafikken: veireglene du trenger",
    excerpt:
      "Vikeplikt, sykkelfelt, rundkjøring og fortau. En praktisk gjennomgang av det du faktisk møter på veien.",
    readTime: "7 min",
    tags: ["Sikkerhet", "Trafikk"],
  },
  {
    slug: "din-foerste-tur",
    title: "Din første tur: slik planlegger du den",
    excerpt:
      "5 km er nok. Du trenger ikke sykle langt for å starte. Her er oppskriften på en tur du faktisk gjennomfører.",
    readTime: "4 min",
    tags: ["Motivasjon", "Planlegging"],
  },
  {
    slug: "sykkel-i-regn",
    title: "Sykkel i regn – det du ikke visste du trengte å vite",
    excerpt:
      "Rogaland regner. Det betyr ikke at du ikke kan sykle. Vindtett vs. vanntett, og hva som faktisk holder deg tørr.",
    readTime: "5 min",
    tags: ["Utstyr", "Vær"],
  },
];

export default function HeltFerskPage() {
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
              <Sprout className="h-5 w-5 text-emerald" />
            </div>
            <span className="text-sm font-medium uppercase tracking-widest text-emerald">
              Helt Fersk
            </span>
          </div>
          <h1 className="mb-4 text-ink">
            Kom i gang med sykkel
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-ink-3">
            Du trenger ikke ha syklet på 10 år for å starte. Ingen forutsetninger.
            Alt du trenger å vite, samlet her – fra sykkelvalg til din første tur.
          </p>
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
            Klar til å prøve?
          </h3>
          <p className="mb-6 text-ink-3">
            Morgenbruddet er Rogalands tryggeste sykkelgruppe. No-drop – ingen
            blir igjen.
          </p>
          <Link
            href="/onboarding"
            className="inline-flex items-center gap-2 bg-gold px-6 py-3 font-bold uppercase tracking-widest text-sm text-ink transition-colors hover:bg-gold-h"
          >
            Finn din start →
          </Link>
        </div>
      </div>
    </div>
  );
}
