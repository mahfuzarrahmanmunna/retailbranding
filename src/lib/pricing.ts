/**
 * Pricing rules and estimate engine (blueprint §8).
 *
 * ⚠️ PLACEHOLDER RATES. Every number in `rules` and every preset price in
 * catalog.ts is a development placeholder, not approved pricing. The pricing
 * rule owner (blueprint §22) must replace them before launch. Until then you
 * can set `ESTIMATES_ENABLED = false` so made-to-order products show
 * "Quote required" instead of a number.
 *
 * This module is pure so the browser can show a live estimate, but the server
 * always recomputes from the submitted configuration — the client number is
 * never trusted (see app/actions.ts).
 */
import { getProduct, type Product } from "./catalog";

export const ESTIMATES_ENABLED = true;

const MM2_PER_SQFT = 92903.04;

export const rules = {
  /** BDT per sq ft of face area. */
  materialRate: {
    acp: 450,
    acrylic: 900,
    "stainless-steel": 2600,
    "aluminium-frame": 1100,
    "pvc-foam": 250,
    vinyl: 120,
    "neon-flex": 1800,
    aluminium: 1600,
    brass: 3200,
    "mirror-acrylic": 1500,
  } as Record<string, number>,
  /** Multiplier on material cost by thickness. */
  thicknessFactor: { "3mm": 1, "5mm": 1.15, "10mm": 1.4, "20mm": 1.8, "50mm": 2.6, "100mm": 3.2 } as Record<string, number>,
  /** BDT per sq ft of face area. */
  lightingRate: {
    none: 0,
    "front-lit": 650,
    "halo-lit": 750,
    backlit: 600,
    neon: 0,
    "side-lit": 700,
    "front-back-lit": 1100,
    "front-side-lit": 1000,
    rgb: 450,
    digital: 0, // digital displays are always quoted
  } as Record<string, number>,
  /** Multiplier on material cost. */
  finishFactor: { gloss: 1, matte: 1.05, brushed: 1.1, mirror: 1.25, printed: 1, painted: 1.08, etched: 1.2 } as Record<string, number>,
  /** Flat per-unit fabrication by product (BDT). */
  fabricationBase: {
    "acp-shop-fascia-signboard": 1500,
    "illuminated-acp-signboard": 3500,
    "custom-3d-acrylic-letter-sign": 2000,
    "double-sided-hanging-lightbox": 2500,
    "neon-style-flex-sign": 1500,
    "reception-logo-sign": 2000,
    "window-graphics": 300,
    "front-lit-trim-cap-channel-letters": 4000,
    "front-lit-rimless-letters": 4500,
    "luxury-halo-lit-letters": 6000,
    "halo-lit-letters": 4000,
    "front-and-back-lit-letters": 5500,
    "acrylic-channel-letters": 3000,
    "mini-led-acrylic-letters": 1500,
    "cut-stainless-steel-letters": 1500,
    "push-through-lightbox": 4000,
    "embedded-lightbox": 4000,
    "double-sided-push-through-lightbox": 5000,
    "double-sided-embedded-lightbox": 5000,
    "acrylic-faux-neon-180": 1500,
    "acrylic-faux-neon-360": 2000,
    "rgb-dimmable-led-neon": 2500,
    "outdoor-flexible-led-neon": 3000,
    "floor-directory-lobby-signs": 2500,
    "metal-relief-door-plaque": 1500,
  } as Record<string, number>,
  wasteFactor: 0.1,
  minimumCharge: 3000,
  designSupportFee: 2500,
};

export type SignConfig = {
  productSlug: string;
  presetId?: string;
  widthMm: number;
  heightMm: number;
  quantity: number;
  material: string;
  thickness?: string;
  lighting: string;
  mounting: string;
  finish: string;
  color?: string;
  designSupport: boolean;
  installation: boolean;
  /** Free-text note from the customer. */
  notes?: string;
};

export type LineStatus = "confirmed" | "estimated" | "tbc";

export type PriceLine = { label: string; amount: number | null; status: LineStatus };

export type PriceResult = {
  mode: "fixed" | "estimate" | "quote";
  lines: PriceLine[];
  /** Sum of priced lines; null when the price must come from a formal quote. */
  total: number | null;
  warnings: string[];
};

export function defaultConfig(product: Product): SignConfig {
  const preset = product.presets?.[0];
  return {
    productSlug: product.slug,
    presetId: preset?.id,
    widthMm: preset?.widthMm ?? startSize(product.limits.minWidthMm, product.limits.maxWidthMm),
    heightMm: preset?.heightMm ?? startSize(product.limits.minHeightMm, product.limits.maxHeightMm),
    quantity: 1,
    material: product.materials[0],
    thickness: product.thicknesses[0],
    lighting: product.lighting[0],
    mounting: product.mounting[0],
    finish: product.finishes[0],
    color: "",
    designSupport: false,
    installation: false,
    notes: "",
  };
}

