export type Unit = "mm" | "in" | "ft";

export const UNITS: Unit[] = ["ft", "in", "mm"];

const MM_PER: Record<Unit, number> = { mm: 1, in: 25.4, ft: 304.8 };

export function toMm(value: number, unit: Unit) {
  return value * MM_PER[unit];
}

export function fromMm(mm: number, unit: Unit) {
  return mm / MM_PER[unit];
}

export function convert(value: number, from: Unit, to: Unit) {
  return fromMm(toMm(value, from), to);
}

/** Round sensibly for display in the given unit. */
export function roundFor(value: number, unit: Unit) {
  const dp = unit === "mm" ? 0 : unit === "in" ? 1 : 2;
  const f = 10 ** dp;
  return Math.round(value * f) / f;
}

export function formatDims(widthMm: number, heightMm: number, unit: Unit) {
  return `${roundFor(fromMm(widthMm, unit), unit)} × ${roundFor(fromMm(heightMm, unit), unit)} ${unit}`;
}

/** Bangladeshi Taka, e.g. ৳ 12,500 (blueprint §12). */
export function formatBDT(amount: number) {
  return `৳ ${Math.round(amount).toLocaleString("en-IN")}`;
}
