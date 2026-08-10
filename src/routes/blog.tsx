import { createFileRoute } from "@tanstack/react-router";
import BlogPage from "@/pages/Blog";

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
