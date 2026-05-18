import apartment from "@/assets/property-apartment.jpg";
import villa from "@/assets/property-villa.jpg";
import plot from "@/assets/property-plot.jpg";
import commercial from "@/assets/property-commercial.jpg";
import penthouse from "@/assets/property-penthouse.jpg";
import velachery from "@/assets/property-velachery.jpg";

export type PropertyCategory = "Apartments" | "Villas" | "Plots" | "Commercial";

export interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  bhk?: string;
  area: string;
  category: PropertyCategory;
  image: string;
  badge?: string;
}

export const properties: Property[] = [
  { id: "p1", title: "Marina Heights Residences", location: "OMR, Chennai", price: "₹1.85 Cr", bhk: "3 BHK", area: "1620 sq.ft", category: "Apartments", image: apartment, badge: "Featured" },
  { id: "p2", title: "Coastal Breeze Villa", location: "ECR, Chennai", price: "₹4.50 Cr", bhk: "4 BHK", area: "3200 sq.ft", category: "Villas", image: villa, badge: "Premium" },
  { id: "p3", title: "Anna Nagar Sky Tower", location: "Anna Nagar, Chennai", price: "₹2.40 Cr", bhk: "3 BHK", area: "1850 sq.ft", category: "Apartments", image: velachery },
  { id: "p4", title: "Velachery Greens", location: "Velachery, Chennai", price: "₹1.20 Cr", bhk: "2 BHK", area: "1240 sq.ft", category: "Apartments", image: apartment, badge: "New" },
  { id: "p5", title: "Porur Investment Plot", location: "Porur, Chennai", price: "₹85 L", area: "2400 sq.ft", category: "Plots", image: plot },
  { id: "p6", title: "OMR IT Park Office", location: "OMR, Chennai", price: "₹3.10 Cr", area: "4500 sq.ft", category: "Commercial", image: commercial },
  { id: "p7", title: "Prime Penthouse Suites", location: "Adyar, Chennai", price: "₹6.75 Cr", bhk: "4 BHK", area: "4100 sq.ft", category: "Apartments", image: penthouse, badge: "Luxury" },
  { id: "p8", title: "ECR Beachside Villa", location: "ECR, Chennai", price: "₹5.80 Cr", bhk: "5 BHK", area: "3800 sq.ft", category: "Villas", image: villa },
  { id: "p9", title: "Anna Nagar Commercial Hub", location: "Anna Nagar, Chennai", price: "₹4.20 Cr", area: "5200 sq.ft", category: "Commercial", image: commercial, badge: "Premium" },
  { id: "p10", title: "Porur Garden Plots", location: "Porur, Chennai", price: "₹1.10 Cr", area: "3600 sq.ft", category: "Plots", image: plot },
  { id: "p11", title: "Velachery Skyline", location: "Velachery, Chennai", price: "₹1.65 Cr", bhk: "3 BHK", area: "1520 sq.ft", category: "Apartments", image: velachery },
  { id: "p12", title: "OMR Tech Park Villa", location: "OMR, Chennai", price: "₹3.95 Cr", bhk: "4 BHK", area: "2900 sq.ft", category: "Villas", image: villa, badge: "Featured" },
];

export const featured = properties.filter(p => p.badge === "Featured" || p.badge === "Premium" || p.badge === "Luxury").slice(0, 6);
