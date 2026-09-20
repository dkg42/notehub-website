# Contributing

Thanks for taking a look. This repository is the website for a commercial product, so
it is published mainly for transparency rather than as a community-run project — but
issues and focused pull requests are genuinely welcome.

## Before you open a pull request

No license is granted on this source (see the License section of the
[README](./README.md)). By submitting a contribution you agree that the maintainer may
use it under the same terms as the rest of the repository. If that is not acceptable to
you, please open an issue describing the change instead of sending code.

Large or speculative rewrites are unlikely to be merged. Bug fixes, accessibility
improvements, copy corrections, and dependency updates are the easiest changes to land.

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

You need Dodo Payments **test-mode** credentials for the home page to render, because
pricing is fetched from the Dodo API at build time. Never put live-mode keys in a
development environment.

To work on `/auth`, run `npm run dev:https` — Google Identity Services refuses to run
on an insecure origin.

## Before pushing

```bash
npm run lint
npx tsc --noEmit
npm run build
```

All three must pass.

## Ground rules

- **Never commit secrets.** `.env.local`, `certificates/`, and every `.env*` file other
  than `.env.example` are gitignored; keep it that way. If you add a new configuration
  value, add it to `.env.example` and to the table in the README with a placeholder
  value, never a real one.
- **Do not weaken the auth or payment paths** without saying so explicitly in the PR
  description. In particular: the `subscriptionStatus === 'active'` gate in
  `src/app/auth/page.tsx`, the `postMessage` target origin, the `/auth` CSP headers in
  `next.config.ts`, and the fact that `/api/checkout` does not return upstream error
  text to the browser.
- **Match the surrounding style.** The project uses TypeScript, the App Router, and
  Tailwind CSS 4 with the design tokens in `src/app/globals.css`. Prefer `next/link`
  over raw `<a>` for internal navigation — ESLint enforces this.
- Editor and machine-specific files (`.idea/`, `.vscode/`, `.claude/settings.local.json`)
  stay out of version control.

## Branches

`main` is the default branch. Release work happens on `release/**` branches; pushing to
one opens an automatic back-merge PR into `main`. Target `main` with your PR unless a
maintainer asks otherwise.

## Reporting bugs

Open a GitHub issue with steps to reproduce, what you expected, and what happened.
For anything security-related, do **not** open a public issue — see
[SECURITY.md](./SECURITY.md).
