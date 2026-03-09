import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Check, X } from "lucide-react";

export const metadata: Metadata = {
  title: "Slik velger du din første sykkel – guide for nybegynnere",
  description:
    "Hybridisykkel, terrengsykkel, elsykkel eller bysykkel? Vi bryter ned alternativene slik at du velger riktig sykkel første gang – uansett budsjett.",
  keywords: [
    "velge første sykkel",
    "hybridisykkel nybegynner",
    "elsykkel nybegynner",
    "sykkel for nybegynner",
    "kjøpe sykkel",
    "sykkeltyper guide",
  ],
};

export default function FoersteSykkelPage() {
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
              Kjøpsguide
            </span>
          </div>
          <h1 className="mb-4 text-4xl leading-tight text-ink md:text-5xl">
            Slik velger du din første sykkel
          </h1>
          <p className="text-xl leading-relaxed text-ink-3">
            Syv sykkelprofiler forklart på klart norsk. Du trenger ikke bli ekspert –
            du trenger bare å vite hva du skal bruke sykkelen til.
          </p>
          <p className="mt-3 text-sm text-ink-4">6 minutters lesetid</p>
        </header>

        {/* Innhold */}
        <article className="space-y-10 text-base leading-relaxed text-ink-2">

          <section>
            <h2 className="mb-4 text-2xl text-ink">
              Det eneste spørsmålet som teller
            </h2>
            <p>
              Ikke «hva er den beste sykkelen» – men <strong className="text-ink">hva skal du bruke den til?</strong>{" "}
              En sykkel kjøpt for feil formål samler støv i garasjen. Det er der
              de fleste feiler.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                { label: "Pendler til jobb", emoji: "🏙️", answer: "Hybridisykkel eller elsykkel" },
                { label: "Mosjon og turer", emoji: "🚵", answer: "Hybridisykkel eller terrengsykkel" },
                { label: "Kaffe + fellesskap", emoji: "☕", answer: "Hva som helst – Morgenbruddet tar alle" },
              ].map(({ label, emoji, answer }) => (
                <div
                  key={label}
                  className="border border-cream-border bg-cream-2 p-4 text-center"
                >
                  <div className="mb-2 text-2xl">{emoji}</div>
                  <div className="mb-1 text-sm font-semibold text-ink">{label}</div>
                  <div className="text-xs text-ink-3">{answer}</div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl text-ink">
              De 3 sykkel-typene du trenger å kjenne til
            </h2>

            <div className="space-y-6">
              {/* Hybridisykkel */}
              <div className="border border-cream-border bg-cream-2 p-6">
                <div className="mb-3 flex items-center gap-3">
                  <span className="text-2xl">🚲</span>
                  <h3 className="text-xl font-bold text-ink">Hybridisykkel</h3>
                  <span className="ml-auto border border-emerald/30 px-3 py-1 text-xs font-medium text-emerald">
                    Anbefalt for nybegynnere
                  </span>
                </div>
                <p className="mb-4 text-ink-2">
                  En krysning mellom racersykkel og terrengsykkel. Bred styring for kontroll,
                  stive hjul for fart. Den mest allsidige sykkelen for hverdagsbruk.
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-ink-4">Passer for</div>
                    <ul className="space-y-1.5">
                      {["Pendling 5–20 km", "Lett terreng og asfalt", "Turer i variert tempo"].map((p) => (
                        <li key={p} className="flex items-start gap-2 text-sm text-ink-2">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-ink-4">Ikke for</div>
                    <ul className="space-y-1.5">
                      {["Tung terreng og stier", "Kappkjøring"].map((p) => (
                        <li key={p} className="flex items-start gap-2 text-sm text-ink-2">
                          <X className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-4 border-t border-cream-border pt-4 text-sm text-ink-3">
                  <span className="font-medium text-ink">Prisklasse:</span> 3 500–12 000 kr
                </div>
              </div>

              {/* Elsykkel */}
              <div className="border border-cream-border bg-cream-2 p-6">
                <div className="mb-3 flex items-center gap-3">
                  <span className="text-2xl">⚡</span>
                  <h3 className="text-xl font-bold text-ink">Elsykkel (e-bike)</h3>
                  <span className="ml-auto border border-gold/30 px-3 py-1 text-xs font-medium text-gold">
                    Best for pendling
                  </span>
                </div>
                <p className="mb-4 text-ink-2">
                  Motor hjelper deg opp bakkene. I Stavanger/Sandnes-området – med Varden og
                  Ganddal – er dette spesielt verdifullt. 25% av rogalendingene eier allerede elsykkel
                  (RVU 2024).
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-ink-4">Passer for</div>
                    <ul className="space-y-1.5">
                      {["Pendling 10–25 km", "Kuppert terreng", "Ankomme upresset på jobb", "Foreldre med barn i henger"].map((p) => (
                        <li key={p} className="flex items-start gap-2 text-sm text-ink-2">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-ink-4">Merk</div>
                    <ul className="space-y-1.5">
                      {["Tyngre (20–25 kg)", "Krever lading", "Dyrere vedlikehold"].map((p) => (
                        <li key={p} className="flex items-start gap-2 text-sm text-ink-2">
                          <X className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-4 border-t border-cream-border pt-4 text-sm text-ink-3">
                  <span className="font-medium text-ink">Prisklasse:</span> 8 000–35 000 kr
                </div>
              </div>

              {/* Terrengsykkel */}
              <div className="border border-cream-border bg-cream-2 p-6">
                <div className="mb-3 flex items-center gap-3">
                  <span className="text-2xl">🏔️</span>
                  <h3 className="text-xl font-bold text-ink">Terrengsykkel (MTB)</h3>
                </div>
                <p className="mb-4 text-ink-2">
                  For stier, grus og variert underlag. Tykke dekk, lav lufttrykk og fjæring.
                  Tregere på asfalt, men morsomt i skogen.
                </p>
                <div className="mt-4 border-t border-cream-border pt-4 text-sm text-ink-3">
                  <span className="font-medium text-ink">Prisklasse:</span> 4 000–20 000 kr
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl text-ink">
              Budsjett-veileder
            </h2>
            <div className="overflow-hidden border border-cream-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-cream-border bg-cream-2">
                    <th className="p-4 text-left font-semibold text-ink">Budsjett</th>
                    <th className="p-4 text-left font-semibold text-ink">Hva du får</th>
                    <th className="p-4 text-left font-semibold text-ink">Anbefaling</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cream-border">
                  {[
                    { budget: "Under 3 000 kr", what: "Brukt sykkel, begrenset garanti", rec: "Sjekk Finn.no, Wheelspin Stavanger" },
                    { budget: "3 000–6 000 kr", what: "Ny hybridisykkel, god kvalitet", rec: "Bra for de fleste formål" },
                    { budget: "6 000–12 000 kr", what: "Hydrauliske bremser, bedre komponent", rec: "Pendling og lengre turer" },
                    { budget: "Over 12 000 kr", what: "Elsykkel eller spesialsykkel", rec: "Kun hvis du vet at du skal bruke den" },
                  ].map(({ budget, what, rec }) => (
                    <tr key={budget} className="bg-cream">
                      <td className="p-4 font-medium text-gold">{budget}</td>
                      <td className="p-4 text-ink-2">{what}</td>
                      <td className="p-4 text-ink-3">{rec}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl text-ink">
              Én ting mange glemmer: ramme og størrelse
            </h2>
            <p>
              En sykkel som er feil størrelse gjør vondt over tid. Be alltid om å
              sitte på sykkelen i butikken. Kneet skal ha lett bøy i nedre pedal-posisjon.
              De fleste sykkelbutikker i Stavanger tilbyr gratis tilpasning ved kjøp.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl text-ink">Konklusjon</h2>
            <p>
              Ny hybridisykkel i klassen 4 000–8 000 kr fra en lokal forhandler er
              riktig valg for 80 % av nybegynnere i Rogaland. Ikke start med for mye –
              start med noe godt nok til at du faktisk sykler.
            </p>
          </section>

          <div className="border border-cream-border bg-cream-2 p-5 text-sm text-ink-3">
            <strong className="text-ink">Kilde:</strong> Reisevaneundersøkelsen 2024 (TØI/Statistisk sentralbyrå) for
            pendlerstatistikk. Sykkelprisklasser fra Wheelspin, XXL og Syklistenes Landsforening,
            mars 2026.
          </div>
        </article>

        {/* CTA */}
        <div className="mt-12 border border-gold/20 bg-gold/5 p-8 text-center">
          <h3 className="mb-3 text-2xl text-ink">
            Du har sykkelen – nå trenger du fellesskapet
          </h3>
          <p className="mb-6 text-ink-3">
            Morgenbruddet tar alle typer sykler og alle nivåer. No-drop betyr at
            ingen blir igjen.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/onboarding"
              className="bg-gold px-6 py-3 text-sm font-bold uppercase tracking-widest text-ink transition-colors hover:bg-gold-h"
            >
              Bli med på tur
            </Link>
            <Link
              href="/bibliotek/utstyrsliste-nybegynner"
              className="border border-cream-border px-6 py-3 text-sm font-medium uppercase tracking-widest text-ink-2 transition-colors hover:border-ink hover:text-ink"
            >
              Utstyrslisten →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
