import { NextRequest, NextResponse } from "next/server";
import { dodo } from "@/lib/dodo";

const PRODUCT_IDS: Record<string, string> = {
  pro_monthly: process.env.DODO_PRODUCT_ID_PRO_MONTHLY!,
  pro_yearly: process.env.DODO_PRODUCT_ID_PRO_YEARLY!,
};

export async function POST(req: NextRequest) {
  let plan: string | undefined;
  try {
    ({ plan } = await req.json());

    const productId = PRODUCT_IDS[plan!];
    if (!productId) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    const baseUrl = process.env.APP_URL ?? "http://localhost:3000";

    const session = await dodo.checkoutSessions.create({
      product_cart: [{ product_id: productId, quantity: 1 }],
      return_url: `${baseUrl}/checkout/success`,
    });

    return NextResponse.json({ checkoutUrl: session.checkout_url });
  } catch (err) {
    console.error("[checkout] failed", {
      plan,
      dodoEnv: process.env.DODO_ENV,
      hasApiKey: !!process.env.DODO_PAYMENTS_API_KEY,
      appUrl: process.env.APP_URL,
      error: err instanceof Error ? err.message : String(err),
    });
    // Detail stays in the server log only — the response must not echo upstream
    // error text (it can carry product ids, account state or key metadata).
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
