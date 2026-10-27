import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CTA, ProjectCard } from "@/components/site/Blocks";
import { getProject, PROJECTS } from "@/lib/site";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Project not found — NEXLYF" }, { name: "robots", content: "noindex" }] };
    const p = loaderData.project;
    return {
      meta: [
        { title: `${p.name} — Case Study | NEXLYF` },
        { name: "description", content: p.description },
        { property: "og:title", content: `${p.name} — NEXLYF` },
        { property: "og:description", content: p.description },
      ],
    };
  },
  notFoundComponent: ProjectNotFound,
  component: CaseStudy,
});

function ProjectNotFound() {
  return (
    <section className="container-x flex min-h-[60vh] flex-col justify-center py-24">
      <p className="eyebrow">404</p>
      <h1 className="mt-6 text-6xl">We couldn't find that project.</h1>
      <Link to="/work" className="btn btn-primary mt-10 self-start">Back to all work</Link>
    </section>
  );
}

function CaseStudy() {
  const { project: p } = Route.useLoaderData();
  const related = PROJECTS.filter((x) => x.slug !== p.slug && x.categories.some((c) => p.categories.includes(c))).slice(0, 2);
  const blocks = [
    ["Business challenge", p.challenge],
    ["Strategy", p.strategy],
    ["Creative direction", p.creative],
    ["Execution", p.execution],
  ];
  return (
    <>
      <section className="container-x pb-12 pt-16 md:pt-24">
        <Link to="/work" className="eyebrow link-underline">← All work</Link>
        <p className="eyebrow mt-10 text-gold">{p.isSample ? "Sample concept" : "Case study"} · {p.tags.join(" · ")}</p>
        <h1 className="fade-up mt-4 text-[clamp(3rem,8vw,7.5rem)]">{p.name}</h1>
        <p className="mt-8 max-w-2xl text-lg text-muted-foreground">{p.overview}</p>
        {p.isSample && <p className="mt-4 max-w-2xl border-l-2 border-gold pl-4 text-sm">This is a self-initiated sample concept created to demonstrate our approach. It is not client work.</p>}
      </section>
      <img src={p.cover} alt={`${p.name} project cover`} width={1280} height={960} className="container-x aspect-[16/9] object-cover" />
      <section className="container-x mt-20 grid gap-12">
        {blocks.map(([t, d]) => (
          <div key={t} className="grid gap-4 border-t border-border pt-8 md:grid-cols-12">
            <h2 className="text-4xl md:col-span-4">{t}</h2>
            <p className="text-lg text-muted-foreground md:col-span-7">{d}</p>
          </div>
        ))}
        <div className="grid gap-4 border-t border-border pt-8 md:grid-cols-12">
          <h2 className="text-4xl md:col-span-4">Deliverables</h2>
          <ul className="flex flex-wrap gap-2 md:col-span-7">{p.deliverables.map((d) => <li key={d} className="chip">{d}</li>)}</ul>
        </div>
        <div className="grid gap-4 border-t border-border pt-8 md:grid-cols-12">
          <h2 className="text-4xl md:col-span-4">Results</h2>
          <p className="text-muted-foreground md:col-span-7">{p.results ?? "Verified results for this project are not published yet."}</p>
        </div>
      </section>
      <section className="container-x mt-20">
        <h2 className="mb-8 text-4xl">Gallery</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <img src={p.cover} alt={`${p.name} detail`} loading="lazy" width={1280} height={960} className="aspect-square w-full object-cover md:col-span-2 md:aspect-[16/10]" />
          <img src={p.cover} alt={`${p.name} close-up`} loading="lazy" width={1280} height={960} className="aspect-square w-full object-cover object-right" />
        </div>
        <p className="mt-3 text-xs text-muted-foreground">Imagery is art-directed representation of the visual direction.</p>
      </section>
      {related.length > 0 && (
        <section className="container-x mt-32">
          <h2 className="mb-12 text-5xl">Related projects</h2>
          <div className="grid gap-x-8 gap-y-16 md:grid-cols-2">{related.map((r, i) => <ProjectCard key={r.slug} p={r} index={i} />)}</div>
        </section>
      )}
      <CTA title="Start a project like this." />
    </>
  );
}
