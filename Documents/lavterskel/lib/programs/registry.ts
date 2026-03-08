// Singel kilde til sannhet for alle treningsprogrammer.
// Importert i: quiz/page.tsx (client), app/actions/programs.ts (server), dashboard (server).
// Slug-format: "${level}-${goal}" — matcher quiz-svarene direkte.

export type ProgramSlug =
  | 'sofa-skadefri'
  | 'sofa-5km'
  | 'sofa-halvmaraton'
  | 'jogger-skadefri'
  | 'jogger-5km'
  | 'jogger-halvmaraton'
  | 'aktiv-skadefri'
  | 'aktiv-5km'
  | 'aktiv-halvmaraton';

export interface Program {
  slug: ProgramSlug;
  name: string;
  description: string;
  weeks: number;
  price: number;
}

export const PROGRAMS: Record<ProgramSlug, Program> = {
  'sofa-skadefri': {
    slug: 'sofa-skadefri',
    name: 'Fra Sofa til Skadefri Start',
    description:
      'Bygger bevegelighet og styrke før du i det hele tatt løper. Knærne dine takker deg.',
    weeks: 6,
    price: 399,
  },
  'sofa-5km': {
    slug: 'sofa-5km',
    name: 'Fra Sofa til 5 km',
    description:
      'Folkelig, trygt og effektivt. Inkluderer Løpeskolen, dashboard-avkrysning og ukentlige tips.',
    weeks: 8,
    price: 499,
  },
  'sofa-halvmaraton': {
    slug: 'sofa-halvmaraton',
    name: 'Fra Sofa til 5 km',
    description:
      'Halvmaraton starter med ett steg. Dette er ditt første steg — et solid grunnprogram.',
    weeks: 8,
    price: 499,
  },
  'jogger-skadefri': {
    slug: 'jogger-skadefri',
    name: 'Løp Sterkere, Ikke Hardere',
    description:
      'Teknikk, styrke og periodisering for løpere som allerede er i gang, men sliter med skader.',
    weeks: 8,
    price: 499,
  },
  'jogger-5km': {
    slug: 'jogger-5km',
    name: 'Mestre 5 km',
    description:
      'Fra ustrukturert jogging til å løpe 5 km med overskudd og personlig rekord.',
    weeks: 8,
    price: 499,
  },
  'jogger-halvmaraton': {
    slug: 'jogger-halvmaraton',
    name: 'Halvmaraton under 2:30',
    description:
      'En komplett halvmaratonplan for løpere med litt base. Strukturert, progressiv og skadefri.',
    weeks: 12,
    price: 699,
  },
  'aktiv-skadefri': {
    slug: 'aktiv-skadefri',
    name: 'Løp Sterkere, Ikke Hardere',
    description:
      'Optimalisert for aktive løpere som vil bygge mer robusthet og unngå overbelastningsskader.',
    weeks: 8,
    price: 499,
  },
  'aktiv-5km': {
    slug: 'aktiv-5km',
    name: '10 km på Rekordtid',
    description:
      'Intervallfokusert program for deg som allerede løper 5 km greit og vil presse grensene.',
    weeks: 8,
    price: 499,
  },
  'aktiv-halvmaraton': {
    slug: 'aktiv-halvmaraton',
    name: 'Halvmaraton under 2 timer',
    description:
      'Ambisiøst, strukturert og datastyrt. Ditt program for å krysse målstreken med 1:59:xx.',
    weeks: 10,
    price: 699,
  },
};

/** Validerer at en ukjent streng er en gyldig ProgramSlug. */
export function isProgramSlug(slug: string): slug is ProgramSlug {
  return slug in PROGRAMS;
}

/** Henter program fra registry. Returnerer null hvis slug er ugyldig. */
export function getProgram(slug: string): Program | null {
  if (!isProgramSlug(slug)) return null;
  return PROGRAMS[slug];
}
