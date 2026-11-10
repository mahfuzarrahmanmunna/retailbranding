import type { Metadata } from "next";
import { ProductList } from "@/components/product-list";
import { PageHeader, QuoteCTA } from "@/components/ui";
import { categories, products } from "@/lib/catalog";

const order = new Map(categories.map((c, i) => [c.slug, i]));
const sorted = [...products].sort((a, b) => (order.get(a.categorySlug) ?? 99) - (order.get(b.categorySlug) ?? 99));

export const metadata: Metadata = {
  title: "All Products — Signboards, 3D Letters, Lightboxes",
  description: "Browse custom signboards, 3D letters, lightboxes, acrylic and neon-style signs. Filter by indoor/outdoor, lighting and pricing type.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <>
      <PageHeader eyebrow="Products" title="All Products" bn="সব প্রোডাক্ট" crumbs={[{ label: "Products" }]}>
        Fixed-price items can be ordered directly. Made-to-order signs show an instant estimate or go to formal quotation
        after review.
      </PageHeader>
      <div className="container-page py-10">
        <ProductList items={sorted} />
      </div>
      <QuoteCTA title="Can’t find exactly what you need?" body="Most signage is custom. Describe what you want and our team will advise." />
    </>
  );
}
