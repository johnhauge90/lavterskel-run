const articles = [
  {
    tag: "UTSTYR",
    title: "Hvilke løpesko trenger du egentlig?",
    excerpt:
      "Vi navigerer gjennom jungelen av karbonplater, pronasjon og prisnivåer – og hjelper deg å velge riktig.",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop",
  },
  {
    tag: "TRENING",
    title: "Sone 2 forklart på under fem minutter",
    excerpt:
      "Den roligste treningen gir ofte størst fremgang. Her er alt du trenger å vite om aerob grunntrening.",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop",
  },
  {
    tag: "SKADEFOREBYGGING",
    title: "Derfor får du vondt i kneet – og hva du gjør med det",
    excerpt:
      "Løperkneet plager mange nybegynnere. Vi forklarer årsaken og gir deg øvelsene som hjelper.",
    image:
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=800&auto=format&fit=crop",
  },
];

export default function Home() {
  return (
    <div className="bg-[#F7F7F7] text-gray-900 min-h-screen">

      {/* ── HEADER ───────────────────────────────────────────────────── */}
      <header className="bg-[#F7F7F7] border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <span className="text-sm font-bold tracking-[0.2em] text-gray-900 uppercase">
              Lavterskel
            </span>
            <nav className="hidden sm:flex items-center gap-8">
              <a
                href="#lopeskolen"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors tracking-wide"
              >
                Løpeskolen
              </a>
              <a
                href="#programmer"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors tracking-wide"
              >
                Programmer
              </a>
              <a
                href="https://forstart.no"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors tracking-wide"
              >
                Førstart
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* ── FEATURED / HERO ──────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* Hovedoppslag – Podkast */}
          <article className="lg:col-span-8 group cursor-pointer">
            <div className="overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=1400&auto=format&fit=crop"
                alt="Programlederne Kalle og John løper i fjellet"
                className="w-full aspect-[4/3] lg:aspect-[16/9] object-cover group-hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
            <p className="mt-6 text-xs font-semibold tracking-[0.15em] text-gray-500 uppercase">
              Nyeste episode
            </p>
            <h1 className="mt-3 text-4xl lg:text-6xl font-bold tracking-tight leading-[1.05] text-gray-900">
              Gjesdalmila: Historiens tøffeste bakkeløp?
            </h1>
            <p className="mt-5 text-lg text-gray-500 leading-relaxed max-w-2xl">
              Vi kastet oss inn i Rogalands villeste terrengløp – og kom ut på
              den andre siden med blemmer, smil og en helt ny respekt for
              bakketrening.
            </p>
            <div className="mt-7">
              <a
                href="https://open.spotify.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gray-900 text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-gray-700 transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                Lytt nå
              </a>
            </div>
          </article>

          {/* Sekundært oppslag – Treningsprogrammer */}
          <article
            id="programmer"
            className="lg:col-span-4 group cursor-pointer"
          >
            <div className="overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=800&auto=format&fit=crop"
                alt="Løper på vei opp en bakke"
                className="w-full aspect-square object-cover group-hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
            <p className="mt-6 text-xs font-semibold tracking-[0.15em] text-gray-500 uppercase">
              Treningsprogrammer
            </p>
            <h2 className="mt-3 text-2xl lg:text-3xl font-bold tracking-tight leading-tight text-gray-900">
              Ta quizen: Finn ditt program
            </h2>
            <p className="mt-3 text-base text-gray-500 leading-relaxed">
              Fra sofakroken til 5 km, halvmaraton eller mer – vi hjelper deg å
              finne programmet som passer deg akkurat nå.
            </p>
            <div className="mt-6">
              <a
                href="#programmer"
                className="inline-flex items-center gap-2 border border-gray-900 text-gray-900 text-sm font-semibold px-6 py-3 rounded-full hover:bg-gray-900 hover:text-white transition-colors"
              >
                Start her
              </a>
            </div>
          </article>

        </div>
      </section>

      {/* ── LØPESKOLEN GRID ──────────────────────────────────────────── */}
      <section
        id="lopeskolen"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24"
      >
        <div className="border-t border-gray-200 pt-12">
          <h2 className="text-4xl lg:text-6xl font-bold tracking-tight text-gray-900">
            Siste fra Løpeskolen
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mt-10">
            {articles.map((article) => (
              <article key={article.title} className="group cursor-pointer">
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full aspect-[4/3] object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                </div>
                <p className="mt-5 text-xs font-semibold tracking-[0.15em] text-gray-500 uppercase">
                  {article.tag}
                </p>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-gray-900 leading-snug">
                  {article.title}
                </h3>
                <p className="mt-3 text-base text-gray-500 leading-relaxed">
                  {article.excerpt}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA – FØRSTART ────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-16">
        <div className="bg-stone-900 text-white rounded-3xl p-12 lg:p-20 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-stone-400 uppercase mb-6">
            Førstart.no
          </p>
          <h2 className="text-4xl lg:text-6xl font-bold tracking-tight leading-tight max-w-3xl mx-auto">
            Klar for å teste formen? Finn ditt neste løp i Rogaland.
          </h2>
          <div className="mt-10">
            <a
              href="https://forstart.no"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-gray-900 text-sm font-bold px-8 py-4 rounded-full hover:bg-stone-100 transition-colors tracking-wide"
            >
              Gå til Førstart.no
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────── */}
      <footer className="border-t border-gray-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <span className="font-bold tracking-[0.15em] text-gray-900 uppercase text-xs">
            Lavterskel
          </span>
          <p>© {new Date().getFullYear()} Lavterskel.run — Norges koseligste løpepodkast.</p>
          <div className="flex gap-6">
            <a
              href="https://open.spotify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900 transition-colors"
            >
              Spotify
            </a>
            <a
              href="https://forstart.no"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900 transition-colors"
            >
              Førstart
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
