import Link from "next/link";
import type { ReactNode } from "react";
import { categories, getCategory, type Category, type Product } from "@/lib/catalog";
import { mainNav, phoneLink, site, whatsappLink } from "@/lib/site";
import { formatBDT } from "@/lib/units";
import { Logo, SignArt } from "./brand";
import { IconArrowRight, IconChat, IconChevronDown, IconPhone } from "./icons";

export function PageHeader({
  eyebrow,
  title,
  bn,
  children,
  crumbs,
}: {
  eyebrow?: string;
  title: string;
  bn?: string;
  children?: ReactNode;
  crumbs?: { label: string; href?: string }[];
}) {
  return (
    <div className="border-b border-line bg-white">
      <div className="container-page py-10 md:py-14">
        {crumbs && <Breadcrumbs items={crumbs} />}
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h1 className="max-w-3xl text-[2rem] md:text-5xl">{title}</h1>
        {bn && (
          <p lang="bn" className="mt-2 text-lg font-semibold text-muted">
            {bn}
          </p>
        )}
        {children && <div className="mt-4 max-w-2xl text-lg text-muted">{children}</div>}
      </div>
    </div>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-sm">
      <ol className="flex flex-wrap items-center gap-1.5 text-muted">
        <li>
          <Link href="#" className="underline-offset-4 hover:underline">
            Home
          </Link>
        </li>
        {items.map((c, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <span aria-hidden="true">/</span>
            {c.href ? (
              <Link href="#" className="underline-offset-4 hover:underline">
                {c.label}
              </Link>
            ) : (
              <span aria-current="page" className="font-semibold text-ink">
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className = "",
  action,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  children: ReactNode;
  className?: string;
  action?: ReactNode;
}) {
  const headingId = id ? `${id}-title` : undefined;
  return (
    <section id={id} aria-labelledby={headingId} className={`py-14 md:py-20 ${className}`}>
      <div className="container-page">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-10">
          <div className="max-w-2xl">
            {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
            <h2 id={headingId} className="text-[1.75rem] md:text-4xl">
              {title}
            </h2>
            {intro && <p className="mt-3 text-lg text-muted">{intro}</p>}
          </div>
          {action}
        </div>
        {children}
      </div>
    </section>
  );
}

export function PriceLabel({ product }: { product: Product }) {
  if (product.pricingMode === "fixed" && product.presets?.length) {
    const from = Math.min(...product.presets.map((p) => p.price));
    return (
      <p className="text-sm">
        <span className="font-semibold text-muted">From </span>
        <span className="text-base font-extrabold text-ink">{formatBDT(from)}</span>
        <span className="ml-2 rounded bg-[#e7f4ed] px-1.5 py-0.5 text-xs font-bold text-success">Fixed price</span>
      </p>
    );
  }
  if (product.pricingMode === "estimate") {
    return (
      <p className="text-sm">
        <span className="rounded bg-yellow-50 px-1.5 py-0.5 text-xs font-bold text-navy">Instant estimate</span>
        <span className="ml-2 text-muted">Final price after review</span>
      </p>
    );
  }
  return (
    <p className="text-sm">
      <span className="rounded bg-navy-50 px-1.5 py-0.5 text-xs font-bold text-navy">Quote required</span>
      <span className="ml-2 text-muted">Priced after technical review</span>
    </p>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const category = getCategory(product.categorySlug);
  return (
    <article className="card card-link group relative flex flex-col overflow-hidden">
      <div className="card-media aspect-[4/3] overflow-hidden border-b border-line">
        <SignArt kind={product.art} label={product.name} />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        {category && <p className="text-xs font-bold uppercase tracking-wider text-muted">{category.name}</p>}
        <h3 className="text-lg">
          <Link href="#" className="after:absolute after:inset-0">
            {product.name}
          </Link>
        </h3>
        <p className="line-clamp-2 text-[15px] text-muted">{product.summary}</p>
        <div className="mt-auto pt-2">
          <PriceLabel product={product} />
        </div>
      </div>
    </article>
  );
}

export function CategoryTile({ category, count }: { category: Category; count?: number }) {
  return (
    <Link
      href="#"
      className="card card-link group flex flex-col overflow-hidden"
    >
      <div className="card-media aspect-[4/3] overflow-hidden border-b border-line">
        <SignArt kind={category.art} label={category.name} />
      </div>
      <div className="flex items-center justify-between gap-3 p-4">
        <div>
          <h3 className="text-base md:text-lg">{category.name}</h3>
          <p lang="bn" className="text-sm text-muted">
            {category.nameBn}
          </p>
        </div>
        <span className="card-arrow grid size-9 shrink-0 place-items-center bg-navy-50 text-navy">
          <IconArrowRight width={18} height={18} />
          {count !== undefined && <span className="sr-only">{count} products</span>}
        </span>
      </div>
    </Link>
  );
}

export function FAQAccordion({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line rounded-none border border-line bg-white">
      {items.map((f) => (
        <details key={f.q} className="group">
          <summary className="flex min-h-14 items-center justify-between gap-4 px-5 py-4 text-left text-[17px] font-bold text-navy">
            {f.q}
            <IconChevronDown className="shrink-0 transition-transform group-open:rotate-180" />
          </summary>
          <p className="px-5 pb-5 text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

/** Renders only contact channels that have been configured and verified. */
export function ContactLinks({ className = "", message }: { className?: string; message?: string }) {
  const wa = whatsappLink(message);
  const tel = phoneLink();
  if (!wa && !tel) return null;
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {wa && (
        <a href={wa} target="_blank" rel="noopener" className="btn btn-outline" data-event="whatsapp_click">
          <IconChat /> WhatsApp
        </a>
      )}
      {tel && (
        <a href={tel} className="btn btn-outline" data-event="phone_click">
          <IconPhone /> Call us
        </a>
      )}
    </div>
  );
}

export function QuoteCTA({
  title = "Tell Us What You Want to Build",
  body = "Share your idea, size and location. Our team will review it and get back to you with the next steps.",
}: {
  title?: string;
  body?: string;
}) {
  const wa = whatsappLink("Hello Retail Branding, I'd like to discuss a signage project.");
  return (
    <section aria-labelledby="quote-cta-title" className="on-dark bg-navy py-14 text-white md:py-20">
      <div className="container-page grid items-center gap-8 md:grid-cols-[1fr_auto]">
        <div>
          <h2 id="quote-cta-title" className="text-[1.75rem] !text-white md:text-4xl">
            {title}
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-white/85">{body}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="#" className="btn btn-primary">
            Request a Quote
          </Link>
          <Link href="#" className="btn btn-ghost-light">
            Customize & Get Price
          </Link>
          {wa && (
            <a href={wa} target="_blank" rel="noopener" className="btn btn-ghost-light">
              <IconChat /> WhatsApp
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

export function Notice({ children, tone = "info" }: { children: ReactNode; tone?: "info" | "warn" }) {
  return (
    <div
      className={`rounded-none border px-4 py-3 text-[15px] ${
        tone === "warn" ? "border-yellow bg-yellow-50 text-ink" : "border-line bg-navy-50 text-ink"
      }`}
    >
      {children}
    </div>
  );
}

export function Footer() {
  const wa = whatsappLink();
  const tel = phoneLink();
  return (
    <footer className="on-dark bg-navy-900 pb-24 text-white/85 md:pb-0">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Logo inverted />
          <p className="mt-4 max-w-sm">{site.tagline}</p>
          <p lang="bn" className="mt-1 max-w-sm text-white/70">
            {site.taglineBn}
          </p>
          <p className="mt-4 text-sm text-white/70">
            A branding and signage concern of{" "}
            <a href={site.parentSite} className="underline underline-offset-4 hover:text-white" rel="noopener">
              {site.legalName}
            </a>
            .
          </p>
        </div>
        <FooterCol title="Products">
          {categories.map((c) => (
            <FooterLink key={c.slug}>
              {c.name}
            </FooterLink>
          ))}
        </FooterCol>
        <FooterCol title="Company">
          {mainNav
            .filter((n) => n.href !== "/products")
            .map((n) => (
              <FooterLink key={n.href}>
                {n.label}
              </FooterLink>
            ))}
          <FooterLink>Request a Quote</FooterLink>
        </FooterCol>
        <div>
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wider !text-yellow">Visit / contact</h2>
          <address className="not-italic">
            {site.contact.address.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </address>
          <ul className="mt-4 space-y-1">
            {tel && (
              <li>
                <a href={tel} className="hover:text-white">
                  {site.contact.phone}
                </a>
              </li>
            )}
            {wa && (
              <li>
                <a href={wa} className="hover:text-white" rel="noopener" target="_blank">
                  WhatsApp
                </a>
              </li>
            )}
            {site.contact.email && (
              <li>
                <a href={`mailto:${site.contact.email}`} className="hover:text-white">
                  {site.contact.email}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-wrap items-center justify-between gap-3 py-5 text-sm text-white/70">
          <p>
            © {site.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-4">
            <li>
              <Link href="#" className="hover:text-white">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                Terms
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                Cancellations & refunds
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                Artwork & proofs
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="mb-3 text-sm font-bold uppercase tracking-wider !text-yellow">{title}</h2>
      <ul className="space-y-1.5">{children}</ul>
    </div>
  );
}

function FooterLink({ children }: { children: ReactNode }) {
  return (
    <li>
      <Link href="#" className="hover:text-white hover:underline hover:underline-offset-4">
        {children}
      </Link>
    </li>
  );
}
