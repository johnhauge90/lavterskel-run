import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      className="sticky top-0 z-50 border-b border-cream-border"
      style={{ backgroundColor: "rgba(255,254,245,0.95)", backdropFilter: "blur(12px)" }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo — League Gothic via CSS h1/h2 rule ikke påvirker dette, bruker inline style */}
        <Link
          href="/"
          className="transition-opacity hover:opacity-70"
          style={{
            fontFamily: "var(--font-league-gothic), sans-serif",
            fontSize: "1.5rem",
            fontWeight: 400,
            textTransform: "uppercase",
            letterSpacing: "0.03em",
            color: "#0A0A0A",
            lineHeight: 1,
          }}
        >
          Morgenbruddet
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-7 md:flex">
          <Link
            href="/bibliotek"
            className="text-sm font-medium uppercase tracking-widest text-ink-3 transition-colors hover:text-ink"
          >
            Bibliotek
          </Link>
          <Link
            href="/dashboard"
            className="text-sm font-medium uppercase tracking-widest text-ink-3 transition-colors hover:text-ink"
          >
            Turer
          </Link>
          <a
            href="https://www.nordsjorittet.no"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium uppercase tracking-widest text-ink-3 transition-colors hover:text-ink"
          >
            Nordsjørittet ↗
          </a>
          <Link
            href="/onboarding"
            className="rounded-none bg-gold px-5 py-2 text-sm font-bold uppercase tracking-widest text-ink transition-colors hover:bg-gold-h"
          >
            Kom i gang
          </Link>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-3 md:hidden">
          <Link
            href="/bibliotek"
            className="text-xs font-medium uppercase tracking-widest text-ink-3"
          >
            Bibliotek
          </Link>
          <Link
            href="/onboarding"
            className="rounded-none bg-gold px-4 py-2 text-xs font-bold uppercase tracking-widest text-ink"
          >
            Start
          </Link>
        </div>
      </div>
    </nav>
  );
}
