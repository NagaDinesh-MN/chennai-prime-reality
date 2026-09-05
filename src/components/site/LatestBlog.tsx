import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import { SectionHead } from "@/components/site/SectionHead";
import { fetchBlogPosts } from "@/lib/blogQueries";
import { formatBlogDate } from "@/data/blog";
import type { BlogPost } from "@/types/blog";

export function LatestBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    fetchBlogPosts()
      .then((all) => {
        if (!cancelled) {
          setPosts(all.slice(0, 3));
        }
      })
      .catch((err) => {
        console.error("Failed to load latest blog posts:", err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="section bg-secondary/50">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHead
          eyebrow="Insights"
          title="Latest from Our Blog"
          subtitle="Market analysis, neighbourhood guides and investment tips for Chennai property buyers."
        />

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="card-elegant overflow-hidden">
                <div className="aspect-[16/10] bg-muted animate-pulse" />
                <div className="p-6 space-y-3">
                  <div className="h-4 w-20 rounded bg-muted animate-pulse" />
                  <div className="h-6 w-full rounded bg-muted animate-pulse" />
                  <div className="h-4 w-full rounded bg-muted animate-pulse" />
                  <div className="h-4 w-2/3 rounded bg-muted animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <BlogCard key={post._id} post={post} />
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link to="/blog" className="btn-navy">
                View All Articles <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug }}
      className="card-elegant flex flex-col overflow-hidden group transition-shadow hover:shadow-xl"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
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
        <p className="mt-3 flex-1 text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5 text-gold" />
            {formatBlogDate(post.publishedAt)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-gold" />
            {post.readTime}
          </span>
        </div>
        <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-navy group-hover:text-gold">
          Read Article <ArrowRight className="h-3.5 w-3.5 text-gold transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
