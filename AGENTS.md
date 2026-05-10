<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# NoteHub Website — Project Documentation

## What This Project Is

NoteHub is a **marketing/landing page website** for a Chrome extension that enhances Google NotebookLM. The website also hosts the **authentication iframe** used by the extension. It is not a full-stack app — there is no database, no user accounts on the website itself.

**Target users:** Researchers, students, and knowledge workers who use Google NotebookLM.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| UI | React 19, Base UI, shadcn/ui |
| Styling | Tailwind CSS 4, custom globals |
| Icons | Lucide React |
| Payments | DodoPayments SDK |
| Auth | Firebase (for Chrome extension) |
| Font | Plus Jakarta Sans |
| Language | TypeScript |

---

## Project Structure

```
src/
  app/
    page.tsx                  # Home page — renders all marketing sections
    layout.tsx                # Root layout — metadata, CheckoutProvider wrapper
    globals.css               # Theme, animations, glass effects, custom utilities
    auth/
      page.tsx                # Iframe auth page for Chrome extension
    api/
      checkout/
        route.ts              # POST /api/checkout — creates DodoPayments session
    checkout/
      success/page.tsx        # Post-payment success landing page
  components/
    Navbar.tsx                # Responsive header with mobile menu
    HeroSection.tsx           # Hero banner with animated background
    FeaturesSection.tsx       # Bento grid feature showcase
    PricingSection.tsx        # Pricing cards with monthly/yearly toggle
    FAQSection.tsx            # Collapsible FAQ accordion (10 FAQs)
    CTASection.tsx            # Final conversion call-to-action
    Footer.tsx                # Footer with links and social icons
    CheckoutProvider.tsx      # DodoPayments SDK initialization wrapper
  lib/
    firebase.ts               # Firebase app + auth instance (public config)
    dodo.ts                   # DodoPayments client initialization
    utils.ts                  # cn() utility (classname merge)
```

---

## Features

### 1. Marketing Landing Page (`/`)

The home page (`src/app/page.tsx`) is a server component that fetches pricing data and renders these sections in order:

- **Navbar** — Logo, nav links, "Get Extension" CTA button
- **HeroSection** — Headline, subtitle, social proof, ambient blob animation, retro grid background
- **FeaturesSection** — Bento grid showcasing 7 extension features:
  1. Export Everything (Markdown, PDF, text, JSON/CSV)
  2. Save & Reuse Prompts (personal library with tags)
  3. Unified Dashboard (notebooks, prompts, activity)
  4. Notebook Management (search and organize)
  5. AI Chat Hub (centralizes ChatGPT, Claude, Gemini)
  6. Audio Summaries
  7. Source Management
- **PricingSection** — Monthly/Yearly toggle, Free and Pro tiers, Lifetime plan
- **FAQSection** — 10 FAQs about the extension and plans
- **CTASection** — Final "Get Started" conversion block
- **Footer** — Legal links, social media, disclaimer (not affiliated with Google)

### 2. Checkout Flow

**API Route:** `POST /api/checkout` (`src/app/api/checkout/route.ts`)

- Accepts `{ plan: "pro_monthly" | "pro_yearly" }` in request body
- Looks up the correct product ID from environment variables
- Creates a DodoPayments checkout session
- Returns `{ checkoutUrl: string }` — the frontend opens this as an overlay modal
- On success, redirects to `/checkout/success`

**Frontend (`CheckoutProvider.tsx`):**
- Wraps the app with DodoPayments SDK initialization
- `PricingSection` calls the checkout API on button click and opens the overlay

### 3. Authentication Iframe (`/auth`)

`src/app/auth/page.tsx` runs inside an iframe embedded in the Chrome extension.

**Purpose:** Handles sign-in/sign-out and sends the authenticated user's data back to the extension via `postMessage`.

**Supported auth providers:**
- Google (with `drive.file` and `drive.appdata` OAuth scopes)
- Facebook
- GitHub

**Sign-in flow:**
1. User clicks a social login button in the extension
2. Extension opens the `/auth` page in an iframe
3. `/auth` calls `signInWithPopup()` with the chosen provider
4. On success, fetches the Firebase ID token and checks claims
5. If user has an active subscription (`subscriptionStatus === 'active'`), includes the Google Drive access token
6. Sends `{ type: 'AUTH_SUCCESS', user: { uid, email, displayName, photoURL, driveAccessToken } }` to the parent via `postMessage`

