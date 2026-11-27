import apartment from "@/assets/property-apartment.jpg";
import villa from "@/assets/property-villa.jpg";
import plot from "@/assets/property-plot.jpg";
import commercial from "@/assets/property-commercial.jpg";
import penthouse from "@/assets/property-penthouse.jpg";
import velachery from "@/assets/property-velachery.jpg";

// Free photos from Unsplash (unsplash.com), served from their image CDN.
const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=80`;

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
  { id: "p13", title: "Sholinganallur Sunset Residences", location: "Sholinganallur, Chennai", price: "₹1.45 Cr", bhk: "3 BHK", area: "1580 sq.ft", category: "Apartments", image: unsplash("1624204386084-dd8c05e32226"), badge: "New" },
  { id: "p14", title: "T. Nagar Glass Arcade", location: "T. Nagar, Chennai", price: "₹7.20 Cr", area: "6800 sq.ft", category: "Commercial", image: unsplash("1621831337128-35676ca30868"), badge: "Premium" },
  { id: "p15", title: "Mylapore Heritage Homes", location: "Mylapore, Chennai", price: "₹1.35 Cr", bhk: "2 BHK", area: "1180 sq.ft", category: "Apartments", image: unsplash("1501459530422-244942cf51f5") },
  { id: "p16", title: "Nungambakkam Sky Penthouse", location: "Nungambakkam, Chennai", price: "₹8.50 Cr", bhk: "4 BHK", area: "4600 sq.ft", category: "Apartments", image: unsplash("1776362355123-ca966d36e29c"), badge: "Luxury" },
  { id: "p17", title: "Besant Nagar Pool Villa", location: "Besant Nagar, Chennai", price: "₹6.20 Cr", bhk: "4 BHK", area: "3600 sq.ft", category: "Villas", image: unsplash("1600596542815-ffad4c1539a9"), badge: "Featured" },
  { id: "p18", title: "Guindy Business Centre", location: "Guindy, Chennai", price: "₹5.40 Cr", area: "7200 sq.ft", category: "Commercial", image: unsplash("1781919293919-693ee10fb06c") },
  { id: "p19", title: "Tambaram Green Acres", location: "Tambaram, Chennai", price: "₹62 L", area: "2400 sq.ft", category: "Plots", image: unsplash("1495107334309-fcf20504a5ab"), badge: "New" },
  { id: "p20", title: "Perungudi Lakeview Towers", location: "Perungudi, Chennai", price: "₹98 L", bhk: "2 BHK", area: "1150 sq.ft", category: "Apartments", image: unsplash("1525953776754-6c4b7ee655ab") },
  { id: "p21", title: "Medavakkam Gated Villas", location: "Medavakkam, Chennai", price: "₹2.15 Cr", bhk: "3 BHK", area: "2200 sq.ft", category: "Villas", image: unsplash("1580587771525-78b9dba3b914") },
  { id: "p22", title: "Kovalam Beach Retreat", location: "Kovalam, Chennai", price: "₹7.90 Cr", bhk: "5 BHK", area: "4800 sq.ft", category: "Villas", image: unsplash("1706808849780-7a04fbac83ef"), badge: "Luxury" },
  { id: "p23", title: "Oragadam Industrial Plots", location: "Oragadam, Chennai", price: "₹1.80 Cr", area: "10000 sq.ft", category: "Plots", image: unsplash("1653663786108-21ca52a24171") },
  { id: "p24", title: "Kilpauk Garden Residency", location: "Kilpauk, Chennai", price: "₹2.05 Cr", bhk: "3 BHK", area: "1720 sq.ft", category: "Apartments", image: unsplash("1610286986642-057ece0c3656") },
];

export const featured = properties.filter(p => p.badge === "Featured" || p.badge === "Premium" || p.badge === "Luxury").slice(0, 6);

// Every area we list, for the location dropdowns (search bar and enquiry form).
export const locations = [...new Set(properties.map(p => p.location.split(",")[0].trim()))];
