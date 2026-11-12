"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useState, type ReactNode } from "react";
import { cart, track } from "@/lib/cart";
import {
  finishOptions,
  lightingOptions,
  materialOptions,
  mountingOptions,
  thicknessOptions,
  type Option,
  type Product,
} from "@/lib/catalog";
import { useT } from "@/lib/i18n";
import { defaultConfig, priceConfig, validateConfig, type PriceResult, type SignConfig } from "@/lib/pricing";
import { formatBDT, fromMm, roundFor, toMm, UNITS, type Unit } from "@/lib/units";
import { IconCheck, IconInfo } from "./icons";
import { QuoteForm } from "./quote-form";

/* ------------------------------------------------------------------ */
/* State                                                               */
/* ------------------------------------------------------------------ */

export function useSignConfig(product: Product) {
  const [config, setConfig] = useState<SignConfig>(() => defaultConfig(product));
  const [unit, setUnit] = useState<Unit>(product.limits.maxWidthMm > 3000 ? "ft" : "mm");
  // Reset when the product changes (wizard).
  const [forSlug, setForSlug] = useState(product.slug);
  if (forSlug !== product.slug) {
    setForSlug(product.slug);
    setConfig(defaultConfig(product));
    setUnit(product.limits.maxWidthMm > 3000 ? "ft" : "mm");
  }
  const update = (patch: Partial<SignConfig>) => setConfig((c) => ({ ...c, ...patch }));
  const price = useMemo(() => priceConfig(config), [config]);
  const errors = useMemo(() => validateConfig(product, config), [product, config]);
  return { config, update, unit, setUnit, price, errors };
}

/* ------------------------------------------------------------------ */
/* Dimensions                                                          */
/* ------------------------------------------------------------------ */

export function DimensionFields({
  product,
  config,
  update,
  unit,
  setUnit,
}: {
  product: Product;
  config: SignConfig;
  update: (p: Partial<SignConfig>) => void;
  unit: Unit;
  setUnit: (u: Unit) => void;
}) {
  const t = useT();
  const { limits } = product;
  const wId = useId();
  const hId = useId();

  if (product.pricingMode === "fixed" && product.presets) {
    return (
      <fieldset>
        <legend className="field-label">Size</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {product.presets.map((p) => (
            <RadioCard
              key={p.id}
              name="preset"
              checked={config.presetId === p.id}
              onChange={() => update({ presetId: p.id, widthMm: p.widthMm, heightMm: p.heightMm })}
              title={p.label}
              note={formatBDT(p.price)}
            />
          ))}
        </div>
        <p className="field-hint">
          Need a different size? <Link href="#" className="font-semibold text-navy underline">Request a custom quote</Link>.
        </p>
      </fieldset>
    );
  }

  return (
    <fieldset>
      <legend className="field-label">Size</legend>
      <p className="mb-3 text-sm text-muted">
        {product.dimensionMeaning === "outer"
          ? "Enter the overall outer size of the finished sign (not individual letter height)."
          : "Enter the height of individual letters."}
      </p>
      <UnitSelector unit={unit} onChange={setUnit} />
      <div className="mt-3 grid grid-cols-2 gap-3">
        <DimensionInput
          id={wId}
          label={`${t("width")} (${unit})`}
          mm={config.widthMm}
          unit={unit}
          min={limits.minWidthMm}
          max={limits.maxWidthMm}
          onChange={(mm) => update({ widthMm: mm })}
        />
        <DimensionInput
          id={hId}
          label={`${t("height")} (${unit})`}
          mm={config.heightMm}
          unit={unit}
          min={limits.minHeightMm}
          max={limits.maxHeightMm}
          onChange={(mm) => update({ heightMm: mm })}
        />
      </div>
      <p className="field-hint" aria-live="polite">
        = {Math.round(config.widthMm)} × {Math.round(config.heightMm)} mm ·{" "}
        {roundFor(fromMm(config.widthMm, "ft"), "ft")} × {roundFor(fromMm(config.heightMm, "ft"), "ft")} ft
      </p>
    </fieldset>
  );
}

