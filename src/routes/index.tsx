import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MissingPiece, BeforeAfter, Playground } from "@/components/site/Interactive";
import { CTA, Process, ProjectCard, SectionHead } from "@/components/site/Blocks";
import { PROJECTS, SERVICES } from "@/lib/site";
import { QUESTIONS } from "@/lib/diagnosis";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NEXLYF — Creative Growth Studio for Ambitious Brands" },
      { name: "description", content: "Social media, digital marketing, branding and websites. NEXLYF connects strategy, creativity and technology to help brands move forward." },
      { property: "og:title", content: "NEXLYF — Something is missing from your brand." },
      { property: "og:description", content: "A creative growth studio connecting strategy, creativity and technology." },
    ],
  }),
  component: Home,
});

function Home() {
  const [active, setActive] = useState(0);
  const s = SERVICES[active]!;
  return (
    <>
      {/* Hero */}
      <section className="container-x grid gap-12 pb-24 pt-14 md:pt-24 lg:grid-cols-12 lg:items-center">
        <div className="fade-up lg:col-span-7">
          <p className="eyebrow">NEXLYF® — Creative Growth Studio</p>
          <h1 className="mt-8 text-[clamp(3.2rem,9vw,8.5rem)]">Something is <em className="text-gold">missing</em> from your brand.</h1>
          <p className="mt-8 max-w-lg text-lg text-muted-foreground">We connect strategy, creativity and technology to help brands move forward.</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/brand-diagnosis" className="btn btn-primary">Find Your Missing Piece ↗</Link>
            <Link to="/work" className="btn btn-outline">Explore Our Work</Link>
          </div>
        </div>
        <div className="lg:col-span-5"><MissingPiece /></div>
      </section>

      {/* Intro */}
      <section className="container-x border-t border-border py-24">
        <p className="max-w-5xl font-display text-4xl leading-tight md:text-6xl">
          Nexlyf is an independent creative studio. We help businesses look, sound and perform like the brand they want to be — <span className="text-muted-foreground">through strategy, design, content and technology working as one.</span>
        </p>
      </section>

      {/* Services */}
      <section className="container-x py-16">
        <SectionHead eyebrow="What we do" title="Four disciplines. One direction." />
        <div className="grid gap-10 lg:grid-cols-2">
          <ul className="border-t border-foreground">
            {SERVICES.map((x, i) => (
              <li key={x.slug}>
                <button type="button" onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)} aria-pressed={active === i}
                  className={`flex w-full items-baseline gap-6 border-b border-border py-6 text-left transition-colors ${active === i ? "" : "text-muted-foreground"}`}>
                  <span className="text-sm text-gold">0{i + 1}</span><span className="font-display text-3xl md:text-5xl">{x.name}</span>
                </button>
              </li>
            ))}
          </ul>
          <div key={s.slug} className="fade-up flex flex-col justify-between bg-card p-8 md:p-12">
            <div>
              <h3 className="text-4xl md:text-5xl">{s.headline}</h3>
              <p className="mt-5 text-muted-foreground">{s.short}</p>
              <ul className="mt-8 grid gap-2 text-sm sm:grid-cols-2">{s.deliverables.slice(0, 6).map((d) => <li key={d}>— {d}</li>)}</ul>
            </div>
            <Link to="/services/$slug" params={{ slug: s.slug }} className="btn btn-outline mt-10 self-start">Explore {s.name} ↗</Link>
          </div>
        </div>
      </section>

      {/* Work */}
      {/* <section className="container-x py-24">
        <SectionHead eyebrow="Selected work" title="Work with intention."><Link to="/work" className="link-underline">View all work ↗</Link></SectionHead>
        <div className="grid gap-x-8 gap-y-16 md:grid-cols-2">{PROJECTS.slice(0, 2).map((p, i) => <ProjectCard key={p.slug} p={p} index={i} />)}</div>
      </section> */}

      {/* Diagnosis preview */}
      {/* <section className="bg-ink py-24 text-ivory">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-ivory/50">Brand diagnosis · 4 questions</p>
            <h2 className="mt-4 text-5xl md:text-7xl">Find the missing piece in your brand.</h2>
            <p className="mt-6 max-w-md text-ivory/65">Answer four quick questions and get a recommendation based on your answers. No sign-up required.</p>
          </div>
          <div>
            <p className="font-display text-3xl">{QUESTIONS[1].title}</p>
            <div className="mt-6 flex flex-col gap-2">
              {QUESTIONS[1].options.map((o) => (
                <Link key={o} to="/brand-diagnosis" search={{ challenge: o }} className="flex justify-between border border-ivory/20 px-5 py-4 transition-colors hover:border-gold hover:text-gold">{o}<span aria-hidden>↗</span></Link>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* Process */}
      <section className="container-x py-24">
        <SectionHead eyebrow="How we work" title="A clear process. No noise." />
        <Process />
      </section>

      {/* Before / after */}
      <section className="container-x py-16">
        <SectionHead eyebrow="Transformation" title="From scattered to considered.">Drag the slider to see how a coherent visual system changes the same feed.</SectionHead>
        <BeforeAfter />
      </section>

      {/* Playground */}
      <section className="container-x py-24">
        <SectionHead eyebrow="Creative playground" title="Attractive isn't the same as coherent." />
        <Playground />
      </section>

      {/* About */}
      <section className="container-x grid gap-10 border-t border-border py-24 md:grid-cols-12">
        <p className="eyebrow md:col-span-3">About Nexlyf</p>
        <div className="md:col-span-8">
          <p className="font-display text-4xl md:text-5xl">We don't create noise. We create direction.</p>
          <p className="mt-6 max-w-xl text-muted-foreground">Every project starts with understanding the business. Then we make the creative choices that serve it — consistently, across every touchpoint.</p>
          <Link to="/about" className="btn btn-outline mt-8">About the studio</Link>
        </div>
      </section>

      <CTA title="Have a project in mind?" />
    </>
  );
}
