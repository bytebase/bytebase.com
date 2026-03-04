# Sales Convergence Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Converge Book Demo and Enterprise Inquiry into a single unified contact form at `/contact-us` with qualification fields, removing Cal.com dependency.

**Architecture:** Replace the Cal.com floating button and all demo/inquiry pages with a single contact form. Add 301 redirects for removed pages. Replace inline Enterprise Inquiry forms on feature pages with CTA sections linking to `/contact-us`.

**Tech Stack:** Next.js 14 (App Router), React Hook Form, Yup validation, Tailwind CSS

---

### Task 1: Update the Contact Form Component

**Files:**
- Modify: `src/components/shared/contact-form/contact-form.tsx`

**Step 1: Update the type definition and validation schema**

Replace the current `ValueType` and `validationSchema` with the new unified form fields:

```tsx
type ValueType = {
  name: string;
  email: string;
  company: string;
  databaseUsers: string;
  message: string;
  website?: string; // Honeypot field
};

const DATABASE_USERS_OPTIONS = ['1-10', '11-50', '51-200', '200+'];

const validationSchema = yup.object().shape({
  name: yup.string().trim().required('Name is a required field'),
  email: yup
    .string()
    .trim()
    .email('Please provide a valid email')
    .required('Work email is a required field'),
  company: yup.string().trim().required('Company name is a required field'),
  databaseUsers: yup.string().trim().required('Please select the number of database users'),
  message: yup.string().trim().required('Please tell us how we can help'),
  website: yup.string().trim().optional(), // Honeypot field - should be empty
});
```

**Step 2: Update the form JSX**

Replace the form fields in the return statement. The form grid should be:

```tsx
<form
  className="grid grid-cols-2 gap-5 md:grid-cols-1 sm:gap-4"
  onSubmit={handleSubmit(onSubmit)}
>
  <Field
    className="col-span-full"
    type="text"
    placeholder="Full name*"
    error={errors?.name?.message}
    {...register('name')}
  />
  <Field
    className="col-span-full"
    type="email"
    placeholder="name@company.com*"
    error={errors?.email?.message}
    {...register('email')}
  />
  <Field
    className="col-span-full"
    type="text"
    placeholder="Company name*"
    error={errors?.company?.message}
    {...register('company')}
  />
  <Field
    className="col-span-full"
    tag="select"
    error={errors?.databaseUsers?.message}
    {...register('databaseUsers')}
  >
    <option value="" disabled>
      Database Users*
    </option>
    {DATABASE_USERS_OPTIONS.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </Field>
  <Field
    className="col-span-full"
    inputClassName="p-4 pt-3 md:pt-2"
    tag="textarea"
    placeholder="e.g. database CI/CD, data access control, dynamic data masking, just-in-time database access, one-off data change"
    error={errors?.message?.message}
    {...register('message')}
  />
  {/* Honeypot field - hidden from users but visible to bots */}
  <div className="pointer-events-none absolute left-[-9999px] opacity-0" aria-hidden="true">
    <label htmlFor="website-field" tabIndex={-1}>
      Website
    </label>
    <Field
      id="website-field"
      type="text"
      placeholder="https://yourcompany.com"
      autoComplete="off"
      tabIndex={-1}
      {...register('website')}
    />
  </div>
  {/* ...button + legal text remain the same */}
</form>
```

**Step 3: Update the onSubmit handler**

Change all references from `firstname`/`lastname` to `name`, and add `databaseUsers` to the payloads:

In `onSubmit`:
- Change destructuring: `const { name, email, company, databaseUsers, message, website } = values;`
- Update Slack payload: `{ formId, name, email, company, databaseUsers, message }`
- Update Feishu payload text: `` `${formId} by ${name} (${email}) from ${company} [${databaseUsers} DB users]\n\n${message}` ``
- Remove the `VIEW_LIVE_DEMO` branch that opens `Route.LIVE_DEMO` in a new window
- Remove the `VIEW_LIVE_DEMO` import

**Step 4: Update the getButtonTitle function**

Remove the `VIEW_LIVE_DEMO` case. The form will only be used for `ENTERPRISE_INQUIRY` now:

