import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Utstyrsliste for nybegynnere – hva du faktisk trenger",
  description:
    "Hjelm, lys og lås er obligatorisk. Alt annet er valgfritt. En ærlig gjennomgang av hva du faktisk trenger for å sykle trygt i Rogaland.",
  keywords: [
    "sykkelutstyr nybegynner",
    "utstyrsliste sykkel",
    "hva trenger man til sykling",
    "sykkel tilbehør",
    "hjelm sykkel",
    "sykkellys",
  ],
};

const mustHave = [
  {
    item: "Sykkelhjelm",
    why: "Obligatorisk – og redder liv. Kjøp hjelm fra merkevarer som Giro, Bell, POC eller MET. Ikke spar her.",
    price: "500–1 500 kr",
    tip: "Kjøp i butikk slik at du kan prøve passformen. En dårlig sittende hjelm er nesten like ille som ingen.",
  },
  {
    item: "Lys foran og bak",
    why: "Lovpålagt i mørke og dårlig sikt. Hvitt/gult foran, rødt bak. Bøt: 1 500 kr.",
    price: "200–600 kr (sett)",
    tip: "Kjøp lys med USB-lading. Du bruker dem faktisk dersom de er enkle å lade.",
  },
  {
    item: "Sykkellås",
    why: "Rogaland har ikke spesielt høy sykkeltyveri-rate – men det skjer. En god lås er billigere enn en ny sykkel.",
    price: "300–900 kr",
    tip: "U-lås er sterkere enn kjedelas. Lås gjennom rammen OG et hjul.",
  },
];

const goodToHave = [
  {
    item: "Sykkelhansker",
    why: "Reduserer vibrasjoner og beskytter hendene ved fall. Viktig på lengre turer.",
    price: "150–400 kr",
  },
  {
    item: "Sykkelpumpe (hjemme)",
    why: "Riktig lufttrykk er den enkleste måten å gjøre turen bedre på.",
    price: "200–500 kr",
  },
  {
    item: "Reparasjonssett",
    why: "Lappegummi, plastikkhake og CO2-patron. Passer i en lomme. Redder turen.",
    price: "100–200 kr",
  },
  {
    item: "Sykkelveskepakke (under sete)",
    why: "Sted til reparasjonssett, nøkkel og lader. Holder sekken ledig.",
    price: "150–300 kr",
  },
  {
    item: "Refleksvest",
    why: "Det viktigste refleksplagg du eier. Lettere enn jakke. Ses langt borte.",
    price: "100–300 kr",
  },
];

const notNeeded = [
  "Sykkeldrakt i lykkefarger (med mindre du vil)",
  "Sykkelsko og pedaler med klikk (kom deg i gang først)",
  "Sykkelcomputer (telefon funger fint i starten)",
  "Aerodynamisk hjelm (du sykler mosjon, ikke Tour de France)",
  "Karbon-rammer (ikke for nybegynnere)",
];

