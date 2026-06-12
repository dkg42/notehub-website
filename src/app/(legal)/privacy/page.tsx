import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Notehublm",
  description:
    "How Notehublm collects, uses, stores, and protects your data across the Chrome extension and this website.",
};

const CONTACT_EMAIL = "support.notehublm@gmail.com";

export default function PrivacyPolicyPage() {
  return (
    <article>
      <span className="eyebrow">
        <span className="dot" /> Legal
      </span>
      <h1>Privacy Policy</h1>
      <p className="updated">Last updated: June 12, 2026</p>

      <p className="intro">
        Notehublm (&ldquo;the extension&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is a
        browser extension that helps you capture web content as sources for Google
        NotebookLM and organize your notebooks, audio, and artifacts. This policy
        covers both the Notehublm Chrome extension and this website
        (notehublm.com). It explains what we collect, why, and how we handle it. By
        installing and using Notehublm, you agree to this policy.
      </p>

      <h2>1. Who we are</h2>
      <p>
        Notehublm is operated by Deepak Krishnan G, an independent developer based
        in India. Contact: <strong>{CONTACT_EMAIL}</strong>. Notehublm is an
        independent product and is not affiliated with, endorsed by, or sponsored
        by Google. NotebookLM is a trademark of Google LLC.
      </p>

      <h2>2. Information we collect</h2>
      <p>We collect the minimum needed to make the extension work.</p>

      <h3>a) Account &amp; authentication information</h3>
      <p>
        When you sign in with Google, we receive your name, email address, and
        profile picture, plus the authentication tokens needed to keep you signed
        in. Sign-in is handled through Google and Firebase Authentication. Google
        is the only sign-in method we support.
      </p>

      <h3>b) Google / NotebookLM session access</h3>
      <p>
        To read and write your notebooks, the extension checks for your existing
        Google session cookie (the <strong>SID</strong> cookie on the{" "}
        <strong>google.com</strong> domain) within your browser, and your browser
        automatically includes your Google session cookies when the extension
        talks to notebooklm.google.com on your behalf. If you are signed in to
        more than one Google account, the extension also queries Google&rsquo;s
        account list (accounts.google.com) to find which account position matches
        the account you signed in with. These checks are read-only — we never
        modify your cookies, and we do not read cookies from any non-Google
        website.
      </p>

      <h3>c) Content you choose to save</h3>
      <p>
        When you save a page, selection, screenshot, or chat conversation, the
        extension processes that content so it can be added to your NotebookLM
        notebook or your library. Saving content is always an explicit action you
        take. Chat conversations can be saved from the AI platforms the extension
        supports (ChatGPT, Claude, Gemini, Perplexity, Microsoft Copilot,
        DeepSeek, Mistral, and Grok) — conversations are only read when you click
        save, never extracted automatically. Screenshots capture the visible part
        of the current tab and only when you trigger the screenshot tool.
      </p>

      <h3>d) Clipboard history</h3>
      <p>
        The extension offers a clipboard history feature. When you copy text or an
        image on a webpage, the extension records the copied text (or a small
        thumbnail of the copied image) so you can reuse it later. This history is
        kept only in your browser&rsquo;s temporary session storage: it holds at
        most 50 recent entries, it is cleared automatically when you close your
        browser, and it is <strong>never</strong> synced to Google Drive, sent to
        our servers, or otherwise transmitted off your device.
      </p>

      <h3>e) Your extension data</h3>
      <p>
        Snippets, prompts, tags, folders, notebook metadata, pipelines, tab-group
        snapshots, export history, podcast/audio metadata, and settings you create
        are stored to provide the product&rsquo;s features.
      </p>

      <h3>f) Billing information (Pro users only)</h3>
      <p>
        If you upgrade to a paid plan, payments are processed by our payment
        provider, Dodo Payments. Dodo Payments collects your email and payment
        details directly in its checkout. We receive your email address, a
        customer identifier, and your subscription status; we never receive or
        store your card details.
      </p>

      <h2>3. How we use your information</h2>
      <ul>
        <li>authenticate you and keep you signed in;</li>
        <li>
          capture content and add it to your NotebookLM notebooks at your request;
        </li>
        <li>
          store your snippets, notebooks, and settings, and keep them in sync
          across your devices via your own Google Drive;
        </li>
        <li>run features you enable, such as pipelines and audio management;</li>
        <li>process subscriptions and provide Pro features;</li>
        <li>maintain security and fix problems.</li>
      </ul>
      <p>
        We do <strong>not</strong> sell your personal information. We do{" "}
        <strong>not</strong> use your data for advertising, and the extension
        contains no third-party analytics, tracking, or telemetry. We do{" "}
        <strong>not</strong> use your data to determine creditworthiness or for
        lending. We do <strong>not</strong> use your saved content for any purpose
        unrelated to providing the extension&rsquo;s features.
      </p>

      <h2>4. Automatic background activity</h2>
      <p>
        Content capture is always user-initiated, but to keep your data fresh the
        extension performs some routine work automatically while your browser is
        open:
      </p>
      <ul>
        <li>
          refreshing your list of notebooks from NotebookLM (about every 30
          minutes);
        </li>
        <li>
          evaluating any automation pipelines you have set up (about every 15
          minutes);
        </li>
        <li>
          syncing tab-group snapshots and other extension data to your Google
          Drive, if you are a Pro user with sync enabled (every few minutes);
        </li>
        <li>
          refreshing authentication tokens before they expire and cleaning up
          cached audio files.
        </li>
      </ul>
      <p>
        This background activity only touches your own NotebookLM data, your own
        Google Drive app folder, and our authentication service — it never reads
        the pages you browse.
      </p>

      <h2>5. Where your data is stored</h2>
      <ul>
        <li>
          <strong>Locally:</strong> most of your data is stored in your browser
          using Chrome&rsquo;s extension storage and IndexedDB.
        </li>
        <li>
          <strong>Your Google Drive (Pro sync):</strong> if you are a Pro user,
          your snippets, settings, folders, tags, saved chat conversations,
          pipelines, export history, podcast metadata, tab-group snapshots, and
          note metadata are synced as files to your own Google Drive
          application-data folder — a private area of your Drive that only this
          app can access. Custom podcast audio files you upload are stored in a
          regular, visible folder in your Drive so you can manage them yourself.
          Sync goes only to your own Drive; we cannot read it from our servers.
        </li>
        <li>
          <strong>Our backend:</strong> our backend runs on Firebase / Google
          Cloud (United States, us-central1) and stores only your email address,
          your Firebase account ID, a Google OAuth refresh token (used to keep
          Drive sync working without asking you to sign in again), and your
          subscription status, plan, and billing-period dates. Our backend{" "}
          <strong>never</strong> stores the content you save — no pages,
          snippets, screenshots, conversations, or notebooks. Routine server logs
          may include your email address and account identifiers for
          troubleshooting and are retained per Google Cloud&rsquo;s default log
          retention.
        </li>
      </ul>

      <h2>6. Third-party services</h2>
      <p>
        We rely on the following providers, each governed by its own privacy
        policy:
      </p>
      <ul>
        <li>
          Google / Firebase (authentication, cloud functions, Google Drive,
          NotebookLM) —{" "}
          <a
            className="link"
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            policies.google.com/privacy
          </a>
        </li>
        <li>
          Dodo Payments (subscription billing) —{" "}
          <a
            className="link"
            href="https://dodopayments.com/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            dodopayments.com/privacy-policy
          </a>
        </li>
      </ul>
      <p>
        We share information with these providers only to the extent needed to
        deliver the features described above.
      </p>

      <h2>7. Google API Services &amp; Limited Use</h2>
      <p>
        Notehublm&rsquo;s use of information received from Google APIs adheres to
        the{" "}
        <a
          className="link"
          href="https://developers.google.com/terms/api-services-user-data-policy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google API Services User Data Policy
        </a>
        , including the Limited Use requirements. We request only the Google
        account scopes necessary to provide our features:
      </p>
      <ul>
        <li>
          <strong>drive.appdata</strong> — to sync your extension data to the
          private application-data folder of your own Google Drive;
        </li>
        <li>
          <strong>drive.file</strong> — to store podcast audio files you upload
          in a folder of your Drive, and for files the app creates on your
          behalf.
        </li>
      </ul>
      <p>
        We use that access solely to operate the extension&rsquo;s user-facing
        features. We do not transfer Google user data to third parties, do not
        use it for advertising, and no humans read it except with your consent,
        for security purposes, or as required by law.
      </p>

      <h2>8. Data retention &amp; deletion</h2>
      <p>We keep your data while your account is active. You can:</p>
      <ul>
        <li>
          delete individual snippets, conversations, screenshots, or other items
          at any time inside the extension;
        </li>
        <li>clear all locally stored data by removing the extension;</li>
        <li>
          sign out, which revokes the extension&rsquo;s Google access and deletes
          the refresh token stored on our backend;
        </li>
        <li>
          request deletion of your account and any server-side data (email,
          subscription records) by emailing <strong>{CONTACT_EMAIL}</strong>. We
          will delete it within 30 days.
        </li>
      </ul>

      <h2>9. Security</h2>
      <p>
        We use industry-standard measures to protect your data: all network
        requests use encrypted connections (HTTPS), authentication is managed by
        Google and Firebase, your Google refresh token is held server-side rather
        than in the extension, and Drive access tokens are only issued to the
        extension while your subscription is active. No method of transmission or
        storage is 100% secure, but we work to protect your information.
      </p>

      <h2>10. Children</h2>
      <p>
        Notehublm is not directed to children under 13 (or the minimum age in
        your jurisdiction), and we do not knowingly collect their data.
      </p>

      <h2>11. Changes to this policy</h2>
      <p>
        We may update this policy from time to time. We will post the revised
        version here and update the &ldquo;Last updated&rdquo; date above.
        Material changes will be communicated where appropriate.
      </p>

      <h2>12. Contact</h2>
      <p>
        Questions or requests about this policy or your data:{" "}
        <strong>{CONTACT_EMAIL}</strong>
      </p>
    </article>
  );
}
