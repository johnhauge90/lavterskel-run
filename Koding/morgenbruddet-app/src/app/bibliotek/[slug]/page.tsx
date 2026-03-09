import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar } from "lucide-react";
import { createClient } from "@/utils/supabase/server";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const supabase = await createClient();
  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-4xl px-6 py-12">

        {/* Back button */}
        <div className="mb-8">
          <Link
            href="/bibliotek"
            className="inline-flex items-center gap-2 text-sm text-ink-4 transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Tilbake til biblioteket</span>
          </Link>
        </div>

        {/* Article header */}
        <header className="mb-12">
          {post.category && (
            <div className="mb-4">
              <span className="border border-gold/30 px-4 py-1.5 text-sm font-medium text-gold">
                {post.category}
              </span>
            </div>
          )}

          <h1 className="mb-4 leading-tight text-ink">
            {post.title}
          </h1>

          {post.created_at && (
            <div className="flex items-center gap-2 text-ink-4">
              <Calendar className="h-4 w-4" />
              <time>
                {new Date(post.created_at).toLocaleDateString('nb-NO', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </time>
            </div>
          )}

          {post.excerpt && (
            <p className="mt-6 text-xl leading-relaxed text-ink-2">
              {post.excerpt}
            </p>
          )}
        </header>

        {/* Article content */}
        <article className="mx-auto max-w-2xl">
          <div className="whitespace-pre-wrap text-lg leading-relaxed text-ink-2">
            {post.content}
          </div>
        </article>

        {/* Call to Action */}
        <div className="mx-auto mt-16 max-w-2xl">
          <div className="border border-cream-border bg-cream-2 p-8 text-center">
            <h3 className="mb-4 text-2xl font-bold text-ink">
              Inspirert til å sykle?
            </h3>
            <p className="mb-6 text-lg text-ink-3">
              Bli med på en av våre trygge turer og opplev sykkelgleden selv!
            </p>
            <Link
              href="/onboarding"
              className="inline-flex h-14 items-center justify-center bg-gold px-8 text-sm font-bold uppercase tracking-widest text-ink transition-colors hover:bg-gold-h"
            >
              Bli med på tur
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
