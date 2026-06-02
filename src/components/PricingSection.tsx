"use client";

import { useState } from "react";
import { initCheckout } from "@/components/CheckoutProvider";

async function startCheckout(plan: string) {
  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ plan }),
  });
  const { checkoutUrl } = await res.json();
  if (checkoutUrl) initCheckout(checkoutUrl);
}

const freeFeatures = [
  "All side-panel tools",
  "All 9 platforms supported",
  "Daily limits on chats & notebook syncs",
  "1 automation pipeline",
  "Google Drive sync",
];

const proMonthlyFeatures = [
  "Everything in Free",
  "Unlimited chat history",
  "Unlimited notebook syncs",
  "Unlimited automation pipelines",
  "Priority support",
];

const proYearlyFeatures = [
  ...proMonthlyFeatures,
  "2 months free vs monthly",
  "Early access to new features",
];

const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
    <path d="M5 12l5 5L20 6" />
  </svg>
);

interface PricingSectionProps {
  monthlyPrice: string;
  yearlyPrice: string;
}

export default function PricingSection({ monthlyPrice, yearlyPrice }: PricingSectionProps) {
  const [billing, setBilling] = useState<"monthly" | "yearly">("yearly");

  const proPrice = billing === "monthly" ? monthlyPrice : yearlyPrice;
  const proPer = billing === "monthly" ? "/ month" : "/ year";
  const proFeatures = billing === "yearly" ? proYearlyFeatures : proMonthlyFeatures;

  return (
    <section className="band" id="pricing" style={{ paddingTop: 0 }} data-screen-label="Pricing">
      <div className="wrap">
        <div className="sec-head center reveal">
          <span className="eyebrow">
            <span className="dot" />
            Pricing
          </span>
          <h2>Start free. Upgrade when you scale.</h2>
          <p>Every capture tool is free. Pro lifts the daily limits and unlocks unlimited automation.</p>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }} className="reveal">
          <div className="bill-toggle" role="group" aria-label="Billing period">
            <button
              type="button"
              className={billing === "monthly" ? "on" : ""}
              onClick={() => setBilling("monthly")}
              aria-pressed={billing === "monthly"}
            >
              Monthly
            </button>
            <button
              type="button"
              className={billing === "yearly" ? "on" : ""}
              onClick={() => setBilling("yearly")}
              aria-pressed={billing === "yearly"}
            >
              Yearly
              <span className="save-pill">SAVE 30%</span>
            </button>
          </div>
        </div>

        <div className="price-grid">
          <div className="price reveal">
            <div className="pname">
              <h3>Free</h3>
            </div>
            <div className="amt">
              $0<span className="per">/ forever</span>
            </div>
            <div className="desc">
              Everything you need to capture, organize and sync — with generous daily limits.
            </div>
            <ul>
              {freeFeatures.map((f) => (
                <li key={f}>
                  <Check />
                  {f}
                </li>
              ))}
            </ul>
            <a className="btn btn-ghost" href="#install">
              Add to Chrome
            </a>
          </div>

          <div className="price pro reveal" style={{ ["--d" as never]: ".1s" }}>
            <div className="pname">
              <h3>Pro</h3>
              <span className="pbadge">Unlimited</span>
            </div>
            <div className="amt">
              {proPrice}
              <span className="per">{proPer}</span>
            </div>
            <div className="desc">
              For daily drivers who live inside their chatbots and notebooks.
            </div>
            <ul>
              {proFeatures.map((f) => (
                <li key={f}>
                  <Check />
                  {f}
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => startCheckout(billing === "monthly" ? "pro_monthly" : "pro_yearly")}
            >
              Start free trial
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
