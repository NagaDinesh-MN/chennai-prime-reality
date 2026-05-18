import { createFileRoute } from "@tanstack/react-router";
import { TestimonialCard, testimonials } from "@/components/site/Testimonials";
import { Star } from "lucide-react";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Client Testimonials — Chennai Prime Realty" },
      { name: "description", content: "Read what Chennai homeowners and investors say about working with Chennai Prime Realty." },
      { property: "og:title", content: "Testimonials — Chennai Prime Realty" },
      { property: "og:description", content: "Real stories from our clients across Chennai." },
      { property: "og:url", content: "/testimonials" },
    ],
    links: [{ rel: "canonical", href: "/testimonials" }],
  }),
  component: TestimonialsPage,
});

function TestimonialsPage() {
  return (
    <div>
      <section className="bg-navy text-navy-foreground py-20 md:py-28">
        <div className="container-px mx-auto max-w-7xl text-center">
          <div className="inline-flex items-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-gold text-gold" />)}
          </div>
          <h1 className="font-display text-4xl md:text-6xl max-w-3xl mx-auto leading-tight">3,000+ Chennai families have trusted us.</h1>
          <p className="mt-5 text-white/75 max-w-2xl mx-auto">Here's what some of them have to say about working with our team.</p>
        </div>
      </section>

      <section className="section container-px mx-auto max-w-7xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map(t => <TestimonialCard key={t.name} t={t} />)}
        </div>
      </section>
    </div>
  );
}
