import { createFileRoute } from "@tanstack/react-router";
import { CTA, Process } from "@/components/site/Blocks";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — We Create Direction | NEXLYF" },
      { name: "description", content: "How NEXLYF approaches strategy, creative thinking, content, digital experiences and brand consistency." },
      { property: "og:title", content: "About NEXLYF" },
      { property: "og:description", content: "We don't create noise. We create direction." },
    ],
  }),
  component: About,
});

const APPROACH = [
  ["Strategy", "Every decision starts with the business: who it serves, what it offers and where it wants to go."],
  ["Creative thinking", "Ideas that are distinctive for a reason — memorable because they're relevant."],
  ["Content production", "Photo, video and design produced to one system, so quality stays consistent."],
  ["Digital experiences", "Websites and journeys that feel considered and make the next step obvious."],
  ["Brand consistency", "One voice and one look across every touchpoint, so recognition compounds."],
  ["Business-focused execution", "We measure what matters and keep improving what works."],
];

function About() {
  return (
    <>
      <section className="container-x pb-20 pt-16 md:pt-24">
        <p className="eyebrow">About</p>
        <h1 className="fade-up mt-6 max-w-5xl text-[clamp(3rem,8vw,7.5rem)]">We don't create noise. We create direction.</h1>
        <p className="mt-10 max-w-2xl text-lg text-muted-foreground">Nexlyf is a creative growth studio. We combine strategy, design, content and technology so that everything a brand puts into the world pulls in the same direction.</p>
      </section>
      <section className="container-x grid border-t border-foreground sm:grid-cols-2 lg:grid-cols-3">
        {APPROACH.map(([t, d]) => (
          <div key={t} className="border-b border-border py-10 pr-8">
            <h2 className="text-4xl">{t}</h2>
            <p className="mt-4 text-muted-foreground">{d}</p>
          </div>
        ))}
      </section>
      <section className="container-x mt-32"><h2 className="mb-12 text-5xl md:text-6xl">Our process</h2><Process /></section>
      <CTA />
    </>
  );
}