```tsx
const getButtonTitle = (formId: string) => {
  switch (formId) {
    case WHITE_PAPER:
      return 'Download White Paper';
    case ENTERPRISE_INQUIRY:
    default:
      return 'Contact Us';
  }
};
```

**Step 5: Commit**

```bash
git add src/components/shared/contact-form/contact-form.tsx
git commit -m "feat: update contact form with unified fields (name, database users, required message)"
```

---

### Task 2: Update the Slack API Route

**Files:**
- Modify: `src/app/api/slack/route.ts`

**Step 1: Update the request body destructuring and message format**

```tsx
import { NextResponse } from 'next/server';

const slackWebhookList = [process.env.SLACK_WEBHOOK_URL as string];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { formId, name, email, company, databaseUsers, message } = body;

    const responses = await Promise.all(
      slackWebhookList.map((webhookUrl) =>
        fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: `${formId} by ${name} (${email}) from ${company} [${databaseUsers} DB users]\n\n${message}`,
          }),
        }),
      ),
    );

    const failedResponses = await Promise.all(
      responses.map(async (response) => {
        if (!response.ok) {
          const error = await response.text();
          return error;
        }
        return null;
      }),
    );
    const errors = failedResponses.filter(Boolean);

    if (errors.length > 0) {
      return NextResponse.json(
        {
          error: 'Failed to send to Slack',
          details: errors,
        },
        { status: 500 },
      );
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

**Step 2: Commit**

```bash
git add src/app/api/slack/route.ts
git commit -m "feat: update Slack webhook to use unified name + database users fields"
```

---

### Task 3: Update Form Constants and Routes

**Files:**
- Modify: `src/lib/forms.ts`
- Modify: `src/lib/route.ts`
- Modify: `src/lib/seo-data.ts`

**Step 1: Update forms.ts**

Remove `VIEW_LIVE_DEMO` export:

```ts
const BUTTON_SUCCESS_TIMEOUT_MS = 1000;

const ENTERPRISE_INQUIRY = 'Enterprise Inquiry';
const WHITE_PAPER = 'White Paper';

export { BUTTON_SUCCESS_TIMEOUT_MS, ENTERPRISE_INQUIRY, WHITE_PAPER };
```

**Step 2: Update route.ts**

Remove these route entries:
- `DEMO`
- `VIEW_LIVE_DEMO`
- `CONFIRM_VIEW_LIVE_DEMO`
- `REQUEST_DEMO`
- `CONFIRM_DEMO`

Keep `CONFIRM_INQUIRY`, `CONFIRM_MESSAGE`, `CONTACTS`, `LIVE_DEMO`.

**Step 3: Update seo-data.ts**

Remove these SEO entries:
- `DEMO`
- `VIEW_LIVE_DEMO`
- `REQUEST_DEMO`
- `CONFIRM_DEMO`
- `CONFIRM_VIEW_LIVE_DEMO`

Keep `CONTACTS` and `CONFIRM_INQUIRY`.

**Step 4: Commit**

```bash
git add src/lib/forms.ts src/lib/route.ts src/lib/seo-data.ts
git commit -m "refactor: remove unused route/form constants for demo and view-live-demo pages"
```

---

### Task 4: Remove Cal.com Integration

**Files:**
- Delete: `src/components/cal.tsx`
- Modify: `src/app/[locale]/layout.tsx`
- Modify: `package.json`

**Step 1: Remove Cal import and usage from layout.tsx**

In `src/app/[locale]/layout.tsx`:
- Remove line 6: `import { Cal } from '@/components/cal';`
- Remove line 38: `<Cal />`

The layout should go from:
```tsx
import { Cal } from '@/components/cal';
// ...
<body className="flex h-full flex-col">
  <Cal />
  <Script ...
```
To:
```tsx
// (no Cal import)
// ...
<body className="flex h-full flex-col">
  <Script ...
