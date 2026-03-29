import { ArrowRight, Chrome, Star } from "lucide-react";
import { RetroGrid } from "@/components/blocks/hero-section-dark";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-[#0a0f1e]" />
        {/* Radial blue glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse_60%_80%_at_50%_0%,rgba(37,99,235,0.2),transparent)]" />
        {/* Ambient blobs */}
        <div className="ambient-blob w-[500px] h-[500px] top-0 -left-32 bg-indigo-600/10" />
        <div className="ambient-blob w-[400px] h-[400px] -bottom-20 right-0 bg-violet-600/8" />
      </div>

      {/* Retro grid */}
      <RetroGrid
        angle={65}
        cellSize={64}
        opacity={0.5}
        lightLineColor="rgba(255,255,255,0.06)"
        darkLineColor="rgba(255,255,255,0.06)"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24">
        {/* Eyebrow pill */}
        <div className="flex justify-center mb-6">
          <p className="text-sm text-gray-400 group font-sans mx-auto px-5 py-2 bg-gradient-to-tr from-zinc-300/5 via-gray-400/5 to-transparent border-[2px] border-white/5 rounded-3xl w-fit">
            Chrome Extension — Now Available
          </p>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter font-extrabold bg-clip-text text-transparent mx-auto bg-[linear-gradient(180deg,_#fff_0%,_rgba(255,255,255,0.75)_100%)] mb-4 leading-[1.1]">
          Supercharge Your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
            NotebookLM
          </span>
          <br />
          Experience
        </h1>

        {/* Description */}
        <p className="max-w-2xl mx-auto text-gray-400 text-lg mb-10 leading-relaxed">
          NoteHub adds powerful features to NotebookLM — export chats &amp; sources,
          save prompts, manage notebooks, and unify all your AI conversations in
          one intelligent dashboard.
        </p>

        {/* CTAs */}
        <div className="items-center justify-center gap-x-4 space-y-3 sm:flex sm:space-y-0 mb-14">
          {/* Primary CTA with animated spinning border */}
          <span className="relative inline-block overflow-hidden rounded-full p-[1.5px]">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#93c5fd_0%,#2563eb_50%,#93c5fd_100%)]" />
            <div className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-[#0a0f1e] backdrop-blur-3xl">
              <a
                href="#pricing"
                className="inline-flex rounded-full text-center group items-center w-full justify-center bg-gradient-to-tr from-blue-300/10 via-blue-400/20 to-transparent text-white border-[1px] border-white/10 hover:border-white/20 transition-all sm:w-auto py-4 px-10 font-semibold"
              >
                <Chrome className="w-4 h-4 mr-2" aria-hidden="true" />
                Add to Chrome — It&apos;s Free
                <ArrowRight
                  className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
            </div>
          </span>

          {/* Secondary CTA */}
          <a
            href="#features"
            className="inline-flex items-center justify-center h-12 px-8 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold text-base transition-all duration-200"
          >
            See Features
          </a>
        </div>

        {/* Social proof */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-slate-500 mb-20">
          <div className="flex items-center gap-1.5">
            <div className="flex" aria-label="5 star rating">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-amber-400 text-amber-400"
                  aria-hidden="true"
                />
              ))}
            </div>
            <span className="text-slate-400 font-medium">4.9/5</span>
            <span>from early users</span>
          </div>
          <span className="hidden sm:block text-white/10">|</span>
          <span>
            <span className="text-white font-semibold">Free forever</span> on
            core features
          </span>
          <span className="hidden sm:block text-white/10">|</span>
          <span>No account required to start</span>
        </div>

        {/* Hero mockup card */}
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-2xl overflow-hidden shadow-2xl shadow-black/40 border border-white/[0.07] hover-lift">
            {/* Browser chrome bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.03] border-b border-white/[0.06]">
              <div className="flex gap-1.5" aria-hidden="true">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-amber-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-white/[0.05] rounded-md px-3 py-1 text-xs text-slate-500 text-center max-w-xs mx-auto">
                  notebooklm.google.com
                </div>
              </div>
              <div className="w-20 h-5 rounded bg-blue-600/30 border border-blue-500/20 flex items-center justify-center">
                <span className="text-[10px] text-blue-400 font-medium">
                  NoteHub
                </span>
              </div>
            </div>

            {/* Dashboard preview */}
            <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Sidebar */}
              <div className="sm:col-span-1 glass rounded-xl p-4 space-y-3">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">
                  Notebooks
                </p>
                {[
                  "Research Project",
                  "Meeting Notes",
                  "Study Guide",
                  "Side Project",
                ].map((name, i) => (
                  <div
                    key={name}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                      i === 0
                        ? "bg-blue-600/20 text-blue-300 border border-blue-500/20"
                        : "text-slate-400 hover:bg-white/5"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        i === 0 ? "bg-blue-400" : "bg-slate-600"
                      }`}
                      aria-hidden="true"
                    />
                    {name}
                  </div>
                ))}
              </div>

              {/* Main content */}
              <div className="sm:col-span-2 space-y-4">
                <div className="glass rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-semibold text-white">
                      Research Project
                    </p>
                    <div className="flex gap-2">
                      {["Export", "Share"].map((action) => (
                        <div
                          key={action}
                          className="px-2 py-1 rounded text-xs bg-blue-600/20 text-blue-300 border border-blue-500/20"
                        >
                          {action}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-2.5 rounded-full bg-white/5"
                        style={{ width: `${85 - i * 15}%` }}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="glass rounded-xl p-4">
                    <p className="text-xs text-slate-500 mb-1">Saved Prompts</p>
                    <p className="text-2xl font-bold text-white">24</p>
                    <p className="text-xs text-blue-400 mt-1">+3 this week</p>
                  </div>
                  <div className="glass rounded-xl p-4">
                    <p className="text-xs text-slate-500 mb-1">AI Chats</p>
                    <p className="text-2xl font-bold text-white">138</p>
                    <p className="text-xs text-indigo-400 mt-1">
                      Across 4 tools
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
