import { createFileRoute } from "@tanstack/react-router";
import { SectionHead } from "@/components/site/SectionHead";
import { Target, Heart, Sparkles, Award } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Chennai Prime Realty" },
      { name: "description", content: "Learn about Chennai Prime Realty — 12+ years of trusted real estate expertise across Chennai's premier neighborhoods." },
      { property: "og:title", content: "About Chennai Prime Realty" },
      { property: "og:description", content: "12+ years of trusted real estate expertise in Chennai." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const values = [
  { icon: Heart, title: "Integrity First", text: "Every transaction is built on honesty, transparency, and the long-term interest of our clients." },
  { icon: Sparkles, title: "Curated Quality", text: "We list only properties we'd recommend to our own family — vetted, verified, and worth your time." },
  { icon: Target, title: "Client-Centric", text: "Your goals drive every recommendation. No pressure, no upselling — just genuine guidance." },
  { icon: Award, title: "Local Mastery", text: "Born and built in Chennai. We know the streets, the schools, the future — block by block." },
];

const team = [
  { name: "Vikram Raghavan", role: "Founder & Managing Director", initials: "VR" },
  { name: "Anjali Mahadevan", role: "Head of Residential Sales", initials: "AM" },
  { name: "Suresh Pillai", role: "Commercial Properties Lead", initials: "SP" },
  { name: "Divya Ramesh", role: "Investment Advisory", initials: "DR" },
];

function AboutPage() {
  return (
    <div>
      <section className="bg-navy text-navy-foreground py-20 md:py-28">
        <div className="container-px mx-auto max-w-7xl">
          <span className="eyebrow">About Us</span>
          <h1 className="mt-3 font-display text-4xl md:text-6xl max-w-3xl leading-tight">
            Building Chennai's most trusted real estate brand, one home at a time.
          </h1>
          <p className="mt-6 text-white/75 max-w-2xl leading-relaxed">
            Since 2012, Chennai Prime Realty has helped over 3,000 families and investors find homes, plots and commercial spaces across the city. We're more than brokers — we're long-term partners.
          </p>
        </div>
      </section>

      <section className="section container-px mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <span className="eyebrow">Our Story</span>
            <h2 className="mt-3 font-display text-3xl md:text-4xl text-navy">A boutique agency built on Chennai roots.</h2>
            <div className="mt-6 space-y-4 text-foreground/80 leading-relaxed">
              <p>What began as a two-person office in Thousand Lights has grown into one of the city's most respected real estate firms — without losing the personal touch that defined our first days.</p>
              <p>We believe buying a home is one of the most important decisions a person makes. That's why every client at Chennai Prime Realty works with a dedicated advisor who learns their story, understands their goals, and walks alongside them from search to keys.</p>
              <p>Today, we operate across all major Chennai neighborhoods — OMR, ECR, Anna Nagar, Velachery, Porur, Adyar and beyond — with deep partnerships with the city's leading developers.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { n: "3,000+", l: "Happy Clients" }, { n: "₹2,400 Cr+", l: "Properties Closed" },
              { n: "12+", l: "Years of Service" }, { n: "98%", l: "Client Satisfaction" },
            ].map(s => (
              <div key={s.l} className="card-elegant p-6 text-center">
                <p className="font-display text-3xl md:text-4xl text-gold font-semibold">{s.n}</p>
                <p className="mt-2 text-sm text-muted-foreground">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-secondary/50">
        <div className="container-px mx-auto max-w-7xl">
          <SectionHead eyebrow="Our Mission" title="Make premium real estate transparent, accessible and rewarding." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(v => (
              <div key={v.title} className="p-6 rounded-xl bg-card border transition-all hover:border-gold hover:shadow-lg">
                <v.icon className="h-9 w-9 text-gold" />
                <h3 className="mt-4 font-display text-lg text-navy">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section container-px mx-auto max-w-7xl">
        <SectionHead eyebrow="Meet the Team" title="Advisors who care as much as you do." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map(m => (
            <div key={m.name} className="card-elegant p-6 text-center">
              <div className="mx-auto h-24 w-24 rounded-full flex items-center justify-center font-display text-2xl font-semibold"
                style={{ background: "var(--gradient-navy)", color: "var(--navy-foreground)" }}>
                {m.initials}
              </div>
              <h3 className="mt-4 font-display text-lg text-navy">{m.name}</h3>
              <p className="text-sm text-gold mt-1">{m.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
