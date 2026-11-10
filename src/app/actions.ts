"use server";

import { randomUUID } from "node:crypto";
import { getProduct } from "@/lib/catalog";
import { priceConfig, validateConfig } from "@/lib/pricing";
import { rateLimit } from "@/lib/server/rate-limit";
import { findRecord, makeReference, saveRecord, storeArtwork } from "@/lib/server/store";
import type { z } from "zod";
import { contactSchema, fieldErrors, orderSchema, quoteSchema, type FieldErrors } from "@/lib/validation";

export type FormState = {
  status: "idle" | "error" | "success";
  message?: string;
  errors?: FieldErrors;
  reference?: string;
  /** Echo of submitted text fields so the form keeps its values after an error. */
  values?: Record<string, string>;
};

function textValues(fd: FormData) {
  const out: Record<string, string> = {};
  for (const [k, v] of fd.entries()) if (typeof v === "string" && k !== "config" && k !== "items") out[k] = v;
  // Unique per response: forms use it as a `key` to remount with these values
  // (React's automatic form reset would otherwise clear <select> fields).
  out.__attempt = randomUUID();
  return out;
}

/** Error result with an accessible summary, so errors on any field are always visible. */
function invalid(error: z.ZodError, values: Record<string, string>): FormState {
  const errors = fieldErrors(error);
  const list = Object.values(errors);
  return {
    status: "error",
    errors,
    values,
    message: `Please fix ${list.length === 1 ? "this" : `these ${list.length}`}: ${list.join(" · ")}`,
  };
}

/** Bots fill the hidden "website" field; pretend success without storing anything. */
function isBot(fd: FormData) {
  return typeof fd.get("website") === "string" && String(fd.get("website")).length > 0;
}

const TOO_MANY: FormState = {
  status: "error",
  message: "Too many submissions from your connection. Please wait a few minutes or contact us directly.",
};

export async function submitContact(_prev: FormState, fd: FormData): Promise<FormState> {
  if (isBot(fd)) return { status: "success", reference: "—" };
  const values = textValues(fd);
  const parsed = contactSchema.safeParse(values);
  if (!parsed.success) return invalid(parsed.error, values);
  if (!(await rateLimit("contact"))) return { ...TOO_MANY, values };

  const reference = makeReference("C");
  await saveRecord("contacts", { reference, status: "new", ...parsed.data });
  return { status: "success", reference };
}

export async function submitQuote(_prev: FormState, fd: FormData): Promise<FormState> {
  if (isBot(fd)) return { status: "success", reference: "—" };
  const values = textValues(fd);
  const parsed = quoteSchema.safeParse({ ...values, config: fd.get("config") ?? undefined });
  if (!parsed.success) return invalid(parsed.error, values);
  if (!(await rateLimit("quote"))) return { ...TOO_MANY, values };

  const { config, ...lead } = parsed.data;

  // Never trust the client estimate: re-validate and re-price on the server.
  let estimate = null;
  if (config) {
    const product = getProduct(config.productSlug);
    if (!product) return { status: "error", message: "Unknown product.", values };
    const problems = validateConfig(product, config);
    if (problems.length) return { status: "error", message: problems.join(" "), values };
    estimate = priceConfig(config);
  }

  const art = await storeArtwork(fd.getAll("artwork") as File[]);
  if (!art.ok) return { status: "error", errors: { artwork: art.error }, values };

  const reference = makeReference("Q");
  // Quote lifecycle (§8): submitted → reviewing → needs_info → quoted → accepted/rejected/expired → …
  await saveRecord("quotes", {
    reference,
    status: "submitted",
    revision: 0,
    ...lead,
    config,
    estimateSnapshot: estimate,
    artwork: art.files,
  });
  return { status: "success", reference };
}

export async function submitOrder(_prev: FormState, fd: FormData): Promise<FormState> {
  if (isBot(fd)) return { status: "success", reference: "—" };
  const values = textValues(fd);
  const parsed = orderSchema.safeParse({ ...values, items: fd.get("items") ?? "" });
  if (!parsed.success) return invalid(parsed.error, values);

  // Idempotency: a resubmitted checkout returns the original order.
  const existing = await findRecord("orders", (r) => r.idempotencyKey === parsed.data.idempotencyKey);
  if (existing) return { status: "success", reference: String(existing.reference) };

  if (!(await rateLimit("order"))) return { ...TOO_MANY, values };

  const { items, ...customer } = parsed.data;

  const lines = [];
  for (const item of items) {
    const product = getProduct(item.config.productSlug);
    if (!product) return { status: "error", message: "Your cart contains a product that is no longer available.", values };
    const problems = validateConfig(product, item.config);
    if (problems.length) return { status: "error", message: `${product.name}: ${problems.join(" ")}`, values };
    const price = priceConfig(item.config);
    lines.push({ productName: product.name, sku: product.sku, config: item.config, price });
  }

  const art = await storeArtwork(fd.getAll("artwork") as File[]);
  if (!art.ok) return { status: "error", errors: { artwork: art.error }, values };

  const confirmedTotal = lines.filter((l) => l.price.mode === "fixed").reduce((s, l) => s + (l.price.total ?? 0), 0);
  const needsQuote = lines.some((l) => l.price.mode !== "fixed");

  const reference = makeReference("O");
  await saveRecord("orders", {
    reference,
    // No payment provider is integrated yet, so every order starts with a
    // human confirmation step. Payment status must later come from a
    // server-verified, idempotent webhook — never a browser redirect (§9).
    status: "pending_confirmation",
    paymentStatus: "not_requested",
    needsQuote,
    confirmedTotal,
    ...customer,
    lines,
    artwork: art.files,
  });
  return { status: "success", reference };
}