```

**Step 2: Delete cal.tsx**

Delete the file `src/components/cal.tsx`.

**Step 3: Remove @calcom/embed-react from package.json**

Remove `"@calcom/embed-react": "^1.5.1"` from the `dependencies` section of `package.json`.

**Step 4: Commit**

```bash
git add src/components/cal.tsx src/app/[locale]/layout.tsx package.json
git commit -m "feat: remove Cal.com floating button and dependency"
```

---

### Task 5: Add Floating "Contact Us" Button

**Files:**
- Create: `src/components/shared/floating-contact-button/floating-contact-button.tsx`
- Create: `src/components/shared/floating-contact-button/index.ts`
- Modify: `src/app/[locale]/layout.tsx`

**Step 1: Create the floating button component**

```tsx
// src/components/shared/floating-contact-button/floating-contact-button.tsx
'use client';

import Route from '@/lib/route';
import { useRouter } from 'next/navigation';

const FloatingContactButton = () => {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push(Route.CONTACTS)}
      className="fixed bottom-6 right-6 z-50 rounded-full bg-gray-15 px-5 py-3 text-16 font-medium text-white shadow-lg transition-colors hover:bg-black"
    >
      Contact Us
    </button>
  );
};

export default FloatingContactButton;
```

```tsx
// src/components/shared/floating-contact-button/index.ts
export { default } from './floating-contact-button';
```

**Step 2: Add to layout.tsx**

In `src/app/[locale]/layout.tsx`, import and render the floating button where `<Cal />` used to be:

```tsx
import FloatingContactButton from '@/components/shared/floating-contact-button';
// ...
<body className="flex h-full flex-col">
  <FloatingContactButton />
  <Script ...
```

**Step 3: Verify it renders**

Run: `npm run dev` — visit any page, the floating "Contact Us" button should appear in the bottom-right corner.

**Step 4: Commit**

```bash
git add src/components/shared/floating-contact-button/ src/app/[locale]/layout.tsx
git commit -m "feat: add floating Contact Us button replacing Cal.com Book Demo"
```

---

### Task 6: Update the /contact-us Page

**Files:**
- Modify: `src/app/[locale]/(contact)/contact-us/page.tsx`

**Step 1: Update the page heading and copy**

Change the heading from "Enterprise Inquiry" to "Contact Us" and update the description:

```tsx
import getMetadata from '@/utils/get-metadata';

import Logos from '@/components/pages/contact/logos';
import ContactForm from '@/components/shared/contact-form';

import SEO_DATA from '@/lib/seo-data';
import Route from '@/lib/route';
import { ENTERPRISE_INQUIRY } from '@/lib/forms';
export const metadata = getMetadata(SEO_DATA.CONTACTS);

