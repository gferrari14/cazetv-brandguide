CREATE TABLE public.identity_covers (
  identity_slug text PRIMARY KEY,
  image_url text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.identity_covers TO anon, authenticated;
GRANT ALL ON public.identity_covers TO service_role;
ALTER TABLE public.identity_covers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read covers" ON public.identity_covers FOR SELECT USING (true);
CREATE POLICY "Public insert covers" ON public.identity_covers FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update covers" ON public.identity_covers FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Public delete covers" ON public.identity_covers FOR DELETE USING (true);