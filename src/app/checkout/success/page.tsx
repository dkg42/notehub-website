import Link from "next/link";
import { Check } from "lucide-react";

export default function CheckoutSuccessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="glass-card border border-white/[0.07] rounded-2xl p-10 max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8 text-emerald-400" />
        </div>
        <h1 className="text-2xl font-extrabold text-white mb-2">
          You&apos;re all set!
        </h1>
        <p className="text-slate-400 mb-8 leading-relaxed">
          Your NoteHub Pro subscription is active. Install or update the Chrome
          extension to unlock all Pro features.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="https://chrome.google.com/webstore"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-11 px-6 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-lg shadow-blue-600/30 transition-all duration-200"
          >
            Get Chrome Extension
          </a>
          <Link
            href="/"
            className="inline-flex items-center justify-center h-11 px-6 rounded-lg bg-white/8 hover:bg-white/12 text-white border border-white/10 font-semibold transition-all duration-200"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
