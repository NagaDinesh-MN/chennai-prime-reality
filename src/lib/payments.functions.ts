import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getRazorpayInstance, formatAmountInPaise, isRazorpayConfigured } from "./razorpay.server";

const createOrderSchema = z.object({
  amount: z.number().positive(),
  currency: z.string().default("INR"),
  purpose: z.string().min(1).max(120),
  customerName: z.string().min(1).max(120),
  customerEmail: z.string().email().max(120),
  customerPhone: z.string().regex(/^[0-9+\-\s()]{7,20}$/).max(20),
  propertyId: z.string().max(80).optional(),
  notes: z.string().max(500).optional(),
});

export const createRazorpayOrder = createServerFn({ method: "POST" })
  .inputValidator((data) => createOrderSchema.parse(data))
  .handler(async ({ data }) => {
    if (!isRazorpayConfigured()) {
      return { error: "Payments are not configured yet." };
    }

    const instance = getRazorpayInstance();
    const amountPaise = formatAmountInPaise(data.amount, data.currency);

    try {
      const order = await instance.orders.create({
        amount: amountPaise,
        currency: data.currency,
        receipt: `receipt_${Date.now()}`,
        notes: {
          purpose: data.purpose,
          customer_name: data.customerName,
          customer_email: data.customerEmail,
          customer_phone: data.customerPhone,
          property_id: data.propertyId || "",
          message: data.notes || "",
        },
      });

      return {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: process.env.RAZORPAY_KEY_ID,
      };
    } catch (error) {
      console.error("Razorpay order creation failed:", error);
      return { error: "Could not create payment order. Please try again." };
    }
  });
