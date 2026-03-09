import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, ArrowLeft, Check, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Sykkel i trafikken: veireglene du trenger å vite",
  description:
    "Vikeplikt, sykkelfelt, rundkjøring og fortau. Alt du faktisk møter i trafikken på sykkel i Rogaland – forklart uten juss-språk.",
  keywords: [
    "syklist vegtrafikkloven",
    "sykkel trafikkregler",
    "sykkelfelt vikeplikt",
    "rundkjøring sykkel",
    "sykkel fortau",
    "sykkel regler Norge",
  ],
};

const rules = [
  {
    title: "Sykkelfelt",
    icon: "🚲",
    rule: "Du skal sykle i sykkelfelt der det finnes. Det er merket med stiplet hvit linje og sykkel-symbol på asfalten.",
    tip: "Du har ikke vikeplikt for biler i sykkelfelt, men vis alltid hensyn i rundkjøringer.",
  },
  {
    title: "Vikeplikt i rundkjøring",
    icon: "🔄",
    rule: "Du i rundkjøringen har forkjørsrett overfor de som kjører inn. Gjelder deg på sykkel akkurat som biler.",
    tip: "Hold deg til venstre i rundkjøringen når du skal rett frem – det er tryggere enn å ligge helt ytterst.",
  },
  {
    title: "Fortau",
    icon: "🚶",
    rule: "Du kan sykle på fortau dersom du tilpasser farten etter myke trafikanter og viser hensyn. Det er altså ikke forbudt.",
    tip: "Gå av sykkelen i gangfelt om det er mye folk. En ulykke med fotgjenger er alltid syklistens skyld.",
  },
  {
    title: "Lys og refleks",
    icon: "💡",
    rule: "Hvitt/gult foran, rødt bak. Obligatorisk i mørke og dårlig sikt. Bøten er 1 500 kr.",
    tip: "Kjøp lykter med USB-lading – du bruker dem faktisk dersom de er enkle å lade.",
  },
  {
    title: "Mobiltelefon",
    icon: "📱",
    rule: "Forbudt å bruke håndholdt mobil på sykkel. Bøten er 2 300 kr.",
    tip: "Sett telefonen i lommene eller bruk en sykkelholderen festet til styret.",
  },
  {
    title: "Promillegrense",
    icon: "🍺",
    rule: "Samme promillegrense som bilister: 0,2 promille. Sykkel i påvirket tilstand gir bot og anmerkninger.",
    tip: "Dette er et faktisk problem i Norge – politiet håndhever det.",
  },
];

export default function SykkelITrafikkenPage() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-3xl px-6 py-12">

        {/* Tilbake */}
        <div className="mb-8">
          <Link
            href="/bibliotek/helt-fersk"
            className="inline-flex items-center gap-2 text-sm text-ink-4 transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            Helt Fersk
          </Link>
        </div>

        {/* Header */}
        <header className="mb-10">
          <div className="mb-3 flex flex-wrap gap-2">
            <span className="border border-cream-border px-3 py-1 text-xs font-medium text-ink-4">
              Sikkerhet
            </span>
            <span className="border border-cream-border px-3 py-1 text-xs font-medium text-ink-4">
              Trafikk
            </span>
          </div>
          <h1 className="mb-4 text-4xl leading-tight text-ink md:text-5xl">
            Sykkel i trafikken
          </h1>
          <p className="text-xl leading-relaxed text-ink-3">
            Veireglene du faktisk møter på veien – forklart uten juss-språk.
            De fleste ulykker skjer fordi syklist eller bilist ikke visste hva
            som gjaldt.
          </p>
          <p className="mt-3 text-sm text-ink-4">7 minutters lesetid</p>
        </header>

        <article className="space-y-10 text-base leading-relaxed text-ink-2">

          {/* Trygghets-sjekkliste */}
          <section>
            <div className="flex items-center gap-3 mb-5">
              <ShieldCheck className="h-6 w-6 text-emerald" />
              <h2 className="text-2xl text-ink">Sjekkliste før du drar</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Hjelm på",
                "Lys foran (hvitt) og bak (rødt)",
                "Refleks på klær eller sykkel",
                "Dekk med tilstrekkelig luft",
                "Bremser virker",
                "Ryggsekk eller kurv – ikke henge ting i styret",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 border border-cream-border bg-cream-2 px-4 py-3"
                >
                  <Check className="h-4 w-4 shrink-0 text-emerald" />
                  <span className="text-sm text-ink-2">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Reglene */}
          <section>
            <h2 className="mb-5 text-2xl text-ink">
              6 situasjoner – hva gjelder
            </h2>
            <div className="space-y-4">
              {rules.map((r) => (
                <div
                  key={r.title}
                  className="border border-cream-border bg-cream-2 p-5"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span className="text-xl">{r.icon}</span>
                    <h3 className="font-bold text-ink">{r.title}</h3>
                  </div>
                  <p className="mb-3 text-sm text-ink-2">{r.rule}</p>
                  <div className="flex items-start gap-2 border border-gold/15 bg-gold/5 px-4 py-3">
                    <span className="text-xs font-semibold text-gold">TIPS</span>
                    <span className="text-sm text-ink-3">{r.tip}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-start gap-3 border border-amber/20 bg-amber/5 p-5">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber" />
              <div>
                <h3 className="mb-1 font-bold text-ink">Den viktigste regelen</h3>
                <p className="text-sm text-ink-2">
                  Vis hensyn og tilpass farten etter forholdene. Teknisk rett kan
                  fortsatt være farlig. Øyekontakt med bilister i kryss er alltid verdt
                  2 sekunders forsinkelse.
                </p>
              </div>
            </div>
          </section>

          <div className="border border-cream-border bg-cream-2 p-5 text-sm text-ink-3">
            <strong className="text-ink">Kilde:</strong> Vegtrafikkloven og
            Forskrift om kjørende og gående trafikk (trafikkreglene), gjeldende per mars 2026.
            Bøtesatser: Politidirektoratets forenklet forelegg-satser 2025.
          </div>
        </article>

        {/* Neste artikkel */}
        <div className="mt-12 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/bibliotek/utstyrsliste-nybegynner"
            className="flex-1 border border-cream-border bg-cream-2 p-5 transition-all hover:border-ink"
          >
            <div className="text-xs text-ink-4 mb-1">Neste artikkel</div>
            <div className="font-semibold text-ink">
              Utstyrslisten for nybegynnere →
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
