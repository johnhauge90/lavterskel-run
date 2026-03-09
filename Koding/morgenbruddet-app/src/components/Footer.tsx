import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-cream-border bg-ink">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4">

          {/* Brand */}
          <div className="md:col-span-2 flex flex-col gap-5">
            <Link
              href="/"
              style={{
                fontFamily: "var(--font-league-gothic), sans-serif",
                fontSize: "1.75rem",
                fontWeight: 400,
                textTransform: "uppercase",
                letterSpacing: "0.03em",
                color: "#FFFEF5",
                lineHeight: 1,
              }}
            >
              Morgenbruddet
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-ink-4">
              Rogalands lavterskel sykkelfellesskap. No-drop. Kaffe.
              Nordsjørittet 13. juni 2026 er målet.
            </p>
            <div className="flex items-center gap-2 text-xs text-ink-4">
              <span>Bygget av</span>
              <a
                href="https://fjordscycling.no"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold transition-opacity hover:opacity-70"
              >
                Fjords Cycling
              </a>
              <span>for folkehelsen</span>
            </div>
          </div>

          {/* Utforsk */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-ink-4">
              Utforsk
            </h4>
            {[
              { label: "Bibliotek", href: "/bibliotek" },
              { label: "Helt Fersk", href: "/bibliotek/helt-fersk" },
              { label: "Pendleren", href: "/bibliotek/pendleren" },
              { label: "Familie & Barn", href: "/bibliotek/familie-barn" },
              { label: "Mosjonisten", href: "/bibliotek/mosjonisten" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-sm text-ink-4 transition-colors hover:text-cream"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Om */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-ink-4">
              Om prosjektet
            </h4>
            {[
              { label: "Kom i gang", href: "/onboarding" },
              { label: "Nordsjørittet 2026", href: "https://www.nordsjorittet.no", external: true },
              { label: "Fjords Cycling", href: "https://fjordscycling.no", external: true },
              { label: "Nordsjøløftet for bedrifter", href: "/start" },
              { label: "Turer & kalender", href: "/dashboard" },
            ].map(({ label, href, external }) =>
              external ? (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-ink-4 transition-colors hover:text-cream"
                >
                  {label} ↗
                </a>
              ) : (
                <Link
                  key={label}
                  href={href}
                  className="text-sm text-ink-4 transition-colors hover:text-cream"
                >
                  {label}
                </Link>
              )
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-ink-2/20 pt-8 text-xs text-ink-4 md:flex-row">
          <p>© 2026 Morgenbruddet / Fjords Cycling AS. Alle rettigheter forbeholdt.</p>
          <p>
            Data: Helsedirektoratet · RVU 2024 (TØI) · NEEDED-programmet
          </p>
        </div>
      </div>
    </footer>
  );
}
