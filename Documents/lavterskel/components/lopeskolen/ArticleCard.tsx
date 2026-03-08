// Server Component — ren visning.
// Artikkelkort for grid på Løpeskolen-index og kategorifiltrert visning.

import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import type { Article } from '@/lib/lopeskolen/articles';
import { CATEGORIES } from '@/lib/lopeskolen/articles';

type Props = {
  article: Article;
};

export default function ArticleCard({ article }: Props) {
  const { label } = CATEGORIES[article.category];

  return (
    <Link
      href={`/lopeskolen/${article.slug}`}
      className="bg-white border border-neutral-200 rounded-[2rem] overflow-hidden flex flex-col group hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
    >
      {/* Bilde */}
      <div className="relative w-full h-48 overflow-hidden bg-neutral-100">
        <img
          src={article.coverImage}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </div>

      {/* Innhold */}
      <div className="p-7 flex flex-col flex-1">
        {/* Meta-rad */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-bold uppercase tracking-widest text-neutral-500 bg-neutral-100 px-3 py-1 rounded-full">
            {label}
          </span>
          <span className="flex items-center gap-1 text-xs text-neutral-400">
            <Clock className="w-3 h-3" strokeWidth={1.5} />
            {article.readingMinutes} min
          </span>
        </div>

        <h3 className="text-lg font-bold tracking-tight mb-3 text-neutral-900 leading-snug">
          {article.title}
        </h3>
        <p className="text-neutral-500 text-sm leading-relaxed flex-1 mb-5">
          {article.intro}
        </p>

        <span className="text-sm font-semibold text-neutral-900 flex items-center gap-1 group-hover:underline">
          Les artikkelen <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </Link>
  );
}
