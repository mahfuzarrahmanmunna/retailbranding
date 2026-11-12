"use client";

import Link from "next/link";
import { use, useActionState, useEffect, useRef, useState } from "react";
import { browser } from "react-dom";
import { submitOrder, type FormState } from "@/app/actions";
import { cart, track, useCart } from "@/lib/cart";
import { districts, getProduct } from "@/lib/catalog";
import { useT } from "@/lib/i18n";
import { priceConfig } from "@/lib/pricing";
import { formatBDT } from "@/lib/units";
import { CartSummary, ModeBadge, useCartTotals } from "./cart-view";
import { Checkbox, FileUploader, FormError, Honeypot, PhoneField, SelectField, TextArea, TextField } from "./form";
import { IconBadgeCheck } from "./icons";

const initial: FormState = { status: "idle" };

export function CheckoutForm() {
  use(browser("Checkout reads the cart from this browser's localStorage."));
  const items = useCart();
  const totals = useCartTotals(items);
  const t = useT();
  const [state, action, pending] = useActionState(submitOrder, initial);
  // One key per checkout attempt: resubmits return the same order (idempotent).
  const [idempotencyKey] = useState(() => crypto.randomUUID());
  const successRef = useRef<HTMLDivElement>(null);
  const e = state.errors ?? {};
  const v = state.values ?? {};

  useEffect(() => {
    if (items.length) track("begin_checkout", { items: items.length });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (state.status === "success") {
      track("purchase_request", { reference: state.reference });
      cart.clear();
      successRef.current?.focus();
    }
  }, [state.status, state.reference]);

  if (state.status === "success") {
    return (
      <div ref={successRef} tabIndex={-1} role="status" className="card mx-auto max-w-2xl p-6 md:p-8">
        <IconBadgeCheck width={40} height={40} className="text-success" />
        <h2 className="mt-3 text-2xl">Order request received</h2>
        <p lang="bn" className="mt-1 font-semibold text-muted">
          {t("weWillContact")}
        </p>
        <p className="mt-4">
          Your order number is <strong className="text-navy">{state.reference}</strong>.
        </p>
        <h3 className="mt-6 text-lg">What happens next</h3>
        <ol className="mt-2 list-inside list-decimal space-y-1 text-muted">
          <li>Artwork review — we check your files and may ask for a production-ready version.</li>
          <li>Confirmation — we confirm final price, delivery/installation charges and VAT, and share payment instructions.</li>
          <li>Approval — you approve the artwork proof.</li>
          <li>Production → dispatch → installed / completed.</li>
        </ol>
        <Link href="#" className="btn btn-outline mt-6">
          Continue browsing
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="card p-8 text-center">
        <h2 className="text-2xl">Your cart is empty</h2>
        <Link href="#" className="btn btn-primary mt-6">
          {t("exploreProducts")}
        </Link>
      </div>
    );
  }

  return (
    <form key={v.__attempt ?? "initial"} action={action} noValidate className="relative grid gap-8 lg:grid-cols-[1fr_380px]">
      <Honeypot />
      <input type="hidden" name="items" value={JSON.stringify(items.map((i) => ({ id: i.id, config: i.config })))} />
      <input type="hidden" name="idempotencyKey" value={idempotencyKey} />

      <div className="space-y-8">
        <FormError message={state.status === "error" ? (state.message ?? "Please check the highlighted fields.") : undefined} />

        <fieldset className="card space-y-4 p-5 md:p-6">
          <legend className="float-left mb-2 w-full text-xl font-extrabold text-navy">1. Contact</legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Your name" name="name" autoComplete="name" error={e.name} defaultValue={v.name} />
            <PhoneField error={e.phone} defaultValue={v.phone} />
            <TextField label="Email" name="email" type="email" autoComplete="email" optional error={e.email} defaultValue={v.email} />
            <TextField label="Company / shop" name="company" autoComplete="organization" optional defaultValue={v.company} />
          </div>
        </fieldset>

        <fieldset className="card space-y-4 p-5 md:p-6">
          <legend className="float-left mb-2 w-full text-xl font-extrabold text-navy">2. Delivery or installation</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              { value: "delivery", title: "Delivery only", note: "Charges confirmed before payment" },
              { value: "installation", title: "Installation request", note: "Subject to location and site conditions" },
            ].map((o) => (
              <label key={o.value} className="option-card flex cursor-pointer items-start gap-3 rounded-none border-2 border-line bg-white p-4 has-[:checked]:border-navy has-[:checked]:bg-navy-50">
                <input type="radio" name="fulfilment" value={o.value} defaultChecked={(v.fulfilment ?? "delivery") === o.value} className="mt-1 size-4 accent-navy" />
                <span>
                  <span className="block font-semibold">{o.title}</span>
                  <span className="block text-sm text-muted">{o.note}</span>
                </span>
              </label>
            ))}
          </div>
          {e.fulfilment && <p className="field-error">{e.fulfilment}</p>}
          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField
              label="District"
              name="district"
              placeholder="Select district"
              options={districts.map((d) => ({ value: d, label: d }))}
              error={e.district}
              defaultValue={v.district}
            />
            <TextField label="Upazila / area" name="area" error={e.area} defaultValue={v.area} />
          </div>
          <TextArea label="Detailed address" name="address" rows={2} autoComplete="street-address" error={e.address} defaultValue={v.address} hint="House, road, building, floor and a landmark. No postcode needed." />
          <TextArea label="Order notes" name="notes" rows={2} optional defaultValue={v.notes} placeholder="Site access, preferred time, anything else…" />
        </fieldset>

        <fieldset className="card space-y-4 p-5 md:p-6">
          <legend className="float-left mb-2 w-full text-xl font-extrabold text-navy">3. Artwork</legend>
          <FileUploader error={e.artwork} />
        </fieldset>

        <fieldset className="card space-y-4 p-5 md:p-6">
          <legend className="float-left mb-2 w-full text-xl font-extrabold text-navy">4. Payment</legend>
          <p className="text-muted">
            No payment is taken online at this step. After reviewing your order we confirm the final amount — including
            delivery, installation and VAT/tax — and share payment instructions. For made-to-order items, a deposit is
            requested only after you accept the quotation.
          </p>
          <Checkbox name="terms" error={e.terms} defaultChecked={v.terms === "on"}>
            I have read the{" "}
            <Link href="#" className="font-semibold text-navy underline">order terms</Link>,{" "}
            <Link href="#" className="font-semibold text-navy underline">cancellation & refund policy</Link> and{" "}
            <Link href="#" className="font-semibold text-navy underline">privacy notice</Link>, and agree to be contacted about this order.
          </Checkbox>
        </fieldset>
      </div>

      <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
        <section aria-labelledby="items-title" className="card p-5">
          <h2 id="items-title" className="text-lg">
            Items ({items.length})
          </h2>
          <ul className="mt-3 divide-y divide-line">
            {items.map((i) => {
              const p = getProduct(i.config.productSlug);
              const price = priceConfig(i.config);
              return (
                <li key={i.id} className="py-3">
                  <div className="flex justify-between gap-3">
                    <span className="font-semibold">
                      {p?.name ?? "Unavailable item"} × {i.config.quantity}
                    </span>
                    <span className="shrink-0 font-semibold">{price.total !== null ? formatBDT(price.total) : "Quote"}</span>
                  </div>
                  <ModeBadge mode={price.mode} />
                </li>
              );
            })}
          </ul>
        </section>
        <CartSummary totals={totals} />
        <button type="submit" className="btn btn-primary w-full text-[17px]" disabled={pending}>
          {pending ? "Placing order…" : "Place Order Request"}
        </button>
        <Link href="#" className="block text-center font-semibold text-navy underline">
          Edit cart
        </Link>
      </aside>
    </form>
  );
}
