import { createFileRoute } from "@tanstack/react-router";
import BlogArticlePage from "@/pages/BlogArticle";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: "Chennai Real Estate Insight | Chennai Prime Realty Blog" },
      {
        name: "description",
        content:
          "Read the full Chennai property market article from Chennai Prime Realty — trends, investment guidance and neighbourhood analysis.",
      },
      { property: "og:title", content: "Chennai Real Estate Insight | Chennai Prime Realty" },
      {
        property: "og:description",
        content:
          "In-depth Chennai real estate analysis and buying guidance from the Chennai Prime Realty team.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: `/blog/${params.slug}` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `/blog/${params.slug}` }],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { slug } = Route.useParams();
  return <BlogArticlePage slug={slug} />;
}
