import { z } from "zod";
import { districts } from "./catalog";

/** Accepts 01XXXXXXXXX, 8801XXXXXXXXX or +8801XXXXXXXXX (spaces/dashes ignored). */
export const BD_MOBILE = /^(?:\+?880|0)1[3-9]\d{8}$/;

export function normalizePhone(raw: string) {
  const digits = raw.replace(/[\s-]/g, "");
  const m = digits.match(/1[3-9]\d{8}$/);
  return m ? `+880${m[0]}` : digits;
}

const phone = z
  .string()
  .trim()
  .transform((v) => v.replace(/[\s-]/g, ""))
  .refine((v) => BD_MOBILE.test(v), "Enter a valid Bangladeshi mobile number, e.g. 01712345678")
  .transform(normalizePhone);

const optionalEmail = z
  .string()
  .trim()
  .max(200)
  .refine((v) => v === "" || z.email().safeParse(v).success, "Enter a valid email or leave it blank")
  .optional()
  .transform((v) => v || undefined);

const text = (max: number) => z.string().trim().max(max).optional().transform((v) => v || undefined);

const consent = z
  .literal("on", { error: "Please agree so we can contact you about this request" })
  .transform(() => true);

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(120),
  phone,
  email: optionalEmail,
  message: z.string().trim().min(5, "Tell us a little about what you need").max(4000),
  consent,
});

const signConfigSchema = z.object({
  productSlug: z.string().max(100),
  presetId: z.string().max(50).optional(),
  widthMm: z.number().positive().max(100000),
  heightMm: z.number().positive().max(100000),
  quantity: z.number().int().min(1).max(500),
  material: z.string().max(50),
  thickness: z.string().max(50).optional(),
  lighting: z.string().max(50),
  mounting: z.string().max(50),
  finish: z.string().max(50),
  color: z.string().max(100).optional(),
  designSupport: z.boolean(),
  installation: z.boolean(),
  notes: z.string().max(2000).optional(),
});

export const quoteSchema = z.object({
  kind: z.enum(["product", "custom", "project"]),
  name: z.string().trim().min(2, "Enter your name").max(120),
  phone,
  email: optionalEmail,
  company: text(200),
  district: z.enum(districts as [string, ...string[]], { error: "Select a district" }),
  area: text(200),
  address: text(500),
  // site details (blueprint §4B step 7, §8 step 4)
  wallType: text(100),
  floor: text(100),
  access: text(500),
  power: z.enum(["yes", "no", "unsure", ""]).optional().transform((v) => v || undefined),
  deadline: text(50),
  // multi-outlet projects (blueprint §4C)
  industry: text(100),
  outlets: z.coerce.number().int().min(1).max(1000).optional().catch(undefined),
  budget: text(100),
  siteSurvey: z.literal("on").optional().transform((v) => v === "on"),
  message: text(4000),
  config: z
    .string()
    .optional()
    .transform((v, ctx) => {
      if (!v) return undefined;
      try {
        return signConfigSchema.parse(JSON.parse(v));
      } catch {
        ctx.addIssue({ code: "custom", message: "Sign configuration is invalid — please review it." });
        return z.NEVER;
      }
    }),
  consent,
});

export const cartItemSchema = z.object({
  id: z.string().max(64),
  config: signConfigSchema,
});

export const orderSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(120),
  phone,
  email: optionalEmail,
  company: text(200),
  fulfilment: z.enum(["delivery", "installation"], { error: "Choose delivery or installation" }),
  district: z.enum(districts as [string, ...string[]], { error: "Select a district" }),
  area: z.string().trim().min(2, "Enter your upazila / area").max(200),
  address: z.string().trim().min(5, "Enter your detailed address").max(500),
  notes: text(2000),
  items: z.string().transform((v, ctx) => {
    try {
      const parsed = z.array(cartItemSchema).min(1).max(50).parse(JSON.parse(v));
      return parsed;
    } catch {
      ctx.addIssue({ code: "custom", message: "Your cart is empty or invalid." });
      return z.NEVER;
    }
  }),
  idempotencyKey: z.string().min(8).max(64),
  terms: z.literal("on", { error: "Please accept the order terms" }).transform(() => true),
});

export type FieldErrors = Record<string, string>;

export function fieldErrors(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}

export const ARTWORK_TYPES = [".ai", ".eps", ".svg", ".pdf", ".png", ".jpg", ".jpeg"];
export const ARTWORK_MAX_BYTES = 15 * 1024 * 1024;
export const ARTWORK_MAX_FILES = 3;
