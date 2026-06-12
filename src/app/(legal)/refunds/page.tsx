import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy — Notehublm",
  description:
    "Refund and cancellation policy for Notehublm Pro subscriptions.",
};

const CONTACT_EMAIL = "support.notehublm@gmail.com";

export default function RefundsPage() {
  return (
    <article>
      <span className="eyebrow">
        <span className="dot" /> Legal
      </span>
      <h1>Refund &amp; Cancellation Policy</h1>
      <p className="updated">Last updated: June 12, 2026</p>

      <p className="intro">
        This policy applies to Notehublm Pro subscriptions, billed through our
        payment provider, Dodo Payments.
      </p>

      <h2>1. Refunds</h2>
      <p>
        All payments are final. We do not offer refunds for subscription fees,
        whether for partial billing periods, unused time, or accidental
        renewals, except where a refund is required by applicable consumer
        protection law. Nothing in this policy limits any statutory rights you
        may have in your jurisdiction.
      </p>
      <p>
        Before subscribing, you can evaluate Notehublm on the free plan, which
        remains available indefinitely.
      </p>

      <h2>2. Cancellation</h2>
      <p>
        You can cancel your subscription at any time from the customer portal,
        accessible from the extension&rsquo;s account settings. When you cancel:
      </p>
      <ul>
        <li>your subscription will not renew, and no further charges are made;</li>
        <li>
          Pro features remain available until the end of the billing period you
          have already paid for;
        </li>
        <li>
          after that, your account moves to the free plan — your locally stored
          data and anything synced to your own Google Drive stay yours.
        </li>
      </ul>

      <h2>3. Billing errors</h2>
      <p>
        If you believe you were charged in error (for example, a duplicate
        charge), contact us at <strong>{CONTACT_EMAIL}</strong> within 30 days of
        the charge and we will investigate and correct genuine billing errors.
      </p>

      <h2>4. Contact</h2>
      <p>
        Questions about billing, cancellation, or this policy:{" "}
        <strong>{CONTACT_EMAIL}</strong>
      </p>
    </article>
  );
}
