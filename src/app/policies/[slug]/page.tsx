import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Notice, PageHeader } from "@/components/ui";
import { site } from "@/lib/site";

/**
 * DRAFT policy pages (blueprint §18). These outline the topics each policy
 * must cover. They must be written/approved by management and reviewed by a
 * local legal advisor before launch.
 */
const policies: Record<string, { title: string; sections: { h: string; p: string }[] }> = {
  privacy: {
    title: "Privacy Notice",
    sections: [
      { h: "What we collect", p: "Your name, mobile number, optional email, delivery or site address, project details and any files you upload (logos, artwork, site photos)." },
      { h: "Why we use it", p: "To prepare quotations, process orders, arrange delivery and installation, and contact you about your request. We do not use it for marketing unless you separately agree." },
      { h: "Who we share it with", p: "Only with staff and partners who need it to fulfil your request, such as delivery or installation teams." },
      { h: "Uploaded files", p: "Your files are stored privately and are not publicly accessible. They are used only for your project." },
      { h: "Retention", p: "[To be defined — how long enquiries, orders and files are kept.]" },
      { h: "Your choices", p: `Contact ${site.legalName} to access, correct or delete your information.` },
    ],
  },
  terms: {
    title: "Order Terms",
    sections: [
      { h: "Quotations", p: "Quotations state scope, exclusions, taxes and a validity period. Prices for made-to-order items are confirmed only in a formal quotation." },
      { h: "Estimates", p: "Estimates shown on the website are indicative and are not an offer. The final price is confirmed after review." },
      { h: "Artwork approval", p: "Production starts only after you approve the artwork proof. Please check all text, numbers and logos carefully." },
      { h: "Payment", p: "[To be defined — deposit rules, payment methods, invoicing and VAT/tax handling.]" },
      { h: "Delivery & installation", p: "[To be defined — service areas, lead-time ranges, access requirements and exclusions.]" },
    ],
  },
  "cancellations-refunds": {
    title: "Cancellations & Refunds",
    sections: [
      { h: "Custom-made products", p: "Signage is manufactured to your specification. [To be defined — cancellation and refund rules before and after production starts.]" },
      { h: "Defects and damage", p: "[To be defined — how to report issues and how they are resolved.]" },
      { h: "Warranty", p: "Warranty scope and duration depend on materials and specification and will be stated in your quotation." },
    ],
  },
  artwork: {
    title: "Artwork, Proofs & Ownership",
    sections: [
      { h: "Your artwork", p: "You confirm you have the right to use any logo, trademark or artwork you upload." },
      { h: "Proofs", p: "We provide an artwork proof for approval before production. [To be defined — number of included design revisions.]" },
      { h: "Design ownership", p: "[To be defined — ownership of designs created by our team.]" },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(policies).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/policies/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = policies[slug];
  return p ? { title: p.title, robots: { index: false } } : {};
}

export default async function PolicyPage({ params }: PageProps<"/policies/[slug]">) {
  const { slug } = await params;
  const policy = policies[slug];
  if (!policy) notFound();
  return (
    <>
      <PageHeader title={policy.title} crumbs={[{ label: policy.title }]} />
      <div className="container-page max-w-3xl py-10">
        <Notice tone="warn">Draft — this policy is being finalised and will be updated after legal review.</Notice>
        <div className="mt-8 space-y-6">
          {policy.sections.map((s) => (
            <section key={s.h}>
              <h2 className="text-xl">{s.h}</h2>
              <p className="mt-2 text-muted">{s.p}</p>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
