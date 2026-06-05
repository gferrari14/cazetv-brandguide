
CREATE TABLE public.identity_materials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  identity_slug text NOT NULL,
  kind text NOT NULL CHECK (kind IN ('logo','asset','fonte')),
  file_url text NOT NULL,
  storage_path text NOT NULL,
  filename text NOT NULL,
  size bigint NOT NULL DEFAULT 0,
  content_type text,
  position integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.identity_materials TO anon, authenticated;
GRANT ALL ON public.identity_materials TO service_role;

ALTER TABLE public.identity_materials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read identity_materials" ON public.identity_materials FOR SELECT USING (true);
CREATE POLICY "Public insert identity_materials" ON public.identity_materials FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update identity_materials" ON public.identity_materials FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Public delete identity_materials" ON public.identity_materials FOR DELETE USING (true);

CREATE INDEX identity_materials_slug_idx ON public.identity_materials (identity_slug, kind, position);

CREATE TRIGGER set_identity_materials_updated_at
  BEFORE UPDATE ON public.identity_materials
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
