# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ
from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before
writing any code. Heed deprecation notices.

---

# noteHubLM Website — Notes for Agents

Start with [README.md](./README.md): it documents the stack, the file layout, every
environment variable, the checkout flow, and the `/auth` iframe protocol. This file only
covers what an agent working in this repo needs beyond that.

## Ground truth vs. assumptions

This repo has drifted from older descriptions of it. Verify before relying on any of
these:

- **Google is the only identity provider.** Facebook and GitHub were removed. Passing
  any other `provider` to `/auth` throws.
- **Sign-in is the GIS authorization-code flow**, not `signInWithPopup`. The code is
  exchanged by the `storeGoogleToken` callable Cloud Function, which returns a Firebase
  custom token; the page then calls `signInWithCustomToken`.
- **postMessage types are `notehub:iframe-ready`, `notehub:auth-response`, and
  `notehub:sign-out-response`** — not `AUTH_SUCCESS` / `SIGN_OUT_SUCCESS`.
- **The server base URL variable is `APP_URL`**, not `NEXT_PUBLIC_APP_URL`.
- **Fonts are Inter, Sora, and JetBrains Mono** via `next/font/google`.
- The page sections are `Hero`, `Platforms`, `Surfaces`, `Tools`, `DashboardBento`,
  `Foundations`, `ScreenshotEditor`, `Pricing`, `CTA`. There is no FAQ section and no
  `FeaturesSection`.

## Repository boundaries

Only the website lives here. The Chrome extension and the Cloud Functions backend that
sets Firebase custom claims and brokers Google tokens are separate repositories. Do not
invent code for them; if a change needs both sides, say so.

## Do not break these

- `src/app/auth/page.tsx` — the Drive access token is released only when the Firebase
  custom claim `subscriptionStatus === 'active'`. This gate is the paywall for Drive
  sync. Responses go to `document.location.ancestorOrigins[0]`, never `'*'`.
- `next.config.ts` — the `/auth` route's `frame-ancestors` CSP and `Cache-Control:
  no-store` headers.
- `src/app/api/checkout/route.ts` — failures are logged server-side and answered with a
  generic `{ error: "Checkout failed" }`. Do not add upstream error text to the response.
- `.gitignore` — `.env*` (except `.env.example`), `certificates/`, and editor
  directories stay ignored. Real credential values never enter the repo; add new config
  to `.env.example` with a placeholder.

## Conventions

- App Router, TypeScript, Tailwind CSS 4. Design tokens, glass effects, and the retro
  grid live in `src/app/globals.css`; prefer an existing token or utility over a new
  one-off style.
- Use `next/link` for internal navigation — ESLint fails the build on raw `<a href="/…">`.
- The home page is an async server component and fetches live prices from Dodo at build
  time. Keep prices out of the source; if pricing copy must change, change the product
  in Dodo.
- Legal pages under `src/app/(legal)/` must stay consistent with the operator identity,
  the support email, and the no-refunds-except-where-required-by-law policy already
  stated there. Flag, do not silently change, anything that contradicts them.

## Checks

```bash
npm run lint
npx tsc --noEmit
npm run build   # needs Dodo test-mode credentials — prerendering calls the API
```

## This repository is public

Assume everything committed here is world-readable. Before adding a file, ask whether it
contains a credential, an internal URL, a customer identifier, or a machine-specific
path. See [SECURITY.md](./SECURITY.md).
