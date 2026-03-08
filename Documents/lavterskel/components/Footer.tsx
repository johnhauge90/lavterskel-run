import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

const services = [
  { label: 'Treningsprogrammer', href: '/treningsprogrammer' },
  { label: 'Løpeskolen', href: '/lopeskolen' },
  { label: 'Podkasten', href: '/podkast' },
  { label: 'Støtt oss på Patreon', href: 'https://patreon.com', external: true },
];

const forstart = [
  { label: 'Terminliste Rogaland', href: 'https://forstart.no/terminliste', external: true },
  { label: 'Bedriftsligaen', href: 'https://forstart.no/bedriftsligaen', external: true },
  { label: 'For arrangører', href: 'https://forstart.no/arrangorer', external: true },
];

const legal = [
  { label: 'Kjøpsvilkår', href: '/kjopsvilkar' },
  { label: 'Personvern (GDPR)', href: '/personvern' },
  { label: 'Kontakt oss', href: '/kontakt' },
];

type FooterLink = { label: string; href: string; external?: boolean };

function FooterColumn({ heading, links }: { heading: string; links: FooterLink[] }) {
  return (
    <div>
      <h4 className="text-white font-bold text-sm tracking-wide mb-5">{heading}</h4>
      <ul className="space-y-3">
        {links.map((link) =>
          link.external ? (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-white text-sm transition-colors inline-flex items-center gap-1.5"
              >
                {link.label}
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            </li>
          ) : (
            <li key={link.href}>
              <Link href={link.href} className="text-neutral-400 hover:text-white text-sm transition-colors">
                {link.label}
              </Link>
            </li>
          )
        )}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-400 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand */}
          <div>
            <Link href="/" className="font-black tracking-tighter text-white text-xl select-none">
              LAVTERSKEL
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-neutral-500">
              Gjør løping til en lek, ikke et ork. Podkast, kunnskap og treningsprogrammer for folk flest.
            </p>
          </div>

          <FooterColumn heading="Tjenester" links={services} />
          <FooterColumn heading="Førstart.no" links={forstart} />
          <FooterColumn heading="Juridisk" links={legal} />
        </div>

        <div className="border-t border-neutral-800 mt-16 pt-8">
          <p className="text-neutral-600 text-sm">
            © 2026 Lavterskel.run. Alle rettigheter reservert.
          </p>
        </div>
      </div>
    </footer>
  );
}
