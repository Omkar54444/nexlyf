import type { ServiceSlug } from "./site";

export const QUESTIONS = [
  {
    id: "business",
    title: "What best describes your business?",
    options: ["E-commerce", "Retail or local business", "Healthcare", "Personal brand", "Service business", "Other"],
  },
  {
    id: "challenge",
    title: "What is your biggest challenge?",
    options: [
      "Low social media growth",
      "Weak branding",
      "Inconsistent content",
      "Poor website conversion",
      "Lack of marketing strategy",
    ],
  },
  {
    id: "stage",
    title: "What stage is your business at?",
    options: ["Just starting", "Growing but inconsistent", "Established and ready to scale"],
  },
  {
    id: "support",
    title: "What support do you need?",
    options: ["Social Media Management", "Digital Marketing", "Branding", "Website Development", "Complete Growth Solution"],
  },
] as const;

export type Answers = Partial<Record<(typeof QUESTIONS)[number]["id"], string>>;

const CHALLENGE: Record<string, { piece: string; explain: string; service: ServiceSlug }> = {
  "Low social media growth": {
    piece: "A recognisable social presence",
    explain: "Growth usually stalls when content doesn't give people a reason to remember or follow you. A clear content system fixes that before more posting does.",
    service: "social-media-management",
  },
  "Weak branding": {
    piece: "A clear brand identity",
    explain: "When positioning and visuals are unclear, every channel works harder for less. A defined brand makes everything else more effective.",
    service: "branding",
  },
  "Inconsistent content": {
    piece: "A consistent content system",
    explain: "Inconsistency comes from the lack of a plan and a visual system, not a lack of effort. Pillars, templates and a calendar solve it.",
    service: "social-media-management",
  },
  "Poor website conversion": {
    piece: "A website that guides action",
    explain: "Visitors leave when the page doesn't answer their questions or make the next step obvious. Structure and clarity matter more than decoration.",
    service: "website-development",
  },
  "Lack of marketing strategy": {
    piece: "A focused marketing direction",
    explain: "Without a strategy, activity becomes scattered. Defining audience, message and channels gives every effort a purpose.",
    service: "digital-marketing",
  },
};

const SUPPORT: Record<string, ServiceSlug[]> = {
  "Social Media Management": ["social-media-management"],
  "Digital Marketing": ["digital-marketing"],
  Branding: ["branding"],
  "Website Development": ["website-development"],
  "Complete Growth Solution": ["branding", "social-media-management", "digital-marketing", "website-development"],
};

export type Recommendation = { piece: string; explain: string; services: ServiceSlug[]; reasons: string[] };

export function recommend(a: Answers): Recommendation | null {
  if (!a.business || !a.challenge || !a.stage || !a.support) return null;
  const c = CHALLENGE[a.challenge];
  if (!c) return null;
  const services: ServiceSlug[] = [c.service];
  for (const s of SUPPORT[a.support] ?? []) if (!services.includes(s)) services.push(s);
  if (a.stage === "Just starting" && !services.includes("branding")) services.push("branding");
  if (a.stage === "Established and ready to scale" && !services.includes("digital-marketing")) services.push("digital-marketing");

  const reasons = [
    `Your main challenge — ${a.challenge.toLowerCase()} — points first to ${c.piece.toLowerCase()}.`,
    `You asked for support with ${a.support.toLowerCase()}, so we've included it in the mix.`,
  ];
  if (a.stage === "Just starting") reasons.push("At an early stage, a solid brand foundation prevents costly redesigns later.");
  if (a.stage === "Growing but inconsistent") reasons.push("For a growing business, consistency is what turns momentum into recognition.");
  if (a.stage === "Established and ready to scale") reasons.push("Ready to scale means it's time for structured, measurable marketing.");
  if (a.business === "Healthcare") reasons.push("For healthcare, trust and clarity should lead every piece of communication.");
  if (a.business === "E-commerce") reasons.push("For e-commerce, every touchpoint should lead clearly toward the product page.");
  return { piece: c.piece, explain: c.explain, services, reasons };
}
