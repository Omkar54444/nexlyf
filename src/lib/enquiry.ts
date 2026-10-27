import { z } from "zod";

export const enquirySchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(120, "Name is too long"),
  business_name: z.string().trim().min(1, "Please enter your business name").max(160, "Business name is too long"),
  email: z.string().trim().min(1, "Please enter your email").email("Please enter a valid email address").max(255),
  whatsapp: z
    .string()
    .trim()
    .max(25)
    .refine((v) => v === "" || /^\+?[0-9\s-]{7,20}$/.test(v), "Enter a valid number, e.g. +91 98765 43210"),
  services: z.array(z.string()).min(1, "Select at least one service"),
  budget: z.string().min(1, "Please choose an approximate budget"),
  description: z.string().trim().min(10, "Tell us a little more (at least 10 characters)").max(4000, "Please keep it under 4000 characters"),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
