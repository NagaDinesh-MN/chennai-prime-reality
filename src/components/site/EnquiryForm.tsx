import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2, "Name is required").max(80),
  phone: z.string().trim().regex(/^[0-9+\-\s()]{7,15}$/, "Enter a valid phone"),
  email: z.string().trim().email("Enter a valid email").max(120),
  propertyType: z.string().min(1, "Select a property type"),
  location: z.string().trim().min(2, "Preferred location is required").max(80),
  budget: z.string().min(1, "Select a budget"),
  message: z.string().trim().max(800).optional(),
});

export function EnquiryForm({ compact = false }: { compact?: boolean }) {
  const [loading, setLoading] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse(Object.fromEntries(fd));
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Thank you! Our advisor will reach out within 24 hours.");
      (e.target as HTMLFormElement).reset();
    }, 700);
  }

  return (
    <form onSubmit={onSubmit} className={compact ? "grid gap-4" : "grid gap-4 md:grid-cols-2"}>
      <div className={compact ? "" : "md:col-span-1"}>
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</label>
        <input name="name" required maxLength={80} className="input-field mt-1.5" placeholder="Your full name" />
      </div>
      <div>
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Phone</label>
        <input name="phone" required maxLength={15} className="input-field mt-1.5" placeholder="+91 98400 00000" />
      </div>
      <div className={compact ? "" : "md:col-span-2"}>
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</label>
        <input type="email" name="email" required maxLength={120} className="input-field mt-1.5" placeholder="you@example.com" />
      </div>
      <div>
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Property Type</label>
        <select name="propertyType" required className="input-field mt-1.5">
          <option value="">Select type</option>
          <option>Apartment</option>
          <option>Villa</option>
          <option>Plot</option>
          <option>Commercial</option>
        </select>
      </div>
      <div>
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Preferred Location</label>
        <select name="location" required className="input-field mt-1.5">
          <option value="">Select area</option>
          <option>OMR</option>
          <option>ECR</option>
          <option>Anna Nagar</option>
          <option>Velachery</option>
          <option>Porur</option>
          <option>Adyar</option>
          <option>Other</option>
        </select>
      </div>
      <div className={compact ? "" : "md:col-span-2"}>
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Budget</label>
        <select name="budget" required className="input-field mt-1.5">
          <option value="">Select budget</option>
          <option>Under ₹50 Lakhs</option>
          <option>₹50 L – ₹1 Cr</option>
          <option>₹1 Cr – ₹2 Cr</option>
          <option>₹2 Cr – ₹5 Cr</option>
          <option>Above ₹5 Cr</option>
        </select>
      </div>
      <div className={compact ? "" : "md:col-span-2"}>
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Message</label>
        <textarea name="message" rows={4} maxLength={800} className="input-field mt-1.5 resize-none"
          placeholder="Tell us about your requirements..." />
      </div>
      <div className={compact ? "" : "md:col-span-2"}>
        <button type="submit" disabled={loading} className="btn-gold w-full disabled:opacity-60">
          {loading ? "Sending..." : "Submit Enquiry"}
        </button>
      </div>
    </form>
  );
}
