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

  const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1514320703699030046/6qAjvN0_77MMkN4RFokN75ZbCBHLUm_ZTaELLfzrrNePW7QGQUt0fihvEU_yD18nxub8";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const parsed = schema.safeParse(Object.fromEntries(fd));
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    const d = parsed.data;
    const payload = {
      username: "Chennai Prime Realty",
      embeds: [
        {
          title: "New Property Enquiry",
          color: 0xc9a961,
          fields: [
            { name: "Name", value: d.name, inline: true },
            { name: "Phone", value: d.phone, inline: true },
            { name: "Email", value: d.email, inline: false },
            { name: "Property Type", value: d.propertyType, inline: true },
            { name: "Preferred Location", value: d.location, inline: true },
            { name: "Budget", value: d.budget, inline: true },
            { name: "Message", value: d.message?.trim() ? d.message : "—", inline: false },
          ],
          timestamp: new Date().toISOString(),
          footer: { text: "Chennai Prime Realty • Website Lead" },
        },
      ],
    };
    try {
      await fetch(DISCORD_WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      toast.success("Thank you! Our advisor will reach out within 24 hours.");
      form.reset();
    } catch {
      toast.error("Could not send enquiry. Please try again or call us directly.");
    } finally {
      setLoading(false);
    }
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
