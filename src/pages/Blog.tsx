import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Clock,
  Loader2,
  Search,
  User,
} from "lucide-react";
import { fetchBlogPosts } from "@/lib/blogQueries";
import { blogCategories, formatBlogDate } from "@/data/blog";
import type { BlogPost } from "@/types/blog";

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let cancelled = false;

    fetchBlogPosts()
      .then((normalized) => {
        if (!cancelled) setPosts(normalized);
      })
      .catch((err) => {
        console.error("Failed to fetch blog posts from Sanity:", err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        activeCategory === "All" || post.category === activeCategory;
      const matchesSearch = post.title
        .toLowerCase()
        .includes(searchQuery.trim().toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [posts, activeCategory, searchQuery]);

  const featured = filtered.find((p) => p.featured) ?? filtered[0];
  const rest = filtered.filter((p) => p !== featured);

  return (
    <div>
      {/* Hero */}
      <section className="bg-navy text-navy-foreground py-20 md:py-28">
        <div className="container-px mx-auto max-w-7xl">
          <span className="eyebrow">Insights & Analysis</span>
          <h1 className="mt-3 font-display text-4xl md:text-6xl max-w-4xl leading-tight">
            Chennai Real Estate Blog &amp; Market Insights
          </h1>
          <p className="mt-6 text-navy-foreground/75 max-w-2xl">
            Data-backed commentary on Chennai&apos;s property market — from OMR and
            ECR price trends to RERA paperwork, neighbourhood guides and NRI
            investment strategy.
          </p>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="border-b bg-background/95 sticky top-16 md:top-20 z-40 backdrop-blur-md">
        <div className="container-px mx-auto max-w-7xl py-4 space-y-4 md:space-y-0 md:grid md:grid-cols-[1fr_auto] md:items-center md:gap-6">
          <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0">
            {blogCategories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={isActive}
                  className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "border-gold bg-gold text-gold-foreground"
                      : "border-border text-foreground/70 hover:border-gold hover:text-gold"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="input-field w-full pl-10"
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section container-px mx-auto max-w-7xl">
        {loading ? (
          <div className="flex min-h-[320px] flex-col items-center justify-center gap-4 text-muted-foreground">
            <Loader2 className="h-10 w-10 animate-spin text-gold" />
            <p className="text-sm font-medium">Loading market insights...</p>
          </div>
        ) : (
          <>
            {!filtered.length && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No articles match your search — try a different keyword or
                  category.
                </p>
              </div>
            )}

            {featured && (
              <article className="card-elegant grid lg:grid-cols-2 overflow-hidden">
                <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[420px]">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="eager"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-navy/85 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-navy-foreground">
                    Featured
                  </span>
                </div>
                <div className="p-6 md:p-10 flex flex-col justify-center">
                  <span className="eyebrow">{featured.category}</span>
                  <h2 className="mt-3 font-display text-2xl md:text-4xl text-navy leading-tight">
                    {featured.title}
                  </h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    {featured.excerpt}
                  </p>
                  <PostMeta post={featured} className="mt-6" />
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-navy">
                    Read Article <ArrowRight className="h-4 w-4 text-gold" />
                  </span>
                </div>
              </article>
            )}

            {rest.length > 0 && (
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((post) => (
                  <article key={post._id} className="card-elegant flex flex-col">
                    <div className="relative aspect-[16/10]">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="absolute inset-0 h-full w-full object-cover"
                        loading="lazy"
                      />
                      <span className="absolute left-3 top-3 rounded-full bg-navy/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-navy-foreground">
                        {post.category}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="font-display text-xl text-navy leading-snug">
                        {post.title}
                      </h3>
                      <p className="mt-3 flex-1 text-sm text-muted-foreground leading-relaxed">
                        {post.excerpt}
                      </p>
                      <PostMeta post={post} className="mt-5" />
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}

function PostMeta({
  post,
  className = "",
}: {
  post: BlogPost;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground ${className}`}
    >
      <span className="inline-flex items-center gap-1.5">
        <User className="h-3.5 w-3.5 text-gold" /> {post.author.name}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <CalendarDays className="h-3.5 w-3.5 text-gold" />{" "}
        {formatBlogDate(post.publishedAt)}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Clock className="h-3.5 w-3.5 text-gold" /> {post.readTime}
      </span>
    </div>
  );
}
