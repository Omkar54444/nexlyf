import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CTA, FAQ, Process, ProjectCard } from "@/components/site/Blocks";
import { BrandPreview, CampaignBreakdown, FeedTransform, WebsiteToggle } from "@/components/site/Interactive";
import { getService, PROJECTS } from "@/lib/site";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Service not found — NEXLYF" }, { name: "robots", content: "noindex" }] };
    const s = loaderData.service;
    return {
      meta: [
        { title: `${s.name} — NEXLYF` },
        { name: "description", content: `${s.headline} ${s.intro}`.slice(0, 160) },
        { property: "og:title", content: `${s.name} — NEXLYF` },
        { property: "og:description", content: s.headline },
      ],
    };
  },
  component: ServicePage,
});

const DEMO = {
  "social-media-management": { title: "From scattered posts to a brand grid.", el: <FeedTransform /> },
  "digital-marketing": { title: "How a campaign fits together.", el: <CampaignBreakdown /> },
  branding: { title: "Try a brand direction.", el: <BrandPreview /> },
  "website-development": { title: "Before and after.", el: <WebsiteToggle /> },
};

function ServicePage() {
  const { service: s } = Route.useLoaderData();
  const demo = DEMO[s.slug];
  const work = PROJECTS.filter((p) => p.categories.includes(s.workCategory)).slice(0, 2);
  return (
    <>
      <section className="container-x pb-20 pt-16 md:pt-24">
        <Link to="/services" className="eyebrow link-underline">← All services</Link>
        <p className="eyebrow mt-10 text-gold">{s.name}</p>
        <h1 className="fade-up mt-4 max-w-5xl text-[clamp(3rem,8vw,7.5rem)]">{s.headline}</h1>
        <div className="mt-10 grid gap-8 md:grid-cols-12">
          <p className="text-lg text-muted-foreground md:col-span-6">{s.intro}</p>
          <div className="md:col-span-4 md:col-start-9"><Link to="/contact" search={{ service: s.slug }} className="btn btn-primary">Enquire about {s.name} ↗</Link></div>
        </div>
      </section>

      <section className="container-x grid gap-10 border-t border-border py-20 md:grid-cols-12">
        <h2 className="text-5xl md:col-span-4">What's included</h2>
        <ul className="grid gap-x-8 sm:grid-cols-2 md:col-span-8">
          {s.deliverables.map((d, i) => <li key={d} className="flex gap-4 border-b border-border py-5 text-lg"><span className="text-sm text-gold">{String(i + 1).padStart(2, "0")}</span>{d}</li>)}
        </ul>
      </section>

      <section className="bg-card py-24">
        <div className="container-x">
          <p className="eyebrow">Interactive</p>
          <h2 className="mb-12 mt-4 text-5xl md:text-6xl">{demo.title}</h2>
          {demo.el}
        </div>
      </section>

      <section className="container-x py-24">
        <h2 className="mb-12 text-5xl">Process</h2>
        <Process steps={s.process.map((p, i) => ({ n: `0${i + 1}`, t: p.title, d: p.text }))} />
      </section>

      {work.length > 0 && (
        <section className="container-x py-12">
          <h2 className="mb-12 text-5xl">Relevant work</h2>
          <div className="grid gap-x-8 gap-y-16 md:grid-cols-2">{work.map((p, i) => <ProjectCard key={p.slug} p={p} index={i} />)}</div>
        </section>
      )}

      <section className="container-x grid gap-10 py-24 md:grid-cols-12">
        <h2 className="text-5xl md:col-span-4">Questions</h2>
        <div className="md:col-span-8"><FAQ items={s.faqs} /></div>
      </section>

      <CTA title={`Let's talk ${s.name.toLowerCase()}.`} service={s.slug} />
    </>
  );
}
