import { categories, type Product } from "@/lib/catalog";
import { ProductFilter } from "./product-filter";
import { ProductCard } from "./ui";

/** Server-renders every card, then lets the client filter them without refetching. */
export function ProductList({ items, hideCategory }: { items: Product[]; hideCategory?: boolean }) {
  const cards = Object.fromEntries(items.map((p) => [p.slug, <ProductCard key={p.slug} product={p} />]));
  return (
    <ProductFilter
      hideCategory={hideCategory}
      categories={categories.map((c) => ({ slug: c.slug, name: c.name }))}
      cards={cards}
      items={items.map((p) => ({
        slug: p.slug,
        category: p.categorySlug,
        environment: p.environment,
        illuminated: p.illumination !== "none",
        mode: p.pricingMode,
      }))}
    />
  );
}
