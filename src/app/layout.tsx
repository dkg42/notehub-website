import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Sora } from "next/font/google";
import "./globals.css";
import CheckoutProvider from "@/components/CheckoutProvider";
import RevealOnScroll from "@/components/RevealOnScroll";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Notehublm — Your second brain for AI chats",
  description:
    "Notehublm is a Chrome extension that supercharges NotebookLM. Save prompts, capture conversations, annotate screenshots, and automate notebooks across 9 AI platforms — synced to your Google account.",
  keywords: [
    "NotebookLM",
    "Chrome extension",
    "AI productivity",
    "export chats",
    "prompts",
    "notebooks",
    "ChatGPT",
    "Gemini",
    "Claude",
  ],
  openGraph: {
    title: "noteHubLM — Your second brain for AI chats",
    description:
      "Save prompts, capture conversations, annotate screenshots, and automate notebooks across 9 AI platforms.",
    type: "website",
  },
};

const themeInitScript = `(function(){try{var t=localStorage.getItem('nh-theme');if(t==='light')document.documentElement.setAttribute('data-theme','light');}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${sora.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="antialiased">
        <CheckoutProvider />
        {children}
        <RevealOnScroll />
      </body>
    </html>
  );
}
