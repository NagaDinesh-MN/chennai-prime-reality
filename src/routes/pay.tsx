import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { ArrowLeft, CreditCard, CheckCircle2, ShieldCheck } from "lucide-react";
import { createRazorpayOrder } from "@/lib/payments.functions";

export const Route = createFileRoute("/pay")({
  head: () => ({
    meta: [
      { title: "Make a Payment — Chennai Prime Realty" },
      { name: "description", content: "Securely pay a booking or consultation fee for Chennai Prime Realty properties via Razorpay." },
      { property: "og:title", content: "Make a Payment — Chennai Prime Realty" },
      { property: "og:description", content: "Securely pay a booking or consultation fee for Chennai Prime Realty properties via Razorpay." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PayPage,
});

function PayPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const createOrder = useServerFn(createRazorpayOrder);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const amount = Number(fd.get("amount"));
    if (!amount || amount <= 0) {
      toast.error("Enter a valid amount");
      return;
    }

    setLoading(true);

    const result = await createOrder({
      data: {
        amount,
        currency: "INR",
        purpose: String(fd.get("purpose") || "Property token / site visit fee"),
        customerName: String(fd.get("name")),
        customerEmail: String(fd.get("email")),
        customerPhone: String(fd.get("phone")),
        propertyId: String(fd.get("propertyId") || ""),
        notes: String(fd.get("notes") || ""),
      },
    });

    if ("error" in result && result.error) {
      toast.error(result.error);
      setLoading(false);
      return;
    }

    if (!("orderId" in result) || !window.Razorpay) {
      toast.error("Razorpay checkout is not available.");
      setLoading(false);
      return;
    }

    const options = {
      key: result.keyId,
      amount: result.amount,
      currency: result.currency,
      name: "Chennai Prime Realty",
      description: "Property token / site visit fee",
      order_id: result.orderId,
      handler: () => {
        setSuccess(true);
        toast.success("Payment successful!");
      },
      prefill: {
        name: String(fd.get("name")),
        email: String(fd.get("email")),
        contact: String(fd.get("phone")),
      },
      theme: { color: "#c9a961" },
    };

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", (response: { error: { description: string } }) => {
      toast.error(response.error.description || "Payment failed.");
      setLoading(false);
    });
    rzp.open();
    setLoading(false);
  }

  return (
    <section className="py-12 md:py-20">
      <div className="container-px mx-auto max-w-3xl">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>

        {success ? (
          <div className="rounded-xl border border-gold/40 bg-card p-8 text-center animate-fade-up">
            <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-gold/15 ring-4 ring-gold/20">
              <CheckCircle2 className="h-9 w-9 text-gold" strokeWidth={2.25} />
            </div>
            <h1 className="mt-5 font-display text-2xl md:text-3xl text-navy">Payment received</h1>
            <p className="mt-3 text-muted-foreground max-w-md mx-auto leading-relaxed">
              Thank you for your payment. Our team will email you a confirmation and next steps shortly.
            </p>
            <Link to="/" className="mt-7 btn-gold inline-block">Return home</Link>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <span className="text-xs font-semibold uppercase tracking-wider text-gold">Secure checkout</span>
              <h1 className="mt-2 font-display text-3xl md:text-4xl text-navy">Make a payment</h1>
              <p className="mt-3 text-muted-foreground">
                Pay a token amount or site-visit fee for your selected property. All transactions are processed securely by Razorpay.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-5 rounded-xl border bg-card p-6 md:p-8 shadow-sm">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Full name</label>
                  <input name="name" required maxLength={120} className="input-field mt-1.5" placeholder="Your name" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Phone</label>
                  <input name="phone" required maxLength={20} className="input-field mt-1.5" placeholder="+91 98400 00000" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</label>
                  <input type="email" name="email" required maxLength={120} className="input-field mt-1.5" placeholder="you@example.com" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Amount (₹)</label>
                  <input name="amount" type="number" required min={1} step={1} defaultValue={5000} className="input-field mt-1.5" placeholder="5000" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Purpose</label>
                  <select name="purpose" required className="input-field mt-1.5">
                    <option>Site visit / consultation fee</option>
                    <option>Booking token amount</option>
                    <option>Property reservation</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Property / reference (optional)</label>
                  <input name="propertyId" maxLength={80} className="input-field mt-1.5" placeholder="e.g. OMR Waterfront 3BHK" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Notes (optional)</label>
                  <textarea name="notes" rows={3} maxLength={500} className="input-field mt-1.5 resize-none" placeholder="Any additional details..." />
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-gold" />
                <span>Payments powered by Razorpay. Your card details are never stored on our servers.</span>
              </div>

              <button type="submit" disabled={loading} className="btn-gold w-full flex items-center justify-center gap-2 disabled:opacity-60">
                <CreditCard className="h-4 w-4" />
                {loading ? "Opening checkout..." : "Pay now"}
              </button>
            </form>
          </>
        )}
      </div>

      <script src="https://checkout.razorpay.com/v1/checkout.js" async />
    </section>
  );
}

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => {
      open: () => void;
      on: (event: string, handler: (response: { error: { description: string } }) => void) => void;
    };
  }
}
