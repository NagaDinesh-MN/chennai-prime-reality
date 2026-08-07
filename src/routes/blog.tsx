import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, CalendarDays, Clock, Mail, User } from "lucide-react";
import { SectionHead } from "@/components/site/SectionHead";
import {
  blogCategories,
  demoPosts,
  formatBlogDate,
  type BlogPost,
} from "@/data/blog";
import { blogPostsQuery, isSanityConfigured, sanityClient } from "../../sanity.config";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Chennai Real Estate Blog & Market Insights | Chennai Prime Realty" },
      {
        name: "description",
        content:
          "Expert Chennai real estate insights — market trends across OMR, ECR, Anna Nagar, Velachery and Porur, plus investment, RERA and NRI guides.",
      },
      { property: "og:title", content: "Chennai Real Estate Blog & Market Insights" },
      {
        property: "og:description",
        content:
          "Market trends, investment analysis, RERA guidance and neighbourhood guides for Chennai property buyers.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/blog" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogPage,
});

function BlogPage() {
  const [active, setActive] = useState<string>("All");

  const { data: posts = demoPosts } = useQuery<BlogPost[]>({
    queryKey: ["blog-posts"],
    enabled: isSanityConfigured,
    initialData: demoPosts,
    queryFn: async () => {
      const result = await sanityClient!.fetch<BlogPost[]>(blogPostsQuery);
      return result?.length ? result : demoPosts;
    },
  });

  const filtered = useMemo(
    () => (active === "All" ? posts : posts.filter((p) => p.category === active)),
    [posts, active],
  );

  const featured = filtered[0];
  const rest = filtered.slice(1);

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
            Data-backed commentary on Chennai's property market — from OMR and ECR price trends to RERA
            paperwork, neighbourhood guides and NRI investment strategy.
          </p>
        </div>
      </section>

      {/* Category filter */}
      <section className="border-b bg-background/95 sticky top-16 md:top-20 z-40 backdrop-blur-md">
        <div className="container-px mx-auto max-w-7xl py-4 flex gap-2 overflow-x-auto">
          {blogCategories.map((c) => {
            const isActive = active === c;
            return (
              <button
                key={c}
                onClick={() => setActive(c)}
                aria-pressed={isActive}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-gold bg-gold text-gold-foreground"
                    : "border-border text-foreground/70 hover:border-gold hover:text-gold"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
      </section>

      <section className="section container-px mx-auto max-w-7xl">
        {!filtered.length && (
          <p className="text-center text-muted-foreground">
            No articles in this category yet — check back soon.
          </p>
        )}

        {/* Featured article */}
        {featured && (
          <article className="card-elegant grid lg:grid-cols-2 overflow-hidden">
            <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[380px]">
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
              <p className="mt-4 text-muted-foreground leading-relaxed">{featured.excerpt}</p>
              <PostMeta post={featured} className="mt-6" />
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-navy">
                Read Article <ArrowRight className="h-4 w-4 text-gold" />
              </span>
            </div>
          </article>
        )}

        {/* Grid */}
        {rest.length > 0 && (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <article key={post.id} className="card-elegant flex flex-col">
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
                  <h3 className="font-display text-xl text-navy leading-snug">{post.title}</h3>
                  <p className="mt-3 flex-1 text-sm text-muted-foreground leading-relaxed">
                    {post.excerpt}
                  </p>
                  <PostMeta post={post} className="mt-5" />
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Newsletter */}
      <section className="section bg-navy text-navy-foreground">
        <div className="container-px mx-auto max-w-3xl text-center">
          <SectionHead
            eyebrow="Stay Informed"
            title="Chennai market insights, once a month."
          />
          <p className="-mt-6 text-navy-foreground/75">
            Join 4,200+ buyers, sellers and investors getting our monthly price-trend digest. No spam,
            unsubscribe anytime.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
}

function PostMeta({ post, className = "" }: { post: BlogPost; className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground ${className}`}>
      <span className="inline-flex items-center gap-1.5">
        <User className="h-3.5 w-3.5 text-gold" /> {post.author}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <CalendarDays className="h-3.5 w-3.5 text-gold" /> {formatBlogDate(post.date)}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Clock className="h-3.5 w-3.5 text-gold" /> {post.readTime}
      </span>
    </div>
  );
}

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <p className="mt-8 text-gold font-medium">
        You're subscribed — the next Chennai market digest lands in your inbox.
      </p>
    );
  }

  return (
    <form
      className="mt-8 flex flex-col sm:flex-row gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        if (email.trim()) setDone(true);
      }}
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="relative flex-1 min-w-0">
        <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          className="input-field pl-10 text-foreground"
        />
      </div>
      <button type="submit" className="btn-gold shrink-0">
        Subscribe <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}