export default function Page() {
  return (
    <div className="container gap-x-grid relative grid grid-cols-12 sm:grid-cols-4">
      <div className="col-span-5 lg:col-span-8 sm:col-span-full">
        <h1 className="font-title text-80 font-semibold leading-none 2xl:text-64 lg:text-56 sm:text-40">
          Contact Us
        </h1>
        <p className="mt-3 text-18">
          Tell us about your database challenges and we&apos;ll get back to you shortly.
        </p>
      </div>
      <ContactForm
        className="col-span-6 col-start-7 row-span-4 rounded-2xl bg-white p-8 shadow-dark-big lg:col-span-full lg:my-10 md:my-8 md:p-6 sm:p-5 sm:px-4 xs:my-7"
        formId={ENTERPRISE_INQUIRY}
        redirectURL={Route.CONFIRM_INQUIRY}
      />
      <Logos />
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add src/app/[locale]/(contact)/contact-us/page.tsx
git commit -m "feat: update /contact-us page heading to 'Contact Us'"
```

---

### Task 7: Replace Enterprise Inquiry Inline Forms with CTA Sections

**Files:**
- Modify: `src/components/shared/enterprise-inquiry/enterprise-inquiry.tsx`

**Step 1: Replace the inline form with a CTA section**

Replace the entire component to render a CTA with a button instead of an inline form:

```tsx
import Logos from '@/components/pages/contact/logos';
import Button from '@/components/shared/button';
import Route from '@/lib/route';

const EnterpriseInquiry = () => {
  return (
    <section className="container enterprise-inquiry mt-20 lg:mt-14 md:mt-10 sm:mt-8">
      <div className="flex items-center justify-between border-t border-gray-90 pt-16 lg:pt-8 md:pt-10 sm:pt-8">
        <div className="container gap-x-grid relative grid grid-cols-12 sm:grid-cols-4">
          <div className="col-span-5 lg:col-span-8 sm:col-span-full">
            <h2 className="font-title text-80 font-semibold leading-none 2xl:text-64 lg:text-56 sm:text-40">
              Ready to Get Started?
            </h2>
            <p className="mt-3 text-18">
              Talk to us about how Bytebase can help your team with database management.
            </p>
            <Button
              href={Route.CONTACTS}
              theme="primary-filled"
              size="md"
              className="mt-8"
            >
              Contact Us
            </Button>
          </div>
          <Logos />
        </div>
      </div>
    </section>
  );
};

export default EnterpriseInquiry;
```

This automatically updates all 4 feature pages (SQL Editor, Batch Change, Data Masking, Schema Migration) since they all import this shared component.

**Step 2: Commit**

```bash
git add src/components/shared/enterprise-inquiry/enterprise-inquiry.tsx
git commit -m "feat: replace inline Enterprise Inquiry forms with CTA linking to /contact-us"
```

---

### Task 8: Delete Removed Pages

**Files:**
- Delete: `src/app/[locale]/(contact)/request-demo/page.tsx`
- Delete: `src/app/[locale]/(contact)/confirm-demo/page.tsx`
- Delete: `src/app/[locale]/(contact)/view-live-demo/page.tsx`
- Delete: `src/app/[locale]/(contact)/confirm-view-live-demo/page.tsx`
- Delete: `src/app/[locale]/demo/page.tsx`
- Delete: `src/components/pages/contact/cal-form/` (entire directory)

**Step 1: Delete all the page files**

```bash
rm src/app/[locale]/(contact)/request-demo/page.tsx
rm src/app/[locale]/(contact)/confirm-demo/page.tsx
rm src/app/[locale]/(contact)/view-live-demo/page.tsx
rm src/app/[locale]/(contact)/confirm-view-live-demo/page.tsx
rm src/app/[locale]/demo/page.tsx
rm -rf src/components/pages/contact/cal-form/
```

Also remove the now-empty directories if they exist:
```bash
rmdir src/app/[locale]/(contact)/request-demo/ 2>/dev/null
rmdir src/app/[locale]/(contact)/confirm-demo/ 2>/dev/null
rmdir src/app/[locale]/(contact)/view-live-demo/ 2>/dev/null
rmdir src/app/[locale]/(contact)/confirm-view-live-demo/ 2>/dev/null
rmdir src/app/[locale]/demo/ 2>/dev/null
```

**Step 2: Commit**

```bash
git add -A
git commit -m "refactor: remove demo, request-demo, view-live-demo, and Cal.com form pages"
```

---

### Task 9: Add 301 Redirects

**Files:**
- Modify: `next.config.js`

**Step 1: Add redirect entries**

Add these redirects to the `async redirects()` array in `next.config.js`, at the beginning of the return array:

```js
{
  source: '/request-demo',
  destination: '/contact-us',
  permanent: true,
},
{
  source: '/request-demo/',
  destination: '/contact-us/',
  permanent: true,
},
{
  source: '/demo',
  destination: '/contact-us',
  permanent: true,
},
{
  source: '/demo/',
  destination: '/contact-us/',
  permanent: true,
},
{
  source: '/view-live-demo',
  destination: '/contact-us',
  permanent: true,
},
{
  source: '/view-live-demo/',
  destination: '/contact-us/',
  permanent: true,
},
{
  source: '/confirm-demo',
  destination: '/contact-us',
  permanent: true,
},
{
  source: '/confirm-demo/',
  destination: '/contact-us/',
  permanent: true,
},
{
  source: '/confirm-view-live-demo',
  destination: '/contact-us',
  permanent: true,
},
{
  source: '/confirm-view-live-demo/',
  destination: '/contact-us/',
  permanent: true,
},
```

Note: We add both with and without trailing slash variants because the site uses `trailingSlash: true`.

**Step 2: Commit**

```bash
git add next.config.js
git commit -m "feat: add 301 redirects from removed demo pages to /contact-us"
```

---

### Task 10: Update Remaining References

**Files:**
- Modify: `src/components/pages/home/cta/cta.tsx`
- Modify: `src/components/shared/seo-page-hero/hero.tsx`

**Step 1: Update home page CTA**

In `src/components/pages/home/cta/cta.tsx`, the button links to `Route.DEMO` which is being removed. Update to link to `Route.CONTACTS`:

```tsx
'use client';

import Button from '@/components/shared/button';

import Route from '@/lib/route';

export default function CTA() {
  return (
    <section className="mt-40 bg-primary-1 3xl:mt-36 xl:mt-32 md:mt-24 sm:mt-20">
      <div className="safe-paddings container py-16 xl:py-12 md:py-10 sm:py-6">
        <div className="flex items-center justify-between sm:flex-col sm:items-start sm:gap-6">
          <h2 className="font-title text-52 leading-none text-white 2xl:ml-[22px] 2xl:w-[calc(100%+22px)] xl:col-span-5 xl:col-start-3 xl:w-full xl:text-44 lg:ml-0 md:pl-11 md:text-38 sm:col-span-3 sm:col-start-1 sm:pl-0 sm:text-34">
            Talk to us about your database challenges
          </h2>
          <Button
            href={Route.CONTACTS}
            theme="primary-outline"
            size="md"
            className="shrink-0 border-white bg-white"
          >
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Update SEO page hero**

In `src/components/shared/seo-page-hero/hero.tsx`, the "Learn More" button links to `Route.REQUEST_DEMO`. Update to `Route.CONTACTS`:

Change line 34:
```tsx
// Before:
href={Route.REQUEST_DEMO}
// After:
href={Route.CONTACTS}
```

**Step 3: Commit**

```bash
git add src/components/pages/home/cta/cta.tsx src/components/shared/seo-page-hero/hero.tsx
git commit -m "feat: update home CTA and SEO hero to link to /contact-us"
```

---

### Task 11: Remove Cal.com Package and Verify Build

**Step 1: Remove the Cal.com package**

```bash
npm uninstall @calcom/embed-react
```

**Step 2: Run type check**

```bash
npm run type-check
```

Expected: No type errors. If there are errors, they'll point to missed references to deleted routes/imports that need to be cleaned up.

**Step 3: Run build**

```bash
npm run build
```

Expected: Clean build with no errors. The redirects should work and all pages should compile.

**Step 4: Commit lock file if changed**

```bash
git add package.json package-lock.json
git commit -m "chore: remove @calcom/embed-react dependency"
```

---

### Task 12: Manual Verification

**Step 1: Start dev server**

```bash
npm run dev
```

**Step 2: Verify these pages work:**

- `http://localhost:3001/contact-us/` — unified form with all 5 fields renders correctly
- `http://localhost:3001/pricing/` — Enterprise "Contact Us" button links to `/contact-us`
- `http://localhost:3001/sql-editor/` — bottom section shows CTA instead of inline form
- `http://localhost:3001/batch-change/` — same CTA section
- `http://localhost:3001/data-masking/` — same CTA section
- `http://localhost:3001/schema-migration/` — same CTA section
- Floating "Contact Us" button visible on all pages

**Step 3: Verify redirects work:**

- `http://localhost:3001/request-demo/` → redirects to `/contact-us/`
- `http://localhost:3001/demo/` → redirects to `/contact-us/`
- `http://localhost:3001/view-live-demo/` → redirects to `/contact-us/`

**Step 4: Verify deleted pages return 404:**

- `http://localhost:3001/confirm-demo/` → 404
- `http://localhost:3001/confirm-view-live-demo/` → 404

**Step 5: Test form submission**

Fill out the form on `/contact-us/` and verify it submits (will need valid Slack webhook URL in `.env`).

**Step 6: Final commit**

```bash
git add -A
git commit -m "chore: sales convergence - unified contact form complete"
```
