import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SignArt } from "@/components/brand";
import { ProductList } from "@/components/product-list";
import { PageHeader, QuoteCTA } from "@/components/ui";
import { categories, getCategory, productsInCategory } from "@/lib/catalog";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/categories/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = getCategory(slug);
  if (!c) return {};
  return { title: c.name, description: c.intro, alternates: { canonical: `/categories/${c.slug}` } };
}

export default async function CategoryPage({ params }: PageProps<"/categories/[slug]">) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  const items = productsInCategory(slug);

  return (
    <>
      <PageHeader
        eyebrow="Category"
        title={category.name}
        bn={category.nameBn}
        crumbs={[{ label: "Products", href: "/products" }, { label: category.name }]}
      >
        {category.intro}
      </PageHeader>

      <div className="container-page grid gap-8 py-10 lg:grid-cols-[1fr_320px]">
        <div>
          <ProductList items={items} hideCategory />
        </div>
        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <div className="card overflow-hidden">
            <SignArt kind={category.art} label={category.name} />
            <div className="p-5">
              <h2 className="text-lg">Common applications</h2>
              <ul className="mt-2 list-inside list-disc text-muted">
                {category.applications.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
              <h2 className="mt-4 text-lg">Types we cover</h2>
              <ul className="mt-2 flex flex-wrap gap-2">
                {category.subcategories.map((s) => (
                  <li key={s} className="rounded-full bg-navy-50 px-3 py-1 text-sm font-semibold text-navy">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="card p-5">
            <h2 className="text-lg">Unsure? Ask an expert</h2>
            <p className="mt-1 text-muted">Tell us about your space and we’ll recommend the right option.</p>
            <Link href="/quote" className="btn btn-primary mt-4 w-full">
              Request a Quote
            </Link>
          </div>
        </aside>
      </div>
      <QuoteCTA />
    </>
  );
}