/** Returns human-readable problems with the configuration (empty = valid). */
export function validateConfig(product: Product, c: SignConfig): string[] {
  const errors: string[] = [];
  const { limits } = product;
  if (!Number.isFinite(c.widthMm) || c.widthMm < limits.minWidthMm || c.widthMm > limits.maxWidthMm)
    errors.push(`Width must be between ${limits.minWidthMm} and ${limits.maxWidthMm} mm for this product.`);
  if (!Number.isFinite(c.heightMm) || c.heightMm < limits.minHeightMm || c.heightMm > limits.maxHeightMm)
    errors.push(`Height must be between ${limits.minHeightMm} and ${limits.maxHeightMm} mm for this product.`);
  if (!Number.isInteger(c.quantity) || c.quantity < 1 || c.quantity > 500) errors.push("Quantity must be between 1 and 500.");
  if (!product.materials.includes(c.material)) errors.push("Choose a material available for this product.");
  if (product.thicknesses.length && !product.thicknesses.includes(c.thickness ?? "")) errors.push("Choose an available thickness.");
  if (!product.lighting.includes(c.lighting)) errors.push("Choose an available lighting option.");
  if (!product.mounting.includes(c.mounting)) errors.push("Choose an available mounting option.");
  if (!product.finishes.includes(c.finish)) errors.push("Choose an available finish.");
  if (product.pricingMode === "fixed" && product.presets && !product.presets.some((p) => p.id === c.presetId))
    errors.push("Choose one of the standard sizes, or request a quote for a custom size.");
  return errors;
}

export function priceConfig(c: SignConfig): PriceResult {
  const product = getProduct(c.productSlug);
  if (!product) return { mode: "quote", lines: [], total: null, warnings: ["Unknown product."] };

  const warnings: string[] = [];
  const areaSqft = (c.widthMm * c.heightMm) / MM2_PER_SQFT;
  const aspect = Math.max(c.widthMm, c.heightMm) / Math.max(1, Math.min(c.widthMm, c.heightMm));
  if (aspect > 12) warnings.push("This is an unusually long, narrow size — our team will confirm it is practical.");
  if (product.environment.includes("outdoor") && areaSqft > 120)
    warnings.push("Large outdoor signs may need a site survey and structural check before a final price.");

  const tail: PriceLine[] = [
    c.installation
      ? { label: "Installation", amount: null, status: "tbc" }
      : { label: "Installation", amount: 0, status: "confirmed" },
    { label: "Delivery", amount: null, status: "tbc" },
    { label: "VAT / tax", amount: null, status: "tbc" },
  ];

  // Fixed-price catalogue item.
  if (product.pricingMode === "fixed") {
    const preset = product.presets?.find((p) => p.id === c.presetId);
    if (!preset) return { mode: "quote", lines: [], total: null, warnings: ["Custom size — quote required."] };
    const lines: PriceLine[] = [
      { label: `${product.name} — ${preset.label} × ${c.quantity}`, amount: preset.price * c.quantity, status: "confirmed" },
    ];
    if (c.designSupport) lines.push({ label: "Design support", amount: rules.designSupportFee, status: "confirmed" });
    lines.push(...tail);
    return { mode: "fixed", lines, total: sum(lines), warnings };
  }

  // Made-to-order: formal quotation only.
  if (product.pricingMode === "quote" || !ESTIMATES_ENABLED) {
    return {
      mode: "quote",
      lines: [{ label: product.name, amount: null, status: "tbc" }, ...tail],
      total: null,
      warnings,
    };
  }

  // Made-to-order with indicative estimate.
  const matRate = rules.materialRate[c.material] ?? 0;
  const thick = c.thickness ? (rules.thicknessFactor[c.thickness] ?? 1) : 1;
  const finish = rules.finishFactor[c.finish] ?? 1;
  const material = areaSqft * matRate * thick * finish * (1 + rules.wasteFactor);
  const lighting = areaSqft * (rules.lightingRate[c.lighting] ?? 0);
  const fabrication = rules.fabricationBase[product.slug] ?? 0;
  const perUnit = Math.max(rules.minimumCharge, material + lighting + fabrication);

  const lines: PriceLine[] = [
    { label: `Materials & finishing (${areaSqft.toFixed(1)} sq ft × ${c.quantity})`, amount: round(material * c.quantity), status: "estimated" },
  ];
  if (lighting > 0) lines.push({ label: "Illumination", amount: round(lighting * c.quantity), status: "estimated" });
  lines.push({ label: "Fabrication", amount: round((perUnit - material - lighting) * c.quantity), status: "estimated" });
  if (c.designSupport) lines.push({ label: "Design support", amount: rules.designSupportFee, status: "estimated" });
  lines.push(...tail);

  return { mode: "estimate", lines, total: sum(lines), warnings };
}

/** A sensible starting size towards the small end of the allowed range. */
function startSize(min: number, max: number) {
  return Math.round(Math.max(min, Math.min(max, (min + max) / 6)));
}

function round(n: number) {
  return Math.round(n / 10) * 10;
}

function sum(lines: PriceLine[]) {
  return lines.reduce((s, l) => s + (l.amount ?? 0), 0);
}
