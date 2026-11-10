import type { Metadata } from "next";
import Link from "next/link";
import { QuoteForm } from "@/components/quote-form";
import { ContactLinks, PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Request a Quote",
  description: "Tell us about your signage project — one sign or branding for multiple outlets. Share dimensions, location and artwork for a formal quotation.",
  alternates: { canonical: "/quote" },
};

export default function QuotePage() {
  return (
    <>
      <PageHeader eyebrow="Request a Quote" title="Tell Us About Your Signage Project" bn="কোটেশন নিন" crumbs={[{ label: "Request a Quote" }]}>
        Whether you need one sign or branding for multiple outlets, share the dimensions, location and artwork. Our team
        will review your requirements and provide the next steps.
      </PageHeader>
      <div className="container-page grid gap-10 py-10 lg:grid-cols-[1fr_340px]">
        <div className="card p-5 md:p-8">
          <QuoteForm kind="project" showProject submitLabel="Send Project Request" />
        </div>
        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <div className="card p-5">
            <h2 className="text-lg">Know the exact sign you want?</h2>
            <p className="mt-1 text-muted">Use the Sign Builder to set size, materials and lighting and see an estimate first.</p>
            <Link href="/customize" className="btn btn-secondary mt-4 w-full">Open Sign Builder</Link>
          </div>
          <div className="card p-5">
            <h2 className="text-lg">Helpful to include</h2>
            <ul className="mt-2 list-inside list-disc space-y-1 text-muted">
              <li>Approximate width and height of the wall or frontage</li>
              <li>Photos of the site</li>
              <li>Your logo (vector preferred)</li>
              <li>Number of outlets and their districts</li>
              <li>Your deadline</li>
            </ul>
          </div>
          <ContactLinks message="Hello, I'd like a quotation for signage." />
        </aside>
      </div>
    </>
  );
}
