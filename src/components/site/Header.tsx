import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Building2 } from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/properties", label: "Properties" },
  { to: "/services", label: "Services" },
  { to: "/pay", label: "Pay" },
  { to: "/testimonials", label: "Testimonials" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-md border-b">
      <div className="container-px mx-auto max-w-7xl flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="h-9 w-9 rounded-md flex items-center justify-center" style={{ background: "var(--gradient-gold)" }}>
            <Building2 className="h-5 w-5 text-navy" />
          </span>
          <span className="font-display font-bold text-lg md:text-xl tracking-tight text-navy leading-tight">
            Chennai Prime<span className="block text-[10px] tracking-[0.25em] font-sans font-medium text-gold uppercase">Realty</span>
          </span>
        </Link>
        <nav className="hidden lg:flex items-center gap-8">
          {nav.map(n => (
            <Link key={n.to} to={n.to} className="text-sm font-medium text-foreground/80 hover:text-gold transition-colors"
              activeProps={{ className: "text-gold" }} activeOptions={{ exact: n.to === "/" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <Link to="/contact" className="hidden lg:inline-flex btn-gold !py-2.5 !px-5 text-sm">Get in Touch</Link>
        <button className="lg:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t bg-background">
          <div className="container-px mx-auto max-w-7xl py-4 flex flex-col gap-1">
            {nav.map(n => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)}
                className="py-2.5 text-sm font-medium" activeProps={{ className: "text-gold" }}>
                {n.label}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setOpen(false)} className="btn-gold mt-3 text-sm">Get in Touch</Link>
          </div>
        </div>
      )}
    </header>
  );
}
