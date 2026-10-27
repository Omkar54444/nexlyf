CREATE TABLE public.enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 120),
  business_name text NOT NULL CHECK (char_length(business_name) BETWEEN 1 AND 160),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255 AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  whatsapp text CHECK (whatsapp IS NULL OR char_length(whatsapp) <= 25),
  services text[] NOT NULL DEFAULT '{}' CHECK (array_length(services, 1) BETWEEN 1 AND 6),
  budget text NOT NULL CHECK (char_length(budget) <= 60),
  description text NOT NULL CHECK (char_length(description) BETWEEN 10 AND 4000)
);
GRANT INSERT ON public.enquiries TO anon, authenticated;
GRANT ALL ON public.enquiries TO service_role;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit an enquiry" ON public.enquiries FOR INSERT TO anon, authenticated WITH CHECK (true);