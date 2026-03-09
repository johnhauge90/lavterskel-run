import Link from "next/link";
import { Search, Sprout, Users, Briefcase, Activity, Tag } from "lucide-react";
import { createClient } from "@/utils/supabase/server";

export default async function BibliotekPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase.from('posts').select('*').order('created_at', { ascending: false });

  const categories = [
    {
      id: "beginner",
      title: "Helt Fersk",
      icon: Sprout,
      description: "For deg som ikke har syklet på 10 år. Start her.",
      href: "/bibliotek/helt-fersk",
    },
    {
      id: "family",
      title: "Familie & Barn",
      icon: Users,
      description: "Trygg sykling med små barn. Henger, sete eller transportsykkel?",
      href: "/bibliotek/familie-barn",
    },
    {
      id: "commuter",
      title: "Pendleren",
      icon: Briefcase,
      description: "Kom frem tørr og blid. Rutevalg og smarte triks.",
      href: "/bibliotek/pendleren",
    },
    {
      id: "fitness",
      title: "Mosjonisten",
      icon: Activity,
      description: "Fra dørstokkmil til Tour of Norway. Treningslære gjort enkelt.",
      href: "/bibliotek/mosjonisten",
    },
  ];

  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-6xl px-6 py-16">

        {/* Header */}
        <header className="mb-12 text-center">
          <div className="mb-4 text-xs font-medium uppercase tracking-widest text-ink-3">
            Kunnskap
          </div>
          <h1 className="mb-4 text-ink">
            Biblioteket
          </h1>
          <p className="mx-auto max-w-xl text-lg leading-relaxed text-ink-3">
            Alt du trenger å vite om sykling i Rogaland. Fra første sykkel til Nordsjørittet.
          </p>
        </header>

        {/* Search field */}
        <div className="mb-16">
          <div className="relative mx-auto max-w-2xl">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-4" />
            <input
              type="text"
              placeholder="Hva lurer du på? F.eks. regntøy, trygg skolevei, elsykkel..."
              className="w-full border border-cream-border bg-cream-2 py-4 pl-12 pr-4 text-ink placeholder-ink-4 outline-none ring-2 ring-transparent transition-all focus:ring-gold"
            />
          </div>
        </div>

        {/* Categories Grid */}
        <section className="mb-16">
          <h2 className="mb-6 text-ink">Kategorier</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.id}
                  href={category.href}
                  className="group border border-cream-border bg-cream-2 p-6 transition-all hover:border-ink hover:-translate-y-0.5"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-cream-border bg-cream">
                      <Icon className="h-6 w-6 text-gold" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-2 text-xl font-bold text-ink">
                        {category.title}
                      </h3>
                      <p className="leading-relaxed text-ink-3">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Latest Posts from Database */}
        <section>
          <h2 className="mb-6 text-ink">Siste artikler</h2>

          {!posts || posts.length === 0 ? (
            <div className="border border-cream-border bg-cream-2 p-12 text-center">
              <p className="text-lg text-ink-3">Ingen artikler funnet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/bibliotek/${post.slug}`}
                  className="group flex items-center justify-between border border-cream-border bg-cream p-6 transition-all hover:border-ink hover:bg-cream-2"
                >
                  <div className="flex items-start gap-4">
                    <Tag className="mt-1 h-4 w-4 shrink-0 text-gold" />
                    <div className="flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        {post.category && (
                          <span className="border border-gold/30 px-3 py-0.5 text-xs font-medium text-gold">
                            {post.category}
                          </span>
                        )}
                      </div>
                      <h3 className="mb-1 text-base font-semibold text-ink">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="text-sm text-ink-3">{post.excerpt}</p>
                      )}
                      {post.created_at && (
                        <p className="mt-2 text-xs text-ink-4">
                          {new Date(post.created_at).toLocaleDateString('nb-NO', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
