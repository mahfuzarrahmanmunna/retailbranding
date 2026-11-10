import type { Metadata } from "next";
import { Suspense } from "react";
import { CheckoutForm } from "@/components/checkout-form";
import { PageHeader } from "@/components/ui";

export const metadata: Metadata = { title: "Checkout", robots: { index: false } };

export default function CheckoutPage() {
  return (
    <>
      <PageHeader title="Checkout" bn="অর্ডার সম্পন্ন করুন" crumbs={[{ label: "Cart", href: "/cart" }, { label: "Checkout" }]}>
        Guest checkout — no account needed. Your phone number is all we need to reach you.
      </PageHeader>
      <div className="container-page py-10">
        <Suspense fallback={<p className="card p-8 text-center text-muted">Loading checkout…</p>}>
          <CheckoutForm />
        </Suspense>
      </div>
    </>
  );
}
