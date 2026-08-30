import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, FilePenLine } from "lucide-react";

const sanityStudioUrl = "https://chennai-prime-realty.sanity.studio/";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Content Admin — Chennai Prime Realty" },
      {
        name: "description",
        content: "Manage Chennai Prime Realty blog content in Sanity Studio.",
      },
    ],
    links: [{ rel: "canonical", href: "/admin" }],
  }),
  component: AdminPage,
});

function AdminPage() {
  return (
    <div>
      <section className="bg-navy text-navy-foreground py-20 md:py-28">
        <div className="container-px mx-auto max-w-7xl">
          <span className="eyebrow">Content Admin</span>
          <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight md:text-6xl">
            Manage your blog content in one place.
          </h1>
          <p className="mt-6 max-w-2xl leading-relaxed text-white/75">
            Create, edit and publish Chennai Prime Realty blog posts through Sanity Studio. Changes you publish there are shown on the website automatically.
          </p>
        </div>
      </section>

      <section className="section container-px mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl rounded-xl border bg-card p-7 shadow-sm md:p-10">
          <div className="flex h-12 w-12 items-center justify-center rounded-md" style={{ background: "var(--gradient-gold)" }}>
            <FilePenLine className="h-6 w-6 text-navy" />
          </div>
          <h2 className="mt-6 font-display text-3xl text-navy">Open Sanity Studio</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Sanity is the secure content-management area for your blog. Sign in with your Sanity account to manage posts, authors and categories.
          </p>
          <a
            href={sanityStudioUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-gold mt-7 inline-flex items-center gap-2"
          >
            Open Sanity Studio
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
