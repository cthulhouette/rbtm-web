CREATE TABLE public.clients_certifications (
  id uuid primary key default gen_random_uuid(),
  kind text not null default 'client',
  name text not null,
  description text,
  image_url text,
  "order" integer not null default 0,
  visible boolean not null default true,
  created_at timestamptz not null default now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.clients_certifications TO authenticated;
GRANT SELECT ON public.clients_certifications TO anon;
GRANT ALL ON public.clients_certifications TO service_role;
ALTER TABLE public.clients_certifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read visible clients_certifications" ON public.clients_certifications FOR SELECT USING (visible = true);
CREATE POLICY "Auth full clients_certifications" ON public.clients_certifications FOR ALL TO authenticated USING (true) WITH CHECK (true);

INSERT INTO public.site_content (section, field_key, field_value) VALUES
 ('nav','clients','Clients'),
 ('clients','eyebrow','Partners & Compliance'),
 ('clients','h1','Clients & certifications.'),
 ('clients','clients_title','Our Clients'),
 ('clients','certifications_title','Certifications'),
 ('clients','empty','Nothing here yet. Add clients and certifications from the admin portal.')
ON CONFLICT DO NOTHING;