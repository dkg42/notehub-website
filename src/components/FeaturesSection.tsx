import {
  Download,
  BookMarked,
  LayoutDashboard,
  Mic2,
  MessagesSquare,
  Sparkles,
  FileText,
  GitBranch,
} from "lucide-react";

const features = [
  {
    icon: Download,
    title: "Export Everything",
    description:
      "Export your NotebookLM chats, sources, and AI-generated artifacts in multiple formats — Markdown, PDF, or plain text. Your data, your way.",
    color: "blue",
    gradient: "from-blue-600/20 to-blue-600/5",
    border: "border-blue-500/20",
    iconBg: "bg-blue-500/15",
    iconColor: "text-blue-400",
  },
  {
    icon: BookMarked,
    title: "Save & Reuse Prompts",
    description:
      "Build a personal library of your best prompts. Tag, search, and insert saved prompts into NotebookLM with one click — never retype again.",
    color: "indigo",
    gradient: "from-indigo-600/20 to-indigo-600/5",
    border: "border-indigo-500/20",
    iconBg: "bg-indigo-500/15",
    iconColor: "text-indigo-400",
  },
  {
    icon: LayoutDashboard,
    title: "Unified Dashboard",
    description:
      "Open NoteHub's full-featured dashboard in a dedicated browser tab. See all your notebooks, prompts, and activity at a glance.",
    color: "violet",
    gradient: "from-violet-600/20 to-violet-600/5",
    border: "border-violet-500/20",
    iconBg: "bg-violet-500/15",
    iconColor: "text-violet-400",
  },
  {
    icon: Mic2,
    title: "Audio Summaries",
    description:
      "Generate and play AI-powered audio summaries of your notebooks directly from the dashboard. Perfect for on-the-go learning.",
    color: "cyan",
    gradient: "from-cyan-600/20 to-cyan-600/5",
    border: "border-cyan-500/20",
    iconBg: "bg-cyan-500/15",
    iconColor: "text-cyan-400",
  },
  {
    icon: MessagesSquare,
    title: "AI Chat Hub",
    description:
      "Access and search your conversations from ChatGPT, Claude, Gemini, and more — all in one central repository. Never lose a chat again.",
    color: "emerald",
    gradient: "from-emerald-600/20 to-emerald-600/5",
    border: "border-emerald-500/20",
    iconBg: "bg-emerald-500/15",
    iconColor: "text-emerald-400",
  },
  {
    icon: FileText,
    title: "Source Management",
    description:
      "Organize, preview, and export your NotebookLM sources. Bulk-manage files and links across multiple notebooks effortlessly.",
    color: "amber",
    gradient: "from-amber-600/20 to-amber-600/5",
    border: "border-amber-500/20",
    iconBg: "bg-amber-500/15",
    iconColor: "text-amber-400",
  },
  {
    icon: GitBranch,
    title: "Notebook Management",
    description:
      "View, search, and organize all your NotebookLM notebooks from one place. Switch between projects without losing context.",
    color: "rose",
    gradient: "from-rose-600/20 to-rose-600/5",
    border: "border-rose-500/20",
    iconBg: "bg-rose-500/15",
    iconColor: "text-rose-400",
  },
  {
    icon: Sparkles,
    title: "More Coming Soon",
    description:
      "We're constantly shipping new features. AI summarization, collaboration tools, cross-device sync, and much more on the roadmap.",
    color: "blue",
    gradient: "from-blue-600/10 to-transparent",
    border: "border-white/10",
    iconBg: "bg-white/5",
    iconColor: "text-slate-400",
    muted: true,
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="ambient-blob w-[600px] h-[600px] top-1/4 -right-64 bg-indigo-600/8" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-xs font-semibold text-blue-400 uppercase tracking-[0.2em] mb-4">
            Features
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight">
            Everything NotebookLM{" "}
            <span className="gradient-text">should have</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
            NoteHub seamlessly extends NotebookLM with the features power users
            have been asking for — and centralizes your entire AI workflow.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <article
                key={feature.title}
                className={`relative glass-card rounded-2xl p-6 border hover-lift ${
                  feature.muted ? "opacity-70" : ""
                } ${feature.border} bg-gradient-to-br ${feature.gradient}`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {/* Icon */}
                <div
                  className={`w-11 h-11 rounded-xl ${feature.iconBg} flex items-center justify-center mb-4`}
                >
                  <Icon
                    className={`w-5 h-5 ${feature.iconColor}`}
                    aria-hidden="true"
                  />
                </div>

                {/* Content */}
                <h3 className="text-base font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {feature.description}
                </p>

                {feature.muted && (
                  <span className="inline-block mt-3 text-xs font-medium text-slate-500 border border-white/10 rounded-full px-2.5 py-0.5">
                    Coming soon
                  </span>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
