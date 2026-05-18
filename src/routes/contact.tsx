import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { EnquiryForm } from "@/components/site/EnquiryForm";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Chennai Prime Realty — Get in Touch" },
      { name: "description", content: "Reach Chennai Prime Realty for property enquiries. Office in Thousand Lights, Chennai. Call +91 98400 12345." },
      { property: "og:title", content: "Contact Chennai Prime Realty" },
      { property: "og:description", content: "Get in touch with Chennai's premier real estate advisors." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const info = [
  { icon: MapPin, label: "Visit Us", value: "12, Greams Road, Thousand Lights, Chennai 600006" },
  { icon: Phone, label: "Call Us", value: "+91 98400 12345" },
  { icon: Mail, label: "Email", value: "hello@chennaiprimerealty.in" },
  { icon: Clock, label: "Open", value: "Mon – Sat, 9:30 AM – 7:00 PM" },
];

function ContactPage() {
  return (
    <div>
      <section className="bg-navy text-navy-foreground py-20 md:py-28">
        <div className="container-px mx-auto max-w-7xl text-center">
          <span className="eyebrow">Contact</span>
          <h1 className="mt-3 font-display text-4xl md:text-6xl leading-tight">Let's find your next address.</h1>
          <p className="mt-5 text-white/75 max-w-2xl mx-auto">Share your requirements and a dedicated advisor will reach out within 24 hours.</p>
        </div>
      </section>

      <section className="section container-px mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12">
          <div>
            <h2 className="font-display text-2xl md:text-3xl text-navy">Get in touch</h2>
            <p className="mt-3 text-muted-foreground">We're here to answer any question about properties, investments or services.</p>
            <div className="mt-8 grid gap-5">
              {info.map(i => (
                <div key={i.label} className="flex gap-4 p-5 rounded-xl border bg-card">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg shrink-0" style={{ background: "var(--gradient-gold)" }}>
                    <i.icon className="h-5 w-5 text-navy" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gold">{i.label}</p>
                    <p className="mt-1 text-foreground/85">{i.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-xl overflow-hidden border aspect-[4/3]">
              <iframe
                title="Chennai Prime Realty office location"
                src="https://www.google.com/maps?q=Greams+Road,+Thousand+Lights,+Chennai&output=embed"
                className="w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
          <div className="card-elegant p-6 md:p-10">
            <h2 className="font-display text-2xl md:text-3xl text-navy">Send an enquiry</h2>
            <p className="mt-2 text-muted-foreground text-sm">Fill in your details and we'll be in touch shortly.</p>
            <div className="mt-6">
              <EnquiryForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
