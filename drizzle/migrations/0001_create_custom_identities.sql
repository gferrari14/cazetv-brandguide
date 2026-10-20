CREATE TABLE public.custom_identities (
 slug text PRIMARY KEY,
 name text NOT NULL CHECK (length(btrim(name)) > 0),
 category text NOT NULL CHECK (category IN ('programas', 'competicoes')),
 created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.custom_identities TO anon, authenticated;
GRANT ALL ON public.custom_identities TO service_role;
ALTER TABLE public.custom_identities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read custom identities" ON public.custom_identities FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public create custom identities" ON public.custom_identities FOR INSERT TO anon, authenticated WITH CHECK (true);