export default function UstyrlisteNybegynnerPage() {
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
              Utstyr
            </span>
            <span className="border border-cream-border px-3 py-1 text-xs font-medium text-ink-4">
              Nybegynner
            </span>
          </div>
          <h1 className="mb-4 text-4xl leading-tight text-ink md:text-5xl">
            Utstyrslisten for nybegynnere
          </h1>
          <p className="text-xl leading-relaxed text-ink-3">
            Du trenger tre ting for å komme i gang. Alt annet er valgfritt.
            Vi forteller deg hva som faktisk er nødvendig, og hva som er markedsføring.
          </p>
          <p className="mt-3 text-sm text-ink-4">5 minutters lesetid</p>
        </header>

        <article className="space-y-10 text-base leading-relaxed text-ink-2">

          {/* Obligatorisk */}
          <section>
            <div className="mb-5 flex items-center gap-2">
              <span className="inline-block h-2 w-2 bg-red-400" />
              <h2 className="text-2xl text-ink">Du trenger dette</h2>
            </div>
            <div className="space-y-4">
              {mustHave.map((item) => (
                <div
                  key={item.item}
                  className="border border-cream-border bg-cream-2 p-5"
                >
                  <div className="mb-2 flex items-start justify-between gap-4">
                    <h3 className="font-bold text-ink">{item.item}</h3>
                    <span className="shrink-0 text-sm font-medium text-gold">{item.price}</span>
                  </div>
                  <p className="mb-3 text-sm text-ink-2">{item.why}</p>
                  <div className="flex items-start gap-2 bg-cream-3 px-4 py-3">
                    <span className="text-xs font-semibold text-gold">TIPS</span>
                    <span className="text-sm text-ink-3">{item.tip}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Lurt å ha */}
          <section>
            <div className="mb-5 flex items-center gap-2">
              <span className="inline-block h-2 w-2 bg-gold" />
              <h2 className="text-2xl text-ink">Lurt å ha (men ikke i dag)</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {goodToHave.map((item) => (
                <div
                  key={item.item}
                  className="border border-cream-border bg-cream-2 p-4"
                >
                  <div className="mb-1 flex items-start justify-between gap-2">
                    <span className="font-medium text-ink">{item.item}</span>
                    <span className="shrink-0 text-xs text-ink-4">{item.price}</span>
                  </div>
                  <p className="text-sm text-ink-3">{item.why}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Ikke nødvendig */}
          <section>
            <div className="mb-5 flex items-center gap-2">
              <span className="inline-block h-2 w-2 bg-cream-border" />
              <h2 className="text-2xl text-ink">Du trenger ikke dette (ennå)</h2>
            </div>
            <div className="border border-cream-border bg-cream-2 p-5">
              <ul className="space-y-2">
                {notNeeded.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <span className="mt-1 text-ink-4">×</span>
                    <span className="text-ink-3">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Totalkostnad */}
          <section>
            <div className="overflow-hidden border border-cream-border">
              <div className="border-b border-cream-border bg-cream-2 px-5 py-4">
                <h2 className="text-ink">Totalkostnad for å komme i gang</h2>
              </div>
              <div className="divide-y divide-cream-border bg-cream">
                {[
                  { label: "Hybridisykkel (ny)", cost: "4 000–8 000 kr" },
                  { label: "Hjelm", cost: "500–1 000 kr" },
                  { label: "Lys (sett)", cost: "250–400 kr" },
                  { label: "Lås (U-lås)", cost: "400–700 kr" },
                  { label: "Refleksvest", cost: "100–200 kr" },
                ].map(({ label, cost }) => (
                  <div key={label} className="flex items-center justify-between px-5 py-3 text-sm">
                    <span className="text-ink-2">{label}</span>
                    <span className="font-medium text-ink">{cost}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between border-t border-gold/20 bg-gold/5 px-5 py-4">
                  <span className="font-bold text-ink">Totalt</span>
                  <span className="font-bold text-gold">ca. 5 500–10 500 kr</span>
                </div>
              </div>
            </div>
          </section>

          <div className="border border-cream-border bg-cream-2 p-5 text-sm text-ink-3">
            <strong className="text-ink">Kilde:</strong> Priser hentet fra XXL, Wheelspin Stavanger og
            Bikeshop.no, mars 2026. Priser varierer basert på sesong og tilbud.
          </div>
        </article>

        {/* CTA */}
        <div className="mt-12 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/bibliotek/foerste-sykkel"
            className="flex-1 border border-cream-border bg-cream-2 p-5 transition-all hover:border-ink"
          >
            <div className="text-xs text-ink-4 mb-1">Tilbake til</div>
            <div className="font-semibold text-ink">
              ← Slik velger du din første sykkel
            </div>
          </Link>
          <Link
            href="/onboarding"
            className="flex-1 bg-gold p-5 text-center transition-colors hover:bg-gold-h"
          >
            <div className="text-xs text-ink/70 mb-1">Neste steg</div>
            <div className="font-bold text-ink">Bli med på Morgenbruddet →</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
