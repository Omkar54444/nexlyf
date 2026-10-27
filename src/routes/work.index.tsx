import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { CTA, ProjectCard } from "@/components/site/Blocks";
import { PROJECTS, WORK_FILTERS } from "@/lib/site";

const search = z.object({ filter: z.enum(["all", "social", "branding", "websites", "campaigns"]).catch("all").optional() });

export const Route = createFileRoute("/work/")({
  validateSearch: search,
  head: () => ({
    meta: [
      { title: "Our Work — Branding, Social & Websites | NEXLYF" },
      { name: "description", content: "Selected NEXLYF projects and clearly labelled sample concepts across branding, social media, websites and campaigns." },
      { property: "og:title", content: "Our Work — NEXLYF" },
      { property: "og:description", content: "Selected projects from the NEXLYF studio." },
    ],
  }),
  component: Work,
});

function Work() {
  const filter = Route.useSearch().filter ?? "all";
  const nav = Route.useNavigate();
  const list = filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.categories.includes(filter));
  return (
    <>
      <section className="container-x pb-12 pt-16 md:pt-24">
        <p className="eyebrow">Our work</p>
        <h1 className="fade-up mt-6 text-[clamp(3rem,8vw,7.5rem)]">Selected work.</h1>
        <div role="group" aria-label="Filter projects" className="mt-12 flex flex-wrap gap-2">
          {WORK_FILTERS.map((f) => (
            <button key={f.id} type="button" className="chip" aria-pressed={filter === f.id} onClick={() => nav({ search: { filter: f.id }, replace: true, resetScroll: false })}>{f.label}</button>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-foreground" aria-live="polite">{list.length} project{list.length === 1 ? "" : "s"}</p>
      </section>
      <section className="container-x">
        {list.length === 0 ? <p className="py-24 text-muted-foreground">No projects in this category yet.</p> : (
          <div key={filter} className="grid gap-x-8 gap-y-16 md:grid-cols-2">{list.map((p, i) => <ProjectCard key={p.slug} p={p} index={i} />)}</div>
        )}
      </section>
      <CTA />
    </>
  );
}
