import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

export default function HomePage() {
  return (
    <main>

      {/* ═══ HERO ═══════════════════════════════════════════════════ */}
      <section className="bg-cream px-6 pb-20 pt-24 text-center md:pt-32">
        <div className="mx-auto max-w-5xl">

          {/* Label */}
          <div className="mb-8 inline-flex items-center gap-2 border border-cream-border px-4 py-2 text-xs font-medium uppercase tracking-widest text-ink-3">
            Rogaland · Nordsjørittet 13. juni 2026
          </div>

          {/* H1 — League Gothic via globals.css */}
          <h1 className="mb-6 text-[clamp(4rem,14vw,11rem)] text-ink">
            Morgen&shy;bruddet
          </h1>

          <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-ink-3">
            Rogalands tryggeste sykkelfellesskap. No-drop — ingen blir igjen.
            Kaffe ved målstreken. Uansett hvor du starter.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/onboarding"
              className="bg-gold px-8 py-4 text-sm font-bold uppercase tracking-widest text-ink transition-colors hover:bg-gold-h"
            >
              Finn din start →
            </Link>
            <Link
              href="/bibliotek"
              className="border border-ink px-8 py-4 text-sm font-medium uppercase tracking-widest text-ink transition-colors hover:bg-ink hover:text-cream"
            >
              Utforsk biblioteket
            </Link>
          </div>

          {/* Trust chips */}
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {["No-drop", "Alle nivåer", "Kaffe ved mål", "Gratis å delta"].map((chip) => (
              <span
                key={chip}
                className="border border-cream-border px-4 py-1.5 text-xs text-ink-3"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ STATS — svart stripe ════════════════════════════════════ */}
      <section className="bg-ink py-12">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-px md:grid-cols-4">
          {[
            { num: "52%", label: "av pendlerreiser er under 10 km", src: "RVU 2024" },
            { num: "29 kr", label: "spart for samfunnet per km syklet", src: "Helsedirektoratet" },
            { num: "25%", label: "av rogalendingene eier elsykkel", src: "RVU 2024" },
            { num: "10 000", label: "deltakere · Nordsjørittet 2026", src: "mål" },
          ].map(({ num, label, src }) => (
            <div key={num} className="flex flex-col px-8 py-8">
              <span
                style={{
                  fontFamily: "var(--font-league-gothic), sans-serif",
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  fontWeight: 400,
                  textTransform: "uppercase",
                  lineHeight: 1,
                  color: "#E1B223",
                }}
              >
                {num}
              </span>
              <span className="mt-2 text-xs leading-snug text-ink-4">{label}</span>
              <span className="mt-1 text-[10px] text-ink-4/50">{src}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ BARRIERENE ══════════════════════════════════════════════ */}
      <section className="bg-cream px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-4 text-xs font-medium uppercase tracking-widest text-ink-3">
            Hva stopper deg?
          </div>
          <h2 className="mb-14 text-[clamp(2.5rem,6vw,5rem)] text-ink">
            Vi har svaret
          </h2>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                fokus: "trafikk",
                title: "Trafikken skremmer meg",
                desc: "Rogaland har 300+ km sykkelvei. Vi viser deg de trygge rutene.",
                accent: "border-blue-500",
                tag: "Sikkerhet",
              },
              {
                fokus: "form",
                title: "Jeg er ikke i god nok form",
                desc: "Du trenger ikke komme i form for å sykle. Du sykler for å komme i form.",
                accent: "border-gold",
                tag: "Trening",
              },
              {
                fokus: "utstyr",
                title: "Jeg vet ikke hva jeg trenger",
                desc: "Tre ting: hjelm, lys og lås. Alt annet er valgfritt.",
                accent: "border-emerald",
                tag: "Utstyr",
              },
            ].map(({ fokus, title, desc, accent, tag }) => (
              <Link
                key={fokus}
                href={`/onboarding?fokus=${fokus}`}
                className={`group flex flex-col border-t-4 bg-cream-2 p-8 transition-all hover:-translate-y-1 hover:shadow-lg ${accent}`}
              >
                <div className="mb-6 text-xs font-medium uppercase tracking-widest text-ink-3">
                  {tag}
                </div>
                <h3 className="mb-3 text-xl font-bold text-ink">{title}</h3>
                <p className="mb-8 text-sm leading-relaxed text-ink-3">{desc}</p>
                <div className="mt-auto flex items-center gap-2 text-sm font-medium text-ink">
                  Les mer <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SLIK FUNGERER DET ═══════════════════════════════════════ */}
      <section className="border-t border-cream-border bg-cream-2 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-4 text-xs font-medium uppercase tracking-widest text-ink-3">
            Konseptet
          </div>
          <h2 className="mb-16 text-[clamp(2.5rem,6vw,5rem)] text-ink">
            Slik gjør vi det
          </h2>

          <div className="grid gap-12 md:grid-cols-3">
            {[
              {
                num: "01",
                title: "Morgenbruddet",
                desc: "Felles tur tidlig morgen. Ingen blir igjen. Kaffe og croissant etter. Det er ritualet som bygger vanen.",
              },
              {
                num: "02",
                title: "Ta med én",
                desc: "Ta med én kollega, nabo eller venn. Fellesskapet vokser én person av gangen.",
              },
              {
                num: "03",
                title: "Biblioteket",
                desc: "Alle spørsmål besvart. Fra sykkelvalg til regntøy til Nordsjørittet-program. Gratis, alltid.",
              },
            ].map(({ num, title, desc }) => (
              <div key={num} className="flex flex-col gap-4">
                <span
                  style={{
                    fontFamily: "var(--font-league-gothic), sans-serif",
                    fontSize: "4rem",
                    fontWeight: 400,
                    textTransform: "uppercase",
                    lineHeight: 1,
                    color: "#D5D2C6",
                  }}
                >
                  {num}
                </span>
                <h3 className="text-xl font-bold text-ink">{title}</h3>
                <p className="text-sm leading-relaxed text-ink-3">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ NORDSJØRITTET — svart CTA ═══════════════════════════════ */}
      <section className="bg-ink px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-4 text-xs font-medium uppercase tracking-widest text-gold">
            13. juni 2026
          </div>
          <h2
            className="mb-6 text-[clamp(3rem,8vw,7rem)]"
            style={{ color: "#FFFEF5" }}
          >
            Nordsjø&shy;rittet
          </h2>
          <p className="mb-10 max-w-xl text-lg leading-relaxed text-ink-4">
            130 km fra Stavanger til Haugesund. Mer enn 10 000 deltakere.
            Vi hjelper deg fra dag 1 til startstreken.
          </p>

          <div className="mb-12 flex flex-wrap gap-8">
            {[
              { icon: <MapPin className="h-4 w-4" />, label: "Stavanger → Haugesund" },
              { icon: null, label: "130 km · 6 uker program" },
              { icon: null, label: "No-drop hele veien" },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-ink-4">
                {icon}
                {label}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/onboarding"
              className="bg-gold px-8 py-4 text-sm font-bold uppercase tracking-widest text-ink transition-colors hover:bg-gold-h"
            >
              Lag min plan →
            </Link>
            <a
              href="https://www.nordsjorittet.no"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-ink-4 px-8 py-4 text-sm font-medium uppercase tracking-widest text-cream transition-colors hover:border-cream"
            >
              Nordsjørittet.no ↗
            </a>
          </div>
        </div>
      </section>

      {/* ═══ BIBLIOTEK-TEASER ════════════════════════════════════════ */}
      <section className="bg-cream px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-4 text-xs font-medium uppercase tracking-widest text-ink-3">
            Kunnskap
          </div>
          <h2 className="mb-14 text-[clamp(2.5rem,6vw,5rem)] text-ink">
            Biblioteket
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                href: "/bibliotek/helt-fersk",
                label: "Helt Fersk",
                desc: "Ikke syklet på 10 år? Start her.",
                tag: "🌱",
              },
              {
                href: "/bibliotek/pendleren",
                label: "Pendleren",
                desc: "Sykkel til jobb. Beste ruter og regntøy.",
                tag: "💼",
              },
              {
                href: "/bibliotek/familie-barn",
                label: "Familie & Barn",
                desc: "Henger, sete eller transportsykkel?",
                tag: "👨‍👩‍👧",
              },
              {
                href: "/bibliotek/mosjonisten",
                label: "Mosjonisten",
                desc: "Fra start til Nordsjørittet på 6 uker.",
                tag: "🏅",
              },
            ].map(({ href, label, desc, tag }) => (
              <Link
                key={href}
                href={href}
                className="group flex items-center justify-between border border-cream-border bg-cream p-6 transition-all hover:border-ink hover:bg-cream-2"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{tag}</span>
                  <div>
                    <div className="font-bold text-ink">{label}</div>
                    <div className="text-sm text-ink-3">{desc}</div>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-ink-4 transition-transform group-hover:translate-x-1 group-hover:text-ink" />
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/bibliotek"
              className="text-sm font-medium uppercase tracking-widest text-ink-3 underline underline-offset-4 transition-colors hover:text-ink"
            >
              Se hele biblioteket
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ URGENCY — parkeringskutt ════════════════════════════════ */}
      <section className="border-t border-cream-border bg-cream-2 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="max-w-xl">
              <div className="mb-2 text-xs font-medium uppercase tracking-widest text-amber">
                Parkeringskutt Rogaland
              </div>
              <h3 className="mb-3 text-2xl font-bold text-ink">
                Forus kutter til 0,5 pl/100m². Equinor kutt 90%.
              </h3>
              <p className="text-sm leading-relaxed text-ink-3">
                Bedriftene i Rogaland kutter parkeringsplasser. Sykkel er ikke lenger
                et lifestyle-valg — det er planlegging.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:flex-col md:items-end">
              <Link
                href="/start"
                className="bg-ink px-6 py-3 text-xs font-bold uppercase tracking-widest text-cream transition-colors hover:bg-ink-2"
              >
                Nordsjøløftet for bedrifter →
              </Link>
              <Link
                href="/bibliotek/pendleren"
                className="border border-ink px-6 py-3 text-xs font-medium uppercase tracking-widest text-ink transition-colors hover:bg-ink hover:text-cream"
              >
                Pendler-guide
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
