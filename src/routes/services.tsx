import { createFileRoute, Link } from "@tanstack/react-router";
import { Home, Tag, KeyRound, TrendingUp, Check, ArrowRight } from "lucide-react";
import { SectionHead } from "@/components/site/SectionHead";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Buying, Selling, Rentals & Investment | Chennai Prime Realty" },
      { name: "description", content: "End-to-end real estate services in Chennai: buying assistance, selling, rental management and investment advisory." },
      { property: "og:title", content: "Real Estate Services — Chennai Prime Realty" },
      { property: "og:description", content: "Buying, selling, rentals and investment advisory in Chennai." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

const services = [
  {
    icon: Home, title: "Buying Assistance",
    text: "From shortlisting properties that match your needs to negotiating the best price and handling all paperwork — we manage your home-buying journey end to end.",
    points: ["Curated property recommendations", "Site visits & expert walk-throughs", "Price negotiation on your behalf", "Loan & documentation support"],
  },
  {
    icon: Tag, title: "Selling Assistance",
    text: "Sell your property at the best market value with our targeted marketing, qualified buyer network and seamless transaction support.",
    points: ["Free property valuation", "Professional photography & listing", "Qualified buyer matchmaking", "Transparent commission, no hidden fees"],
  },
  {
    icon: KeyRound, title: "Rental Management",
    text: "Earn passive rental income without the hassle. We handle tenant screening, rent collection, maintenance and renewals on your behalf.",
    points: ["Tenant screening & background checks", "Monthly rent collection", "Maintenance & repair coordination", "Lease drafting & renewals"],
  },
  {
    icon: TrendingUp, title: "Investment Advisory",
    text: "Build long-term wealth with data-backed real estate investments in Chennai's growth corridors. Personalised strategy for every investor.",
    points: ["Market trend & ROI analysis", "Growth-corridor recommendations", "Portfolio diversification", "Exit & resale planning"],
  },
];

function ServicesPage() {
  return (
    <div>
      <section className="bg-navy text-navy-foreground py-20 md:py-28">
        <div className="container-px mx-auto max-w-7xl">
          <span className="eyebrow">What We Do</span>
          <h1 className="mt-3 font-display text-4xl md:text-6xl max-w-3xl leading-tight">Full-service real estate, the way it should be.</h1>
          <p className="mt-6 text-white/75 max-w-2xl">One team. Every step. Whether you're buying your first home or building a property portfolio, we have you covered.</p>
        </div>
      </section>

      <section className="section container-px mx-auto max-w-7xl">
        <SectionHead eyebrow="Our Services" title="Four ways we help you win in real estate" />
        <div className="grid md:grid-cols-2 gap-6">
          {services.map(s => (
            <div key={s.title} className="card-elegant p-8 flex flex-col">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-xl" style={{ background: "var(--gradient-gold)" }}>
                <s.icon className="h-7 w-7 text-navy" />
              </span>
              <h3 className="mt-5 font-display text-2xl text-navy">{s.title}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{s.text}</p>
              <ul className="mt-5 space-y-2.5 flex-1">
                {s.points.map(p => (
                  <li key={p} className="flex gap-2.5 text-sm">
                    <Check className="h-4 w-4 text-gold shrink-0 mt-0.5" /> {p}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-navy hover:text-gold">
                Enquire about this <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="section bg-secondary/50">
        <div className="container-px mx-auto max-w-7xl text-center">
          <h2 className="font-display text-3xl md:text-5xl text-navy max-w-3xl mx-auto leading-tight">Not sure where to start?</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Speak with a Chennai Prime advisor — free, no obligation. We'll help you map the right next step.</p>
          <Link to="/contact" className="btn-gold mt-8">Book a Free Consultation <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </div>
  );
}
