import { useState } from "react";
import { Link } from "@tanstack/react-router";

/* ---------- Hero: missing piece ---------- */
export function MissingPiece() {
  const [done, setDone] = useState(false);
  const cells = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const shape = (i: number) => {
    const c = "var(--ink)";
    const g = "var(--gold)";
    switch (i % 4) {
      case 0: return <circle cx="50" cy="50" r="38" fill="none" stroke={c} strokeWidth="1.5" />;
      case 1: return <path d="M0 100 A100 100 0 0 1 100 0 L100 100Z" fill={i === 5 ? g : c} />;
      case 2: return <rect x="18" y="18" width="64" height="64" fill="none" stroke={c} strokeWidth="1.5" />;
      default: return <path d="M0 0 L100 100 M100 0 L0 100" stroke={c} strokeWidth="1.5" />;
    }
  };
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setDone((d) => !d)}
        aria-pressed={done}
        aria-label={done ? "Reset the composition" : "Place the missing piece"}
        className="group relative block w-full"
      >
        <svg viewBox="0 0 300 300" className="w-full" role="img" aria-hidden>
          {cells.map((i) => {
            const x = (i % 3) * 100, y = Math.floor(i / 3) * 100;
            if (i === 4) return (
              <g key={i}>
                <rect x={x + 2} y={y + 2} width="96" height="96" fill="none" stroke="var(--gold)" strokeDasharray="4 4" />
                <g style={{ transform: done ? "translate(0,0) rotate(0)" : "translate(150px,-150px) rotate(25deg)", transformOrigin: "150px 150px", transition: "transform 1.1s var(--ease-out-expo)", opacity: done ? 1 : 0.9 }}>
                  <rect x={x} y={y} width="100" height="100" fill="var(--gold)" />
                  <circle cx={x + 50} cy={y + 50} r="16" fill="var(--ink)" />
                </g>
              </g>
            );
            return <g key={i} transform={`translate(${x} ${y})`}><rect width="100" height="100" fill="var(--card)" stroke="var(--border)" />{shape(i)}</g>;
          })}
        </svg>
        <span className="eyebrow mt-4 block text-left">{done ? "Click to reset" : "Click to complete the composition"}</span>
      </button>
      <p aria-live="polite" className={`mt-4 font-display text-3xl transition-all duration-700 md:text-4xl ${done ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
        {done ? "That's where Nexlyf comes in." : "\u00a0"}
      </p>
    </div>
  );
}

/* ---------- Before / After slider ---------- */
export function BeforeAfter() {
  const [pos, setPos] = useState(50);
  return (
    <div>
      <div className="relative aspect-[16/10] overflow-hidden border border-border select-none">
        {/* After */}
        <div className="absolute inset-0 grid grid-cols-3 gap-2 bg-ivory p-4 md:p-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex flex-col justify-end p-3" style={{ background: i % 2 ? "var(--sw-4)" : "var(--ink)", color: i % 2 ? "var(--ink)" : "var(--ivory)" }}>
              <span className="font-display text-lg md:text-3xl">{["Care", "Daily", "Trust", "Well", "Calm", "Ritual"][i]}</span>
              <span className="mt-1 h-px w-8" style={{ background: "var(--gold)" }} />
            </div>
          ))}
        </div>
        {/* Before */}
        <div className="absolute inset-0 grid grid-cols-3 gap-2 bg-muted p-4 md:p-8" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center justify-center p-2 text-center" style={{ background: [`var(--sw-9)`, `var(--sw-7)`, `var(--sw-3)`, `var(--sw-5)`, `var(--sw-8)`, `var(--sw-6)`][i], color: i === 4 || i === 3 ? "var(--ivory)" : "var(--ink)", fontFamily: i % 2 ? "Impact, sans-serif" : "cursive", transform: `rotate(${(i % 3) - 1}deg)` }}>
              <span className="text-sm md:text-xl">{["SALE!!", "new post", "Offer", "hello", "BUY NOW", "promo"][i]}</span>
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 w-px bg-foreground" style={{ left: `${pos}%` }} />
        <span className="eyebrow absolute left-3 top-3 bg-background px-2 py-1">Before</span>
        <span className="eyebrow absolute right-3 top-3 bg-background px-2 py-1">After</span>
      </div>
      <label className="mt-4 block">
        <span className="sr-only">Compare before and after</span>
        <input type="range" min={0} max={100} value={pos} onChange={(e) => setPos(+e.target.value)} className="w-full accent-[var(--gold)]" />
      </label>
      <p className="mt-2 text-xs text-muted-foreground">Illustrative example — not a client result.</p>
    </div>
  );
}

/* ---------- Creative playground ---------- */
const DIRECTIONS = {
  Minimal: { bg: "var(--sw-1)", fg: "var(--sw-2)", ac: "var(--sw-3)", font: "var(--font-sans)", weight: 300, layout: "center", tagline: "Less, but better." },
  Refined: { bg: "var(--sw-4)", fg: "var(--sw-5)", ac: "var(--sw-6)", font: "var(--font-display)", weight: 400, layout: "left", tagline: "Crafted with intention." },
  Bold: { bg: "var(--sw-8)", fg: "var(--sw-7)", ac: "var(--sw-9)", font: "Impact, 'Arial Black', sans-serif", weight: 900, layout: "stack", tagline: "LOUD. CLEAR. YOURS." },
} as const;
type Dir = keyof typeof DIRECTIONS;

export function Playground() {
  const [dir, setDir] = useState<Dir>("Refined");
  const d = DIRECTIONS[dir];
  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <p className="eyebrow">Fictional brand · “Oro Coffee”</p>
        <h3 className="mt-4 text-4xl">Pick a direction.</h3>
        <p className="mt-4 text-muted-foreground">Any single design can look good. Watch how a coherent direction changes colour, type, layout and social content all at once.</p>
        <div role="radiogroup" aria-label="Creative direction" className="mt-8 flex flex-wrap gap-2">
          {(Object.keys(DIRECTIONS) as Dir[]).map((k) => (
            <button key={k} role="radio" aria-checked={dir === k} className="chip" onClick={() => setDir(k)}>{k}</button>
          ))}
        </div>
        <div className="mt-8 flex gap-2" aria-label="Palette">
          {[d.bg, d.fg, d.ac].map((c, i) => <span key={i} className="size-10 border border-border transition-colors duration-500" style={{ background: c }} />)}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-5 lg:col-span-8">
        <div className="flex min-h-80 flex-col justify-between p-8 transition-all duration-700 sm:col-span-3" style={{ background: d.bg, color: d.fg, textAlign: d.layout === "center" ? "center" : "left", alignItems: d.layout === "center" ? "center" : "flex-start" }}>
          <span style={{ fontFamily: d.font, fontWeight: d.weight, letterSpacing: dir === "Minimal" ? "0.4em" : "0" }} className="text-sm uppercase">Oro</span>
          <div>
            <p style={{ fontFamily: d.font, fontWeight: d.weight, lineHeight: 0.95 }} className={dir === "Bold" ? "text-6xl uppercase" : "text-5xl"}>{d.tagline}</p>
            <span className="mt-6 inline-block px-4 py-2 text-xs uppercase tracking-widest" style={{ background: d.ac, color: dir === "Minimal" ? d.fg : d.bg }}>Visit the roastery</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:col-span-2" aria-label="Social media preview">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex aspect-square items-end p-3 transition-all duration-700" style={{ background: i % 3 === 0 ? d.fg : i === 1 ? d.ac : d.bg, color: i % 3 === 0 ? d.bg : d.fg, outline: "1px solid var(--border)" }}>
              <span style={{ fontFamily: d.font, fontWeight: d.weight }} className={dir === "Bold" ? "text-lg uppercase" : "text-base"}>{["Brew", "Origin", "Slow", "Daily"][i]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Social feed transform ---------- */
export function FeedTransform() {
  const [ordered, setOrdered] = useState(false);
  const chaos = ["var(--sw-9)", "var(--sw-7)", "var(--sw-3)", "var(--sw-5)", "var(--sw-8)", "var(--sw-6)", "var(--sw-1)", "var(--sw-2)", "var(--sw-4)"];
  const order = ["var(--ink)", "var(--sw-4)", "var(--gold)", "var(--sw-4)", "var(--gold)", "var(--ink)", "var(--gold)", "var(--ink)", "var(--sw-4)"];
  return (
    <div className="mx-auto max-w-md">
      <div className="grid grid-cols-3 gap-1 border border-border bg-background p-1">
        {order.map((c, i) => (
          <div key={i} className="flex aspect-square items-center justify-center transition-all duration-700" style={{ background: ordered ? c : chaos[i], transform: ordered ? "none" : `rotate(${((i * 7) % 5) - 2}deg) scale(${0.9 + (i % 3) * 0.04})`, borderRadius: ordered ? 0 : (i % 2) * 20, transitionDelay: `${i * 40}ms` }}>
            <span className="text-xs" style={{ fontFamily: ordered ? "var(--font-display)" : i % 2 ? "cursive" : "Impact", color: c === "var(--ink)" && ordered ? "var(--ivory)" : "var(--ink)" }}>{ordered ? ["N", "01", "Care", "02", "Tip", "03", "New", "04", "Q&A"][i] : ["!!", "sale", "hi", ":)", "wow", "post", "📢", "new", "..."][i]}</span>
          </div>
        ))}
      </div>
      <button type="button" className="btn btn-outline mt-6 w-full" onClick={() => setOrdered((o) => !o)} aria-pressed={ordered}>
        {ordered ? "Show the disorganised feed" : "Make it a brand ↗"}
      </button>
    </div>
  );
}

/* ---------- Campaign breakdown ---------- */
const STAGES = [
  { t: "Creative", d: "A clear, single-minded message designed to stop the scroll and speak to one specific need." },
  { t: "Audience", d: "Researched segments, each seeing a version of the message that's relevant to them." },
  { t: "Landing page", d: "The page repeats the promise from the ad and removes every obstacle to the next step." },
  { t: "Conversion", d: "Tracking confirms what actually happened, so the next round of creative is smarter." },
];
export function CampaignBreakdown() {
  const [a, setA] = useState(0);
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <ol className="border-t border-foreground">
        {STAGES.map((s, i) => (
          <li key={s.t}>
            <button type="button" onClick={() => setA(i)} aria-pressed={a === i} className={`flex w-full items-center justify-between border-b border-border py-5 text-left transition-colors ${a === i ? "text-foreground" : "text-muted-foreground"}`}>
              <span className="font-display text-3xl">{String(i + 1).padStart(2, "0")} {s.t}</span>
              <span className={`h-px transition-all duration-500 ${a === i ? "w-16 bg-gold" : "w-4 bg-border"}`} />
            </button>
          </li>
        ))}
      </ol>
      <div key={a} className="fade-up bg-card p-8">
        <p className="eyebrow">Step {a + 1} of 4</p>
        <h3 className="mt-4 text-5xl">{STAGES[a]!.t}</h3>
        <p className="mt-4 text-muted-foreground">{STAGES[a]!.d}</p>
        <div className="mt-8 flex gap-1" aria-hidden>{STAGES.map((_, i) => <span key={i} className={`h-1 flex-1 ${i <= a ? "bg-gold" : "bg-border"}`} />)}</div>
      </div>
    </div>
  );
}

/* ---------- Brand preview (type + palette) ---------- */
const FONTS = [
  { label: "Editorial serif", v: "var(--font-display)" },
  { label: "Modern sans", v: "var(--font-sans)" },
  { label: "Condensed", v: "Impact, 'Arial Narrow', sans-serif" },
];
const PALETTES = [
  { label: "Ivory & ink", bg: "var(--sw-1)", fg: "var(--sw-2)", ac: "var(--sw-6)" },
  { label: "Forest", bg: "var(--sw-4)", fg: "var(--sw-5)", ac: "var(--sw-6)" },
  { label: "Night & signal", bg: "var(--sw-8)", fg: "var(--sw-1)", ac: "var(--sw-9)" },
];
export function BrandPreview() {
  const [f, setF] = useState(0);
  const [p, setP] = useState(0);
  const pal = PALETTES[p]!;
  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="space-y-8 lg:col-span-4">
        <fieldset><legend className="eyebrow mb-3">Typography</legend>
          <div role="radiogroup" className="flex flex-wrap gap-2">{FONTS.map((x, i) => <button key={x.label} role="radio" aria-checked={f === i} className="chip" onClick={() => setF(i)}>{x.label}</button>)}</div>
        </fieldset>
        <fieldset><legend className="eyebrow mb-3">Colour palette</legend>
          <div role="radiogroup" className="flex flex-wrap gap-2">{PALETTES.map((x, i) => <button key={x.label} role="radio" aria-checked={p === i} className="chip" onClick={() => setP(i)}>{x.label}</button>)}</div>
        </fieldset>
      </div>
      <div className="grid min-h-80 gap-6 p-8 transition-all duration-700 sm:grid-cols-2 lg:col-span-8" style={{ background: pal.bg, color: pal.fg, fontFamily: FONTS[f]!.v }}>
        <div className="flex flex-col justify-between">
          <span className="text-sm uppercase tracking-[0.3em]">Maison Alba</span>
          <p className="text-5xl leading-none">Made to be remembered.</p>
        </div>
        <div className="flex flex-col justify-end gap-3">
          <span className="h-24 w-full" style={{ background: pal.ac }} />
          <span className="text-sm opacity-80">Aa Bb Cc 0123 — Sample identity</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- Website before/after toggle ---------- */
export function WebsiteToggle() {
  const [after, setAfter] = useState(false);
  return (
    <div>
      <div role="radiogroup" aria-label="Website version" className="mb-6 inline-flex border border-foreground">
        {["Before", "After"].map((l, i) => (
          <button key={l} role="radio" aria-checked={after === !!i} onClick={() => setAfter(!!i)} className={`px-6 py-2 text-sm transition-colors ${after === !!i ? "bg-foreground text-background" : ""}`}>{l}</button>
        ))}
      </div>
      <div className="overflow-hidden border border-border">
        <div className="flex items-center gap-1.5 border-b border-border bg-muted px-4 py-2" aria-hidden><span className="size-2.5 rounded-full bg-border" /><span className="size-2.5 rounded-full bg-border" /><span className="size-2.5 rounded-full bg-border" /></div>
        {after ? (
          <div key="a" className="fade-up grid min-h-80 gap-6 bg-ivory p-8 md:grid-cols-2">
            <div className="flex flex-col justify-between">
              <div className="flex justify-between text-xs uppercase tracking-widest"><span>Studio</span><span>Work · About · Contact</span></div>
              <div><p className="font-display text-5xl leading-none">Spaces that feel like you.</p><span className="btn btn-primary mt-6 pointer-events-none">Book a consultation</span></div>
            </div>
            <div className="min-h-48 bg-ink" />
          </div>
        ) : (
          <div key="b" className="fade-up min-h-80 bg-muted p-6 text-center" style={{ fontFamily: "Arial, sans-serif" }}>
            <div className="flex flex-wrap justify-center gap-2 text-xs underline">{["Home", "About Us", "Our Services", "Gallery", "Testimonials", "Blog", "FAQ", "Contact"].map((x) => <span key={x}>{x}</span>)}</div>
            <p className="mt-6 text-2xl font-bold" style={{ color: "var(--sw-9)" }}>WELCOME TO OUR WEBSITE!!!</p>
            <p className="mx-auto mt-3 max-w-md text-xs">We are a leading provider of quality services with many years of experience in the industry offering a wide range of solutions for all your needs...</p>
            <div className="mt-4 grid grid-cols-4 gap-1">{[1, 2, 3, 4].map((i) => <div key={i} className="h-16" style={{ background: ["var(--sw-7)", "var(--sw-3)", "var(--sw-5)", "var(--sw-9)"][i - 1] }} />)}</div>
            <p className="mt-4 text-[10px]">Click here to learn more | Call us | Email us | Find us</p>
          </div>
        )}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">Illustrative example. <Link to="/work" className="link-underline">See our work</Link>.</p>
    </div>
  );
}
