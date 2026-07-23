import Razorpay from "razorpay";

export function getRazorpayInstance() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    throw new Error("Razorpay keys are not configured.");
  }

  return new Razorpay({ key_id: keyId, key_secret: keySecret });
}

export function formatAmountInPaise(amount: number, currency: string = "INR") {
  // Razorpay accepts amount in currency subunits (paise for INR).
  return Math.round(amount * 100);
}

export function isRazorpayConfigured() {
  return Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET);
}
