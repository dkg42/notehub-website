import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { dodo } from "@/lib/dodo";
import type { Price } from "dodopayments/resources/products";

function formatCents(price: Price) {
  const cents = "price" in price ? price.price : 0;
  return `$${(cents / 100).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}

async function getPrices() {
  const [monthly, yearly] = await Promise.all([
    dodo.products.retrieve(process.env.DODO_PRODUCT_ID_PRO_MONTHLY!),
    dodo.products.retrieve(process.env.DODO_PRODUCT_ID_PRO_YEARLY!),
  ]);
  return {
    monthlyPrice: formatCents(monthly.price),
    yearlyPrice: formatCents(yearly.price),
  };
}

export default async function Home() {
  const { monthlyPrice, yearlyPrice } = await getPrices();

  return (
    <div className="min-h-screen bg-[#0a0f1e]">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <PricingSection monthlyPrice={monthlyPrice} yearlyPrice={yearlyPrice} />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
