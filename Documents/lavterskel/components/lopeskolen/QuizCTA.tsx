// Server Component — reusable salgstrakt-komponent.
// Brukes på ALLE artikler. Funnelens inngangspunkt: artikkel → quiz → kjøp.
// Mørk variant (bg-neutral-900) for å skille seg ut fra hvit artikkeltekst.

import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function QuizCTA() {
  return (
    <div className="bg-neutral-900 text-white p-10 md:p-14 rounded-3xl mt-16">
      <div className="inline-flex items-center gap-2 mb-6">
        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
          Klar for neste steg?
        </span>
      </div>

      <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 leading-tight">
        Finn treningsprogrammet som<br className="hidden md:block" /> passer akkurat for deg.
      </h2>
      <p className="text-neutral-400 mb-8 max-w-md leading-relaxed text-sm">
        Vi stiller deg 3 enkle spørsmål om nivå og mål — og gir deg en skreddersydd plan
        du kan følge uke for uke i ditt eget dashbord.
      </p>

      <ul className="space-y-2 mb-10">
        {[
          'Tar under 2 minutter',
          'Ingen kredittkort eller registrering for å se resultatet',
          'Programmet starter umiddelbart',
        ].map((point) => (
          <li key={point} className="flex items-center gap-3 text-sm text-neutral-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" strokeWidth={1.5} />
            {point}
          </li>
        ))}
      </ul>

      <Link
        href="/quiz"
        className="inline-flex items-center gap-2 bg-white text-neutral-900 px-8 py-4 rounded-full text-sm font-bold hover:bg-neutral-100 transition-colors"
      >
        Ta quizen gratis
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
