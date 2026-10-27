import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — NEXLYF" },
      { name: "description", content: "Terms and conditions for using the NEXLYF website." },
      { property: "og:title", content: "Terms & Conditions — NEXLYF" },
      { property: "og:description", content: "The terms for using this website." },
    ],
  }),
  component: () => (
    <article className="container-x max-w-3xl pb-12 pt-16 md:pt-24">
      <p className="eyebrow">Legal</p>
      <h1 className="mt-6 text-6xl">Terms & Conditions</h1>
      <div className="mt-12 space-y-8 text-muted-foreground [&_h2]:text-3xl [&_h2]:text-foreground">
        <h2>Use of this website</h2>
        <p>Content on this website is provided for general information about NEXLYF's services. It may change without notice.</p>
        <h2>Intellectual property</h2>
        <p>Designs, text and imagery on this website belong to NEXLYF or their respective owners and may not be reused without permission. Sample concepts are clearly labelled and are not client work.</p>
        <h2>Brand diagnosis</h2>
        <p>The diagnosis provides general suggestions based on your answers. It is not professional advice or an audit.</p>
        <h2>Projects</h2>
        <p>Any project engagement is governed by a separate written agreement.</p>
        <p className="text-sm">This is a general template and should be reviewed before publishing.</p>
      </div>
    </article>
  ),
});
