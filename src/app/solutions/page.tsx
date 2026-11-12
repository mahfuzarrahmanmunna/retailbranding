import type { Metadata } from "next";
import Link from "next/link";
import { IconArrowRight } from "@/components/icons";
import { PageHeader, QuoteCTA } from "@/components/ui";
import { solutions } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Solutions by Industry",
  description: "Signage solutions for fashion, grocery, pharmacy, restaurants, corporate offices, malls and multi-branch businesses.",
  alternates: { canonical: "/solutions" },
};

export default function SolutionsPage() {
  return (
    <>
      <PageHeader eyebrow="Solutions" title="Built Around Your Business" crumbs={[{ label: "Solutions" }]}>
        A fashion showroom, pharmacy, supermarket and restaurant do not need the same signage. Explore solutions based on
        your space, visibility, brand style and operating environment.
      </PageHeader>
      <div className="container-page py-10">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((s) => (
            <li key={s.slug}>
              <Link href="#" className="card card-link group flex h-full flex-col p-6">
                <h2 className="text-2xl">{s.name}</h2>
                <p className="mt-1 font-semibold text-ink">{s.headline}</p>
                <p className="mt-2 flex-1 text-muted">{s.intro}</p>
                <span className="mt-4 inline-flex items-center gap-1 font-bold text-navy">Explore <IconArrowRight className="card-arrow-icon" /></span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <QuoteCTA />
    </>
  );
}
