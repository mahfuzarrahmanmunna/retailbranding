import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, QuoteCTA, Section } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "Retail Branding is the branding and signage concern of Retail Solutions Limited.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About us" title="Branding That Works Beyond the First Impression" crumbs={[{ label: "About" }]}>
        {/* VERIFY: confirm exact in-house scope before publishing (blueprint §11). */}
        Retail Branding is a specialized branding and signage concern of {site.legalName}. We help businesses translate
        their identity into physical signage and branded spaces through planning, design coordination, production and
        installation services.
      </PageHeader>
      <Section title="How we work" eyebrow="Our approach">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { t: "Listen first", b: "We start from your business, your site and your customers — not from a catalogue." },
            { t: "Be clear about cost", b: "Fixed prices, estimates and quotations are always labelled for what they are." },
            { t: "Approve before we build", b: "Nothing is produced until you approve the artwork proof and the quotation." },
          ].map((x) => (
            <div key={x.t} className="card p-6">
              <h3 className="text-xl">{x.t}</h3>
              <p className="mt-2 text-muted">{x.b}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-muted">
          Learn more about our parent company at{" "}
          <Link href={site.parentSite} className="font-semibold text-navy underline" rel="noopener">retailsolutionsltd.com</Link>.
        </p>
      </Section>
      <QuoteCTA />
    </>
  );
}
