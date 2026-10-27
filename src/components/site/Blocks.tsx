import { Link } from "@tanstack/react-router";
import type { Project } from "@/lib/site";

export function ProjectCard({ p, index = 0 }: { p: Project; index?: number }) {
  return (
    <Link to="/work/$slug" params={{ slug: p.slug }} className="group block fade-up" style={{ animationDelay: `${index * 60}ms` }}>
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img src={p.cover} alt={`${p.name} — ${p.description}`} loading="lazy" width={1280} height={960} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
        {p.isSample && <span className="absolute left-3 top-3 bg-background px-2 py-1 text-[0.65rem] uppercase tracking-widest">Sample concept</span>}
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-3xl">{p.name}</h3>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">{p.description}</p>
          <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
            {p.tags.map((t) => <li key={t}>· {t}</li>)}
          </ul>
        </div>
        <span className="mt-2 text-xl transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden>↗</span>
      </div>
    </Link>
  );
}

export const PROCESS = [
  { n: "01", t: "Discover", d: "Understand the business and its challenges." },
  { n: "02", t: "Strategize", d: "Define the direction." },
  { n: "03", t: "Create", d: "Produce the creative work and digital experience." },
  { n: "04", t: "Optimize", d: "Measure what matters and improve." },
];

export function Process({ steps = PROCESS }: { steps?: { n: string; t: string; d: string }[] }) {
  return (
    <ol className="grid border-t border-foreground sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((s) => (
        <li key={s.n} className="group border-b border-border py-8 pr-6 lg:border-b-0 lg:border-r lg:pl-6 lg:first:pl-0 lg:last:border-r-0">
          <span className="font-display text-gold text-2xl">{s.n}</span>
          <h3 className="mt-6 text-4xl transition-transform duration-500 group-hover:translate-x-1">{s.t}</h3>
          <p className="mt-3 text-sm text-muted-foreground">{s.d}</p>
        </li>
      ))}
    </ol>
  );
}

export function SectionHead({ eyebrow, title, children }: { eyebrow: string; title: React.ReactNode; children?: React.ReactNode }) {
  return (
    <div className="mb-12 grid gap-6 md:grid-cols-12 md:items-end">
      <div className="md:col-span-7">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-4 text-5xl md:text-6xl">{title}</h2>
      </div>
      {children && <div className="text-muted-foreground md:col-span-4 md:col-start-9">{children}</div>}
    </div>
  );
}

export function CTA({ title = "Let's find the missing piece.", service }: { title?: string; service?: string }) {
  return (
    <section className="container-x mt-32">
      <div className="border-t border-foreground pt-14 md:flex md:items-end md:justify-between">
        <h2 className="max-w-3xl text-6xl md:text-8xl">{title}</h2>
        <Link to="/contact" search={service ? { service } : {}} className="btn btn-primary mt-8 md:mt-0">Start a Project ↗</Link>
      </div>
    </section>
  );
}

export function FAQ({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="border-t border-foreground">
      {items.map((f) => (
        <details key={f.q} className="group border-b border-border py-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-xl md:text-2xl font-display">
            {f.q}<span className="text-gold transition-transform group-open:rotate-45" aria-hidden>+</span>
          </summary>
          <p className="mt-4 max-w-2xl text-muted-foreground">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
