import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { ContactLinks, FAQAccordion, PageHeader } from "@/components/ui";
import { faqs } from "@/lib/catalog";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Retail Branding for product guidance, site survey requests, quotations and project discussions.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader eyebrow="Contact" title="Let’s Build Your Brand Presence" bn="বিশেষজ্ঞের সাথে কথা বলুন" crumbs={[{ label: "Contact" }]}>
        Contact our team for product guidance, site survey requests, quotations and project discussions.
      </PageHeader>
      <div className="container-page grid gap-10 py-10 lg:grid-cols-[1fr_380px]">
        <div className="card p-5 md:p-8">
          <ContactForm />
        </div>
        <aside className="space-y-5">
          <div className="card p-5">
            <h2 className="text-lg">Office</h2>
            <address className="mt-2 not-italic text-muted">
              {site.contact.address.map((l) => (
                <span key={l} className="block">{l}</span>
              ))}
            </address>
            {site.contact.email && (
              <p className="mt-3">
                <a href={`mailto:${site.contact.email}`} className="font-semibold text-navy underline">{site.contact.email}</a>
              </p>
            )}
            <ContactLinks className="mt-4" />
          </div>
          <div className="card p-5">
            <h2 className="text-lg">Need a price?</h2>
            <p className="mt-1 text-muted">A quote request with your size and location gets you the fastest answer.</p>
            <Link href="#" className="btn btn-primary mt-4 w-full">Request a Quote</Link>
          </div>
        </aside>
      </div>
      <section aria-labelledby="contact-faq" className="container-page max-w-3xl pb-16">
        <h2 id="contact-faq" className="mb-6 text-3xl">Common questions</h2>
        <FAQAccordion items={faqs} />
      </section>
    </>
  );
}
