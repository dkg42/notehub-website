import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NoteHub — Supercharge Your NotebookLM",
  description:
    "NoteHub is a Chrome extension that unlocks the full potential of NotebookLM. Export chats, save prompts, manage notebooks, and access all your AI chats in one place.",
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
    title: "NoteHub — Supercharge Your NotebookLM",
    description:
      "Export chats, save prompts, manage notebooks, and unify all your AI chats in one powerful dashboard.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} dark h-full`}>
      <body className="min-h-full font-sans antialiased">{children}</body>
    </html>
  );
}
