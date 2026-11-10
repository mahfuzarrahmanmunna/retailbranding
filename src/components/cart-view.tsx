"use client";

import Link from "next/link";
import { use } from "react";
import { browser } from "react-dom";
import { cart, useCart, type CartItem } from "@/lib/cart";
import { getProduct, lightingOptions, materialOptions, optionLabel } from "@/lib/catalog";
import { useT } from "@/lib/i18n";
import { priceConfig } from "@/lib/pricing";
import { formatBDT, formatDims } from "@/lib/units";
import { SignArt } from "./brand";
import { IconTrash } from "./icons";

export function useCartTotals(items: CartItem[]) {
  let confirmed = 0;
  let estimated = 0;
  let quoteCount = 0;
  for (const i of items) {
    const p = priceConfig(i.config);
    if (p.mode === "fixed") confirmed += p.total ?? 0;
    else if (p.mode === "estimate") estimated += p.total ?? 0;
    else quoteCount++;
  }
  return { confirmed, estimated, quoteCount };
}

export function ModeBadge({ mode }: { mode: "fixed" | "estimate" | "quote" }) {
  const map = {
    fixed: ["Fixed price", "bg-[#e7f4ed] text-success"],
    estimate: ["Estimate — confirmed after review", "bg-yellow-50 text-navy"],
    quote: ["Quote required", "bg-navy-50 text-navy"],
  } as const;
  const [label, cls] = map[mode];
  return <span className={`inline-block rounded px-2 py-0.5 text-xs font-bold ${cls}`}>{label}</span>;
}

export function CartView() {
  use(browser("The cart is stored in this browser's localStorage."));
  const items = useCart();
  const t = useT();
  const totals = useCartTotals(items);

  if (items.length === 0) {
    return (
      <div className="card p-8 text-center">
        <h2 className="text-2xl">Your cart is empty</h2>
        <p className="mt-2 text-muted">Browse products or build a custom sign to get started.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/products" className="btn btn-primary">
            {t("exploreProducts")}
          </Link>
          <Link href="/customize" className="btn btn-outline">
            {t("customizeSign")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <ul className="space-y-4" aria-label="Cart items">
        {items.map((item) => (
          <CartRow key={item.id} item={item} />
        ))}
      </ul>
      <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
        <CartSummary totals={totals} />
        <Link href="/checkout" className="btn btn-primary w-full">
          {t("proceedCheckout")}
        </Link>
        <Link href="/products" className="btn btn-outline w-full">
          Continue shopping
        </Link>
      </aside>
    </div>
  );
}

function CartRow({ item }: { item: CartItem }) {
  const product = getProduct(item.config.productSlug);
  const price = priceConfig(item.config);
  if (!product) {
    return (
      <li className="card flex items-center justify-between p-4">
        <span>This product is no longer available.</span>
        <button type="button" className="btn btn-outline" onClick={() => cart.remove(item.id)}>
          Remove
        </button>
      </li>
    );
  }
  const c = item.config;
  return (
    <li className="card grid gap-4 p-4 sm:grid-cols-[140px_1fr]">
      <div className="overflow-hidden rounded-lg border border-line">
        <SignArt kind={product.art} label={product.name} />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h3 className="text-lg">
            <Link href={`/products/${product.slug}`} className="hover:underline">
              {product.name}
            </Link>
          </h3>
          <p className="text-lg font-extrabold text-navy">{price.total !== null ? formatBDT(price.total) : "Quote"}</p>
        </div>
        <ModeBadge mode={price.mode} />
        <p className="text-sm text-muted">
          {formatDims(c.widthMm, c.heightMm, c.widthMm > 3000 ? "ft" : "mm")} · {optionLabel(materialOptions, c.material)}
          {c.thickness ? ` ${c.thickness}` : ""} · {optionLabel(lightingOptions, c.lighting)}
          {c.designSupport ? " · Design support" : ""}
          {c.installation ? " · Installation requested" : ""}
        </p>
        <div className="mt-auto flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-sm font-semibold">
            Qty
            <input
              type="number"
              min={1}
              max={500}
              className="field !min-h-10 w-20 !py-1"
              value={c.quantity}
              onChange={(e) => cart.setQuantity(item.id, Math.max(1, Math.min(500, Math.floor(Number(e.target.value) || 1))))}
            />
          </label>
          <button
            type="button"
            onClick={() => cart.remove(item.id)}
            className="inline-flex min-h-10 items-center gap-1 rounded-lg px-2 text-sm font-semibold text-error hover:bg-[#fdf0ef]"
          >
            <IconTrash width={16} height={16} /> Remove<span className="sr-only"> {product.name}</span>
          </button>
        </div>
      </div>
    </li>
  );
}

export function CartSummary({ totals }: { totals: ReturnType<typeof useCartTotals> }) {
  return (
    <section aria-labelledby="summary-title" className="card p-5">
      <h2 id="summary-title" className="text-lg">
        Order summary
      </h2>
      <dl className="mt-3 divide-y divide-line text-[15px]">
        {totals.confirmed > 0 && (
          <Row label="Fixed-price items" value={formatBDT(totals.confirmed)} />
        )}
        {totals.estimated > 0 && <Row label="Estimated items" value={`≈ ${formatBDT(totals.estimated)}`} />}
        {totals.quoteCount > 0 && <Row label={`Items needing a quote (${totals.quoteCount})`} value="To be quoted" />}
        <Row label="Delivery" value="To be confirmed" />
        <Row label="Installation" value="To be confirmed" />
        <Row label="VAT / tax" value="To be confirmed" />
      </dl>
      <p className="mt-3 text-sm text-muted">
        Delivery, installation and VAT/tax are confirmed by our team before any payment. Estimated items are finalised
        after artwork and specification review.
      </p>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3 py-2">
      <dt className="text-muted">{label}</dt>
      <dd className="text-right font-semibold">{value}</dd>
    </div>
  );
}
