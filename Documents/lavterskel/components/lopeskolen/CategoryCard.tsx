// Server Component — ren visning.
// Kategori-flise på Løpeskolen-index.

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Category } from '@/lib/lopeskolen/articles';
import { CATEGORIES } from '@/lib/lopeskolen/articles';

type Props = {
  category: Category;
  articleCount: number;
};

export default function CategoryCard({ category, articleCount }: Props) {
  const { label, description, icon } = CATEGORIES[category];

  return (
    <Link
      href={`/lopeskolen?kategori=${category}`}
      className="bg-white border border-neutral-200 p-8 rounded-3xl hover:border-neutral-300 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200 group flex flex-col"
    >
      <span className="text-3xl mb-5">{icon}</span>
      <h3 className="text-lg font-bold tracking-tight mb-2 text-neutral-900 group-hover:underline">
        {label}
      </h3>
      <p className="text-neutral-500 text-sm leading-relaxed flex-1 mb-5">{description}</p>
      <span className="text-xs font-semibold text-neutral-400 flex items-center gap-1">
        {articleCount} artikler <ArrowRight className="w-3 h-3" />
      </span>
    </Link>
  );
}
