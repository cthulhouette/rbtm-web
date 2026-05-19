import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-50 bg-ink text-background border-b border-background/15">
      <div className="container-x flex h-16 items-center justify-between">
        <Link to="/" className="font-black tracking-[0.15em] text-sm md:text-base">
          RB TEXTILE MILLS
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-xs font-semibold uppercase tracking-[0.18em] transition-opacity ${
                path === l.to ? "text-beige" : "text-background/80 hover:text-background"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <button
          className="md:hidden p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <nav className="md:hidden border-t border-background/15 container-x py-4 flex flex-col gap-4">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="text-sm font-semibold uppercase tracking-[0.18em]"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
