import "server-only";
import { headers } from "next/headers";

/**
 * Simple in-memory sliding-window limiter. Good enough for a single Node
 * process; use a shared store (e.g. Redis) when running multiple instances.
 */
const buckets = new Map<string, number[]>();

export async function rateLimit(action: string, limit = 5, windowMs = 10 * 60 * 1000) {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "local";
  const key = `${action}:${ip}`;
  const now = Date.now();
  const hits = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
  if (hits.length >= limit) {
    buckets.set(key, hits);
    return false;
  }
  hits.push(now);
  buckets.set(key, hits);
  return true;
}
