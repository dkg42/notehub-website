import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LegalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="legal">
        <div className="wrap">{children}</div>
      </main>
      <Footer />
    </>
  );
}
