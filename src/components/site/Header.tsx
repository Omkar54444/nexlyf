import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

const NAV = [
  { to: "/services", label: "Services" },
  { to: "https://nexlfy-portfolio.netlify.app/", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); btnRef.current?.focus(); }
      if (e.key === "Tab" && panelRef.current) {
        const els = [btnRef.current!, ...panelRef.current.querySelectorAll<HTMLElement>("a")];
        const i = els.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey && i <= 0) { e.preventDefault(); els[els.length - 1]!.focus(); }
        else if (!e.shiftKey && i === els.length - 1) { e.preventDefault(); els[0]!.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="container-x flex h-16 items-center justify-between md:h-20">
        <Link to="/" className="font-sans text-lg font-semibold tracking-[0.2em]" aria-label="NEXLYF home">
          NEXLYF<sup className="text-[0.55em] text-gold">®</sup>
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-10 md:flex">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className="link-underline text-sm" activeProps={{ className: "text-gold" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <Link to="/contact" className="btn btn-primary hidden md:inline-flex">Start a Project ↗</Link>
        <button
          ref={btnRef}
          type="button"
          className="relative z-[60] -mr-2 p-2 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>
      {open && (
        <div ref={panelRef} id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 top-16 z-50 bg-background md:hidden">
          <nav aria-label="Mobile" className="container-x flex flex-col gap-2 pt-10">
            {NAV.map((n, i) => (
              <Link key={n.to} to={n.to} className="fade-up border-b border-border py-4 font-display text-4xl" style={{ animationDelay: `${i * 50}ms` }}>
                {n.label}
              </Link>
            ))}
            <Link to="/contact" className="btn btn-primary mt-8">Start a Project ↗</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
