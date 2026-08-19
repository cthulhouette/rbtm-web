import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PublicLayout } from "@/components/PublicLayout";
import { fetchSiteContent, c } from "@/lib/content";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — RB Textile Mills" },
      { name: "description", content: "Three decades of disciplined textile manufacturing from Narayanganj, Bangladesh." },
      { property: "og:title", content: "About — RB Textile Mills" },
      { property: "og:description", content: "Three decades of disciplined textile manufacturing from Narayanganj, Bangladesh." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { data } = useQuery({ queryKey: ["site_content"], queryFn: fetchSiteContent });
  const map = data ?? {};
  const image = c(map, "about", "image_url", "");

  return (
    <PublicLayout>
      <section className="container-x py-20 md:py-32">
        <div className="text-[10px] uppercase tracking-[0.3em] text-ink/50 mb-4">
          {c(map, "about", "eyebrow", "About")}
        </div>
        <h1 className="text-4xl md:text-6xl max-w-4xl">
          {c(map, "about", "h1", `A vertically integrated textile mill, since ${c(map, "about", "year_established", "1998")}.`)}
        </h1>

        {image && (
          <img
            src={image}
            alt={c(map, "about", "image_alt", "RB Textile Mills facility")}
            className="mt-12 mx-auto block w-full max-h-[520px] object-contain object-center border border-ink/15"
            loading="lazy"
          />
        )}


        <div className="mt-16 grid md:grid-cols-2 gap-12 border-t border-ink pt-12">
          <div className="space-y-6">
            <p className="text-base md:text-lg leading-relaxed text-ink/80 whitespace-pre-line">
              {c(map, "about", "body", "")}
            </p>
            {c(map, "about", "body_2", "") && (
              <p className="text-base md:text-lg leading-relaxed text-ink/80 whitespace-pre-line">
                {c(map, "about", "body_2", "")}
              </p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-px bg-ink/15 border border-ink/15">
            {[
              { k: "stat_looms", labelKey: "stat_looms_label", fallback: "Looms" },
              { k: "stat_capacity", labelKey: "stat_capacity_label", fallback: "Capacity" },
              { k: "stat_workforce", labelKey: "stat_workforce_label", fallback: "Workforce" },
              { k: "year_established", labelKey: "stat_year_label", fallback: "Founded" },
            ].map((s) => (
              <div key={s.k} className="bg-background p-8">
                <div className="text-3xl font-black">{c(map, "about", s.k, "—")}</div>
                <div className="mt-2 text-[10px] uppercase tracking-[0.25em] text-ink/60">
                  {c(map, "about", s.labelKey, s.fallback)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
