import welljanhit from "@/assets/work-welljanhit.jpg";
import rathanchal from "@/assets/work-rathanchal.jpg";
import website from "@/assets/work-website.jpg";

/**
 * Agency contact details. Leave a value empty to hide it everywhere on the site.
 * Social links only render when a real URL is filled in.
 */
export const SITE = {
  name: "NEXLYF",
  email: "",
  phone: "",
  whatsapp: "",
  address: "",
  socials: [] as { label: string; url: string }[],
};

export type ServiceSlug = "social-media-management" | "digital-marketing" | "branding" | "website-development";

export type Service = {
  slug: ServiceSlug;
  name: string;
  short: string;
  headline: string;
  intro: string;
  deliverables: string[];
  process: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
  workCategory: WorkCategory;
};

export const SERVICES: Service[] = [
  {
    slug: "social-media-management",
    name: "Social Media Management",
    short: "Strategy, content and management that make your feed recognisable.",
    headline: "More than posts. A recognizable brand.",
    intro:
      "We plan, produce and manage social content that looks and sounds like one brand — so every post builds on the last instead of starting over.",
    deliverables: [
      "Social media strategy",
      "Monthly content planning",
      "Reels and short-form video",
      "Static posts and carousels",
      "Creative direction",
      "Social media account management",
      "Performance reporting",
    ],
    process: [
      { title: "Audit", text: "Review your current channels, audience and competitors." },
      { title: "Plan", text: "Define pillars, tone and a monthly content calendar." },
      { title: "Produce", text: "Shoot, design and edit content to a consistent system." },
      { title: "Report", text: "Track what matters and refine each month." },
    ],
    faqs: [
      { q: "Which platforms do you manage?", a: "Mainly Instagram, Facebook and LinkedIn. We recommend platforms based on where your audience actually is." },
      { q: "Do you shoot content too?", a: "Yes. We handle creative direction and production for photo and short-form video as part of the plan." },
      { q: "How do approvals work?", a: "You receive each month's calendar in advance and approve it before anything is published." },
    ],
    workCategory: "social",
  },
  {
    slug: "digital-marketing",
    name: "Digital Marketing",
    short: "Campaigns where creative, audience and landing page work as one.",
    headline: "Creativity with a purpose.",
    intro:
      "Good marketing is not louder ads. It is the right message, in front of the right people, leading to a page that makes the next step obvious.",
    deliverables: [
      "Marketing strategy",
      "Paid advertising",
      "Audience research",
      "Creative testing",
      "Landing page optimization",
      "Conversion tracking",
      "Performance analysis",
    ],
    process: [
      { title: "Research", text: "Understand the audience, offer and buying journey." },
      { title: "Build", text: "Create ad concepts, audiences and the landing experience." },
      { title: "Test", text: "Run controlled creative and audience tests." },
      { title: "Optimise", text: "Shift budget toward what measurably works." },
    ],
    faqs: [
      { q: "Do you guarantee results?", a: "No honest agency can. We commit to a clear process, transparent reporting and continuous improvement." },
      { q: "What ad budget do I need?", a: "It depends on your goals and market. We'll recommend a realistic starting budget after the discovery call." },
      { q: "Is the ad spend included in your fee?", a: "No. Ad spend is paid directly to the platforms; our fee covers strategy, creative and management." },
    ],
    workCategory: "campaigns",
  },
  {
    slug: "branding",
    name: "Branding & Creative Strategy",
    short: "Positioning and identity systems that make you unmistakable.",
    headline: "Make your brand impossible to confuse.",
    intro:
      "A brand is more than a logo. We define what you stand for, then build the visual and verbal system that expresses it the same way everywhere.",
    deliverables: [
      "Brand positioning",
      "Visual identity",
      "Creative direction",
      "Typography and colour systems",
      "Campaign concepts",
      "Brand communication",
      "Social media visual systems",
    ],
    process: [
      { title: "Discover", text: "Workshops to understand your business, audience and ambition." },
      { title: "Position", text: "Define the idea, personality and message hierarchy." },
      { title: "Design", text: "Build the identity: mark, type, colour, imagery, layout." },
      { title: "Guide", text: "Deliver guidelines and templates your team can use." },
    ],
    faqs: [
      { q: "Can you refresh an existing brand?", a: "Yes. Many projects are an evolution, keeping the equity you've built while fixing what isn't working." },
      { q: "What files do I receive?", a: "Logo files in all formats, colour and type specs, guidelines, and agreed templates." },
      { q: "How long does a branding project take?", a: "Typically several weeks, depending on scope. We'll share a timeline before starting." },
    ],
    workCategory: "branding",
  },
  {
    slug: "website-development",
    name: "Website Development",
    short: "Fast, considered websites designed to turn visits into enquiries.",
    headline: "Built to look good. Designed to work.",
    intro:
      "We design and build websites with a clear structure, strong content and a performance-first build — so they look premium and help people take action.",
    deliverables: [
      "Business websites",
      "E-commerce websites",
      "Landing pages",
      "UI/UX design",
      "Responsive development",
      "Website performance optimization",
    ],
    process: [
      { title: "Structure", text: "Sitemap, user journeys and content planning." },
      { title: "Design", text: "Wireframes, then high-fidelity design across devices." },
      { title: "Develop", text: "Responsive, accessible, performance-minded build." },
      { title: "Launch", text: "Testing, launch support and handover." },
    ],
    faqs: [
      { q: "Will I be able to update the website?", a: "Yes. We set up an editing workflow that fits your team and show you how to use it." },
      { q: "Do you build online stores?", a: "Yes, from small catalogues to full e-commerce experiences." },
      { q: "Is the website mobile friendly?", a: "Every site is designed and tested across mobile, tablet and desktop." },
    ],
    workCategory: "websites",
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);

export type WorkCategory = "social" | "branding" | "websites" | "campaigns";
export const WORK_FILTERS: { id: "all" | WorkCategory; label: string }[] = [
  { id: "all", label: "All Work" },
  { id: "social", label: "Social Media" },
  { id: "branding", label: "Branding" },
  { id: "websites", label: "Websites" },
  { id: "campaigns", label: "Campaigns" },
];

export type Project = {
  slug: string;
  name: string;
  client: string;
  categories: WorkCategory[];
  description: string;
  cover: string;
  tags: string[];
  isSample: boolean;
  overview: string;
  challenge: string;
  strategy: string;
  creative: string;
  execution: string;
  deliverables: string[];
  results: string | null;
};

export const PROJECTS: Project[] = [
  {
    slug: "well-janhit-chemist",
    name: "Well Janhit Chemist",
    client: "Well Janhit Chemist",
    categories: ["social", "branding"],
    description: "A trustworthy, approachable social presence for a neighbourhood pharmacy.",
    cover: welljanhit,
    tags: ["Social Media", "Creative Direction", "Brand System"],
    isSample: false,
    overview:
      "Well Janhit Chemist is a local pharmacy. The goal was a social presence that feels as dependable and caring as the service in store.",
    challenge:
      "Healthcare content easily becomes either clinical or cluttered. The pharmacy needed a calm, consistent voice that people would recognise and trust.",
    strategy:
      "Content pillars around everyday health awareness, product guidance and store updates, with a clear monthly rhythm.",
    creative:
      "A restrained palette, generous whitespace and simple typographic templates so information is easy to read at a glance.",
    execution:
      "Monthly calendars, post and carousel templates, and short-form content planned around seasonal health needs.",
    deliverables: ["Content pillars", "Post & carousel templates", "Monthly calendar", "Creative direction"],
    results: null,
  },
  {
    slug: "rathanchal",
    name: "Rathanchal",
    client: "Rathanchal",
    categories: ["branding", "social"],
    description: "A warm, heritage-led identity and visual language.",
    cover: rathanchal,
    tags: ["Branding", "Visual Identity", "Social Visual System"],
    isSample: false,
    overview:
      "Rathanchal needed an identity that honours its roots while feeling current and premium across print and digital.",
    challenge:
      "Balancing tradition and modernity without falling into cliché, and keeping the system consistent across many touchpoints.",
    strategy:
      "Position the brand around craft and warmth, expressed through earthy colour, considered typography and tactile materials.",
    creative:
      "Terracotta and champagne tones, refined serif typography and a simple ornament used sparingly as a signature.",
    execution:
      "Identity elements, stationery direction and a social media visual system for consistent everyday content.",
    deliverables: ["Identity direction", "Colour & type system", "Stationery", "Social templates"],
    results: null,
  },
  {
    slug: "studio-website-concept",
    name: "Interior Studio Website",
    client: "Sample concept",
    categories: ["websites"],
    description: "Sample concept: an editorial portfolio website for an interior design studio.",
    cover: website,
    tags: ["UI/UX", "Website Development"],
    isSample: true,
    overview: "A self-initiated sample concept showing how we approach a portfolio website for a design-led business.",
    challenge: "Portfolio sites often bury the work under navigation and stock copy, and lose visitors on mobile.",
    strategy: "Lead with the work, keep navigation minimal and make enquiring a single clear step from every page.",
    creative: "A dark, gallery-like interface with large imagery and a refined serif headline system.",
    execution: "Responsive layouts, lazy-loaded imagery and a short enquiry form designed for mobile first.",
    deliverables: ["Sitemap", "UI design", "Responsive build plan"],
    results: null,
  },
  {
    slug: "launch-campaign-concept",
    name: "Product Launch Campaign",
    client: "Sample concept",
    categories: ["campaigns", "social"],
    description: "Sample concept: an integrated launch campaign connecting ads, social and landing page.",
    cover: welljanhit,
    tags: ["Digital Marketing", "Campaign Concept", "Landing Page"],
    isSample: true,
    overview: "A sample concept demonstrating how creative, audience and landing page are planned as one system.",
    challenge: "Launch campaigns often split ads, social and website across teams, so the message breaks at each step.",
    strategy: "One core idea, adapted per audience segment, landing on a page that repeats the same promise.",
    creative: "A modular visual system that works across stories, feed posts and the landing page hero.",
    execution: "Ad variations for testing, a content calendar and a landing page structure with conversion tracking.",
    deliverables: ["Campaign idea", "Ad variations", "Landing page wireframe", "Tracking plan"],
    results: null,
  },
  {
    slug: "boutique-identity-concept",
    name: "Boutique Identity",
    client: "Sample concept",
    categories: ["branding"],
    description: "Sample concept: an identity refresh for a boutique retail brand.",
    cover: rathanchal,
    tags: ["Brand Positioning", "Typography & Colour"],
    isSample: true,
    overview: "A sample concept exploring how a retail brand can become instantly recognisable through a tight system.",
    challenge: "Inconsistent signage, packaging and social made the brand feel smaller than the product.",
    strategy: "Define one personality and apply it rigorously across every touchpoint.",
    creative: "A reduced palette, one typeface family and a recurring graphic device.",
    execution: "Identity guidelines and templates for packaging, signage and social.",
    deliverables: ["Positioning", "Identity system", "Guidelines"],
    results: null,
  },
];

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);

export const BUDGETS = ["Under ₹50,000", "₹50,000 – ₹1,50,000", "₹1,50,000 – ₹5,00,000", "Above ₹5,00,000", "Not sure yet"];
