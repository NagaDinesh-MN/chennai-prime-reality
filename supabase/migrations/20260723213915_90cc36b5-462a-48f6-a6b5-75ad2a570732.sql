CREATE TABLE public.razorpay_payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  razorpay_order_id TEXT NOT NULL UNIQUE,
  razorpay_payment_id TEXT,
  razorpay_signature TEXT,
  amount INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'INR',
  purpose TEXT,
  customer_name TEXT,
  customer_email TEXT,
  customer_phone TEXT,
  status TEXT NOT NULL DEFAULT 'created',
  notes JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX razorpay_payments_order_idx ON public.razorpay_payments(razorpay_order_id);

GRANT INSERT ON public.razorpay_payments TO anon, authenticated;
GRANT ALL ON public.razorpay_payments TO service_role;

ALTER TABLE public.razorpay_payments ENABLE ROW LEVEL SECURITY;

-- Anyone can create a payment record (needed before checkout redirect).
-- No SELECT/UPDATE/DELETE policies — only the backend (service_role) can read/modify.
CREATE POLICY "Anyone can create a payment record"
  ON public.razorpay_payments
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_razorpay_payments_updated_at
  BEFORE UPDATE ON public.razorpay_payments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();