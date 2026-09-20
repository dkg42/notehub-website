# Security Policy

## Reporting a vulnerability

Please report security issues privately. **Do not open a public GitHub issue.**

Email **support.notehublm@gmail.com** with:

- what the issue is and where it lives (URL, file, or endpoint),
- steps to reproduce, or a proof of concept,
- what an attacker could achieve with it.

You can expect an acknowledgement within a few business days. This is an independently
maintained project, so there is no bug-bounty program and no paid reward — credit in the
fix notes is offered if you would like it.

Please give a reasonable window to ship a fix before disclosing publicly, and avoid
accessing, modifying, or retaining other people's data while investigating.

## Scope

**In scope**

- This website: the marketing pages, `/api/checkout`, and the `/auth` iframe.
- The subscription gate that decides whether a Google Drive access token is released to
  the extension.
- The `postMessage` contract between `/auth` and its embedding parent frame.

**Out of scope** (report to the relevant vendor instead)

- The Chrome extension and the Cloud Functions backend — they live in separate
  repositories and are not covered here.
- Firebase, Google Identity Services, Dodo Payments, and other third-party
  infrastructure.
- Denial of service, volumetric testing, social engineering, and reports produced
  solely by automated scanners with no demonstrated impact.

## Things that are not vulnerabilities

- **The Firebase web API key in `src/lib/firebase.ts`.** Firebase web config is public
  by design; it identifies the project and grants nothing on its own. See
  [Firebase's API key documentation](https://firebase.google.com/docs/projects/api-keys).
- **`NEXT_PUBLIC_*` values in the client bundle**, including the Google OAuth client id.
  These are inlined at build time and are meant to be public.

Server-side secrets — the Dodo Payments API key above all — are supplied through Cloud
Secret Manager and are never committed. If you ever find one in this repository or in a
deployed bundle, that *is* a vulnerability: report it immediately.
