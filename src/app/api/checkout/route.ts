import { NextRequest, NextResponse } from "next/server";
import { dodo } from "@/lib/dodo";

const PRODUCT_IDS: Record<string, string> = {
  pro_monthly: process.env.DODO_PRODUCT_ID_PRO_MONTHLY!,
  pro_yearly: process.env.DODO_PRODUCT_ID_PRO_YEARLY!,
};

export async function POST(req: NextRequest) {
  const { plan } = await req.json();

  const productId = PRODUCT_IDS[plan];
  if (!productId) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const session = await dodo.checkoutSessions.create({
    product_cart: [{ product_id: productId, quantity: 1 }],
    return_url: `${baseUrl}/checkout/success`,
  });

  return NextResponse.json({ checkoutUrl: session.checkout_url });
}
