import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Familie & Barn – Trygg sykling med barn i Rogaland",
  description:
    "Henger eller sykkelsete? Trygg skolevei, familieruter og alt om sykling med barn i Rogaland. Konkrete råd fra de som har gjort det.",
  keywords: [
    "sykkel med barn",
    "sykkel henger",
    "sykkelsete barn",
    "trygg skolevei sykkel",
    "familiesykling Stavanger",
    "sykkel Rogaland barn",
  ],
};

const articles = [
  {
    slug: "henger-eller-sykkelsete",
    title: "Henger, sykkelsete eller transportsykkel?",
    excerpt:
      "Alder, antall barn og brukstilfelle avgjør hva som er riktig. Vi har sammenlignet de tre alternativene slik at du ikke kjøper feil.",
    readTime: "7 min",
    tags: ["Utstyr", "Kjøpsguide"],
  },
  {
    slug: "trygg-skolevei-sykkel",
    title: "Trygg skolevei på sykkel: slik gjør du det",
    excerpt:
      "Når er barnet klart for å sykle alene? Sjekkliste for rute, refleks, hjelm og trafikkregler tilpasset barn.",
    readTime: "6 min",
    tags: ["Sikkerhet", "Barn"],
  },
  {
    slug: "familieruter-rogaland",
    title: "De 5 beste familierutene i Rogaland",
    excerpt:
      "Flate strekninger, lite trafikk, kaféer underveis. Ruter som passer for barn fra 4 år med barnesykkel.",
    readTime: "5 min",
    tags: ["Ruter", "Kart"],
  },
  {
    slug: "sykkel-barnehage",
    title: "Sykkel til barnehagen: praktisk guide",
    excerpt:
      "Sekk, tilhenger og morgenrutiner som faktisk funker. Slik sykler du barn til barnehagen uten å bli stresset.",
    readTime: "4 min",
    tags: ["Praktisk", "Barnehage"],
  },
];

export default function FamilieBarnPage() {
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
              <Users className="h-5 w-5 text-ink-3" />
            </div>
            <span className="text-sm font-medium uppercase tracking-widest text-ink-3">
              Familie & Barn
            </span>
          </div>
          <h1 className="mb-4 text-ink">
            Sykkel med hele familien
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-ink-3">
            Fra barnsykkel til transportsykkel med henger. Alt om trygg familiesykling
            i Rogaland – konkrete råd uten idealisme.
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
            Ta med familien på Morgenbruddet
          </h3>
          <p className="mb-6 text-ink-3">
            Familieturer og no-drop-prinsippet betyr at ingen blir liggende igjen.
            Kaffe og fellesskap inkludert.
          </p>
          <Link
            href="/onboarding"
            className="inline-flex items-center gap-2 bg-gold px-6 py-3 font-bold uppercase tracking-widest text-sm text-ink transition-colors hover:bg-gold-h"
          >
            Finn en tur →
          </Link>
        </div>
      </div>
    </div>
  );
}
