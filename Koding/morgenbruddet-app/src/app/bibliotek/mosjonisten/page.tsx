import type { Metadata } from "next";
import Link from "next/link";
import { Activity, ArrowLeft, ArrowRight, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Mosjonisten – Trening og kondis på sykkel",
  description:
    "Treningslære for mosjonister. Fra 6-ukersprogrammet til Nordsjørittet, via pulstrening, ernæring og utstyrsnerd-seksjonen.",
  keywords: [
    "sykkeltrening nybegynner",
    "Nordsjørittet forberedelse",
    "6 uker sykkel",
    "mosjonist sykkel",
    "puls sykkel",
    "sykkeltrening Rogaland",
  ],
};

const articles = [
  {
    slug: "6-uker-til-nordsjorittet",
    title: "6 uker til Nordsjørittet: det minste du kan gjøre",
    excerpt:
      "13. juni 2026. Du har 6 uker. Hva er absolutt minimumsprogrammet for å komme i mål? Konkret ukesplan uten snikksnakk.",
    readTime: "8 min",
    tags: ["Treningsplan", "Nordsjørittet"],
  },
  {
    slug: "pulstrening-sykkel",
    title: "Pulstrening på sykkel: sonene forklart",
    excerpt:
      "Sone 2 er ikke kjedelig, det er der utholdenheten bygges. En praktisk gjennomgang av de 5 sonene og hva de gjør med kroppen.",
    readTime: "6 min",
    tags: ["Trening", "Fysiologi"],
  },
  {
    slug: "hviledag-eller-tren",
    title: "Hviledag eller tren? Tegn på overtrening",
    excerpt:
      "Kroppen din kommuniserer konstant. Her er tegnene du ikke skal ignorere – spesielt i opptrekket mot et løp.",
    readTime: "5 min",
    tags: ["Helse", "Restitusjon"],
  },
  {
    slug: "sykkelklær-sesong",
    title: "Riktige sykkelklær for hver sesong i Rogaland",
    excerpt:
      "Lagprinsippet, kammerfleece og bib-shorts. En sesongbasert klesguide for Rogalands klima – som er mildere enn du tror.",
    readTime: "5 min",
    tags: ["Utstyr", "Sesong"],
  },
];

export default function MosjonistenPage() {
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
              <Activity className="h-5 w-5 text-gold" />
            </div>
            <span className="text-sm font-medium uppercase tracking-widest text-gold">
              Mosjonisten
            </span>
          </div>
          <h1 className="mb-4 text-ink">
            Tren deg til Nordsjørittet
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-ink-3">
            Fra dørstokkmil til 130 km 13. juni 2026. Treningsguider, fysiologi og
            utstyrsnerderi – uten at det skal bli jobb.
          </p>

          {/* Countdown chip */}
          <div className="mt-6 inline-flex items-center gap-2 border border-gold/30 bg-gold/5 px-5 py-3">
            <Activity className="h-4 w-4 text-gold" />
            <span className="text-sm font-medium text-gold">
              Nordsjørittet: 13. juni 2026
            </span>
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
            Vil du ha et strukturert treningsprogram?
          </h3>
          <p className="mb-6 text-ink-3">
            Vi hjelper deg med en personlig plan fra der du er i dag til
            startstreken 13. juni.
          </p>
          <Link
            href="/onboarding"
            className="inline-flex items-center gap-2 bg-gold px-6 py-3 font-bold uppercase tracking-widest text-sm text-ink transition-colors hover:bg-gold-h"
          >
            Lag min plan →
          </Link>
        </div>
      </div>
    </div>
  );
}
