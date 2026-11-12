import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SignArt } from "@/components/brand";
import { ProductConfigurator } from "@/components/configurator";
import { IconCheck, IconChevronDown } from "@/components/icons";
import { Breadcrumbs, ContactLinks, FAQAccordion, PriceLabel, ProductCard } from "@/components/ui";
import {
  faqs,
  finishOptions,
  getCategory,
  getProduct,
  lightingOptions,
  materialOptions,
  mountingOptions,
  optionLabel,
  products,
  thicknessOptions,
} from "@/lib/catalog";
import { formatDims } from "@/lib/units";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return { title: p.name, description: p.summary, alternates: { canonical: `/products/${p.slug}` } };
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const category = getCategory(product.categorySlug);
  const related = products.filter((p) => p.categorySlug === product.categorySlug && p.slug !== product.slug).slice(0, 3);
  const fillers = products.filter((p) => p.featured && p.slug !== product.slug && !related.includes(p));
  const relatedProducts = [...related, ...fillers].slice(0, 3);

  const list = (ids: string[], options: typeof materialOptions) => ids.map((id) => optionLabel(options, id)).join(", ") || "—";
  const specs: [string, string][] = [
    ["SKU / type", product.sku],
    ["Intended use", product.intendedUse],
    ["Environment", product.environment.map((e) => (e === "indoor" ? "Indoor" : "Outdoor")).join(" / ") + " (subject to specification)"],
    ["Materials", list(product.materials, materialOptions)],
    ...(product.thicknesses.length ? [["Thickness options", list(product.thicknesses, thicknessOptions)] as [string, string]] : []),
    ["Lighting", list(product.lighting, lightingOptions)],
    ["Mounting", list(product.mounting, mountingOptions)],
    ["Finishes", list(product.finishes, finishOptions)],
    [
      "Size range",
      product.presets
        ? product.presets.map((p) => p.label).join(" · ")
        : `${formatDims(product.limits.minWidthMm, product.limits.minHeightMm, "mm")} to ${formatDims(product.limits.maxWidthMm, product.limits.maxHeightMm, "mm")} (outer size)`,
    ],
    ["Lead time", product.leadTime],
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.summary,
    sku: product.sku,
    brand: { "@type": "Brand", name: "Retail Branding" },
    category: category?.name,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <div className="bg-white">
        <div className="container-page py-8 md:py-12">
          <Breadcrumbs
            items={[
              { label: "Products", href: "/products" },
              ...(category ? [{ label: category.name, href: `/categories/${category.slug}` }] : []),
              { label: product.name },
            ]}
          />
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <div className="overflow-hidden rounded-none border border-line">
                <SignArt kind={product.art} label={product.name} />
              </div>
              <p className="mt-2 text-sm text-muted">
                Illustration only. Photos of completed work will be added as projects are approved for publication.
              </p>
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-muted">
                {category?.name} · {product.sku}
              </p>
              <h1 className="mt-2 text-[2rem] md:text-[2.75rem]">{product.name}</h1>
              <p className="mt-4 text-lg text-muted">{product.summary}</p>
              <div className="mt-4">
                <PriceLabel product={product} />
              </div>
              <ul className="mt-6 space-y-2">
                {product.highlights.map((h) => (
                  <li key={h} className="flex gap-2">
                    <IconCheck className="mt-1 shrink-0 text-success" /> {h}
                  </li>
                ))}
              </ul>
              <p className="mt-6 rounded-none bg-canvas p-4 text-[15px]">
                <strong>Lead time:</strong> {product.leadTime}.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#configure" className="btn btn-primary">
                  {product.pricingMode === "quote" ? "Specify & Request Quote" : "Customize & Get Price"}
                </a>
                <Link href="#" className="btn btn-outline">
                  Request a Site Visit
                </Link>
              </div>
              <ContactLinks className="mt-3" message={`Hello, I have a question about: ${product.name}`} />
            </div>
          </div>
        </div>
      </div>

      <section id="configure" aria-labelledby="configure-title" className="scroll-mt-20 py-12 md:py-16">
        <div className="container-page">
          <h2 id="configure-title" className="mb-2 text-[1.75rem] md:text-4xl">
            Customize Your Sign
          </h2>
          <p lang="bn" className="mb-8 font-semibold text-muted">
            আপনার সাইনবোর্ড কাস্টমাইজ করুন
          </p>
          <ProductConfigurator product={product} />
        </div>
      </section>

      <section aria-labelledby="details-title" className="bg-white py-12 md:py-16">
        <div className="container-page max-w-4xl">
          <h2 id="details-title" className="mb-6 text-[1.75rem] md:text-3xl">
            Product details
          </h2>
          <div className="divide-y divide-line rounded-none border border-line">
            <Tab title="Description" open>
              <p>{product.description}</p>
            </Tab>
            <Tab title="Specifications">
              <dl className="grid gap-x-6 gap-y-2 sm:grid-cols-[200px_1fr]">
                {specs.map(([k, v]) => (
                  <div key={k} className="contents">
                    <dt className="font-semibold text-ink">{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </Tab>
            <Tab title="Material care">
              <p>
                Clean with a soft, damp cloth. Avoid abrasive cleaners and solvents on acrylic and printed surfaces. For
                illuminated signs, switch off power before cleaning. Detailed care guidance is provided with your order.
              </p>
            </Tab>
            <Tab title="Artwork guide">
              <ul className="list-inside list-disc space-y-1">
                <li>Vector files (AI, EPS, SVG, PDF) give the sharpest results.</li>
                <li>PNG/JPG are accepted for review; we may ask for a vector version before production.</li>
                <li>Share brand colour codes (Pantone, CMYK or HEX) if you have them.</li>
                <li>You will approve an artwork proof before anything is produced.</li>
              </ul>
              <Link href="#" className="mt-3 inline-block font-semibold text-navy underline">
                Read the full artwork guide
              </Link>
            </Tab>
            <Tab title="Warranty">
              <p>
                Warranty scope and duration depend on the final materials and specification and will be stated in your
                quotation or order confirmation.
              </p>
            </Tab>
            <Tab title="Delivery & installation">
              <p>
                Delivery and installation are available on request. Charges depend on location, height, access and site
                conditions, and are confirmed before payment. Some installations require a site survey first.
              </p>
            </Tab>
            <Tab title="FAQs">
              <FAQAccordion items={faqs.slice(0, 4)} />
            </Tab>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section aria-labelledby="related-title" className="py-12 md:py-16">
          <div className="container-page">
            <h2 id="related-title" className="mb-6 text-[1.75rem] md:text-3xl">
              Related products
            </h2>
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((p) => (
                <li key={p.slug}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Sticky mobile CTA (blueprint §7) — sits above the bottom navigation. */}
      <div className="fixed inset-x-0 bottom-[calc(3.5rem+env(safe-area-inset-bottom))] z-30 border-t border-line bg-white/95 p-3 backdrop-blur md:hidden">
        <a href="#configure" className="btn btn-primary w-full">
          {product.pricingMode === "quote" ? "Specify & Get Quote" : "Customize / Get Quote"}
        </a>
      </div>
      <div className="h-16 md:hidden" aria-hidden="true" />
    </>
  );
}

function Tab({ title, children, open }: { title: string; children: React.ReactNode; open?: boolean }) {
  return (
    <details className="group" open={open}>
      <summary className="flex min-h-14 items-center justify-between px-5 py-4 text-lg font-bold text-navy">
        {title}
        <IconChevronDown className="transition-transform group-open:rotate-180" />
      </summary>
      <div className="px-5 pb-6 text-muted">{children}</div>
    </details>
  );
}
