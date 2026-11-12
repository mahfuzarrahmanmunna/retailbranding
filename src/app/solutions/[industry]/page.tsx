import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IconCheck } from "@/components/icons";
import { PageHeader, ProductCard, QuoteCTA } from "@/components/ui";
import { getProduct, getSolution, solutions } from "@/lib/catalog";

export function generateStaticParams() {
  return solutions.map((s) => ({ industry: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/solutions/[industry]">): Promise<Metadata> {
  const { industry } = await params;
  const s = getSolution(industry);
  if (!s) return {};
  return { title: `${s.name} Signage`, description: s.intro, alternates: { canonical: `/solutions/${s.slug}` } };
}

export default async function SolutionPage({ params }: PageProps<"/solutions/[industry]">) {
  const { industry } = await params;
  const solution = getSolution(industry);
  if (!solution) notFound();
  const items = solution.productSlugs.map(getProduct).filter((p) => !!p);

  return (
    <>
      <PageHeader eyebrow={`Solutions · ${solution.name}`} title={solution.headline} crumbs={[{ label: "Solutions", href: "/solutions" }, { label: solution.name }]}>
        {solution.intro}
      </PageHeader>
      <div className="container-page grid gap-10 py-10 lg:grid-cols-[320px_1fr]">
        <aside className="card self-start p-6">
          <h2 className="text-xl">What to consider</h2>
          <ul className="mt-3 space-y-2">
            {solution.considerations.map((c) => (
              <li key={c} className="flex gap-2"><IconCheck className="mt-1 shrink-0 text-success" />{c}</li>
            ))}
          </ul>
          <Link href="#" className="btn btn-primary mt-6 w-full">Plan my {solution.name.toLowerCase()} project</Link>
        </aside>
        <div>
          <h2 className="mb-5 text-2xl">Recommended products</h2>
          <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {items.map((p) => (
              <li key={p.slug}><ProductCard product={p} /></li>
            ))}
          </ul>
        </div>
      </div>
      <QuoteCTA />
    </>
  );
}
