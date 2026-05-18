import { Link } from "@tanstack/react-router";
import { MapPin, BedDouble, Maximize2 } from "lucide-react";
import type { Property } from "@/data/properties";

export function PropertyCard({ p }: { p: Property }) {
  return (
    <article className="card-elegant group">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img src={p.image} alt={p.title} loading="lazy" width={1024} height={768}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        {p.badge && (
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider"
            style={{ background: "var(--gradient-gold)", color: "var(--gold-foreground)" }}>
            {p.badge}
          </span>
        )}
        <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-[11px] font-medium bg-navy text-navy-foreground">
          {p.category}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg text-navy leading-tight">{p.title}</h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 text-gold" /> {p.location}
        </p>
        <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
          {p.bhk && <span className="flex items-center gap-1"><BedDouble className="h-3.5 w-3.5" />{p.bhk}</span>}
          <span className="flex items-center gap-1"><Maximize2 className="h-3.5 w-3.5" />{p.area}</span>
        </div>
        <div className="mt-5 flex items-center justify-between pt-4 border-t">
          <span className="font-display text-xl text-gold font-semibold">{p.price}</span>
          <Link to="/contact" className="text-xs font-semibold uppercase tracking-wider text-navy hover:text-gold">
            Enquire →
          </Link>
        </div>
      </div>
    </article>
  );
}
