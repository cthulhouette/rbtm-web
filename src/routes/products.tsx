import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { PublicLayout } from "@/components/PublicLayout";
import { fetchProducts, fetchSiteContent, c, productSlug } from "@/lib/content";

export const Route = createFileRoute("/products")({
  validateSearch: (search: Record<string, unknown>) => ({
    product: typeof search.product === "string" ? search.product : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Products & Capabilities — RB Textile Mills" },
      { name: "description", content: "Yarns, woven fabrics, denim, and blends manufactured at scale." },
      { property: "og:title", content: "Products & Capabilities — RB Textile Mills" },
      { property: "og:description", content: "Yarns, woven fabrics, denim, and blends manufactured at scale." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const { data: products, isLoading } = useQuery({ queryKey: ["products"], queryFn: fetchProducts });
  const { data: content } = useQuery({ queryKey: ["site_content"], queryFn: fetchSiteContent });
  const map = content ?? {};
  const [open, setOpen] = useState<string | null>(null);

  const readMore = c(map, "products", "read_more", "Read more");
  const readLess = c(map, "products", "read_less", "Close");

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
              <article key={p.id} className={`border-b border-ink/20 transition-colors ${isOpen ? "bg-muted/40" : ""}`}>
                <button
                  onClick={() => setOpen(isOpen ? null : p.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center gap-6 py-7 text-left group cursor-pointer"
                >
                  <span className="text-[10px] uppercase tracking-[0.25em] text-ink/40 w-10 shrink-0">
                    {(i + 1).toString().padStart(2, "0")}
                  </span>
                  <span className="flex-1 text-xl md:text-3xl font-semibold transition-transform duration-300 group-hover:translate-x-1">
                    {p.name}
                  </span>
                  <span className="hidden sm:inline text-[10px] font-bold uppercase tracking-[0.22em] text-ink/50 group-hover:text-ink transition-colors">
                    {isOpen ? readLess : readMore}
                  </span>
                  <span
                    className={`shrink-0 flex items-center justify-center w-9 h-9 border border-ink/25 text-ink/70 transition-all duration-300 group-hover:border-ink group-hover:text-ink ${
                      isOpen ? "rotate-180 bg-ink text-background border-ink" : ""
                    }`}
                  >
                    <ChevronDown size={18} />
                  </span>
                </button>
                <div
                  className="grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <div
                      className={`pb-10 pl-0 md:pl-16 max-w-3xl transition-all duration-500 ${
                        isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
                      }`}
                    >
                      <p className="text-sm md:text-base text-ink/70 leading-relaxed whitespace-pre-line">
                        {p.description}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </PublicLayout>
  );
}
