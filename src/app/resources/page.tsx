import type { Metadata } from "next";
import { FAQAccordion, PageHeader, QuoteCTA, Section } from "@/components/ui";
import { faqs, materialsGuide } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Resources — Materials, Size & Artwork Guides",
  description: "Guides to choosing signage materials, measuring your sign and preparing artwork, plus answers to common questions.",
  alternates: { canonical: "/resources" },
};

export default function ResourcesPage() {
  return (
    <>
      <PageHeader eyebrow="Resources" title="Guides to Help You Decide" crumbs={[{ label: "Resources" }]}>
        Practical guidance on materials, sizing and artwork so you can plan with confidence.
      </PageHeader>

      <Section id="materials" title="Materials guide" eyebrow="Choose the right material">
        <div className="grid gap-5 md:grid-cols-2">
          {materialsGuide.map((m) => (
            <article key={m.name} className="card p-6">
              <h3 className="text-xl">{m.name}</h3>
              <dl className="mt-3 space-y-2">
                <div><dt className="font-semibold">Best for</dt><dd className="text-muted">{m.bestFor}</dd></div>
                <div><dt className="font-semibold">Look</dt><dd className="text-muted">{m.look}</dd></div>
                <div><dt className="font-semibold">Consider</dt><dd className="text-muted">{m.consider}</dd></div>
              </dl>
            </article>
          ))}
        </div>
      </Section>

      <Section id="size" title="Size guide" eyebrow="Measuring" className="bg-white">
        <div className="prose-rb max-w-3xl text-lg text-muted">
          <p><strong className="text-ink">Outer size vs letter size.</strong> For signboards and lightboxes, enter the overall outer width and height of the finished sign. For 3D letters, the outer size is the full width and height of the complete name or logo — we’ll calculate individual letter heights from your artwork.</p>
          <p><strong className="text-ink">Measure the space, not the old sign.</strong> Measure the available wall or frontage and note obstacles such as shutters, AC units, pipes or windows.</p>
          <p><strong className="text-ink">Viewing distance.</strong> Signs seen from across a road need larger lettering than signs read at the door. If you are unsure, share photos of the site and we will recommend a size.</p>
          <p><strong className="text-ink">Units.</strong> The Sign Builder accepts feet, inches and millimetres and converts automatically.</p>
        </div>
      </Section>

      <Section id="artwork" title="Artwork guide" eyebrow="Preparing files">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="card p-6">
            <h3 className="text-xl">Best: vector files</h3>
            <p className="mt-2 text-muted">AI, EPS, SVG or vector PDF. These scale to any size without losing sharpness and can be used directly for cutting and printing.</p>
          </div>
          <div className="card p-6">
            <h3 className="text-xl">Accepted for review: images</h3>
            <p className="mt-2 text-muted">PNG or JPG are fine to start a quote. For production we may need a vector version — our design team can help recreate it.</p>
          </div>
          <div className="card p-6">
            <h3 className="text-xl">Colours</h3>
            <p className="mt-2 text-muted">Share brand colour codes (Pantone, CMYK or HEX) where available. Colours on screen can look different from finished materials.</p>
          </div>
          <div className="card p-6">
            <h3 className="text-xl">Proof approval</h3>
            <p className="mt-2 text-muted">You will receive an artwork proof to approve before production. Check spelling, phone numbers and logos carefully.</p>
          </div>
        </div>
      </Section>

      <Section id="faq" title="Frequently asked questions" className="bg-white">
        <div className="max-w-3xl"><FAQAccordion items={faqs} /></div>
      </Section>
      <QuoteCTA />
    </>
  );
}
