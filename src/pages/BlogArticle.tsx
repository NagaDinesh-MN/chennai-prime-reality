import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, Clock, Loader2, User } from "lucide-react";
import { fetchBlogPost, type BlogArticle } from "@/lib/blogQueries";
import { formatBlogDate } from "@/data/blog";
import { PortableTextBody } from "@/components/site/PortableTextBody";

export default function BlogArticlePage({ slug }: { slug: string }) {
  const [post, setPost] = useState<BlogArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetchBlogPost(slug)
      .then((result) => {
        if (!cancelled) setPost(result);
      })
      .catch((err) => {
        console.error("Failed to load article:", err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-muted-foreground">
        <Loader2 className="h-10 w-10 animate-spin text-gold" />
        <p className="text-sm font-medium">Loading article...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <section className="section container-px mx-auto max-w-3xl text-center">
        <span className="eyebrow">404</span>
        <h1 className="mt-3 font-display text-3xl md:text-5xl text-navy">Article not found</h1>
        <p className="mt-4 text-muted-foreground">
          This article may have been moved or unpublished. Browse our latest Chennai
          market insights instead.
        </p>
        <Link to="/blog" className="btn-navy mt-8 inline-flex">
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </Link>
      </section>
    );
  }

  return (
    <article>
      <header className="bg-navy text-navy-foreground py-14 md:py-20">
        <div className="container-px mx-auto max-w-4xl">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-navy-foreground/75 transition-colors hover:text-gold"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
          <span className="eyebrow mt-6 block">{post.category}</span>
          <h1 className="mt-3 font-display text-3xl md:text-5xl leading-tight">
            {post.title}
          </h1>
          {post.excerpt ? (
            <p className="mt-5 max-w-2xl text-navy-foreground/75 leading-relaxed">
              {post.excerpt}
            </p>
          ) : null}
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-navy-foreground/70">
            <span className="inline-flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-gold" /> {post.author.name}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5 text-gold" />
              {formatBlogDate(post.publishedAt)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-gold" /> {post.readTime}
            </span>
          </div>
        </div>
      </header>

      {post.image ? (
        <div className="container-px mx-auto max-w-4xl">
          <img
            src={post.image}
            alt={post.imageAlt || post.title}
            className="-mt-8 md:-mt-12 aspect-[16/9] w-full rounded-lg object-cover shadow-lg"
            loading="eager"
          />
        </div>
      ) : null}

      <div className="container-px mx-auto max-w-3xl py-12 md:py-16">
        {Array.isArray(post.body) && post.body.length > 0 ? (
          <PortableTextBody value={post.body} />
        ) : (
          <p className="text-base leading-relaxed text-foreground/80">{post.excerpt}</p>
        )}

        <div className="mt-14 border-t pt-8">
          <Link to="/blog" className="btn-navy inline-flex">
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
        </div>
      </div>
    </article>
  );
}
