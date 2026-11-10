"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cart, track } from "@/lib/cart";
import {
  categories,
  finishOptions,
  lightingOptions,
  materialOptions,
  mountingOptions,
  optionLabel,
  products,
  thicknessOptions,
} from "@/lib/catalog";
import { useT } from "@/lib/i18n";
import { formatDims } from "@/lib/units";
import { SignArt } from "./brand";
import { BuildFields, DimensionFields, ExtrasFields, PriceBreakdown, RadioCard, useSignConfig } from "./configurator";
import { QuoteForm } from "./quote-form";

const STEPS = ["Product", "Dimensions", "Build", "Options", "Review", "Submit"] as const;

export function CustomizeWizard() {
  const [slug, setSlug] = useState(products[0].slug);
  const product = products.find((p) => p.slug === slug) ?? products[0];
  const { config, update, unit, setUnit, price, errors } = useSignConfig(product);
  const [step, setStep] = useState(0);
  const [added, setAdded] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const t = useT();
  const first = useRef(true);

  useEffect(() => {
    track("start_customizer", { source: "wizard" });
  }, []);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  const dimsInvalid = errors.some((e) => e.startsWith("Width") || e.startsWith("Height") || e.startsWith("Choose one of the standard"));
  const canNext = step === 1 ? !dimsInvalid : step >= 2 ? errors.length === 0 : true;

  const go = (n: number) => {
    setStep(n);
    document.getElementById("wizard")?.scrollIntoView({ block: "start" });
  };

  return (
    <div id="wizard" className="scroll-mt-24">
      <Stepper step={step} onJump={(n) => n < step && go(n)} />

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div>
          <h2 ref={headingRef} tabIndex={-1} className="mb-1 text-2xl outline-none md:text-3xl">
            {step + 1}. {STEP_TITLES[step]}
          </h2>
          <p className="mb-6 text-muted">{STEP_INTRO[step]}</p>

          {step === 0 && (
            <div className="space-y-8">
              {categories.map((c) => {
                const items = products.filter((p) => p.categorySlug === c.slug);
                if (!items.length) return null;
                return (
                  <fieldset key={c.slug}>
                    <legend className="field-label">{c.name}</legend>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {items.map((p) => (
                        <RadioCard
                          key={p.slug}
                          name="product"
                          checked={slug === p.slug}
                          onChange={() => {
                            setSlug(p.slug);
                            setAdded(false);
                          }}
                          title={p.name}
                          note={p.pricingMode === "fixed" ? "Fixed price" : p.pricingMode === "estimate" ? "Instant estimate" : "Quote required"}
                        />
                      ))}
                    </div>
                  </fieldset>
                );
              })}
              <p className="rounded-none border-2 border-dashed border-navy/30 bg-white p-4">
                <strong>Not sure?</strong> Describe your space and goals and our team will recommend options.{" "}
                <Link href="/quote" className="font-bold text-navy underline">
                  Ask an expert
                </Link>
              </p>
            </div>
          )}

          {step === 1 && <DimensionFields product={product} config={config} update={update} unit={unit} setUnit={setUnit} />}
          {step === 2 && <BuildFields product={product} config={config} update={update} />}
          {step === 3 && <ExtrasFields config={config} update={update} />}
          {step === 4 && (
            <div className="space-y-6">
              <div className="card p-5">
                <h3 className="text-lg">Your specification</h3>
                <dl className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-[160px_1fr]">
                  {[
                    ["Product", product.name],
                    ["Size", `${formatDims(config.widthMm, config.heightMm, unit)} (outer)`],
                    ["Material", optionLabel(materialOptions, config.material)],
                    ...(config.thickness ? [["Thickness", optionLabel(thicknessOptions, config.thickness)]] : []),
                    ["Lighting", optionLabel(lightingOptions, config.lighting)],
                    ["Finish", optionLabel(finishOptions, config.finish)],
                    ["Mounting", optionLabel(mountingOptions, config.mounting)],
                    ...(config.color ? [["Colours", config.color]] : []),
                    ["Quantity", String(config.quantity)],
                    ["Design support", config.designSupport ? "Yes" : "No"],
                    ["Installation", config.installation ? "Requested" : "Not requested"],
                  ].map(([k, v]) => (
                    <div key={k} className="contents">
                      <dt className="font-semibold">{k}</dt>
                      <dd className="text-muted">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              {product.pricingMode !== "quote" && (
                <div className="card p-5">
                  <h3 className="text-lg">Ready to order?</h3>
                  <p className="mt-1 text-muted">
                    Add this sign to your cart to order with other items, or continue to send it to our team as a quote
                    request with your site details and artwork.
                  </p>
                  <button
                    type="button"
                    className="btn btn-outline mt-4"
                    disabled={errors.length > 0}
                    onClick={() => {
                      cart.add(config);
                      track("add_to_cart", { product: product.slug, mode: price.mode });
                      setAdded(true);
                    }}
                  >
                    {t("addToCart")}
                  </button>
                  {added && (
                    <p role="status" className="mt-3 font-semibold text-success">
                      Added. <Link href="/cart" className="text-navy underline">View cart</Link>
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
          {step === 5 && <QuoteForm kind="custom" config={config} />}

          {step < 5 && (
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {step > 0 && (
                <button type="button" className="btn btn-outline" onClick={() => go(step - 1)}>
                  Back
                </button>
              )}
              <button type="button" className="btn btn-secondary" disabled={!canNext} onClick={() => go(step + 1)}>
                {step === 4 ? "Continue to details & artwork" : "Next"}
              </button>
              {!canNext && <span className="text-sm font-semibold text-error">Please fix the highlighted values to continue.</span>}
            </div>
          )}
          {step === 5 && (
            <button type="button" className="btn btn-outline mt-6" onClick={() => go(4)}>
              Back to review
            </button>
          )}
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start" aria-label="Summary">
          <div className="card overflow-hidden">
            <SignArt kind={product.art} label={product.name} />
            <p className="p-4 font-bold text-navy">{product.name}</p>
          </div>
          {step > 0 && <PriceBreakdown price={price} errors={step >= 2 ? errors : []} />}
        </aside>
      </div>
    </div>
  );
}

const STEP_TITLES = [
  "Choose a sign type",
  "Enter dimensions",
  "Choose materials & lighting",
  "Quantity, design & installation",
  "Review your specification",
  "Your details, site & artwork",
];

const STEP_INTRO = [
  "Pick the closest match — you can describe anything special later.",
  "Use feet, inches or millimetres. We convert automatically.",
  "Only options compatible with this product are shown. Your estimate updates as you choose.",
  "Tell us how many you need and whether you want design help or installation.",
  "Check everything before sending. Estimated and to-be-confirmed costs are shown separately.",
  "We use this to prepare your quotation. Upload your logo now or send it later.",
];

function Stepper({ step, onJump }: { step: number; onJump: (n: number) => void }) {
  return (
    <nav aria-label="Progress">
      <p className="mb-2 text-sm font-semibold text-muted md:hidden">
        Step {step + 1} of {STEPS.length}: {STEPS[step]}
      </p>
      <div className="h-2 overflow-hidden rounded-full bg-line md:hidden" aria-hidden="true">
        <div className="h-full bg-yellow transition-all" style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
      </div>
      <ol className="hidden gap-2 md:grid md:grid-cols-6">
        {STEPS.map((s, i) => {
          const state = i < step ? "done" : i === step ? "current" : "todo";
          return (
            <li key={s}>
              <button
                type="button"
                onClick={() => onJump(i)}
                disabled={i >= step}
                aria-current={state === "current" ? "step" : undefined}
                className={`flex w-full items-center gap-2 border-t-4 pt-3 text-left text-sm font-bold disabled:cursor-default ${
                  state === "done" ? "border-navy text-navy" : state === "current" ? "border-yellow text-navy" : "border-line text-muted"
                }`}
              >
                <span
                  className={`grid size-7 shrink-0 place-items-center rounded-full text-xs ${
                    state === "todo" ? "bg-line text-muted" : state === "current" ? "bg-yellow text-navy-900" : "bg-navy text-white"
                  }`}
                >
                  {i + 1}
                </span>
                {s}
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
