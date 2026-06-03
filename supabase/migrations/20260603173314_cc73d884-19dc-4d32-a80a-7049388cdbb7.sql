
CREATE TABLE public.identity_blocks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  identity_slug TEXT NOT NULL,
  position INTEGER NOT NULL DEFAULT 0,
  type TEXT NOT NULL CHECK (type IN ('slide','text')),
  image_url TEXT,
  text_content TEXT,
  preserve_ratio BOOLEAN NOT NULL DEFAULT true,
  natural_size BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_identity_blocks_slug_pos ON public.identity_blocks (identity_slug, position);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.identity_blocks TO anon, authenticated;
GRANT ALL ON public.identity_blocks TO service_role;

ALTER TABLE public.identity_blocks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read identity_blocks"
  ON public.identity_blocks FOR SELECT
  USING (true);

CREATE POLICY "Public insert identity_blocks"
  ON public.identity_blocks FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Public update identity_blocks"
  ON public.identity_blocks FOR UPDATE
  USING (true) WITH CHECK (true);

CREATE POLICY "Public delete identity_blocks"
  ON public.identity_blocks FOR DELETE
  USING (true);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_identity_blocks_updated_at
  BEFORE UPDATE ON public.identity_blocks
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Storage policies for identity-slides bucket (public read/write)
CREATE POLICY "Public read identity-slides"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'identity-slides');

CREATE POLICY "Public insert identity-slides"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'identity-slides');

CREATE POLICY "Public update identity-slides"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'identity-slides') WITH CHECK (bucket_id = 'identity-slides');

CREATE POLICY "Public delete identity-slides"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'identity-slides');
