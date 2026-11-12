import Link from "next/link";
import { SignArt } from "@/components/brand";
import {
  IconArrowRight,
  IconBadgeCheck,
  IconCheck,
  IconPalette,
  IconRuler,
  IconSliders,
  IconTruck,
  IconUpload,
  IconWrench,
} from "@/components/icons";
import { FAQAccordion, ProductCard, QuoteCTA, Section } from "@/components/ui";
import { PricingChip, SignboardCategoryCard, SignboardHelpCard } from "@/components/signboard-card";
import { categories, faqs, materialsGuide, products, productsInCategory, solutions } from "@/lib/catalog";

export default function HomePage() {
  const featured = products.filter((p) => p.featured).slice(0, 6);

  return (
    <>
      <Hero />

      <Section
        id="categories"
        eyebrow="Products"
        className="bg-[radial-gradient(ellipse_at_top,_#eef0fa,_transparent_60%)]"
        title="Shop by Signage Type"
        intro="Start with the type of sign you need. Every category shows whether items have a fixed price, an instant estimate, or need a quotation."
        action={
          <Link href="#" className="btn btn-outline">
            All products <IconArrowRight />
          </Link>
        }
      >
        <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
          <span className="font-bold text-navy">Pricing key:</span>
          <span className="inline-flex items-center gap-2">
            <PricingChip mode="fixed" /> Order directly
          </span>
          <span className="inline-flex items-center gap-2">
            <PricingChip mode="estimate" /> Live estimate in the builder
          </span>
          <span className="inline-flex items-center gap-2">
            <PricingChip mode="quote" /> Priced after site review
          </span>
        </div>
        <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {categories.map((c) => {
            const items = productsInCategory(c.slug);
            const modes = Array.from(new Set(items.map((p) => p.pricingMode)));
            return (
              <li key={c.slug}>
                <SignboardCategoryCard category={c} count={items.length} modes={modes} />
              </li>
            );
          })}
          <li>
            <SignboardHelpCard />
          </li>
        </ul>
      </Section>

      <HowItWorks />

      <Section
        id="featured"
        eyebrow="Popular"
        title="Featured Products"
        className="bg-white"
        action={
          <Link href="#" className="btn btn-outline">
            Browse all <IconArrowRight />
          </Link>
        }
      >
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <li key={p.slug}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      </Section>

      <CustomizerTeaser />

      <Section
        id="solutions"
        eyebrow="Solutions"
        title="Built Around Your Business"
        intro="A fashion showroom, pharmacy, supermarket and restaurant do not need the same signage."
      >
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {solutions.map((s) => (
            <li key={s.slug}>
              <Link
                href="#"
                className="card card-link group flex h-full items-start justify-between gap-3 p-5"
              >
                <span>
                  <span className="block text-lg font-extrabold text-navy">{s.name}</span>
                  <span className="mt-1 block text-[15px] text-muted">{s.headline}</span>
                </span>
                <IconArrowRight className="card-arrow-icon mt-1 shrink-0 text-navy" />
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="projects"
        eyebrow="Projects"
        title="Built for Real Businesses"
        className="bg-white"
        intro="We only publish completed work with verified client permission, including location, scope and photos."
      >
        <div className="card flex flex-col items-start gap-4 bg-canvas p-6 md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl text-muted">
            Our first case studies are being prepared. Want to see examples relevant to your business? Ask our team and
            we&apos;ll share past work privately.
          </p>
          <Link href="#" className="btn btn-outline shrink-0">
            View projects
          </Link>
        </div>
      </Section>

      <MaterialsGuide />

      <TrustProcess />

      <Section id="faq" eyebrow="FAQ" title="Common Questions, Clear Answers" className="bg-white">
        <div className="max-w-3xl">
          <FAQAccordion items={faqs} />
        </div>
      </Section>

      <QuoteCTA />
    </>
  );
}

function Hero() {
  return (
    <section aria-labelledby="hero-title" className="on-dark relative overflow-hidden bg-navy text-white">
      <div className="container-page grid items-center gap-10 py-12 md:py-20 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="mb-4 inline-flex rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-yellow">
            Signboards · 3D Letters · Lightboxes · Illuminated Signs
          </p>
          <h1 id="hero-title" className="text-[2.25rem] !text-white sm:text-5xl lg:text-[3.75rem]">
            Make Your Brand <span className="text-yellow">Impossible to Ignore.</span>
          </h1>
          <p lang="bn" className="mt-3 text-xl font-semibold text-white/90 sm:text-2xl">
            আপনার ব্র্যান্ডকে দিন নজরকাড়া পরিচয়।
          </p>
          <p className="mt-5 max-w-xl text-lg text-white/85">
            From storefront signboards to illuminated branding, create the right look for your business with
            custom-made solutions.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="#" className="btn btn-primary text-[17px]">
              Customize &amp; Get Price <IconArrowRight />
            </Link>
            <Link href="#" className="btn btn-ghost-light text-[17px]">
              Explore Products
            </Link>
          </div>
          <ul className="mt-8 grid gap-2 text-[15px] text-white/85 sm:grid-cols-2">
            {["Transparent options & estimates", "Artwork review before production", "Clear installation scope", "Talk to a real person"].map(
              (t) => (
                <li key={t} className="flex items-center gap-2">
                  <IconCheck className="shrink-0 text-yellow" /> {t}
                </li>
              ),
            )}
          </ul>
        </div>
        <div className="relative hidden sm:block">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 overflow-hidden rounded-none ring-1 ring-white/15">
              <SignArt kind="fascia" label="Illuminated shop fascia signboard" />
            </div>
            <div className="overflow-hidden rounded-none ring-1 ring-white/15">
              <SignArt kind="letters" label="3D acrylic letters" />
            </div>
            <div className="overflow-hidden rounded-none ring-1 ring-white/15">
              <SignArt kind="neon" label="Neon-style LED sign" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { Icon: IconSliders, title: "Choose", body: "Pick a sign type or start from your idea." },
    { Icon: IconRuler, title: "Customize", body: "Set size, material, lighting and upload your logo." },
    { Icon: IconBadgeCheck, title: "Approve", body: "Review the quotation and artwork proof before production." },
    { Icon: IconTruck, title: "Receive", body: "Delivery or installation as agreed in your quotation." },
  ];
  return (
    <Section id="how" eyebrow="How it works" title="Four Clear Steps" className="bg-white">
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map(({ Icon, title, body }, i) => (
          <li key={title} className="card relative p-6">
            <span className="absolute right-5 top-5 text-4xl font-black text-navy/10">{i + 1}</span>
            <span className="grid size-12 place-items-center rounded-none bg-yellow text-navy-900">
              <Icon width={24} height={24} />
            </span>
            <h3 className="mt-4 text-xl">{title}</h3>
            <p className="mt-1 text-muted">{body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function CustomizerTeaser() {
  return (
    <section aria-labelledby="teaser-title" className="py-14 md:py-20">
      <div className="container-page">
        <div className="card grid overflow-hidden lg:grid-cols-2">
          <div className="p-8 md:p-12">
            <p className="eyebrow mb-2">Custom Sign Builder</p>
            <h2 id="teaser-title" className="text-[1.75rem] md:text-4xl">
              Design a Sign That Fits Your Space
            </h2>
            <p className="mt-3 text-lg text-muted">
              Enter your dimensions in feet, inches or millimetres, choose materials and lighting, and see how each
              choice affects your estimate — then send it to our team for review.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                { Icon: IconRuler, t: "Live unit conversion and size checks" },
                { Icon: IconPalette, t: "Only compatible materials and finishes" },
                { Icon: IconUpload, t: "Upload your logo (AI, EPS, SVG, PDF, PNG, JPG)" },
                { Icon: IconWrench, t: "Add installation and site details" },
              ].map(({ Icon, t }) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-lg bg-navy-50 text-navy">
                    <Icon />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <Link href="#" className="btn btn-secondary mt-8">
              Start customizing <IconArrowRight />
            </Link>
          </div>
          <div className="flex items-center justify-center bg-navy-50 p-8">
            <div className="w-full max-w-sm rounded-none bg-white p-5 shadow-xl" aria-hidden="true">
              <p className="text-sm font-bold text-muted">Step 2 of 7 · Dimensions</p>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-line p-3">
                  <p className="text-xs text-muted">Width</p>
                  <p className="text-xl font-extrabold text-navy">12 ft</p>
                </div>
                <div className="rounded-lg border border-line p-3">
                  <p className="text-xs text-muted">Height</p>
                  <p className="text-xl font-extrabold text-navy">3 ft</p>
                </div>
              </div>
              <div className="mt-3 flex gap-2 text-sm font-bold">
                <span className="rounded-full bg-navy px-3 py-1 text-white">ft</span>
                <span className="rounded-full border border-line px-3 py-1">in</span>
                <span className="rounded-full border border-line px-3 py-1">mm</span>
              </div>
              <div className="mt-4 rounded-lg bg-yellow-50 p-3">
                <p className="text-xs font-bold text-muted">Estimated price</p>
                <p className="text-sm text-muted">Updates as you choose options</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MaterialsGuide() {
  return (
    <Section
      id="materials"
      eyebrow="Materials guide"
      title="Choose the Right Material"
      intro="A quick comparison to help you decide. Our team will confirm suitability for your site."
      action={
        <Link href="#" className="btn btn-outline">
          Full guide <IconArrowRight />
        </Link>
      }
    >
      <div className="overflow-x-auto rounded-none border border-line bg-white">
        <table className="w-full min-w-[640px] text-left">
          <caption className="sr-only">Comparison of common signage materials</caption>
          <thead className="bg-navy-50 text-sm text-navy">
            <tr>
              <th scope="col" className="px-5 py-3">Material</th>
              <th scope="col" className="px-5 py-3">Best for</th>
              <th scope="col" className="px-5 py-3">Look</th>
              <th scope="col" className="px-5 py-3">Consider</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {materialsGuide.map((m) => (
              <tr key={m.name}>
                <th scope="row" className="px-5 py-4 font-extrabold text-navy">{m.name}</th>
                <td className="px-5 py-4">{m.bestFor}</td>
                <td className="px-5 py-4 text-muted">{m.look}</td>
                <td className="px-5 py-4 text-muted">{m.consider}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}

function TrustProcess() {
  const points = [
    { title: "Clear options", body: "See which choices are available for each product, and how they affect your estimate." },
    { title: "Estimates labelled as estimates", body: "Fixed prices, estimates and items needing a quote are always clearly marked." },
    { title: "Artwork proof first", body: "Nothing goes into production until you approve the artwork and quotation." },
    { title: "Installation scope in writing", body: "Installation charges and exclusions are confirmed in your quotation before you pay." },
  ];
  return (
    <Section id="trust" eyebrow="Our process" title="What You Can Expect" className="bg-white">
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {points.map((p) => (
          <li key={p.title} className="rounded-none border-l-4 border-yellow bg-canvas p-6">
            <h3 className="text-lg">{p.title}</h3>
            <p className="mt-2 text-muted">{p.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
