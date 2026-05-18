import { Quote, Star } from "lucide-react";

export const testimonials = [
  { name: "Arvind Krishnan", role: "Bought 3BHK in OMR", text: "Chennai Prime Realty made our home-buying journey effortless. Their team understood our needs and showed us properties that perfectly matched our budget and preferences in OMR." },
  { name: "Priya Subramanian", role: "Investor, ECR Villa", text: "Exceptional service and complete transparency throughout. The team handled every detail, from site visits to documentation. Truly Chennai's most trusted real estate partner." },
  { name: "Rajesh Iyer", role: "Sold property in Anna Nagar", text: "I sold my apartment within 6 weeks at a price higher than expected. Professional marketing, qualified buyers, and a smooth closing — all handled with utmost integrity." },
  { name: "Meera Venkatesh", role: "Rental Management", text: "Their rental management service is a blessing. Tenant screening, rent collection, maintenance — everything is taken care of. I receive my rent on time, every month." },
  { name: "Karthik Reddy", role: "Commercial space, OMR", text: "Found the perfect office space in OMR's IT corridor through them. Their understanding of commercial real estate and market rates is unmatched in the city." },
  { name: "Lakshmi Narayanan", role: "Plot owner, Porur", text: "Bought a residential plot in Porur for future construction. The team verified all approvals and legal documentation. I felt secure throughout the entire transaction." },
];

export function TestimonialCard({ t }: { t: (typeof testimonials)[number] }) {
  return (
    <div className="card-elegant p-7 h-full flex flex-col">
      <Quote className="h-8 w-8 text-gold opacity-60" />
      <p className="mt-4 text-foreground/85 leading-relaxed flex-1">"{t.text}"</p>
      <div className="mt-6 pt-5 border-t flex items-center justify-between">
        <div>
          <p className="font-semibold text-navy">{t.name}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{t.role}</p>
        </div>
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />)}
        </div>
      </div>
    </div>
  );
}
