import { describe, expect, it } from "vitest";
import { recommend } from "@/lib/diagnosis";
import { enquirySchema } from "@/lib/enquiry";

describe("brand diagnosis", () => {
  it("returns null until all four answers are given", () => {
    expect(recommend({ business: "Healthcare", challenge: "Weak branding", stage: "Just starting" })).toBeNull();
  });
  it("leads with the service mapped to the main challenge", () => {
    const r = recommend({ business: "Other", challenge: "Poor website conversion", stage: "Growing but inconsistent", support: "Branding" });
    expect(r?.services[0]).toBe("website-development");
    expect(r?.services).toContain("branding");
  });
  it("complete growth solution recommends all four services", () => {
    const r = recommend({ business: "Other", challenge: "Weak branding", stage: "Growing but inconsistent", support: "Complete Growth Solution" });
    expect(r?.services).toHaveLength(4);
  });
});

describe("enquiry validation", () => {
  const ok = { name: "A", business_name: "B", email: "a@b.co", whatsapp: "", services: ["Branding"], budget: "Not sure yet", description: "Need a new brand" };
  it("accepts a valid enquiry with no WhatsApp", () => expect(enquirySchema.safeParse(ok).success).toBe(true));
  it("rejects invalid email", () => expect(enquirySchema.safeParse({ ...ok, email: "nope" }).success).toBe(false));
  it("rejects invalid phone", () => expect(enquirySchema.safeParse({ ...ok, whatsapp: "abc" }).success).toBe(false));
  it("requires a service", () => expect(enquirySchema.safeParse({ ...ok, services: [] }).success).toBe(false));
});
