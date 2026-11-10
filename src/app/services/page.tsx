import type { Metadata } from "next";
import { IconBadgeCheck, IconPalette, IconRuler, IconWrench } from "@/components/icons";
import { PageHeader, QuoteCTA, Section } from "@/components/ui";
import { services } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Services",
  description: "Design support, site survey, manufacturing and installation for custom signage.",
  alternates: { canonical: "/services" },
};

const ICONS = { design: IconPalette, "site-survey": IconRuler, manufacturing: IconBadgeCheck, installation: IconWrench } as Record<string, typeof IconPalette>;

export default function ServicesPage() {
  const offered = services.filter((s) => s.offered);
  return (
    <>
      <PageHeader eyebrow="Services" title="From Idea to Installation" crumbs={[{ label: "Services" }]}>
        Share your requirements, review materials and designs, approve the scope, and let our team coordinate production
        and installation according to the agreed quotation.
      </PageHeader>
      <Section title="What we do">
        <ol className="grid gap-5 md:grid-cols-2">
          {offered.map((s, i) => {
            const Icon = ICONS[s.slug] ?? IconBadgeCheck;
            return (
              <li key={s.slug} id={s.slug} className="card flex gap-4 p-6">
                <span className="grid size-12 shrink-0 place-items-center rounded-none bg-yellow text-navy-900"><Icon width={24} height={24} /></span>
                <div>
                  <p className="text-sm font-bold text-muted">Step {i + 1}</p>
                  <h2 className="text-xl">{s.name}</h2>
                  <p className="mt-1 text-muted">{s.summary}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </Section>
      <QuoteCTA title="Request a Site Visit" body="Tell us where your site is and what you have in mind. We’ll arrange a survey where needed." />
    </>
  );
}
