import { useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { enquirySchema, type EnquiryInput } from "@/lib/enquiry";
import { BUDGETS, SERVICES } from "@/lib/site";

type Errors = Partial<Record<keyof EnquiryInput, string>>;
const empty: EnquiryInput = { name: "", business_name: "", email: "", whatsapp: "", services: [], budget: "", description: "" };

export function EnquiryForm({ preselected }: { preselected?: string | undefined }) {
  const pre = SERVICES.find((s) => s.slug === preselected)?.name;
  const [v, setV] = useState<EnquiryInput>({ ...empty, services: pre ? [pre] : [] });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [hp, setHp] = useState("");
  const startedAt = useRef(Date.now());
  const inFlight = useRef(false);

  const set = <K extends keyof EnquiryInput>(k: K, val: EnquiryInput[K]) => {
    setV((p) => ({ ...p, [k]: val }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };
  const toggle = (name: string) => set("services", v.services.includes(name) ? v.services.filter((s) => s !== name) : [...v.services, name]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (inFlight.current || status === "success") return;
    const parsed = enquirySchema.safeParse(v);
    if (!parsed.success) {
      const errs: Errors = {};
      for (const i of parsed.error.issues) errs[i.path[0] as keyof EnquiryInput] ??= i.message;
      setErrors(errs);
      document.getElementById(`f-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    // Spam: honeypot filled or submitted faster than a human could type.
    if (hp || Date.now() - startedAt.current < 2500) { setStatus("success"); return; }
    inFlight.current = true;
    setStatus("loading");
    const d = parsed.data;
    const { error } = await supabase.from("enquiries").insert({ ...d, whatsapp: d.whatsapp || null });
    inFlight.current = false;
    setStatus(error ? "error" : "success");
  }

  if (status === "success") {
    return (
      <div role="status" className="fade-up border-t border-foreground pt-10">
        <p className="eyebrow text-gold">Enquiry received</p>
        <h2 className="mt-4 text-5xl">Thank you, {v.name.split(" ")[0] || "friend"}.</h2>
        <p className="mt-4 max-w-md text-muted-foreground">Your project details have been saved. We'll review them and get back to you at {v.email}.</p>
      </div>
    );
  }

  const err = (k: keyof EnquiryInput) => errors[k] && <p id={`e-${k}`} className="mt-2 text-sm text-destructive">{errors[k]}</p>;
  const aria = (k: keyof EnquiryInput) => ({ id: `f-${k}`, "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `e-${k}` : undefined });

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-8 md:grid-cols-2">
      <div className="hidden" aria-hidden="true">
        <label>Website<input tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} /></label>
      </div>
      <label className="block"><span className="eyebrow">Name *</span><input className="field" autoComplete="name" value={v.name} onChange={(e) => set("name", e.target.value)} {...aria("name")} />{err("name")}</label>
      <label className="block"><span className="eyebrow">Business name *</span><input className="field" autoComplete="organization" value={v.business_name} onChange={(e) => set("business_name", e.target.value)} {...aria("business_name")} />{err("business_name")}</label>
      <label className="block"><span className="eyebrow">Email *</span><input className="field" type="email" autoComplete="email" value={v.email} onChange={(e) => set("email", e.target.value)} {...aria("email")} />{err("email")}</label>
      <label className="block"><span className="eyebrow">WhatsApp number (optional)</span><input className="field" type="tel" autoComplete="tel" placeholder="+91" value={v.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} {...aria("whatsapp")} />{err("whatsapp")}</label>

      <fieldset className="md:col-span-2" aria-describedby={errors.services ? "e-services" : undefined}>
        <legend className="eyebrow mb-4">Required services *</legend>
        <div className="flex flex-wrap gap-2" id="f-services" tabIndex={-1}>
          {SERVICES.map((s) => (
            <button type="button" key={s.slug} className="chip" aria-pressed={v.services.includes(s.name)} onClick={() => toggle(s.name)}>{s.name}</button>
          ))}
        </div>
        {err("services")}
      </fieldset>

      <fieldset className="md:col-span-2">
        <legend className="eyebrow mb-4">Approximate budget *</legend>
        <div className="flex flex-wrap gap-2" role="radiogroup" id="f-budget" tabIndex={-1}>
          {BUDGETS.map((b) => (
            <button type="button" role="radio" key={b} className="chip" aria-checked={v.budget === b} onClick={() => set("budget", b)}>{b}</button>
          ))}
        </div>
        {err("budget")}
      </fieldset>

      <label className="block md:col-span-2"><span className="eyebrow">Project description *</span>
        <textarea className="field min-h-36 resize-y" value={v.description} onChange={(e) => set("description", e.target.value)} {...aria("description")} placeholder="What are you looking to achieve?" />{err("description")}
      </label>

      <div className="flex flex-col gap-4 md:col-span-2 sm:flex-row sm:items-center">
        <button type="submit" className="btn btn-primary" disabled={status === "loading"}>
          {status === "loading" ? "Sending…" : "Send enquiry ↗"}
        </button>
        {status === "error" && <p role="alert" className="text-sm text-destructive">Your enquiry could not be sent. Please check your connection and try again.</p>}
      </div>
    </form>
  );
}
