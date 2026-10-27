import { Link } from "@tanstack/react-router";
import { SERVICES, SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-32 bg-ink text-ivory">
      <div className="container-x grid gap-12 py-20 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-sans text-2xl font-semibold tracking-[0.2em]">NEXLYF<sup className="text-[0.5em] text-gold">®</sup></p>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ivory/65">
            A creative growth studio combining strategy, design, content and technology to help businesses build stronger digital brands.
          </p>
          <Link to="/contact" className="mt-8 inline-block font-display text-4xl text-gold link-underline md:text-5xl">Start a project ↗</Link>
          {SITE.email && <p className="mt-6 text-sm"><a className="link-underline" href={`mailto:${SITE.email}`}>{SITE.email}</a></p>}
        </div>
        <nav aria-label="Footer" className="md:col-span-2">
          <p className="eyebrow text-ivory/50">Studio</p>
          <ul className="mt-5 space-y-3 text-sm">
            <li><Link to="/" className="link-underline">Home</Link></li>
            <li><Link to="/work" className="link-underline">Work</Link></li>
            <li><Link to="/about" className="link-underline">About</Link></li>
            <li><Link to="/brand-diagnosis" className="link-underline">Brand Diagnosis</Link></li>
            <li><Link to="/contact" className="link-underline">Contact</Link></li>
          </ul>
        </nav>
        <nav aria-label="Services" className="md:col-span-3">
          <p className="eyebrow text-ivory/50">Services</p>
          <ul className="mt-5 space-y-3 text-sm">
            {SERVICES.map((s) => (
              <li key={s.slug}><Link to="/services/$slug" params={{ slug: s.slug }} className="link-underline">{s.name}</Link></li>
            ))}
          </ul>
        </nav>
        {SITE.socials.length > 0 && (
          <div className="md:col-span-2">
            <p className="eyebrow text-ivory/50">Follow</p>
            <ul className="mt-5 space-y-3 text-sm">
              {SITE.socials.map((s) => <li key={s.url}><a href={s.url} target="_blank" rel="noreferrer" className="link-underline">{s.label}</a></li>)}
            </ul>
          </div>
        )}
      </div>
      <div className="container-x flex flex-col justify-between gap-3 border-t border-ivory/15 py-6 text-xs text-ivory/50 sm:flex-row">
        <p>© {new Date().getFullYear()} NEXLYF. All rights reserved.</p>
        <div className="flex gap-6">
          <Link to="/privacy" className="link-underline">Privacy Policy</Link>
          <Link to="/terms" className="link-underline">Terms & Conditions</Link>
        </div>
      </div>
    </footer>
  );
}
