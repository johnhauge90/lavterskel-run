// Server Component — Løpeskolen-index.
// Viser 4 kategori-fliser + alle artikler i grid.
// Kategorifiltrering via ?kategori=slug (ingen JS nødvendig — URL-drevet).

import type { Metadata } from 'next';
import { ARTICLES, CATEGORIES, getArticlesByCategory } from '@/lib/lopeskolen/articles';
import type { Category } from '@/lib/lopeskolen/articles';
import CategoryCard from '@/components/lopeskolen/CategoryCard';
import ArticleCard from '@/components/lopeskolen/ArticleCard';
import QuizCTA from '@/components/lopeskolen/QuizCTA';

export const metadata: Metadata = {
  title: 'Løpeskolen — Lavterskel',
  description: 'Praktiske råd for nybegynnere og mosjonister. Skadefri progresjon, motivasjon og alt du trenger for å komme i gang med løping.',
  alternates: {
    // Forteller Google at ?kategori=... er filtreringsparametere,
    // ikke unike sider. Hindrer duplisert innhold i søkeindeksen.
    canonical: '/lopeskolen',
  },
};

const VALID_CATEGORIES = Object.keys(CATEGORIES) as Category[];

type Props = {
  searchParams: Promise<{ kategori?: string }>;
};

export default async function LopeskolenPage({ searchParams }: Props) {
  const { kategori } = await searchParams;
  const activeCategory = VALID_CATEGORIES.includes(kategori as Category)
    ? (kategori as Category)
    : null;

  const displayedArticles = activeCategory
    ? getArticlesByCategory(activeCategory)
    : ARTICLES;

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans pb-24">

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="bg-[#F7F7F5] border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 md:py-20">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-neutral-900" />
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Løpeskolen
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-5 leading-tight">
            Alt du trenger<br className="hidden md:block" /> for å begynne å løpe.
          </h1>
          <p className="text-neutral-500 text-base md:text-lg leading-relaxed max-w-xl">
            Ingen VO2-maks-jargong. Ingen skammende sammenlikninger.
            Bare praktiske råd som fungerer — uansett utgangspunkt.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* ── KATEGORIER ────────────────────────────────────────────── */}
        <section className="py-12">
          <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-6">
            Velg tema
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {VALID_CATEGORIES.map((cat) => (
              <CategoryCard
                key={cat}
                category={cat}
                articleCount={getArticlesByCategory(cat).length}
              />
            ))}
          </div>
        </section>

        {/* ── ARTIKKELGRID ──────────────────────────────────────────── */}
        <section className="py-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight">
              {activeCategory
                ? CATEGORIES[activeCategory].label
                : 'Alle artikler'}
            </h2>
            {activeCategory && (
              <a
                href="/lopeskolen"
                className="text-sm font-semibold text-neutral-500 hover:text-neutral-900 transition-colors"
              >
                Vis alle →
              </a>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {displayedArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>

        {/* ── QUIZ-CTA ──────────────────────────────────────────────── */}
        <section className="py-8">
          <QuizCTA />
        </section>

      </div>
    </div>
  );
}
