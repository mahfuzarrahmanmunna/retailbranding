# Retail Branding — website (MVP)

Next.js 16 (App Router, Cache Components) + Tailwind CSS 4, built from the *Retail Branding Website Blueprint v1.0*.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Where things live

| What | File |
| --- | --- |
| Contact details, coverage flag, nav | `src/lib/site.ts` |
| Categories, products, solutions, services, FAQ, districts | `src/lib/catalog.ts` |
| Pricing rules + estimate engine (shared client/server) | `src/lib/pricing.ts` |
| Form validation (Zod, BD mobile numbers) | `src/lib/validation.ts` |
| Server actions: quote, order, contact | `src/app/actions.ts` |
| Storage (JSONL + private uploads in `.data/`) | `src/lib/server/store.ts` |
| Design tokens | `src/app/globals.css` |

## Before launch (blueprint §18, §22)

- **Prices are placeholders.** Replace `rules` in `pricing.ts` and the preset prices in `catalog.ts`, or set `ESTIMATES_ENABLED = false` to show "Quote required" instead.
- **Contacts.** Set phone / WhatsApp / email in `site.ts`. WhatsApp and call buttons stay hidden until then.
- **Coverage.** Set `nationwideCoverageVerified` once delivery and installation areas are confirmed.
- **Storage.** `.data/` is for local and single-server use only. Move to PostgreSQL and object storage, and add malware scanning for uploads.
- **Payments.** No payment provider is integrated. Orders are saved as `pending_confirmation`, and payment instructions are sent manually.
- **Policies** under `/policies/*` are drafts that need legal review.
- **Photos.** Products use labelled illustrations until genuine project photos are supplied. `/projects` stays empty until permissions are verified.
- **Bangla.** The header toggle switches UI labels only. Full `/bn` content routes need professional translation.
- **Admin.** There is no admin dashboard yet. Quotes, orders and contacts are in `.data/*.jsonl`.
