"use client";

import { useMemo, useState, type ReactNode } from "react";

export type FilterItem = {
  slug: string;
  category: string;
  environment: string[];
  illuminated: boolean;
  mode: string;
};

type Filters = { category: string; environment: string; lighting: string; mode: string };

const ALL: Filters = { category: "", environment: "", lighting: "", mode: "" };

export function ProductFilter({
  items,
  cards,
  categories,
  hideCategory = false,
}: {
  items: FilterItem[];
  cards: Record<string, ReactNode>;
  categories: { slug: string; name: string }[];
  hideCategory?: boolean;
}) {
  const [f, setF] = useState<Filters>(ALL);
  const shown = useMemo(
    () =>
      items.filter(
        (i) =>
          (!f.category || i.category === f.category) &&
          (!f.environment || i.environment.includes(f.environment)) &&
          (!f.lighting || (f.lighting === "lit" ? i.illuminated : !i.illuminated)) &&
          (!f.mode || i.mode === f.mode),
      ),
    [items, f],
  );

  const set = (k: keyof Filters) => (e: React.ChangeEvent<HTMLSelectElement>) => setF({ ...f, [k]: e.target.value });

  return (
    <div>
      <form
        className="card mb-6 grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-5 lg:items-end"
        onSubmit={(e) => e.preventDefault()}
        aria-label="Filter products"
      >
        {!hideCategory && (
          <label>
            <span className="field-label">Category</span>
            <select className="field" value={f.category} onChange={set("category")}>
              <option value="">All categories</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
        )}
        <label>
          <span className="field-label">Indoor / outdoor</span>
          <select className="field" value={f.environment} onChange={set("environment")}>
            <option value="">Any</option>
            <option value="indoor">Indoor</option>
            <option value="outdoor">Outdoor</option>
          </select>
        </label>
        <label>
          <span className="field-label">Lighting</span>
          <select className="field" value={f.lighting} onChange={set("lighting")}>
            <option value="">Any</option>
            <option value="lit">Illuminated / optional</option>
            <option value="unlit">Non-lit</option>
          </select>
        </label>
        <label>
          <span className="field-label">Pricing</span>
          <select className="field" value={f.mode} onChange={set("mode")}>
            <option value="">Any</option>
            <option value="fixed">Fixed price</option>
            <option value="estimate">Instant estimate</option>
            <option value="quote">Quote required</option>
          </select>
        </label>
        <button type="button" className="btn btn-outline" onClick={() => setF(ALL)}>
          Clear filters
        </button>
      </form>

      <p className="mb-4 text-sm font-semibold text-muted" aria-live="polite">
        Showing {shown.length} of {items.length} products
      </p>
      {shown.length ? (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((i) => (
            <li key={i.slug}>{cards[i.slug]}</li>
          ))}
        </ul>
      ) : (
        <p className="card p-8 text-center text-muted">No products match these filters. Try clearing one, or request a quote for something custom.</p>
      )}
    </div>
  );
}
