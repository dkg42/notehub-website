import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PlatformsSection from "@/components/PlatformsSection";
import SurfacesSection from "@/components/SurfacesSection";
import ToolsSection from "@/components/ToolsSection";
import DashboardBentoSection from "@/components/DashboardBentoSection";
import FoundationsSection from "@/components/FoundationsSection";
import ScreenshotEditorSection from "@/components/ScreenshotEditorSection";
import PricingSection from "@/components/PricingSection";
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
    <>
      <Navbar />
      <main>
        <HeroSection />
        <PlatformsSection />
        <SurfacesSection />
        <ToolsSection />
        <DashboardBentoSection />
        <FoundationsSection />
        <ScreenshotEditorSection />
        <PricingSection monthlyPrice={monthlyPrice} yearlyPrice={yearlyPrice} />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
