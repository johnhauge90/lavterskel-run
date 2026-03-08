import Link from 'next/link';
import { User } from 'lucide-react';

const navLinks = [
  { label: 'Treningsprogram', href: '/quiz' },
  { label: 'Løpeskolen', href: '/lopeskolen' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">

        {/* Logo — serif for Passenger-feel */}
        <Link
          href="/"
          className="font-serif font-black tracking-tight text-stone-900 text-xl select-none"
        >
          Lavterskel
        </Link>

        {/* Nav — desktop only */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-stone-600 hover:text-stone-900 font-medium text-sm transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA — forest green */}
        <Link
          href="/login"
          className="flex items-center gap-2 bg-forest-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-forest-800 transition-colors"
        >
          <User className="w-4 h-4" />
          Logg inn
        </Link>

      </div>
    </header>
  );
}
