import { Link } from "@tanstack/react-router";
import { Building2, Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-navy text-navy-foreground mt-24">
      <div className="container-px mx-auto max-w-7xl py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <span className="h-9 w-9 rounded-md flex items-center justify-center" style={{ background: "var(--gradient-gold)" }}>
              <Building2 className="h-5 w-5 text-navy" />
            </span>
            <span className="font-display font-bold text-lg">Chennai Prime Realty</span>
          </div>
          <p className="text-sm text-navy-foreground/70 leading-relaxed">
            Chennai's trusted partner in luxury real estate. Premium apartments, villas, plots and commercial spaces across the city.
          </p>
          <div className="flex gap-3 mt-5">
            {[Facebook, Instagram, Linkedin, Twitter].map((Icon, i) => (
              <a key={i} href="#" aria-label="social" className="h-9 w-9 rounded-full border border-white/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display text-base mb-4 text-gold">Explore</h4>
          <ul className="space-y-2.5 text-sm text-navy-foreground/75">
            <li><Link to="/about" className="hover:text-gold">About Us</Link></li>
            <li><Link to="/properties" className="hover:text-gold">Properties</Link></li>
            <li><Link to="/services" className="hover:text-gold">Services</Link></li>
            <li><Link to="/testimonials" className="hover:text-gold">Testimonials</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-base mb-4 text-gold">Property Types</h4>
          <ul className="space-y-2.5 text-sm text-navy-foreground/75">
            <li>Apartments in OMR & ECR</li>
            <li>Luxury Villas</li>
            <li>Residential Plots</li>
            <li>Commercial Spaces</li>
            <li>Investment Advisory</li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-base mb-4 text-gold">Reach Us</h4>
          <ul className="space-y-3 text-sm text-navy-foreground/75">
            <li className="flex gap-3"><MapPin className="h-4 w-4 text-gold shrink-0 mt-0.5" /> 12, Greams Road, Thousand Lights, Chennai 600006</li>
            <li className="flex gap-3"><Phone className="h-4 w-4 text-gold shrink-0 mt-0.5" /> +91 98400 12345</li>
            <li className="flex gap-3"><Mail className="h-4 w-4 text-gold shrink-0 mt-0.5" /> hello@chennaiprimerealty.in</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-px mx-auto max-w-7xl py-5 flex flex-col md:flex-row gap-3 justify-between items-center text-xs text-navy-foreground/60">
          <p>© {new Date().getFullYear()} Chennai Prime Realty. All rights reserved.</p>
          <p>RERA Registered • TN/Agent/CPR/2024</p>
        </div>
      </div>
    </footer>
  );
}