**Sign-out flow:**
1. Extension triggers sign-out via postMessage
2. `/auth` revokes the Google OAuth access token (if present)
3. Calls Firebase `signOut()`
4. Sends `{ type: 'SIGN_OUT_SUCCESS' }` to the parent

**Security:** The page sets `Cache-Control: no-store` and only allows `chrome-extension://` and `self` origins as valid parents.

### 4. Google Drive Access Gating

Drive access is gated behind an active subscription:

```typescript
// src/app/auth/page.tsx
const claims = idTokenResult.claims;
const isSubscribed = claims.subscriptionStatus === 'active';
const driveAccessToken = isSubscribed ? googleAccessToken : null;
```

Firebase custom claims (`subscriptionStatus`, `subscriptionPlan`, `subscriptionId`, etc.) are set server-side by a separate backend (not in this repo) after payment.

### 5. Pricing Tiers

| Feature | Free | Pro |
|---|---|---|
| Exports/month | 10 | Unlimited |
| Saved prompts | 15 max | Unlimited |
| Dashboard | Basic | Full + analytics |
| AI integrations | 1 | All |
| Audio summaries | No | Yes |
| Drive sync | No | Yes |
| Price | Free forever | Monthly or Yearly |

Yearly plan saves ~30% (billed annually). A Lifetime plan is referenced in FAQs (one-time payment, all future features).

---

## Environment Variables

```bash
# DodoPayments
DODO_PAYMENTS_API_KEY=sk_live_...         # Server-side API key
DODO_PRODUCT_ID_PRO_MONTHLY=pdt_...       # Product ID for monthly plan
DODO_PRODUCT_ID_PRO_YEARLY=pdt_...        # Product ID for yearly plan
DODO_ENV=live_mode                         # or test_mode

# Public
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXT_PUBLIC_DODO_ENV=live                  # or test
```

Firebase credentials are hardcoded in `src/lib/firebase.ts` — this is intentional because they are public client-side config (Firebase project: `notehublm-a2490`).

---

## Key Architectural Decisions

**Iframe auth for extension:** The Chrome extension cannot run Firebase auth directly due to CSP restrictions. Instead, the website hosts `/auth` as an iframe, which handles all auth flows and communicates results back via `postMessage`.

**No server-side database:** The website is stateless. User data and subscription state live in Firebase (managed by a separate backend service). The website only reads Firebase auth state client-side.

**Drive access token gating:** The token is only passed to the extension when `subscriptionStatus === 'active'`. This check happens on the website, not the extension, so it can't be bypassed client-side.

**Pricing fetched server-side:** `page.tsx` is an async server component that calls `getPrices()` to fetch current pricing from DodoPayments before rendering. This keeps prices accurate without client-side fetching.

**DodoPayments overlay mode:** Checkout opens as a modal overlay on the same page (not a redirect), which reduces drop-off. The `CheckoutProvider` initializes the SDK globally.

---

## External Services

| Service | Purpose | Config location |
|---|---|---|
| Firebase | User authentication, custom claims | `src/lib/firebase.ts` |
| DodoPayments | Subscription checkout | `src/lib/dodo.ts`, env vars |
| Google Drive API | Cloud sync for Pro users | Requested during Google sign-in |
| Google Fonts | Plus Jakarta Sans | `src/app/layout.tsx` |

---

## Design System

- **Theme:** Dark mode with blue/purple accents
- **Glass effects:** `.glass`, `.glass-card` utility classes in `globals.css`
- **Animations:** Ambient blob animations, smooth hover transitions, `animate-in`
- **Background:** Retro grid with perspective, gradient overlays
- **Gradient text:** `.gradient-text` utility class
- **Glow effects:** `.glow`, `.glow-text` classes
- **Breakpoints:** Mobile-first, standard Tailwind breakpoints

---

## What This Repo Does NOT Contain

- The Chrome extension code itself
- The backend that sets Firebase custom claims after payment
- Database migrations or ORM models
- Admin dashboard
- Email templates or notification logic
