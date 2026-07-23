import { createFileRoute } from "@tanstack/react-router";
import { createHmac, timingSafeEqual } from "crypto";

export const Route = createFileRoute("/api/public/razorpay-webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = await request.text();
        const signature = request.headers.get("x-razorpay-signature");
        const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

        if (!secret) {
          console.error("Razorpay webhook secret not configured.");
          return new Response("Webhook secret not configured", { status: 500 });
        }

        if (!signature) {
          return new Response("Missing signature", { status: 401 });
        }

        const expected = createHmac("sha256", secret).update(body).digest("hex");
        if (!timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
          return new Response("Invalid signature", { status: 401 });
        }

        const event = JSON.parse(body);
        const { event: eventName, payload } = event;

        console.log("Razorpay webhook received:", eventName, payload?.payment?.entity?.id);

        // Persist or update payment status in Lovable Cloud here.
        // You can import supabaseAdmin inside the handler if needed.
        // const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        return new Response("OK", { status: 200 });
      },
    },
  },
});
