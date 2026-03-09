import Link from "next/link";
import { ArrowLeft, Lightbulb } from "lucide-react";

export default function ArtikkelPage() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-4xl px-6 py-12">

        {/* Back button */}
        <div className="mb-8">
          <Link
            href="/bibliotek"
            className="inline-flex items-center gap-2 text-sm text-ink-4 transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Tilbake til biblioteket</span>
          </Link>
        </div>

        {/* Article header */}
        <header className="mb-12">
          <h1 className="mb-4 leading-tight text-ink">
            Slik kler du deg for Rogalands-høsten
          </h1>
          <p className="mb-4 text-ink-4">Av Morgenbruddet Redaksjonen</p>
          <p className="text-xl leading-relaxed text-ink-2">
            Det finnes ikke dårlig vær, bare dårlige klær? Vi har testet hva som faktisk funker i stiv kuling på Forus.
          </p>
        </header>

        {/* Main content with sidebar layout */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Article content */}
          <div className="lg:col-span-2">
            <article className="space-y-6 text-base leading-relaxed text-ink-2">
              <p className="text-lg leading-relaxed">
                Vi har alle opplevd det: Du står klar til å sykle, men været ser tvilsomt ut. Regnet henger i luften,
                vinden blåser fra vest, og du lurer på om det egentlig er verdt det.
              </p>

              <p className="text-lg leading-relaxed">
                Svaret er ja – hvis du har riktig klær. I Rogaland, der været kan skifte fire ganger på én tur,
                handler det om lag-på-lag-prinsippet.
              </p>

              <h2 className="mt-8 text-ink">Grunnlaget: Tre lag som funker</h2>

              <p className="text-lg leading-relaxed">
                <strong className="text-ink font-bold">Lag 1: Ull inntil kroppen.</strong> Merinoull holder deg varm selv
                når den er våt. Skip bomull – den blir kald og klam.
              </p>

              <p className="text-lg leading-relaxed">
                <strong className="text-ink font-bold">Lag 2: Mellomlag for isolasjon.</strong> En tynn fleece eller
                softshell-jakke holder varmen inne uten å gjøre deg klam.
              </p>

              <p className="text-lg leading-relaxed">
                <strong className="text-ink font-bold">Lag 3: Vindtett ytterlag.</strong> En god sykkeljakke med
                ventilasjon i ryggen er gull verdt. Den trenger ikke være dyr – bare vindtett.
              </p>

              <h2 className="mt-8 text-ink">Glem ikke ekstremitetene</h2>

              <p className="text-lg leading-relaxed">
                Kalde hender ødelegger turen. Invester i skikkelige hansker – helst med vindtett membran.
                For beina holder vanlige joggebukser lenger enn du tror, men ha alltid regnbukser tilgjengelig.
              </p>

              <p className="text-lg leading-relaxed">
                Og husk: Du skal fryse litt når du starter. Etter fem minutter vil kroppen varme seg opp.
              </p>

              <h2 className="mt-8 text-ink">Testing på Forusrunden</h2>

              <p className="text-lg leading-relaxed">
                Vi har testet disse rådene på Forusrunden – en av de mest vindeksponerte strekningene i distriktet.
                Resultatet? Med riktig klær var turen behagelig, selv med 12 m/s vind og regnskyll.
              </p>

              <p className="text-lg leading-relaxed">
                Den viktigste lærdommen? Start med mindre enn du tror du trenger. Det er lettere å legge på
                et lag enn å bære en tung, svett jakke i sekken.
              </p>
            </article>
          </div>

          {/* Sidebar - Fact box */}
          <aside className="lg:col-span-1">
            <div className="sticky top-8 border border-cream-border bg-cream-2 p-6">
              <div className="mb-4 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-gold" />
                <h3 className="text-lg font-bold text-ink">Fakta-boks</h3>
              </div>
              <ul className="space-y-3 text-sm text-ink-2">
                <li className="flex gap-2">
                  <span className="text-gold">•</span>
                  <span>Ull holder deg varm selv når den er våt</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gold">•</span>
                  <span>Vindtett &gt; vanntett for sykkelklær</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gold">•</span>
                  <span>Ha alltid reserve-hansker i sekken</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gold">•</span>
                  <span>Refleks er viktigst på høsten</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gold">•</span>
                  <span>Test utstyret før den store turen</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gold">•</span>
                  <span>Lag-på-lag slår én dyr jakke</span>
                </li>
              </ul>
            </div>
          </aside>
        </div>

        {/* Call to Action */}
        <div className="mt-16 border border-cream-border bg-cream-2 p-8 text-center">
          <h3 className="mb-4 text-2xl font-bold text-ink">
            Føler du deg klarere?
          </h3>
          <p className="mb-6 text-lg text-ink-3">
            Bli med på en nybegynner-tur og test utstyret ditt i trygt selskap!
          </p>
          <Link
            href="/onboarding"
            className="inline-flex h-14 items-center justify-center bg-gold px-8 text-sm font-bold uppercase tracking-widest text-ink transition-colors hover:bg-gold-h"
          >
            Bli med på nybegynner-tur
          </Link>
        </div>
      </div>
    </div>
  );
}
