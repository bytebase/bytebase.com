# Sales Convergence: Unified Contact Form

## Problem

Two disconnected inbound flows — Book Demo (Cal.com floating button + /request-demo page) and Enterprise Inquiry (/contact-us form) — with no qualification before booking. Leads go to Slack, which is lossy. No unified tracking.

## Decision

Drop Cal.com calendar entirely. All inbound goes through a single unified form at `/contact-us`. Slack remains a notification layer (not system of record).

## Unified Form (`/contact-us`)

| # | Label | Type | Placeholder / Options | Required |
|---|-------|------|-----------------------|----------|
| 1 | Name | Text input | "Full name" | Yes |
| 2 | Work Email | Email input | "name@company.com" | Yes |
| 3 | Company | Text input | "Company name" | Yes |
| 4 | Database Users | Dropdown | 1-10 / 11-50 / 51-200 / 200+ | Yes |
| 5 | How We Can Help | Textarea | "e.g. database CI/CD, data access control, dynamic data masking, just-in-time database access, one-off data change" | Yes |

**On submit:** POST to /api/slack (Slack webhook) + Feishu webhook + /api/subscribe (Mailchimp with tag). Redirect to `/confirm-inquiry` on success.

## Changes

### Remove

- **Cal.com floating "Book Demo" button** — replace with floating "Contact Us" button linking to `/contact-us`
- **Cal.com npm dependency** (`@calcom/embed-react`) — no longer needed
- **`/request-demo` page** — add 301 redirect to `/contact-us`
- **`/demo` page** — add 301 redirect to `/contact-us`
- **`/view-live-demo` page** — add 301 redirect to `/contact-us`
- **`/confirm-demo` page** — remove (unused after Cal.com removal)
- **`/confirm-view-live-demo` page** — remove (unused after /view-live-demo removal)
- **CalForm component** (`src/components/pages/contact/cal-form/`) — remove
- **Cal component** (`src/components/cal.tsx`) — remove
- **Inline Enterprise Inquiry forms** on 4 feature pages — replace with CTA section

### Add

- **Floating "Contact Us" button** — simple button that navigates to `/contact-us`, no Cal.com dependency
- **CTA sections on feature pages** — replace inline forms with a heading + button linking to `/contact-us?source={feature}`
- **New form fields** — "Database Users" dropdown, "How We Can Help" required textarea (replaces optional "message")
- **Single "name" field** — replaces separate first name / last name

### Keep Unchanged

- `/confirm-inquiry` confirmation page
- `/api/slack` route
- `/api/subscribe` route
- Feishu webhook integration
- Header/footer "Contact" nav links (already point to `/contact-us`)
- Pricing page CTAs (Community → deploy docs, Pro → buy, Enterprise → `/contact-us`)

## Feature Page CTA Sections

Replace inline Enterprise Inquiry forms on these pages:
- SQL Editor (`/sql-editor`)
- Batch Change (`/batch-change`)
- Data Masking (`/data-masking`)
- Schema Migration (`/schema-migration`)

New CTA section: heading + copy + "Contact Us" button linking to `/contact-us?source={feature-name}`.

## Redirects

| Old Path | New Destination | Type |
|----------|----------------|------|
| `/request-demo` | `/contact-us` | 301 |
| `/demo` | `/contact-us` | 301 |
| `/view-live-demo` | `/contact-us` | 301 |

## Files Affected

### Remove
- `src/components/cal.tsx`
- `src/components/pages/contact/cal-form/cal-form.tsx`
- `src/app/[locale]/(contact)/request-demo/page.tsx`
- `src/app/[locale]/(contact)/confirm-demo/page.tsx`
- `src/app/[locale]/(contact)/view-live-demo/page.tsx`
- `src/app/[locale]/(contact)/confirm-view-live-demo/page.tsx`
- `src/app/[locale]/demo/page.tsx`

### Modify
- `src/app/[locale]/layout.tsx` — remove Cal component import
- `src/components/shared/contact-form/contact-form.tsx` — update fields (single name, add database users dropdown, make message required, update placeholders)
- `src/components/shared/enterprise-inquiry/enterprise-inquiry.tsx` — replace inline form with CTA section
- `src/lib/forms.ts` — update form constants (remove VIEW_LIVE_DEMO, add CONTACT_US or similar)
- `src/lib/route.ts` — remove routes for deleted pages
- `src/app/api/slack/route.ts` — update to handle new field structure (single name instead of first/last)
- `package.json` — remove `@calcom/embed-react` dependency

### Add
- Floating "Contact Us" button component (replaces Cal.com floating button)
- Redirect configuration for removed pages (Next.js redirects in next.config)
