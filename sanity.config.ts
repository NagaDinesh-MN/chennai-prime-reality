/**
 * Sanity CMS configuration for the Chennai Prime Realty blog.
 *
 * Set VITE_SANITY_PROJECT_ID (and optionally VITE_SANITY_DATASET) to connect a
 * Sanity project. Until then, `isSanityConfigured` is false and the blog page
 * renders the bundled demo posts instead.
 */
import { createClient, type SanityClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const sanityConfig = {
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID as string | undefined,
  dataset: (import.meta.env.VITE_SANITY_DATASET as string | undefined) ?? "production",
  apiVersion: "2024-01-01",
  useCdn: true,
};

export const isSanityConfigured = Boolean(sanityConfig.projectId);

export const sanityClient: SanityClient | null = isSanityConfigured
  ? createClient({
      projectId: sanityConfig.projectId!,
      dataset: sanityConfig.dataset,
      apiVersion: sanityConfig.apiVersion,
      useCdn: sanityConfig.useCdn,
    })
  : null;

type SanityImageSource = Parameters<ReturnType<typeof imageUrlBuilder>["image"]>[0];

export function urlFor(source: SanityImageSource) {
  if (!sanityClient) return null;
  return imageUrlBuilder(sanityClient).image(source);
}

/** GROQ query for blog posts, newest first. */
export const blogPostsQuery = `*[_type == "post"] | order(publishedAt desc) {
  "id": _id,
  title,
  "slug": slug.current,
  excerpt,
  "image": mainImage.asset->url,
  "category": coalesce(category->title, category),
  "date": publishedAt,
  readTime,
  "author": coalesce(author->name, author)
}`;
