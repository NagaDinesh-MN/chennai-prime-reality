import { sanityClient } from "@/lib/sanityClient";
import { demoPosts } from "@/data/blog";
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

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    const result = await sanityClient.fetch<BlogPost[]>(blogPostsQuery);
    const normalized = (result ?? [])
      .map((post) => ({
        ...post,
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
