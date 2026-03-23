import { Badge } from "@/components/ui/badge";
import { ArrowRight, Chrome, Star } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        {/* Deep dark base */}
        <div className="absolute inset-0 bg-[#0a0f1e]" />
        {/* Radial glow center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] bg-blue-600/10 rounded-full blur-[120px]" />
        {/* Ambient blob top-left */}
        <div className="ambient-blob w-[500px] h-[500px] top-0 -left-32 bg-indigo-600/15" />
        {/* Ambient blob bottom-right */}
        <div className="ambient-blob w-[400px] h-[400px] -bottom-20 right-0 bg-violet-600/10" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24">
        {/* Eyebrow badge */}
        <div className="flex justify-center mb-6">
          <Badge
            variant="outline"
            className="px-4 py-1.5 text-xs font-semibold border-blue-500/30 bg-blue-500/10 text-blue-300 tracking-wide uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-2 inline-block animate-pulse" />
            Chrome Extension — Now Available
          </Badge>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight mb-6 text-white">
          Supercharge Your{" "}
          <span className="relative inline-block">
            <span className="gradient-text">NotebookLM</span>
            <span
              className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 opacity-60"
              aria-hidden="true"
            />
          </span>
          <br />
          Experience
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          NoteHub adds powerful features to NotebookLM — export chats & sources,
          save prompts, manage notebooks, and unify all your AI conversations in
          one intelligent dashboard.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <a
            href="#pricing"
            className="inline-flex items-center justify-center w-full sm:w-auto h-12 px-8 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-base shadow-xl shadow-blue-600/30 hover:shadow-blue-500/40 transition-all duration-200 cursor-pointer group"
          >
            <Chrome className="w-5 h-5 mr-2" aria-hidden="true" />
            Add to Chrome — It&apos;s Free
            <ArrowRight
              className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </a>
          <a
            href="#features"
            className="inline-flex items-center justify-center w-full sm:w-auto h-12 px-8 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold text-base transition-all duration-200 cursor-pointer"
          >
            See Features
          </a>
        </div>

        {/* Social proof */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-slate-500">
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
        <div className="mt-20 max-w-4xl mx-auto">
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
                <span className="text-[10px] text-blue-400 font-medium">NoteHub</span>
              </div>
            </div>

            {/* Dashboard preview */}
            <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Sidebar */}
              <div className="sm:col-span-1 glass rounded-xl p-4 space-y-3">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">
                  Notebooks
                </p>
                {["Research Project", "Meeting Notes", "Study Guide", "Side Project"].map(
                  (name, i) => (
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
                  )
                )}
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
                    <p className="text-xs text-indigo-400 mt-1">Across 4 tools</p>
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
