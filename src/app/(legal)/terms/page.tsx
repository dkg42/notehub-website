import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — Notehublm",
  description:
    "The terms that govern your use of the Notehublm Chrome extension and website.",
};

const CONTACT_EMAIL = "support.notehublm@gmail.com";

export default function TermsPage() {
  return (
    <article>
      <span className="eyebrow">
        <span className="dot" /> Legal
      </span>
      <h1>Terms of Service</h1>
      <p className="updated">Last updated: June 12, 2026</p>

      <p className="intro">
        These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the
        Notehublm Chrome extension and the notehublm.com website (together,
        &ldquo;the Service&rdquo;), operated by Deepak Krishnan G, an independent
        developer based in India (&ldquo;we&rdquo;, &ldquo;us&rdquo;). By
        installing the extension or using the website, you agree to these Terms.
        If you do not agree, do not use the Service.
      </p>

      <h2>1. What the Service is</h2>
      <p>
        Notehublm is a browser extension that helps you capture web content as
        sources for Google NotebookLM, save and organize snippets and prompts,
        manage notebooks and audio, and sync your data to your own Google Drive.
        Notehublm is an independent product and is{" "}
        <strong>
          not affiliated with, endorsed by, or sponsored by Google
        </strong>
        . NotebookLM, Google Drive, and Chrome are trademarks of Google LLC.
      </p>

      <h2>2. Your account</h2>
      <p>
        You sign in with your Google account. You are responsible for the
        security of your own account and for all activity that occurs through it.
        You must be at least 13 years old (or the minimum age in your
        jurisdiction) to use the Service.
      </p>

      <h2>3. Acceptable use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>
          use the Service in a way that violates any applicable law or the terms
          of service of Google NotebookLM, Google Drive, or any AI platform you
          capture content from (ChatGPT, Claude, Gemini, Perplexity, Microsoft
          Copilot, DeepSeek, Mistral, Grok);
        </li>
        <li>
          attempt to probe, disrupt, or overload the Service, NotebookLM, or our
          backend, or access them by automated means outside the extension&rsquo;s
          normal operation;
        </li>
        <li>
          reverse engineer, resell, or redistribute the Service except as
          permitted by law;
        </li>
        <li>
          capture or save content you do not have the right to use, or use the
          Service to infringe others&rsquo; intellectual-property or privacy
          rights.
        </li>
      </ul>

      <h2>4. Your content</h2>
      <p>
        You retain all rights to the content you capture and create with the
        Service. Your content is stored locally in your browser and, for Pro
        users, in your own Google Drive — we do not store it on our servers and
        claim no ownership of it. You are solely responsible for the content you
        capture and how you use it.
      </p>

      <h2>5. Free and Pro plans</h2>
      <p>
        The free plan offers a limited feature set. The Pro plan unlocks
        additional features (such as Google Drive sync) and is billed as a
        subscription (monthly or yearly) through our payment provider, Dodo
        Payments. Prices are shown at checkout and may change with notice;
        changes apply from your next billing period.
      </p>
      <ul>
        <li>
          <strong>Cancellation:</strong> you can cancel anytime via the customer
          portal (accessible from the extension). Your subscription stops
          renewing and Pro access continues until the end of the paid period.
        </li>
        <li>
          <strong>Refunds:</strong> see our{" "}
          <Link className="link" href="/refunds">
            Refund Policy
          </Link>
          .
        </li>
        <li>
          <strong>Non-payment:</strong> if a renewal payment fails, your
          subscription may be put on hold and Pro features suspended until
          payment is resolved.
        </li>
      </ul>

      <h2>6. Third-party services</h2>
      <p>
        The Service depends on third-party services — including Google
        (NotebookLM, Drive, Firebase) and Dodo Payments — that we do not control.
        Their availability and behavior may change at any time, which may affect
        or break features of the Service. Your use of those services is governed
        by their own terms and policies.
      </p>

      <h2>7. Intellectual property</h2>
      <p>
        The Service, including its code, design, and branding, is owned by us.
        We grant you a personal, non-exclusive, non-transferable, revocable
        license to use the extension for its intended purpose.
      </p>

      <h2>8. Disclaimer of warranties</h2>
      <p>
        The Service is provided <strong>&ldquo;as is&rdquo;</strong> and
        &ldquo;as available&rdquo;, without warranties of any kind, express or
        implied, including merchantability, fitness for a particular purpose, and
        non-infringement. We do not warrant that the Service will be
        uninterrupted, error-free, or that captured content will always be
        complete or accurate — in particular, NotebookLM and the supported AI
        platforms may change in ways that temporarily break features.
      </p>

      <h2>9. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, we are not liable for any
        indirect, incidental, special, consequential, or punitive damages, or any
        loss of data, profits, or revenue, arising from your use of the Service.
        Our total liability for any claim arising out of or relating to the
        Service is limited to the amount you paid us in the 12 months before the
        claim arose (or, if you have paid nothing, to zero). Nothing in these
        Terms excludes liability that cannot be excluded under applicable law.
      </p>

      <h2>10. Termination</h2>
      <p>
        You may stop using the Service at any time by uninstalling the extension.
        We may suspend or terminate your access if you breach these Terms or
        misuse the Service. Sections 4 and 7–11 survive termination.
      </p>

      <h2>11. Governing law</h2>
      <p>
        These Terms are governed by the laws of India, without regard to
        conflict-of-law principles. Courts located in India will have exclusive
        jurisdiction, except where the law of your country of residence grants
        you mandatory consumer protections.
      </p>

      <h2>12. Changes to these Terms</h2>
      <p>
        We may update these Terms from time to time. We will post the revised
        version here and update the &ldquo;Last updated&rdquo; date above.
        Continuing to use the Service after changes take effect means you accept
        the revised Terms.
      </p>

      <h2>13. Contact</h2>
      <p>
        Questions about these Terms: <strong>{CONTACT_EMAIL}</strong>
      </p>
    </article>
  );
}
