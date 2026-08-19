import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PublicLayout } from "@/components/PublicLayout";
import { fetchClientsCerts, fetchSiteContent, c } from "@/lib/content";

export const Route = createFileRoute("/clients")({
  head: () => ({
    meta: [
      { title: "Clients & Certifications — RB Textile Mills" },
      {
        name: "description",
        content:
          "The buyers we supply and the compliance certifications RB Textile Mills holds.",
      },
      { property: "og:title", content: "Clients & Certifications — RB Textile Mills" },
      {
        property: "og:description",
        content: "Partners we work with and the standards our mill is certified against.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ClientsPage,
});

function ClientsPage() {
  const { data: items, isLoading } = useQuery({
    queryKey: ["clients_certs"],
    queryFn: fetchClientsCerts,
  });
  const { data: content } = useQuery({ queryKey: ["site_content"], queryFn: fetchSiteContent });
  const map = content ?? {};

  const clients = (items ?? []).filter((i) => i.kind === "client");
  const certs = (items ?? []).filter((i) => i.kind === "certification");

  return (
    <PublicLayout>
      <section className="bg-ink text-background">
        <div className="container-x py-20 md:py-28">
          <div className="text-[10px] uppercase tracking-[0.3em] text-beige mb-4">
            {c(map, "clients", "eyebrow", "Partners & Compliance")}
          </div>
          <h1 className="text-4xl md:text-6xl text-background max-w-3xl">
            {c(map, "clients", "h1", "Clients & certifications.")}
          </h1>
        </div>
      </section>

      <section className="container-x py-16 md:py-24">
        {isLoading && <p className="text-sm text-ink/50">Loading…</p>}
        {!isLoading && clients.length === 0 && certs.length === 0 && (
          <p className="text-xs uppercase tracking-[0.18em] text-ink/50">
            {c(map, "clients", "empty", "Nothing here yet. Add clients and certifications from the admin portal.")}
          </p>
        )}

        {clients.length > 0 && (
          <>
            <h2 className="text-2xl md:text-3xl border-b border-ink pb-4">
              {c(map, "clients", "clients_title", "Our Clients")}
            </h2>
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-8">
              {clients.map((cl) => (
                <figure key={cl.id} className="text-center">
                  <div className="h-28 flex items-center justify-center border border-ink/15 bg-muted/40 p-4">
                    {cl.image_url ? (
                      <img
                        src={cl.image_url}
                        alt={cl.name}
                        loading="lazy"
                        className="mx-auto block max-h-full max-w-full object-contain object-center"
                      />
                    ) : (
                      <span className="text-xs uppercase tracking-[0.18em] text-ink/50">{cl.name}</span>
                    )}
                  </div>
                  <figcaption className="mt-3 text-[11px] uppercase tracking-[0.18em] text-ink/70">
                    {cl.name}
                  </figcaption>
                  {cl.description && (
                    <p className="mt-2 text-xs text-ink/50 leading-relaxed">{cl.description}</p>
                  )}
                </figure>
              ))}
            </div>
          </>
        )}

        {certs.length > 0 && (
          <>
            <h2 className="mt-24 text-2xl md:text-3xl border-b border-ink pb-4">
              {c(map, "clients", "certifications_title", "Certifications")}
            </h2>
            <div className="mt-12 space-y-20">
              {certs.map((ct) => (
                <figure key={ct.id} className="text-center">
                  <div className="mx-auto w-full max-w-3xl border border-ink/15 bg-muted/30 p-6 flex items-center justify-center min-h-[360px]">
                    {ct.image_url ? (
                      <img
                        src={ct.image_url}
                        alt={ct.name}
                        loading="lazy"
                        className="mx-auto block max-h-[520px] max-w-full object-contain object-center"
                      />
                    ) : (
                      <span className="text-xs uppercase tracking-[0.2em] text-ink/40">
                        Certificate image coming soon
                      </span>
                    )}
                  </div>
                  <figcaption className="mt-6 text-sm font-bold uppercase tracking-[0.2em]">
                    {ct.name}
                  </figcaption>
                  {ct.description && (
                    <p className="mt-3 mx-auto max-w-2xl text-sm text-ink/60 leading-relaxed">
                      {ct.description}
                    </p>
                  )}
                </figure>
              ))}
            </div>
          </>
        )}
      </section>
    </PublicLayout>
  );
}
