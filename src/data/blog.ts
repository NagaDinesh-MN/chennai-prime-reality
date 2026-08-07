import apartment from "@/assets/property-apartment.jpg";
import villa from "@/assets/property-villa.jpg";
import plot from "@/assets/property-plot.jpg";
import commercial from "@/assets/property-commercial.jpg";
import penthouse from "@/assets/property-penthouse.jpg";
import velachery from "@/assets/property-velachery.jpg";
import hero from "@/assets/hero-chennai.jpg";

export const blogCategories = [
  "All",
  "Market Trends",
  "Investment",
  "Legal & RERA",
  "Neighbourhoods",
  "NRI Corner",
] as const;

export type BlogCategory = (typeof blogCategories)[number];

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
}

/** Demo content shown until a Sanity project is connected. */
export const demoPosts: BlogPost[] = [
  {
    id: "b1",
    title: "Chennai Property Market 2026: Where Prices Are Heading Next",
    slug: "chennai-property-market-2026",
    excerpt:
      "OMR and ECR continue to lead price appreciation while Porur emerges as the city's most improved corridor. A data-backed look at Chennai's next 12 months.",
    image: hero,
    category: "Market Trends",
    date: "2026-07-18",
    readTime: "8 min read",
    author: "Ramesh Iyer",
  },
  {
    id: "b2",
    title: "OMR vs ECR: Which Corridor Delivers Better Rental Yield?",
    slug: "omr-vs-ecr-rental-yield",
    excerpt:
      "IT-driven demand on OMR versus lifestyle demand on ECR — we compare five years of rent and resale data across both stretches.",
    image: apartment,
    category: "Investment",
    date: "2026-07-04",
    readTime: "6 min read",
    author: "Divya Krishnan",
  },
  {
    id: "b3",
    title: "TN RERA Explained: 7 Checks Before You Sign a Sale Agreement",
    slug: "tn-rera-checks-before-sale-agreement",
    excerpt:
      "From project registration numbers to promised completion dates — the paperwork every Chennai buyer must verify first.",
    image: commercial,
    category: "Legal & RERA",
    date: "2026-06-26",
    readTime: "7 min read",
    author: "Adv. Suresh Babu",
  },
  {
    id: "b4",
    title: "Living in Anna Nagar: Schools, Commute and Real Costs",
    slug: "living-in-anna-nagar",
    excerpt:
      "A neighbourhood deep-dive into Chennai's most established residential pocket — what you actually pay and what you get for it.",
    image: velachery,
    category: "Neighbourhoods",
    date: "2026-06-12",
    readTime: "5 min read",
    author: "Priya Ganesan",
  },
  {
    id: "b5",
    title: "NRI Guide to Buying Property in Chennai: FEMA, Taxes, Repatriation",
    slug: "nri-guide-buying-property-chennai",
    excerpt:
      "Everything an NRI investor needs on eligible property types, remittance routes, TDS on resale and repatriating sale proceeds.",
    image: penthouse,
    category: "NRI Corner",
    date: "2026-05-30",
    readTime: "9 min read",
    author: "Ramesh Iyer",
  },
  {
    id: "b6",
    title: "Plot Investing in Porur: Guideline Value, Approvals and Timing",
    slug: "plot-investing-porur",
    excerpt:
      "Why DTCP-approved layouts around Porur are drawing first-time land investors, and the three approvals that decide resale value.",
    image: plot,
    category: "Investment",
    date: "2026-05-16",
    readTime: "6 min read",
    author: "Divya Krishnan",
  },
  {
    id: "b7",
    title: "Velachery's Metro Effect: What Phase II Means for Home Values",
    slug: "velachery-metro-effect",
    excerpt:
      "Metro connectivity has historically added 12–18% to Chennai micro-market values. Here's how Velachery is tracking so far.",
    image: villa,
    category: "Market Trends",
    date: "2026-05-02",
    readTime: "5 min read",
    author: "Priya Ganesan",
  },
];

export function formatBlogDate(date: string) {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}