export function UnitSelector({ unit, onChange }: { unit: Unit; onChange: (u: Unit) => void }) {
  return (
    <div role="radiogroup" aria-label="Units" className="inline-flex rounded-full border border-line bg-white p-1">
      {UNITS.map((u) => (
        <button
          key={u}
          type="button"
          role="radio"
          aria-checked={unit === u}
          onClick={() => onChange(u)}
          className={`min-h-10 min-w-14 rounded-full px-4 text-sm font-bold ${unit === u ? "bg-navy text-white" : "text-navy"}`}
        >
          {u}
        </button>
      ))}
    </div>
  );
}

function DimensionInput({
  id,
  label,
  mm,
  unit,
  min,
  max,
  onChange,
}: {
  id: string;
  label: string;
  mm: number;
  unit: Unit;
  min: number;
  max: number;
  onChange: (mm: number) => void;
}) {
  const display = (v: number) => String(roundFor(fromMm(v, unit), unit));
  const [text, setText] = useState(() => display(mm));
  // Re-sync the text box when the unit or the underlying value changes externally.
  const [synced, setSynced] = useState({ mm, unit });
  if (synced.unit !== unit || synced.mm !== mm) {
    setSynced({ mm, unit });
    setText(display(mm));
  }
  const value = Number(text);
  const outOfRange = text !== "" && (!Number.isFinite(value) || toMm(value, unit) < min - 0.5 || toMm(value, unit) > max + 0.5);
  const range = `${roundFor(fromMm(min, unit), unit)}–${roundFor(fromMm(max, unit), unit)} ${unit}`;

  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <input
        id={id}
        className="field"
        inputMode="decimal"
        value={text}
        aria-invalid={outOfRange || undefined}
        aria-describedby={`${id}-range`}
        onChange={(e) => {
          const raw = e.target.value.replace(",", ".");
          if (!/^\d*\.?\d*$/.test(raw)) return;
          setText(raw);
          const n = Number(raw);
          if (raw !== "" && Number.isFinite(n) && n > 0) {
            const next = toMm(n, unit);
            setSynced({ mm: next, unit });
            onChange(next);
          }
        }}
      />
      <p id={`${id}-range`} className={outOfRange ? "field-error" : "field-hint"}>
        {outOfRange ? `Allowed: ${range}` : `Range ${range}`}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Build options                                                       */
/* ------------------------------------------------------------------ */

function pick(list: Option[], ids: string[]) {
  return ids.map((id) => list.find((o) => o.id === id)).filter((o): o is Option => !!o);
}

export function BuildFields({
  product,
  config,
  update,
  show = ["material", "thickness", "lighting", "finish", "mounting", "color"],
}: {
  product: Product;
  config: SignConfig;
  update: (p: Partial<SignConfig>) => void;
  show?: ("material" | "thickness" | "lighting" | "finish" | "mounting" | "color")[];
}) {
  const t = useT();
  const groups = [
    { key: "material", legend: t("selectMaterial"), options: pick(materialOptions, product.materials) },
    { key: "thickness", legend: "Thickness", options: pick(thicknessOptions, product.thicknesses) },
    { key: "lighting", legend: "Lighting", options: pick(lightingOptions, product.lighting) },
    { key: "finish", legend: "Finish", options: pick(finishOptions, product.finishes) },
    { key: "mounting", legend: "Mounting", options: pick(mountingOptions, product.mounting) },
  ] as const;

  return (
    <div className="space-y-6">
      {groups
        .filter((g) => show.includes(g.key) && g.options.length > 0)
        .map((g) => (
          <fieldset key={g.key}>
            <legend className="field-label">{g.legend}</legend>
            {g.options.length === 1 ? (
              <p className="flex items-center gap-2 rounded-none border border-line bg-white px-4 py-3">
                <IconCheck className="text-success" /> {g.options[0].label}
                <span className="text-sm text-muted">(standard for this product)</span>
              </p>
            ) : (
              <div className="grid gap-2 sm:grid-cols-2">
                {g.options.map((o) => (
                  <RadioCard
                    key={o.id}
                    name={g.key}
                    checked={config[g.key] === o.id}
                    onChange={() => {
                      update({ [g.key]: o.id });
                      track("select_option", { product: product.slug, option: g.key, value: o.id });
                    }}
                    title={o.label}
                    note={o.note}
                  />
                ))}
              </div>
            )}
          </fieldset>
        ))}
      {show.includes("color") && (
        <ColorField value={config.color ?? ""} onChange={(color) => update({ color })} />
      )}
    </div>
  );
}

function ColorField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="field-label">
        Colours <span className="font-normal text-muted">(optional)</span>
      </label>
      <input
        id={id}
        className="field"
        value={value}
        maxLength={100}
        placeholder="e.g. Brand red + white, or Pantone / HEX codes"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export function RadioCard({
  name,
  checked,
  onChange,
  title,
  note,
}: {
  name: string;
  checked: boolean;
  onChange: () => void;
  title: ReactNode;
  note?: ReactNode;
}) {
  return (
    <label
      className={`relative flex min-h-14 cursor-pointer items-start gap-3 rounded-none border-2 bg-white px-4 py-3 option-card has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-yellow ${
        checked ? "border-navy bg-navy-50" : "border-line hover:border-navy/40"
      }`}
    >
      <input type="radio" name={name} checked={checked} onChange={onChange} className="mt-1 size-4 shrink-0 accent-navy" />
      <span>
        <span className="block font-semibold">{title}</span>
        {note && <span className="block text-sm text-muted">{note}</span>}
      </span>
    </label>
  );
}

export function ExtrasFields({ config, update }: { config: SignConfig; update: (p: Partial<SignConfig>) => void }) {
  const t = useT();
  const qId = useId();
  return (
    <div className="space-y-4">
      <div className="max-w-40">
        <label htmlFor={qId} className="field-label">
          {t("quantity")}
        </label>
        <input
          id={qId}
          type="number"
          min={1}
          max={500}
          inputMode="numeric"
          className="field"
          value={config.quantity}
          onChange={(e) => update({ quantity: Math.max(1, Math.min(500, Math.floor(Number(e.target.value) || 1))) })}
        />
      </div>
      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          className="mt-1 size-5 accent-navy"
          checked={config.designSupport}
          onChange={(e) => update({ designSupport: e.target.checked })}
        />
        <span>
          <span className="font-semibold">I need design support</span>
          <span className="block text-sm text-muted">We adapt your logo or prepare a layout from your brief.</span>
        </span>
      </label>
      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          className="mt-1 size-5 accent-navy"
          checked={config.installation}
          onChange={(e) => update({ installation: e.target.checked })}
        />
        <span>
          <span className="font-semibold">{t("installationRequired")}</span>
          <span className="block text-sm text-muted">
            Installation is quoted after we know the location and site conditions.
          </span>
        </span>
      </label>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Price breakdown                                                     */
/* ------------------------------------------------------------------ */

export function PriceBreakdown({ price, errors }: { price: PriceResult; errors: string[] }) {
  const t = useT();
  const heading =
    price.mode === "fixed" ? t("fixedPrice") : price.mode === "estimate" ? t("estimatedPrice") : t("quoteRequired");
  return (
    <section aria-labelledby="price-title" className="card p-5">
      <h2 id="price-title" className="text-lg">
        {heading}
      </h2>
      {errors.length > 0 ? (
        <ul className="mt-3 space-y-1 text-sm text-error" role="alert">
          {errors.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      ) : (
        <>
          <dl className="mt-3 divide-y divide-line text-[15px]" aria-live="polite">
            {price.lines.map((l) => (
              <div key={l.label} className="flex items-start justify-between gap-3 py-2">
                <dt className="text-muted">{l.label}</dt>
                <dd className="shrink-0 text-right font-semibold">
                  {l.status === "tbc" ? (
                    <span className="text-sm text-muted">To be confirmed</span>
                  ) : l.amount === 0 ? (
                    <span className="text-sm text-muted">Not included</span>
                  ) : (
                    formatBDT(l.amount ?? 0)
                  )}
                </dd>
              </div>
            ))}
          </dl>
          {price.total !== null && (
            <div className="mt-2 flex items-end justify-between border-t-2 border-navy pt-3">
              <span className="font-bold">{price.mode === "fixed" ? "Subtotal" : "Estimated subtotal"}</span>
              <span className="text-2xl font-extrabold text-navy">{formatBDT(price.total)}</span>
            </div>
          )}
          <EstimateDisclaimer mode={price.mode} />
          {price.warnings.map((w) => (
            <p key={w} className="mt-3 flex gap-2 rounded-lg bg-yellow-50 p-3 text-sm">
              <IconInfo className="mt-0.5 shrink-0 text-navy" width={18} height={18} /> {w}
            </p>
          ))}
        </>
      )}
    </section>
  );
}

export function EstimateDisclaimer({ mode }: { mode: PriceResult["mode"] }) {
  const t = useT();
  const text =
    mode === "fixed"
      ? "Product price is confirmed. Delivery, installation and VAT/tax are confirmed before payment."
      : mode === "estimate"
        ? `This is an indicative estimate, not a final price. ${t("finalAfterReview")}.`
        : "This item is priced by formal quotation after technical review. Submit your specification to receive one.";
  return <p className="mt-3 text-sm text-muted">{text}</p>;
}

/* ------------------------------------------------------------------ */
/* Product page configurator                                           */
/* ------------------------------------------------------------------ */

export function ProductConfigurator({ product }: { product: Product }) {
  const { config, update, unit, setUnit, price, errors } = useSignConfig(product);
  const t = useT();
  const [stage, setStage] = useState<"configure" | "quote">("configure");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    track("start_customizer", { product: product.slug });
  }, [product.slug]);

  const canCart = product.pricingMode !== "quote" && errors.length === 0;

  function addToCart() {
    cart.add(config);
    track("add_to_cart", { product: product.slug, mode: price.mode, value: price.total });
    setAdded(true);
  }

  if (stage === "quote") {
    return (
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div>
          <button type="button" className="mb-4 font-semibold text-navy underline" onClick={() => setStage("configure")}>
            ← Back to configuration
          </button>
          <QuoteForm kind="product" config={config} />
        </div>
        <div className="lg:sticky lg:top-24 lg:self-start">
          <PriceBreakdown price={price} errors={errors} />
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div className="space-y-8">
        <DimensionFields product={product} config={config} update={update} unit={unit} setUnit={setUnit} />
        <BuildFields product={product} config={config} update={update} />
        <ExtrasFields config={config} update={update} />
      </div>

      <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
        <PriceBreakdown price={price} errors={errors} />
        <div className="grid gap-2" id="configure-actions">
          {product.pricingMode !== "quote" && (
            <button type="button" className="btn btn-primary w-full" onClick={addToCart} disabled={!canCart}>
              {t("addToCart")}
            </button>
          )}
          <button
            type="button"
            className={`btn w-full ${product.pricingMode === "quote" ? "btn-primary" : "btn-outline"}`}
            disabled={errors.length > 0}
            onClick={() => {
              setStage("quote");
              window.scrollTo({ top: document.getElementById("configure")?.offsetTop ?? 0 });
            }}
          >
            {t("requestQuote")}
          </button>
        </div>
        {added && (
          <div role="status" className="rounded-none border border-success/40 bg-[#e7f4ed] p-4">
            <p className="font-semibold text-success">Added to your cart.</p>
            <div className="mt-2 flex gap-3">
              <Link href="#" className="font-bold text-navy underline">
                View cart
              </Link>
              <Link href="#" className="font-bold text-navy underline">
                {t("proceedCheckout")}
              </Link>
            </div>
          </div>
        )}
        {product.pricingMode === "estimate" && (
          <p className="text-sm text-muted">
            Estimate items in your cart are reviewed by our team and confirmed before any payment is taken.
          </p>
        )}
      </div>
    </div>
  );
}
