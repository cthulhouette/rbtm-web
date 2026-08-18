INSERT INTO public.site_content (section, field_key, field_value)
SELECT v.section, v.field_key, v.field_value
FROM (VALUES
  ('hero','image_url',''),
  ('hero','image_alt','RB Textile Mills factory floor')
) AS v(section, field_key, field_value)
WHERE NOT EXISTS (
  SELECT 1 FROM public.site_content sc WHERE sc.section = v.section AND sc.field_key = v.field_key
);