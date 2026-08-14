import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { PublicLayout } from "@/components/PublicLayout";
import { fetchProducts, fetchSiteContent, c } from "@/lib/content";


export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products & Capabilities — RB Textile Mills" },
      { name: "description", content: "Yarns, woven fabrics, denim, and blends manufactured at scale." },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const { data: products, isLoading } = useQuery({ queryKey: ["products"], queryFn: fetchProducts });
  const { data: content } = useQuery({ queryKey: ["site_content"], queryFn: fetchSiteContent });
  const map = content ?? {};
  const [open, setOpen] = useState<string | null>(null);

  return (
    <PublicLayout>
      <section className="container-x py-20 md:py-32">
        <div className="text-[10px] uppercase tracking-[0.3em] text-ink/50 mb-4">{c(map, "products", "eyebrow", "Capabilities")}</div>
        <h1 className="text-4xl md:text-6xl max-w-3xl">{c(map, "products", "h1", "Engineered for global apparel programs.")}</h1>
        <div className="mt-16 border-t border-ink/20">
          {isLoading &&
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="border-b border-ink/20 py-8">
                <div className="h-6 bg-muted animate-pulse w-1/3" />
              </div>
            ))}
          {(products ?? []).map((p, i) => {
            const isOpen = open === p.id;
            return (
              <article key={p.id} className="border-b border-ink/20">
                <button
                  onClick={() => setOpen(isOpen ? null : p.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-baseline gap-6 py-7 text-left group"
                >
                  <span className="text-[10px] uppercase tracking-[0.25em] text-ink/40 w-10 shrink-0">
                    {(i + 1).toString().padStart(2, "0")}
                  </span>
                  <span className="flex-1 text-xl md:text-3xl font-semibold group-hover:translate-x-1 transition-transform">
                    {p.name}
                  </span>
                  <span className="shrink-0 text-ink/60">
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                  </span>
                </button>
                {isOpen && (
                  <div className="pb-10 pl-0 md:pl-16 max-w-3xl">
                    <p className="text-sm md:text-base text-ink/70 leading-relaxed whitespace-pre-line">
                      {p.description}
                    </p>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>
    </PublicLayout>
  );
}
