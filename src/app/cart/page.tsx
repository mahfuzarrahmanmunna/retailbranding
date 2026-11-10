import type { Metadata } from "next";
import { Suspense } from "react";
import { CartView } from "@/components/cart-view";
import { PageHeader } from "@/components/ui";

export const metadata: Metadata = { title: "Your Cart", robots: { index: false } };

export default function CartPage() {
  return (
    <>
      <PageHeader title="Your Cart" bn="আপনার কার্ট" crumbs={[{ label: "Cart" }]} />
      <div className="container-page py-10">
        <Suspense fallback={<p className="card p-8 text-center text-muted">Loading your cart…</p>}>
          <CartView />
        </Suspense>
      </div>
    </>
  );
}
