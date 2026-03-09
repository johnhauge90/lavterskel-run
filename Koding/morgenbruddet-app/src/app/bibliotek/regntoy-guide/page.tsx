import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Check, X } from "lucide-react";

export const metadata: Metadata = {
  title: "Regntøy og vindtøy til sykkel: den ærlige guiden",
  description:
    "Rogaland regner 200 dager i året. Hva er faktisk forskjellen på vanntett og vindtett – og hvilke produkter holder deg tørr på sykkelen uten å koke?",
  keywords: [
    "regntøy sykkel",
    "vindtøy sykkel",
    "sykling i regn",
    "sykkel Rogaland regn",
    "vanntett vindtett sykkel",
    "regnjakke syklist",
  ],
};

const layers = [
  {
    number: "1",
    name: "Innerlag",
    description: "Ull eller sportsull. Treffer huden og transporterer fuktighet ut.",
    key: "Ull holder deg varm selv om det er vått",
    avoid: "Bomull – klamrer seg til kroppen og kjøler deg ned",
  },
  {
    number: "2",
    name: "Mellomlag",
    description: "Fleece eller tynn dunjakke på kalde dager. Kan droppes om sommer.",
    key: "Komprimerbar fleece som får plass i lommen",
    avoid: "Tykk ullgenser – du svetter mer enn du tror",
  },
  {
    number: "3",
    name: "Ytterlag",
    description: "Her er valget: vindtett eller vanntett. De fleste trenger begge.",
    key: "Se neste seksjon",
    avoid: "En tykk parkasejakke – for varm og uhåndterlig",
  },
];

