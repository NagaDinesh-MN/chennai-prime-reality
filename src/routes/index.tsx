import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, ShieldCheck, Award, Users, TrendingUp, ArrowRight, Building2, Home as HomeIcon, MapPin, Briefcase } from "lucide-react";
import heroImg from "@/assets/hero-chennai.jpg";
import { featured } from "@/data/properties";
import { PropertyCard } from "@/components/site/PropertyCard";
import { SectionHead } from "@/components/site/SectionHead";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { TestimonialCard, testimonials } from "@/components/site/Testimonials";
import { LatestBlog } from "@/components/site/LatestBlog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Chennai Prime Realty — Premium Apartments, Villas & Plots in Chennai" },
      { name: "description", content: "Discover premium real estate in Chennai. Luxury apartments in OMR, villas in ECR, plots in Porur and commercial spaces. Trusted, RERA-registered." },
      { property: "og:title", content: "Chennai Prime Realty — Premium Real Estate" },
      { property: "og:description", content: "Discover premium real estate across Chennai's most sought-after neighborhoods." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const categories = [
  { icon: Building2, label: "Apartments", count: "120+" },
  { icon: HomeIcon, label: "Villas", count: "40+" },
  { icon: MapPin, label: "Plots", count: "80+" },
  { icon: Briefcase, label: "Commercial", count: "35+" },
];

const reasons = [
  { icon: ShieldCheck, title: "RERA Registered", text: "Every listing is verified and legally compliant for your peace of mind." },
  { icon: Award, title: "12+ Years of Trust", text: "A legacy of helping Chennai families and investors find the right property." },
  { icon: Users, title: "Dedicated Advisors", text: "A personal property advisor walks you through every step of the journey." },
  { icon: TrendingUp, title: "Best Market Pricing", text: "Deep market expertise across OMR, ECR, Anna Nagar, Velachery and Porur." },
];

function HomePage() {
  const [q, setQ] = useState("");
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden">
        <img src={heroImg} alt="Chennai skyline at golden hour" width={1920} height={1280}
          className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="absolute inset-0 bg-navy/40" />
        <div className="relative container-px mx-auto max-w-7xl py-24 text-navy-foreground">
          <div className="max-w-3xl animate-fade-up">
            <span className="eyebrow !text-gold">Chennai's Premium Realty Partner</span>
            <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-7xl leading-[1.05]">
              Find a home as <span className="text-gold italic">remarkable</span> as your story.
            </h1>
            <p className="mt-6 text-base sm:text-lg text-white/85 max-w-2xl">
              Hand-picked apartments, villas, plots and commercial spaces across Chennai's most coveted neighborhoods — curated by advisors who know the city block by block.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/properties" className="btn-gold">Browse Properties <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/contact" className="btn-outline-gold !text-white !border-white/60 hover:!bg-white hover:!text-navy">Talk to an Advisor</Link>
            </div>
          </div>

          {/* Search */}
          <div className="relative mt-14 max-w-4xl bg-background rounded-xl p-2 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto] gap-2">
              <select className="input-field !border-0 !bg-transparent">
                <option>Property Type</option><option>Apartment</option><option>Villa</option><option>Plot</option><option>Commercial</option>
              </select>
              <select className="input-field !border-0 !bg-transparent border-l">
                <option>Location</option><option>OMR</option><option>ECR</option><option>Anna Nagar</option><option>Velachery</option><option>Porur</option>
              </select>
              <input value={q} onChange={e => setQ(e.target.value)} placeholder="Budget (e.g. ₹1 Cr)" className="input-field !border-0 !bg-transparent" />
              <Link to="/properties" className="btn-navy"><Search className="h-4 w-4" /> Search</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section container-px mx-auto max-w-7xl">
        <SectionHead eyebrow="Explore" title="Find your property type" subtitle="From sea-facing villas on ECR to investment-grade plots in Porur, we cover every category." />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map(c => (
            <Link key={c.label} to="/properties" className="card-elegant p-6 text-center group">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full mb-4" style={{ background: "var(--gradient-gold)" }}>
                <c.icon className="h-6 w-6 text-navy" />
              </span>
              <h3 className="font-display text-lg text-navy">{c.label}</h3>
              <p className="text-sm text-muted-foreground mt-1">{c.count} listings</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="section bg-secondary/50">
        <div className="container-px mx-auto max-w-7xl">
          <SectionHead eyebrow="Featured" title="Handpicked properties" subtitle="A curated selection of homes and investments our advisors recommend right now." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map(p => <PropertyCard key={p.id} p={p} />)}
          </div>
          <div className="mt-12 text-center">
            <Link to="/properties" className="btn-navy">View All Properties <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="section container-px mx-auto max-w-7xl">
        <SectionHead eyebrow="Why Choose Us" title="A standard of service Chennai deserves" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map(r => (
            <div key={r.title} className="p-6 rounded-xl border bg-card transition-all hover:border-gold">
              <r.icon className="h-9 w-9 text-gold" />
              <h3 className="mt-4 font-display text-lg text-navy">{r.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{r.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="section bg-navy text-navy-foreground">
        <div className="container-px mx-auto max-w-7xl">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="eyebrow">Client Stories</span>
            <h2 className="mt-3 font-display text-3xl md:text-4xl lg:text-5xl text-white">Loved by Chennai homeowners</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map(t => <TestimonialCard key={t.name} t={t} />)}
          </div>
        </div>
      </section>

      {/* Latest Blog */}
      <LatestBlog />

      {/* Lead form */}
      <section className="section container-px mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <span className="eyebrow">Get Started</span>
            <h2 className="mt-3 font-display text-3xl md:text-5xl text-navy leading-tight">Tell us what you're looking for.</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Share a few details and a dedicated advisor will get back within 24 hours with curated property options that match your requirements and budget.
            </p>
            <div className="mt-8 grid gap-4">
              {["Free, personalised property recommendations", "Site visits arranged at your convenience", "End-to-end documentation & legal support", "Honest pricing — no hidden charges"].map(t => (
                <div key={t} className="flex gap-3 items-start">
                  <span className="h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5" style={{ background: "var(--gradient-gold)", color: "var(--gold-foreground)" }}>✓</span>
                  <span className="text-foreground/85">{t}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card-elegant p-6 md:p-8">
            <EnquiryForm />
          </div>
        </div>
      </section>
    </div>
  );
}
