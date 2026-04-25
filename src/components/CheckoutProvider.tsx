"use client";

import { useEffect } from "react";
import { DodoPayments } from "dodopayments-checkout";

export function initCheckout(checkoutUrl: string) {
  DodoPayments.Checkout.open({ checkoutUrl });
}

export default function CheckoutProvider() {
  useEffect(() => {
    DodoPayments.Initialize({
      mode: (process.env.NEXT_PUBLIC_DODO_ENV as "live" | "test") ?? "test",
      displayType: "overlay",
    });
  }, []);

  return null;
}