export default function RegntoyGuidePage() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-3xl px-6 py-12">

        {/* Tilbake */}
        <div className="mb-8">
          <Link
            href="/bibliotek/pendleren"
            className="inline-flex items-center gap-2 text-sm text-ink-3 transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            Pendleren
          </Link>
        </div>

        {/* Header */}
        <header className="mb-10">
          <div className="mb-3 flex flex-wrap gap-2">
            <span className="border border-blue-accent/30 px-3 py-1 text-xs font-medium text-blue-accent">
              Utstyr
            </span>
            <span className="border border-blue-accent/30 px-3 py-1 text-xs font-medium text-blue-accent">
              Vær
            </span>
          </div>
          <h1 className="mb-4 text-4xl leading-tight text-ink md:text-5xl">
            Regntøy til sykkel
          </h1>
          <p className="text-xl leading-relaxed text-ink-3">
            Rogaland har 1 500–2 000 mm nedbør per år. Stavanger er en av de
            regnfulle byene i Europa. Det betyr ikke at du ikke kan sykle –
            det betyr at du trenger riktig utstyr.
          </p>
          <p className="mt-3 text-sm text-ink-4">6 minutters lesetid</p>
        </header>

        <article className="space-y-10 text-base leading-relaxed text-ink-2">

          {/* Vindtett vs vanntett */}
          <section>
            <h2 className="mb-4 text-2xl text-ink">
              Vindtett vs. vanntett – hva er forskjellen?
            </h2>
            <p className="mb-6">
              Dette er den vanligste misforståelsen. Mange kjøper en «vanntett» jakke
              og koker seg ihjel, eller kjøper «vindtett» og blir gjennomvåte.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-cream-border bg-cream-2 p-5">
                <h3 className="mb-3 font-bold text-ink">🌬️ Vindtett</h3>
                <ul className="space-y-2">
                  {[
                    "Holder vinden ute – god varmeisolasjon",
                    "Pustende – svetting slippes ut",
                    "Lett og kompakt",
                    "Holder seg tørr i lette dusjer",
                  ].map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-400" />
                      <span className="text-ink-2">{p}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-2 text-sm">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                    <span className="text-ink-2">Ikke for kraftig regn</span>
                  </li>
                </ul>
                <div className="mt-4 text-xs text-ink-4">Anbefalt for: 70% av turene</div>
              </div>

              <div className="rounded-xl border border-cream-border bg-cream-2 p-5">
                <h3 className="mb-3 font-bold text-ink">🌧️ Vanntett (membran)</h3>
                <ul className="space-y-2">
                  {[
                    "Holder kraftig regn ute",
                    "Vannsøylen 10 000–20 000 mm+",
                  ].map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-400" />
                      <span className="text-ink-2">{p}</span>
                    </li>
                  ))}
                  {[
                    "Mindre pustende – svetter mer",
                    "Tyngre",
                    "Dyrere",
                  ].map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm">
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                      <span className="text-ink-2">{p}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 text-xs text-ink-4">Anbefalt for: kraftig regn + kalde dager</div>
              </div>
            </div>

            <div className="mt-4 border border-gold/20 bg-gold/5 p-4 text-sm">
              <strong className="text-gold">Konklusjon:</strong>{" "}
              <span className="text-ink-2">
                Kjøp én god vindtett jakke (600–1 200 kr) + én lett vanntett regnjakke
                (1 200–2 500 kr). Regnjakken kan ligge i sekken og tas frem ved behov.
              </span>
            </div>
          </section>

          {/* Lagprinsippet */}
          <section>
            <h2 className="mb-4 text-2xl text-ink">
              Lagprinsippet på sykkel
            </h2>
            <div className="space-y-4">
              {layers.map((layer) => (
                <div
                  key={layer.number}
                  className="flex gap-4 rounded-xl border border-cream-border bg-cream-2 p-5"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/10 text-sm font-bold text-gold">
                    {layer.number}
                  </div>
                  <div>
                    <h3 className="mb-1 font-bold text-ink">{layer.name}</h3>
                    <p className="mb-3 text-sm text-ink-3">{layer.description}</p>
                    <div className="space-y-1.5">
                      <div className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-400" />
                        <span className="text-ink-2">{layer.key}</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <X className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                        <span className="text-ink-2">{layer.avoid}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Tilbehør */}
          <section>
            <h2 className="mb-4 text-2xl text-ink">
              Det du glemmer å kjøpe (men trenger)
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { item: "Regnbukse", note: "Isolerte bib-shorts + lett regnbukse utenpå" },
                { item: "Regnhansker", note: "Hender fryser fort – ha reserve i sekken" },
                { item: "Regnsokker / skocovers", note: "Kalde føtter ødelegger hele turen" },
                { item: "Skjerm bak", note: "Hindrer sølevann opp i ryggen" },
              ].map(({ item, note }) => (
                <div key={item} className="rounded-lg border border-cream-border bg-cream-2 p-4">
                  <div className="mb-1 font-medium text-ink">{item}</div>
                  <div className="text-sm text-ink-3">{note}</div>
                </div>
              ))}
            </div>
          </section>

          <div className="rounded-xl border border-cream-border bg-cream-2 p-5 text-sm text-ink-3">
            <strong className="text-ink">Kilde:</strong> Nedbørsdata fra MET.no (Meteorologisk institutt),
            historiske data Stavanger 1991–2020. Produktanbefalinger basert på Syklistenes Landsforening
            utstyrsguide og redaksjonell test mars 2026.
          </div>
        </article>

        {/* CTA */}
        <div className="mt-12 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/bibliotek/sykkelruter-stavanger-sandnes"
            className="flex-1 border border-cream-border bg-cream-2 p-5 transition-all hover:border-ink"
          >
            <div className="text-xs text-ink-4 mb-1">Neste artikkel</div>
            <div className="font-semibold text-ink">
              Sykkelruter Stavanger–Sandnes →
            </div>
          </Link>
          <Link
            href="/onboarding"
            className="flex-1 bg-gold p-5 text-center transition-colors hover:bg-gold-h"
          >
            <div className="text-xs text-ink/70 mb-1">Klar til å prøve?</div>
            <div className="font-bold text-ink">Bli med på Morgenbruddet →</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
