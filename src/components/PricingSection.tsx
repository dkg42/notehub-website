"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Infinity } from "lucide-react";

const freeFeatures = [
  "Export chats (up to 10/month)",
  "Save up to 15 prompts",
  "Basic dashboard",
  "View notebooks",
  "1 AI chat platform integration",
];

const proMonthlyFeatures = [
  "Unlimited chat exports",
  "Unlimited saved prompts",
  "Full dashboard + analytics",
  "Source & artifact export",
  "All AI chat integrations",
  "Audio summary generation",
  "Priority support",
];

const proYearlyFeatures = [
  ...proMonthlyFeatures,
  "2 months free vs monthly",
  "Early access to new features",
];

const lifetimeFeatures = [
  "Everything in Pro, forever",
  "One-time payment, no renewal",
  "All future features included",
  "Lifetime priority support",
  "Early beta access",
  "Founding member badge",
];

interface PlanCardProps {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
  badge?: string;
  iconColor?: string;
}

function PlanCard({
  name,
  price,
  period,
  description,
  features,
  cta,
  popular,
  badge,
}: PlanCardProps) {
  return (
    <article
      className={`relative flex flex-col rounded-2xl p-7 hover-lift ${
        popular
          ? "popular-card"
          : "glass-card border border-white/[0.07]"
      }`}
    >
      {/* Popular badge */}
      {badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <Badge className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold border-0 shadow-lg shadow-blue-600/30">
            {badge}
          </Badge>
        </div>
      )}

      {/* Plan header */}
      <div className="mb-6">
        <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-1">
          {name}
        </p>
        <div className="flex items-end gap-1 mb-2">
          <span className="text-4xl font-extrabold text-white tabular-nums">
            {price}
          </span>
          {period && (
            <span className="text-slate-500 mb-1.5 text-sm">{period}</span>
          )}
        </div>
        <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
      </div>

      {/* CTA */}
      <Button
        size="lg"
        className={`w-full h-11 font-semibold mb-7 cursor-pointer transition-all duration-200 ${
          popular
            ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40"
            : "bg-white/8 hover:bg-white/12 text-white border border-white/10"
        }`}
      >
        {cta}
      </Button>

      {/* Features */}
      <ul className="space-y-3 flex-1" role="list">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm">
            <Check
              className={`w-4 h-4 mt-0.5 shrink-0 ${
                popular ? "text-blue-400" : "text-slate-500"
              }`}
              aria-hidden="true"
            />
            <span className={popular ? "text-slate-300" : "text-slate-400"}>
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function PricingSection() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("yearly");

  return (
    <section id="pricing" className="relative py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="ambient-blob w-[700px] h-[500px] bottom-0 left-1/2 -translate-x-1/2 bg-blue-600/8" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="text-xs font-semibold text-blue-400 uppercase tracking-[0.2em] mb-4">
            Pricing
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight">
            Simple,{" "}
            <span className="gradient-text">transparent</span> pricing
          </h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
            Start free, upgrade when you need more. No hidden fees, cancel
            anytime.
          </p>
        </div>

        {/* Billing toggle */}
        <div className="flex justify-center mb-10">
          <div
            className="glass rounded-full p-1 flex items-center gap-1"
            role="group"
            aria-label="Billing period"
          >
            <button
              onClick={() => setBilling("monthly")}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${
                billing === "monthly"
                  ? "bg-white/10 text-white"
                  : "text-slate-400 hover:text-slate-300"
              }`}
              aria-pressed={billing === "monthly"}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("yearly")}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                billing === "yearly"
                  ? "bg-white/10 text-white"
                  : "text-slate-400 hover:text-slate-300"
              }`}
              aria-pressed={billing === "yearly"}
            >
              Yearly
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/15 border border-emerald-400/25 rounded-full px-1.5 py-0.5">
                Save 30%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing cards — Monthly/Yearly */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Free */}
          <PlanCard
            name="Free"
            price="$0"
            period="/ forever"
            description="Perfect for trying out NoteHub and casual NotebookLM users."
            features={freeFeatures}
            cta="Get Started Free"
          />

          {/* Pro */}
          <PlanCard
            name="Pro"
            price={billing === "monthly" ? "$9" : "$6"}
            period={billing === "monthly" ? "/ month" : "/ month, billed yearly"}
            description="Everything you need to maximize your NotebookLM workflow."
            features={billing === "yearly" ? proYearlyFeatures : proMonthlyFeatures}
            cta="Start Pro"
            popular
            badge="Most Popular"
          />

          {/* Teams (placeholder) */}
          <PlanCard
            name="Teams"
            price="$12"
            period={billing === "monthly" ? "/ user / month" : "/ user / month, billed yearly"}
            description="For teams that collaborate on research, study, and AI-powered projects."
            features={[
              "Everything in Pro",
              "Team workspace & sharing",
              "Shared prompt library",
              "Admin dashboard",
              "SSO & centralized billing",
              "Dedicated account manager",
            ]}
            cta="Contact Sales"
          />
        </div>

        {/* Lifetime card */}
        <div className="max-w-2xl mx-auto">
          <article className="relative rounded-2xl p-8 overflow-hidden border border-indigo-500/25 bg-gradient-to-br from-indigo-600/15 via-violet-600/10 to-transparent hover-lift">
            {/* Glow */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-transparent pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                    <Infinity
                      className="w-5 h-5 text-indigo-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">
                      Lifetime
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-extrabold text-white tabular-nums">
                        $149
                      </span>
                      <span className="text-slate-500 text-sm">one-time</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                  Pay once, own NoteHub Pro forever. All current and future features included. No subscriptions, ever.
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {lifetimeFeatures.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                      <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full sm:w-auto shrink-0">
                <Button
                  size="lg"
                  className="w-full sm:w-auto h-11 px-8 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/40 transition-all duration-200 cursor-pointer"
                >
                  <Zap className="w-4 h-4 mr-2" aria-hidden="true" />
                  Get Lifetime Access
                </Button>
                <p className="text-xs text-slate-500 text-center mt-2">
                  Limited early-bird pricing
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
