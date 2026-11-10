import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, QuoteCTA } from "@/components/ui";

export const metadata: Metadata = {
  title: "Projects",
  description: "Completed branding and signage projects by Retail Branding.",
  alternates: { canonical: "/projects" },
};

/**
 * Case studies are intentionally empty until real projects with verified
 * client permission are supplied (blueprint §2, §11, §17). Each case study
 * needs: location, objective, scope, materials, before/during/after photos.
 */
export default function ProjectsPage() {
  return (
    <>
      <PageHeader eyebrow="Projects" title="Real Projects. Real Brand Presence." crumbs={[{ label: "Projects" }]}>
        Explore completed branding work, materials, installation challenges and the final outcome.
      </PageHeader>
      <div className="container-page py-14">
        <div className="card mx-auto max-w-2xl p-8 text-center">
          <h2 className="text-2xl">Case studies coming soon</h2>
          <p className="mt-3 text-muted">
            We publish projects only with our clients’ permission, including the location, scope and genuine photos.
            In the meantime, our team can share relevant examples with you directly.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="btn btn-primary">Ask for examples</Link>
            <Link href="/products" className="btn btn-outline">Explore products</Link>
          </div>
        </div>
      </div>
      <QuoteCTA />
    </>
  );
}
