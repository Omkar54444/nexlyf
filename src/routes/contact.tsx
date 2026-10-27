import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  validateSearch: z.object({ service: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "Contact — Start a Project | NEXLYF" },
      { name: "description", content: "Tell NEXLYF about your project — social media, marketing, branding or website. We'll get back to you." },
      { property: "og:title", content: "Start a project with NEXLYF" },
      { property: "og:description", content: "Share your project details and we'll be in touch." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { service } = Route.useSearch();
  return (
    <section className="container-x grid gap-16 pb-12 pt-16 md:pt-24 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <p className="eyebrow">Contact</p>
        <h1 className="fade-up mt-6 text-6xl md:text-7xl">Start a project.</h1>
        <p className="mt-6 text-muted-foreground">Tell us where you are and where you want to go. We read every enquiry.</p>
        {(SITE.email || SITE.phone || SITE.address) && (
          <dl className="mt-10 space-y-4 text-sm">
            {SITE.email && <div><dt className="eyebrow">Email</dt><dd><a className="link-underline" href={`mailto:${SITE.email}`}>{SITE.email}</a></dd></div>}
            {SITE.phone && <div><dt className="eyebrow">Phone</dt><dd><a className="link-underline" href={`tel:${SITE.phone}`}>{SITE.phone}</a></dd></div>}
            {SITE.address && <div><dt className="eyebrow">Studio</dt><dd>{SITE.address}</dd></div>}
          </dl>
        )}
      </div>
      <div className="lg:col-span-7 lg:col-start-6"><EnquiryForm key={service} preselected={service} /></div>
    </section>
  );
}
