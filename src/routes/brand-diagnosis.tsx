import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { QUESTIONS, recommend, type Answers } from "@/lib/diagnosis";
import { getService } from "@/lib/site";

export const Route = createFileRoute("/brand-diagnosis")({
  validateSearch: z.object({ challenge: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "Brand Diagnosis — Find Your Missing Piece | NEXLYF" },
      { name: "description", content: "Answer four questions and get a personalised recommendation for your brand, social media, marketing or website." },
      { property: "og:title", content: "Find the missing piece in your brand — NEXLYF" },
      { property: "og:description", content: "A four-question brand diagnosis with recommendations based on your answers." },
    ],
  }),
  component: Diagnosis,
});

function Diagnosis() {
  const { challenge } = Route.useSearch();
  const valid = QUESTIONS[1].options.includes(challenge as never);
  const [answers, setAnswers] = useState<Answers>(valid && challenge ? { challenge } : {});
  const [step, setStep] = useState(0);
  const [error, setError] = useState(false);
  const done = step === QUESTIONS.length;
  const q = QUESTIONS[Math.min(step, QUESTIONS.length - 1)]!;
  const result = done ? recommend(answers) : null;

  const next = () => { if (!answers[q.id]) { setError(true); return; } setError(false); setStep((s) => s + 1); };
  const back = () => { setError(false); setStep((s) => Math.max(0, s - 1)); };
  const restart = () => { setAnswers({}); setStep(0); setError(false); };

  return (
    <section className="container-x pb-12 pt-16 md:pt-24">
      <p className="eyebrow">Brand diagnosis</p>
      <h1 className="mt-6 max-w-4xl text-[clamp(2.8rem,7vw,6.5rem)]">Find the missing piece in your brand.</h1>

      <div className="mt-14 max-w-3xl">
        <div className="flex items-center gap-4" aria-label={`Progress: ${Math.min(step, 4)} of 4 answered`}>
          <div className="flex flex-1 gap-1">{QUESTIONS.map((_, i) => <span key={i} className={`h-1 flex-1 transition-colors duration-500 ${i < step ? "bg-gold" : i === step ? "bg-foreground" : "bg-border"}`} />)}</div>
          <span className="eyebrow">{done ? "Complete" : `${step + 1} / 4`}</span>
        </div>

        {!done && (
          <fieldset key={step} className="fade-up mt-12">
            <legend className="font-display text-4xl md:text-5xl">{q.title}</legend>
            <div role="radiogroup" className="mt-8 grid gap-2 sm:grid-cols-2">
              {q.options.map((o) => (
                <button key={o} type="button" role="radio" aria-checked={answers[q.id] === o}
                  onClick={() => { setAnswers((a) => ({ ...a, [q.id]: o })); setError(false); }}
                  className="chip justify-between rounded-none px-5 py-4 text-base">{o}</button>
              ))}
            </div>
            {error && <p role="alert" className="mt-4 text-sm text-destructive">Please choose an option to continue.</p>}
            <div className="mt-10 flex gap-3">
              <button type="button" className="btn btn-outline" onClick={back} disabled={step === 0}>← Back</button>
              <button type="button" className="btn btn-primary" onClick={next}>{step === 3 ? "See my result" : "Next →"}</button>
            </div>
          </fieldset>
        )}

        {done && result && (
          <div className="fade-up mt-12" aria-live="polite">
            <p className="eyebrow text-gold">Your missing piece</p>
            <h2 className="mt-4 text-5xl md:text-6xl">{result.piece}</h2>
            <p className="mt-4 text-sm text-muted-foreground">Main challenge: {answers.challenge}</p>
            <p className="mt-6 text-lg text-muted-foreground">{result.explain}</p>
            <h3 className="mt-12 text-3xl">Recommended services</h3>
            <ul className="mt-4 border-t border-foreground">
              {result.services.map((slug) => {
                const s = getService(slug)!;
                return <li key={slug}><Link to="/services/$slug" params={{ slug }} className="flex justify-between border-b border-border py-4 text-lg hover:text-gold">{s.name}<span aria-hidden>↗</span></Link></li>;
              })}
            </ul>
            <h3 className="mt-12 text-3xl">Why these fit</h3>
            <ul className="mt-4 space-y-3 text-muted-foreground">{result.reasons.map((r) => <li key={r}>— {r}</li>)}</ul>
            <p className="mt-8 text-xs text-muted-foreground">This recommendation is based only on your four answers using simple rules — it is not an audit of your brand.</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/contact" search={{ service: result.services[0] }} className="btn btn-primary">Discuss your project ↗</Link>
              <button type="button" className="btn btn-outline" onClick={back}>← Back</button>
              <button type="button" className="btn btn-outline" onClick={restart}>Restart</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
