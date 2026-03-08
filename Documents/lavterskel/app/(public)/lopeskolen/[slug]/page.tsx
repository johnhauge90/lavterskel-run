// Server Component — individuell artikkelside.
// Statisk generert via generateStaticParams (rask, SEO-vennlig).
// Alle artikler ender med QuizCTA — den primære salgstrakten.

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, CheckCircle2 } from 'lucide-react';
import { getArticleBySlug, getAllSlugs, CATEGORIES } from '@/lib/lopeskolen/articles';
import QuizCTA from '@/components/lopeskolen/QuizCTA';

type Props = {
  params: Promise<{ slug: string }>;
};

// Forhåndsgenerer alle artikkelruter ved build-tid
export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

// Dynamisk metadata per artikkel (for Google-snippets)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: 'Ikke funnet' };
  return {
    title: `${article.title} — Løpeskolen`,
    description: article.intro,
    openGraph: { images: [article.coverImage] },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const { label } = CATEGORIES[article.category];

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans pb-24">

      {/* ── HERO-BILDE ────────────────────────────────────────────── */}
      <div className="w-full h-72 md:h-96 overflow-hidden bg-neutral-100">
        <img
          src={article.coverImage}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6">

        {/* ── TILBAKE-LENKE + META ───────────────────────────────── */}
        <div className="pt-10 pb-6 flex items-center justify-between">
          <Link
            href="/lopeskolen"
            className="flex items-center gap-2 text-sm font-semibold text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
            Løpeskolen
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-500 bg-neutral-100 px-3 py-1 rounded-full">
              {label}
            </span>
            <span className="flex items-center gap-1 text-xs text-neutral-400">
              <Clock className="w-3 h-3" strokeWidth={1.5} />
              {article.readingMinutes} min
            </span>
          </div>
        </div>

        {/* ── TITTEL + INGRESS ──────────────────────────────────── */}
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-5 leading-tight">
          {article.title}
        </h1>
        <p className="text-lg text-neutral-500 leading-relaxed mb-12 border-b border-neutral-100 pb-12">
          {article.intro}
        </p>

        {/* ── ARTIKKELINNHOLD ───────────────────────────────────── */}
        <div className="space-y-10">
          {article.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="text-xl font-bold tracking-tight mb-3 text-neutral-900">
                {section.heading}
              </h2>
              <p className="text-neutral-600 leading-relaxed">
                {section.body}
              </p>
            </div>
          ))}
        </div>

        {/* ── NØKKELPUNKTER ─────────────────────────────────────── */}
        <div className="bg-[#F7F7F5] p-8 rounded-3xl mt-12 border border-neutral-100">
          <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-500 mb-5">
            Kort oppsummert
          </h3>
          <ul className="space-y-3">
            {article.keyTakeaways.map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm text-neutral-700">
                <CheckCircle2
                  className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5"
                  strokeWidth={1.5}
                />
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* ── QUIZ-CTA ──────────────────────────────────────────── */}
        <QuizCTA />

      </div>
    </div>
  );
}
