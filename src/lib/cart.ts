"use client";

import { useSyncExternalStore } from "react";
import type { SignConfig } from "./pricing";

/**
 * Browser cart. Each item stores a full configuration snapshot (blueprint §14)
 * so the exact spec, quantity and pricing status survive navigation. Prices are
 * recomputed on the server at checkout.
 */
export type CartItem = { id: string; addedAt: string; config: SignConfig };

const KEY = "rb-cart-v1";
const listeners = new Set<() => void>();
const EMPTY: CartItem[] = [];
let cache: { raw: string | null; items: CartItem[] } = { raw: null, items: EMPTY };

function read(): CartItem[] {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(KEY);
  } catch {
    return EMPTY;
  }
  if (raw === cache.raw) return cache.items;
  let items: CartItem[] = EMPTY;
  try {
    const parsed = raw ? JSON.parse(raw) : [];
    if (Array.isArray(parsed)) items = parsed;
  } catch {
    /* corrupted storage — treat as empty */
  }
  cache = { raw, items };
  return items;
}

function write(items: CartItem[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    /* storage full or unavailable */
  }
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => e.key === KEY && cb();
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

export function useCart() {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}

export const cart = {
  add(config: SignConfig) {
    const id = crypto.randomUUID();
    write([...read(), { id, addedAt: new Date().toISOString(), config: structuredClone(config) }]);
    return id;
  },
  setQuantity(id: string, quantity: number) {
    write(read().map((i) => (i.id === id ? { ...i, config: { ...i.config, quantity } } : i)));
  },
  remove(id: string) {
    write(read().filter((i) => i.id !== id));
  },
  clear() {
    write([]);
  },
};

/** Fire-and-forget funnel events (blueprint §16). No vendor is loaded yet. */
export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: unknown[] };
  (w.dataLayer ??= []).push({ event, ...params });
}
