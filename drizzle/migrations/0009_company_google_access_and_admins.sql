CREATE TYPE public.app_role AS ENUM ('admin');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE OR REPLACE FUNCTION public.is_site_member()
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM auth.users u
    WHERE u.id = auth.uid()
      AND u.email_confirmed_at IS NOT NULL
      AND lower(split_part(u.email, '@', 2)) = 'livemode.com'
  )
$$;

REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.is_site_member() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.is_site_member() TO authenticated, service_role;

CREATE OR REPLACE FUNCTION public.grant_site_admin_role()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NEW.email_confirmed_at IS NOT NULL
     AND lower(NEW.email) IN ('gferrari@livemode.com', 'lvasco@livemode.com', 'moliveira@livemode.com') THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created_grant_site_admin
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.grant_site_admin_role();

CREATE TRIGGER on_auth_user_confirmed_grant_site_admin
AFTER UPDATE OF email_confirmed_at ON auth.users
FOR EACH ROW
WHEN (OLD.email_confirmed_at IS NULL AND NEW.email_confirmed_at IS NOT NULL)
EXECUTE FUNCTION public.grant_site_admin_role();

INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::public.app_role FROM auth.users
WHERE email_confirmed_at IS NOT NULL
  AND lower(email) IN ('gferrari@livemode.com', 'lvasco@livemode.com', 'moliveira@livemode.com')
ON CONFLICT (user_id, role) DO NOTHING;

-- Identity tables: members read, admins write
DROP POLICY IF EXISTS "Temporary lock identity blocks insert" ON public.identity_blocks;
DROP POLICY IF EXISTS "Temporary lock identity blocks update" ON public.identity_blocks;
DROP POLICY IF EXISTS "Temporary lock identity blocks delete" ON public.identity_blocks;
DROP POLICY IF EXISTS "Temporary lock custom identities insert" ON public.custom_identities;
DROP POLICY IF EXISTS "Temporary lock custom identities update" ON public.custom_identities;
DROP POLICY IF EXISTS "Temporary lock custom identities delete" ON public.custom_identities;
DROP POLICY IF EXISTS "Temporary lock identity materials insert" ON public.identity_materials;
DROP POLICY IF EXISTS "Temporary lock identity materials update" ON public.identity_materials;
DROP POLICY IF EXISTS "Temporary lock identity materials delete" ON public.identity_materials;
DROP POLICY IF EXISTS "Temporary lock identity covers insert" ON public.identity_covers;
DROP POLICY IF EXISTS "Temporary lock identity covers update" ON public.identity_covers;
DROP POLICY IF EXISTS "Temporary lock identity covers delete" ON public.identity_covers;

DROP POLICY IF EXISTS "Public delete identity_blocks" ON public.identity_blocks;
DROP POLICY IF EXISTS "Public insert identity_blocks" ON public.identity_blocks;
DROP POLICY IF EXISTS "Public read identity_blocks" ON public.identity_blocks;
DROP POLICY IF EXISTS "Public update identity_blocks" ON public.identity_blocks;
DROP POLICY IF EXISTS "Public delete covers" ON public.identity_covers;
DROP POLICY IF EXISTS "Public insert covers" ON public.identity_covers;
DROP POLICY IF EXISTS "Public read covers" ON public.identity_covers;
DROP POLICY IF EXISTS "Public update covers" ON public.identity_covers;
DROP POLICY IF EXISTS "Public delete identity_materials" ON public.identity_materials;
DROP POLICY IF EXISTS "Public insert identity_materials" ON public.identity_materials;
DROP POLICY IF EXISTS "Public read identity_materials" ON public.identity_materials;
DROP POLICY IF EXISTS "Public update identity_materials" ON public.identity_materials;
DROP POLICY IF EXISTS "Public create custom identities" ON public.custom_identities;
DROP POLICY IF EXISTS "Public read custom identities" ON public.custom_identities;

REVOKE ALL ON public.custom_identities, public.identity_blocks, public.identity_materials, public.identity_covers FROM PUBLIC, anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.custom_identities, public.identity_blocks, public.identity_materials, public.identity_covers TO authenticated;
GRANT ALL ON public.custom_identities, public.identity_blocks, public.identity_materials, public.identity_covers TO service_role;

CREATE POLICY "Members read identity blocks" ON public.identity_blocks FOR SELECT TO authenticated USING (public.is_site_member());
CREATE POLICY "Admins insert identity blocks" ON public.identity_blocks FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update identity blocks" ON public.identity_blocks FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete identity blocks" ON public.identity_blocks FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Members read identity covers" ON public.identity_covers FOR SELECT TO authenticated USING (public.is_site_member());
CREATE POLICY "Admins insert identity covers" ON public.identity_covers FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update identity covers" ON public.identity_covers FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete identity covers" ON public.identity_covers FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Members read identity materials" ON public.identity_materials FOR SELECT TO authenticated USING (public.is_site_member());
CREATE POLICY "Admins insert identity materials" ON public.identity_materials FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update identity materials" ON public.identity_materials FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete identity materials" ON public.identity_materials FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Members read custom identities" ON public.custom_identities FOR SELECT TO authenticated USING (public.is_site_member());
CREATE POLICY "Admins insert custom identities" ON public.custom_identities FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update custom identities" ON public.custom_identities FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete custom identities" ON public.custom_identities FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Storage bucket: members read, admins write
DROP POLICY IF EXISTS "Temporary lock identity slide uploads" ON storage.objects;
DROP POLICY IF EXISTS "Temporary lock identity slide changes" ON storage.objects;
DROP POLICY IF EXISTS "Temporary lock identity slide deletions" ON storage.objects;
DROP POLICY IF EXISTS "Public read identity-slides" ON storage.objects;
DROP POLICY IF EXISTS "Public insert identity-slides" ON storage.objects;
DROP POLICY IF EXISTS "Public update identity-slides" ON storage.objects;
DROP POLICY IF EXISTS "Public delete identity-slides" ON storage.objects;

CREATE POLICY "Members read identity slides" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'identity-slides' AND public.is_site_member());
CREATE POLICY "Admins upload identity slides" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'identity-slides' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update identity slides" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'identity-slides' AND public.has_role(auth.uid(), 'admin')) WITH CHECK (bucket_id = 'identity-slides' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete identity slides" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'identity-slides' AND public.has_role(auth.uid(), 'admin'));