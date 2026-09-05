import { sanityClient } from "@/lib/sanityClient";
import { demoPosts } from "@/data/blog";
import fallbackImage from "@/assets/hero-chennai.jpg";
import type { BlogPost } from "@/types/blog";

const blogPostsQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  "image": mainImage.asset->url,
  "category": categories[0]->title,
  publishedAt,
  "readTime": readTime,
  "author": author->{ name },
  featured
}`;

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function normalizeDemoPosts(): BlogPost[] {
  return demoPosts.map((post, index) => ({
    _id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    image: post.image,
    category: post.category,
    publishedAt: post.date,
    readTime: post.readTime,
    author: {
      name: post.author,
      initials: getInitials(post.author),
    },
    featured: index === 0,
  }));
}

function sortByDate(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort((a, b) => {
    const aTime = new Date(a.publishedAt ?? 0).getTime();
    const bTime = new Date(b.publishedAt ?? 0).getTime();
    if (Number.isNaN(aTime) || Number.isNaN(bTime)) return 0;
    return bTime - aTime;
  });
}

function optimizeImage(url?: string): string {
  if (!url) return fallbackImage;
  if (!url.includes("cdn.sanity.io")) return url;
  return `${url}?w=1200&fit=max&auto=format`;
}

const blogPostQuery = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  "image": mainImage.asset->url,
  "imageAlt": mainImage.alt,
  "category": categories[0]->title,
  "categories": categories[]->title,
  publishedAt,
  readTime,
  "author": author->{ name },
  featured,
  body
}`;

export interface BlogArticle extends BlogPost {
  imageAlt?: string;
  categories?: string[];
  body?: unknown[];
  isDemo?: boolean;
}

/** Fetch a single published article by its Sanity slug. */
export async function fetchBlogPost(slug: string): Promise<BlogArticle | null> {
  try {
    const post = await sanityClient.fetch<BlogArticle | null>(blogPostQuery, { slug });
    if (post?.title) {
      return {
        ...post,
        image: optimizeImage(post.image),
        category: post.category ?? post.categories?.[0] ?? "Market Trends",
        readTime: post.readTime ?? "5 min read",
        author: {
          name: post.author?.name ?? "Chennai Prime Realty",
          initials: getInitials(post.author?.name ?? "Chennai Prime Realty"),
        },
      };
    }
  } catch (err) {
    console.error("Failed to fetch blog post from Sanity:", err);
  }

  const demo = normalizeDemoPosts().find((p) => p.slug === slug);
  return demo ? { ...demo, isDemo: true } : null;
}

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    const result = await sanityClient.fetch<BlogPost[]>(blogPostsQuery);
    const normalized = (result ?? [])
      .map((post) => ({
        ...post,
        image: optimizeImage(post.image),
        category: post.category ?? "Market Trends",
        readTime: post.readTime ?? "5 min read",
        author: {
          name: post.author?.name ?? "Chennai Prime Realty",
          initials: getInitials(post.author?.name ?? "Chennai Prime Realty"),
        },
      }))
      .filter((post) => post.title && post.slug);

    if (normalized.length) {
      return sortByDate(normalized);
    }
  } catch (err) {
    console.error("Failed to fetch blog posts from Sanity:", err);
  }

  return sortByDate(normalizeDemoPosts());
}
