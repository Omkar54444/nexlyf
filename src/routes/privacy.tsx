import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — NEXLYF" },
      { name: "description", content: "How NEXLYF collects, uses and protects information submitted through this website." },
      { property: "og:title", content: "Privacy Policy — NEXLYF" },
      { property: "og:description", content: "How we handle your information." },
    ],
  }),
  component: () => (
    <article className="container-x max-w-3xl pb-12 pt-16 md:pt-24">
      <p className="eyebrow">Legal</p>
      <h1 className="mt-6 text-6xl">Privacy Policy</h1>
      <div className="mt-12 space-y-8 text-muted-foreground [&_h2]:text-3xl [&_h2]:text-foreground">
        <p>This policy explains how NEXLYF handles information you share through this website.</p>
        <h2>What we collect</h2>
        <p>When you submit the enquiry form we store your name, business name, email, optional WhatsApp number, selected services, budget range and project description. The brand diagnosis runs entirely in your browser and is not stored.</p>
        <h2>How we use it</h2>
        <p>Only to respond to your enquiry and discuss a potential project. We do not sell your information.</p>
        <h2>Storage and security</h2>
        <p>Enquiries are stored securely and are not publicly accessible.</p>
        <h2>Your rights</h2>
        <p>You can ask us to access, correct or delete your information at any time by replying to our correspondence.</p>
        <p className="text-sm">This is a general template and should be reviewed for your jurisdiction before publishing.</p>
      </div>
    </article>
  ),
});
