# noteHubLM — Website

Marketing site and hosted authentication iframe for **noteHubLM**, a Chrome extension
that extends Google NotebookLM.

The site does two jobs:

1. **Landing page** (`/`) — product marketing, pricing pulled live from Dodo Payments,
   and the checkout flow.
2. **Auth iframe** (`/auth`) — a headless page the Chrome extension embeds to run
   Google sign-in, which the extension cannot do itself under its CSP.

There is no database and no user accounts in this repo. Identity and subscription
state live in Firebase, written by a separate backend.

---

## Quick start

```bash
npm install
cp .env.example .env.local   # then fill in real values
npm run dev
```

Open <http://localhost:3000>.

`npm run dev` will fail to render `/` without valid Dodo Payments credentials — the
home page prerenders and calls the Dodo API for live prices. See
[Environment variables](#environment-variables).

### Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Dev server on port 3000 |
| `npm run dev:https` | Dev server over HTTPS — needed to test the `/auth` iframe, since Google Identity Services requires a secure origin |
| `npm run build` | Production build (prerenders `/`, so it needs Dodo credentials) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |

---

## Environment variables

Copy `.env.example` to `.env.local`. Nothing in `.env.local` is committed.

| Variable | Scope | Purpose |
|---|---|---|
| `DODO_PAYMENTS_API_KEY` | server | Dodo Payments API key. **Secret.** |
| `DODO_ENV` | server | `live_mode` or `test_mode` |
| `DODO_PRODUCT_ID_PRO_MONTHLY` | server | Product id for the monthly plan |
| `DODO_PRODUCT_ID_PRO_YEARLY` | server | Product id for the yearly plan |
| `APP_URL` | server | Base URL used to build the checkout `return_url`; defaults to `http://localhost:3000` |
| `NEXT_PUBLIC_DODO_ENV` | client | `live` or `test` — selects the checkout overlay environment |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | client | OAuth 2.0 Web client id used by the `/auth` Drive authorization-code flow |

`NEXT_PUBLIC_*` values are inlined into the browser bundle at build time and are not
secret. In deployed environments every variable is sourced from Cloud Secret Manager
so values can differ per environment — see [`apphosting.yaml`](./apphosting.yaml).

### Firebase config is intentionally public

`src/lib/firebase.ts` hardcodes the Firebase web config (including `apiKey`). That is
[public client-side config by design](https://firebase.google.com/docs/projects/api-keys)
— it identifies the project, it does not authorize anything. Access is enforced by
Firebase Auth, security rules, and API key restrictions in the Google Cloud console.

---

## Architecture

```
src/
  app/
    page.tsx                 Home — async server component; fetches live prices
    layout.tsx               Fonts, metadata, theme bootstrap, CheckoutProvider
    globals.css              Design tokens, glass/grid effects, animations
    (legal)/
      layout.tsx             Navbar + Footer shell for legal pages
      privacy/page.tsx       Privacy policy
      terms/page.tsx         Terms of service
      refunds/page.tsx       Refund policy
    auth/page.tsx            Headless auth iframe for the Chrome extension
    api/checkout/route.ts    POST — creates a Dodo checkout session
    checkout/success/page.tsx  Post-payment landing page
  components/                Section components + shadcn/ui primitives
  lib/
    firebase.ts              Firebase app, auth, and callable-functions handles
    dodo.ts                  Dodo Payments SDK client
    utils.ts                 cn() classname helper
```

**Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Base UI,
shadcn/ui, Lucide icons, Firebase JS SDK, Dodo Payments SDK. Deployed on Firebase
App Hosting.

### Landing page

`page.tsx` is an async server component. It renders, in order: `Navbar`,
`HeroSection`, `PlatformsSection`, `SurfacesSection`, `ToolsSection`,
`DashboardBentoSection`, `FoundationsSection`, `ScreenshotEditorSection`,
`PricingSection`, `CTASection`, `Footer`.

Prices are not hardcoded. `getPrices()` retrieves both Pro products from Dodo at build
time so the page always shows what customers will actually be charged.

### Checkout

`POST /api/checkout` takes `{ plan: "pro_monthly" | "pro_yearly" }`, maps it to a
product id, creates a Dodo checkout session, and returns `{ checkoutUrl }`.
`PricingSection` opens that URL as an overlay modal rather than redirecting, which
reduces drop-off. On completion the customer lands on `/checkout/success`.

Errors are logged server-side and returned to the browser as a generic
`{ error: "Checkout failed" }` — upstream error text is never echoed to clients.

### Auth iframe

`/auth` renders nothing. It is a message-driven page the extension embeds in an
offscreen iframe, and **Google is the only supported identity provider**.

1. The page posts `notehub:iframe-ready` to its parent once listeners are attached.
2. The extension posts `{ initAuth: true, provider: 'google' }`.
3. The page runs the Google Identity Services **authorization-code** flow in a popup,
   requesting `drive.file` and `drive.appdata` alongside the OpenID scopes.
4. The code is exchanged server-side by the `storeGoogleToken` callable Cloud
   Function, which keeps the refresh token and returns a Firebase custom token plus a
   Drive access token.
5. The page signs in with `signInWithCustomToken`, reads the user's claims, and posts
   `notehub:auth-response` back to the parent.

Sign-out works the same way via `{ signOut: true }` →
`notehub:sign-out-response`. Google token revocation happens server-side in the
`revokeGoogleToken` Cloud Function before the extension triggers sign-out.

**Security properties:**

- Responses are posted only to `document.location.ancestorOrigins[0]`, never `*`.
- `next.config.ts` restricts `/auth` with `frame-ancestors 'self' chrome-extension://*`
  and sets `Cache-Control: no-store`.
- The refresh token never reaches the client; it is held by the Cloud Function.
- **Drive access is gated on subscription.** The Drive access token is forwarded only
  when the Firebase custom claim `subscriptionStatus === 'active'`. The check runs on
  this page, not in the extension, so it cannot be bypassed by editing extension code.

Custom claims (`subscriptionStatus`, `subscriptionPlan`, `subscriptionId`,
`customerId`, `currentPeriodEnd`) are written by the billing backend after payment.

Testing `/auth` locally needs HTTPS — use `npm run dev:https`, which generates dev
certificates into `certificates/` (gitignored).

---

## Deployment

Firebase App Hosting, configured in [`apphosting.yaml`](./apphosting.yaml): Cloud Run
with `minInstances: 0`, `maxInstances: 10`, concurrency 80. Every environment variable
is resolved from Cloud Secret Manager at build and/or runtime, so the same committed
config deploys to test and prod.

Pushing to a `release/**` branch triggers
[`.github/workflows/cascade-release-to-main.yml`](./.github/workflows/cascade-release-to-main.yml),
which opens a back-merge PR into `main` and auto-merges it when conflict-free.

---

## Related repositories

This repo is only the website. Not included here:

- The Chrome extension itself
- The Cloud Functions backend that sets Firebase custom claims and brokers Google tokens
- Any admin tooling or email/notification logic

---

## Contributing & security

See [CONTRIBUTING.md](./CONTRIBUTING.md) and [SECURITY.md](./SECURITY.md).

## License

No license is granted. The source is published for transparency; all rights are
reserved by the copyright holder. See [SECURITY.md](./SECURITY.md) for how to report
vulnerabilities.

---

*noteHubLM is an independent project and is not affiliated with, endorsed by, or
sponsored by Google. NotebookLM is a trademark of Google LLC.*
