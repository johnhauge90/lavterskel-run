'use client';

import Link from "next/link";
import { Building2, Calendar, CheckCircle2, Mail, Target, TrendingUp } from "lucide-react";
import { signupUser } from "../actions";
import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

export default function StartPage() {
  const [message, setMessage] = useState<{ success: boolean; text: string } | null>(null);

  async function handleSubmit(formData: FormData) {
    const result = await signupUser(formData);
    setMessage({ success: result.success, text: result.message });
    
    // Clear message after 5 seconds
    setTimeout(() => setMessage(null), 5000);
  }
  return (
    <div className="min-h-screen bg-cream">
      <main className="mx-auto max-w-5xl px-6 py-12">
        <header className="mb-10 border border-cream-border bg-cream-2 p-8">
          <p className="mb-2 text-xs uppercase tracking-widest text-ink-4">Nordsjøløftet for bedrifter</p>
          <h1 className="mb-4 text-5xl text-ink md:text-6xl">Fra parkeringspress til sykkelkultur</h1>
          <p className="max-w-3xl text-lg leading-relaxed text-ink-3">
            Vi hjelper 10-12 bedrifter i Rogaland gjennom en pilot som bygger varig sykkelvane
            fram mot Nordsjørittet 2026. Lav terskel for ansatte. Tydelige KPI-er for ledelsen.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="mailto:hei@morgenbruddet.no?subject=Book%20møte%20-%20Nordsj%C3%B8l%C3%B8ftet%20pilot"
              onClick={() => {
                trackEvent("book_meeting_clicked", { placement: "hero" });
                trackEvent("cta_clicked", { cta_id: "start_book_meeting_hero" });
              }}
              className="bg-gold px-6 py-3 text-sm font-bold uppercase tracking-widest text-ink transition-colors hover:bg-gold-h"
            >
              Book møte
            </a>
            <Link
              href="/onboarding"
              onClick={() => trackEvent("cta_clicked", { cta_id: "start_view_participant_journey" })}
              className="border border-cream-border px-6 py-3 text-sm font-medium uppercase tracking-widest text-ink-2 transition-colors hover:border-ink hover:text-ink"
            >
              Se deltakeropplevelsen
            </Link>
          </div>
        </header>

        <section className="mb-10 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Parkeringskutt",
              text: "Forus-stramminger gir behov for nye, praktiske mobilitetsvaner.",
              icon: Building2,
            },
            {
              title: "Kort pendledistanse",
              text: "Stor andel arbeidsreiser i regionen er under 10 km og sykkelbare.",
              icon: Target,
            },
            {
              title: "Målbar effekt",
              text: "Piloten måler deltakelse, turfrekvens og utvikling gjennom året.",
              icon: TrendingUp,
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="border border-cream-border bg-cream p-6">
                <Icon className="mb-3 h-7 w-7 text-gold" />
                <h2 className="mb-2 text-2xl text-ink">{item.title}</h2>
                <p className="text-sm text-ink-3">{item.text}</p>
              </article>
            );
          })}
        </section>

        <section className="mb-10 border border-cream-border bg-cream p-8">
          <h2 className="mb-4 text-4xl text-ink">Pilotpakke 2026</h2>
          <p className="mb-6 max-w-3xl text-ink-3">
            Ett opplegg per bedrift, fra første morgenøkt til Nordsjørittet og videre til neste sesong.
            Vi leverer aktivitet, struktur og kommunikasjon, mens dere får en enkel styringsmodell.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              "Ukentlige Morgenbruddet-økter (no-drop)",
              "Onboarding-løp for nybegynnere",
              "Månedlig status med KPI og anbefalinger",
              "Intern mobilisering og tydelig lederpakke",
              "Nordsjørittet-oppladning for ansatte",
              "Årshjul for varig sykkelkultur",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 border border-cream-border bg-cream-2 px-4 py-3 text-sm text-ink-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 border border-gold/20 bg-gold/5 p-4 text-sm text-ink-2">
            <strong className="text-ink">Prisramme pilot:</strong> 150 000-300 000 kr per bedrift
            (omfang avhenger av størrelse, antall lokasjoner og aktivitetsfrekvens).
          </div>
        </section>

        <section className="mb-10 border border-cream-border bg-cream-2 p-8">
          <h2 className="mb-4 text-4xl text-ink">Hva vi måler</h2>
          <div className="overflow-x-auto border border-cream-border bg-cream">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-cream-border bg-cream-2">
                  <th className="px-4 py-3 text-left font-medium text-ink">KPI</th>
                  <th className="px-4 py-3 text-left font-medium text-ink">Mål i pilot</th>
                  <th className="px-4 py-3 text-left font-medium text-ink">Hvordan måles</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-border">
                {[
                  {
                    kpi: "Aktive deltakere",
                    target: "10-12 bedrifter / tydelig intern deltagelse",
                    measure: "Månedlig deltakeroversikt",
                  },
                  {
                    kpi: "Turfrekvens",
                    target: "Stabil ukentlig deltakelse",
                    measure: "Oppmøte per økt",
                  },
                  {
                    kpi: "Nordsjørittet-deltakelse",
                    target: "Flere ansatte på startstreken i 2026",
                    measure: "Påmeldings- og startdata",
                  },
                  {
                    kpi: "Vaneforankring",
                    target: "Flere sykler utenom kampanjer",
                    measure: "Pulsmålinger og oppfølgingsintervju",
                  },
                ].map((row) => (
                  <tr key={row.kpi}>
                    <td className="px-4 py-3 font-medium text-ink">{row.kpi}</td>
                    <td className="px-4 py-3 text-ink-2">{row.target}</td>
                    <td className="px-4 py-3 text-ink-3">{row.measure}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-10 border border-ink bg-ink p-8">
          <div className="mb-3 inline-flex items-center gap-2 border border-gold/40 px-2 py-1 text-xs uppercase tracking-widest text-gold">
            <Calendar className="h-3.5 w-3.5" />
            Neste steg
          </div>
          <h2 className="mb-3 text-4xl text-cream">Book 30 min avklaringsmøte</h2>
          <p className="mb-6 max-w-2xl text-ink-4">
            Vi går gjennom målbildet deres, velger pilotnivå og skisserer første 90 dager.
            Møtet er uforpliktende.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:hei@morgenbruddet.no?subject=Book%20møte%20-%20Nordsj%C3%B8l%C3%B8ftet%20pilot&body=Hei,%20vi%20%C3%B8nsker%20et%20avklaringsm%C3%B8te%20for%20Nordsj%C3%B8l%C3%B8ftet.%0A%0ABedrift:%0AAntall%20ansatte:%0A"
              onClick={() => {
                trackEvent("book_meeting_clicked", { placement: "final_cta" });
                trackEvent("cta_clicked", { cta_id: "start_book_meeting_final" });
              }}
              className="bg-gold px-6 py-3 text-sm font-bold uppercase tracking-widest text-ink transition-colors hover:bg-gold-h"
            >
              Book møte nå
            </a>
            <Link
              href="/bibliotek/pendleren"
              onClick={() => trackEvent("cta_clicked", { cta_id: "start_view_commute_data" })}
              className="border border-cream-border px-6 py-3 text-sm font-medium uppercase tracking-widest text-cream transition-colors hover:border-cream hover:text-cream"
            >
              Se pendlergrunnlaget
            </Link>
          </div>
        </section>

        <section className="border border-cream-border bg-cream p-8">
          <div className="mb-4 flex items-center gap-2 text-ink">
            <Mail className="h-5 w-5 text-gold" />
            <h3 className="text-3xl">Få tilbud og pilotoppsett på e-post</h3>
          </div>
          <p className="mb-6 text-ink-3">
            Legg inn e-post, så sender vi en kort pilotskisse dere kan bruke internt med én gang.
          </p>

          <form action={handleSubmit} className="space-y-3">
            <input
              type="email"
              name="email"
              placeholder="jobb@bedrift.no"
              required
              className="w-full border border-cream-border bg-cream-2 px-4 py-3 text-ink placeholder:text-ink-4 outline-none transition-all focus:border-gold"
            />
            <button
              type="submit"
              onClick={() => trackEvent("cta_clicked", { cta_id: "start_send_pilot_outline" })}
              className="w-full bg-gold py-3 text-sm font-bold uppercase tracking-widest text-ink transition-colors hover:bg-gold-h"
            >
              Send meg pilotskisse
            </button>
          </form>

          {message && (
            <div
              className={`mt-4 border p-4 text-sm ${
                message.success
                  ? "border-emerald/30 bg-emerald/5 text-emerald"
                  : "border-red-accent/30 bg-red-accent/5 text-red-accent"
              }`}
            >
              {message.text}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
