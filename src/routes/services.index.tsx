import { createFileRoute, Link } from "@tanstack/react-router";
import { CTA, Process } from "@/components/site/Blocks";
import { SERVICES } from "@/lib/site";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — Social, Marketing, Branding & Websites | NEXLYF" },
      { name: "description", content: "Social media management, digital marketing, branding and website development from NEXLYF, a creative growth studio." },
      { property: "og:title", content: "Services — NEXLYF" },
      { property: "og:description", content: "Four disciplines working toward one clear brand direction." },
    ],
  }),
  component: Services,
});

function Services() {
  return (
    <>
      <section className="container-x pb-16 pt-16 md:pt-24">
        <p className="eyebrow">Services</p>
        <h1 className="fade-up mt-6 max-w-5xl text-[clamp(3rem,8vw,7.5rem)]">Everything your brand needs to move forward.</h1>
      </section>
      <section className="container-x">
        <ul className="border-t border-foreground">
          {SERVICES.map((s, i) => (
            <li key={s.slug}>
              <Link to="/services/$slug" params={{ slug: s.slug }} className="group grid gap-4 border-b border-border py-10 md:grid-cols-12 md:items-center">
                <span className="text-gold md:col-span-1">0{i + 1}</span>
                <h2 className="text-4xl transition-transform duration-500 group-hover:translate-x-2 md:col-span-5 md:text-6xl">{s.name}</h2>
                <p className="text-muted-foreground md:col-span-5">{s.short}</p>
                <span className="text-2xl md:col-span-1 md:text-right" aria-hidden>↗</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section className="container-x mt-32"><h2 className="mb-12 text-5xl">How every engagement works</h2><Process /></section>
      <CTA />
    </>
  );
}
