import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { properties, type PropertyCategory } from "@/data/properties";
import { PropertyCard } from "@/components/site/PropertyCard";

export const Route = createFileRoute("/properties")({
  head: () => ({
    meta: [
      { title: "Properties in Chennai — Apartments, Villas, Plots, Commercial" },
      { name: "description", content: "Browse premium apartments, villas, plots and commercial spaces across OMR, ECR, Anna Nagar, Velachery and Porur in Chennai." },
      { property: "og:title", content: "Properties in Chennai — Chennai Prime Realty" },
      { property: "og:description", content: "Explore our curated property listings across Chennai." },
      { property: "og:url", content: "/properties" },
    ],
    links: [{ rel: "canonical", href: "/properties" }],
  }),
  component: PropertiesPage,
});

const tabs: ("All" | PropertyCategory)[] = ["All", "Apartments", "Villas", "Plots", "Commercial"];

function PropertiesPage() {
  const [active, setActive] = useState<(typeof tabs)[number]>("All");
  const list = active === "All" ? properties : properties.filter(p => p.category === active);

  return (
    <div>
      <section className="bg-navy text-navy-foreground py-16 md:py-24">
        <div className="container-px mx-auto max-w-7xl text-center">
          <span className="eyebrow">Properties</span>
          <h1 className="mt-3 font-display text-4xl md:text-6xl leading-tight">Chennai's most coveted addresses.</h1>
          <p className="mt-5 text-white/75 max-w-2xl mx-auto">From beachside villas to investment-grade plots, every property is verified and ready for viewing.</p>
        </div>
      </section>

      <section className="section container-px mx-auto max-w-7xl">
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map(t => (
            <button key={t} onClick={() => setActive(t)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-all ${active === t ? "bg-navy text-navy-foreground border-navy" : "bg-background hover:border-gold"}`}>
              {t}
            </button>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map(p => <PropertyCard key={p.id} p={p} />)}
        </div>
        {list.length === 0 && <p className="text-center text-muted-foreground py-12">No properties found in this category.</p>}
      </section>
    </div>
  );
}
