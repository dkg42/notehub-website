import { ReactNode } from "react";
import {
  Download,
  BookMarked,
  MessagesSquare,
  LayoutDashboard,
  GitBranch,
  Mic2,
  FileText,
  Sparkles,
} from "lucide-react";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";

/* ─── Decorative card backgrounds ─── */

function ExportBackground() {
  const files = [
    { name: "Chat history.md", size: "24 KB", color: "text-blue-400" },
    { name: "Sources export.pdf", size: "1.2 MB", color: "text-indigo-400" },
    { name: "AI artifacts.txt", size: "8 KB", color: "text-violet-400" },
    { name: "Notebook backup.zip", size: "3.4 MB", color: "text-blue-300" },
  ];
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-transparent" />
      <div className="absolute top-6 left-6 right-6 space-y-2">
        {files.map((f) => (
          <div
            key={f.name}
            className="flex items-center gap-3 rounded-lg bg-white/[0.04] border border-white/[0.06] px-3 py-2.5 text-xs backdrop-blur-sm"
          >
            <FileText className={`w-4 h-4 shrink-0 ${f.color}`} />
            <span className="text-slate-300 flex-1 truncate">{f.name}</span>
            <span className="text-slate-600 shrink-0">{f.size}</span>
            <Download className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          </div>
        ))}
      </div>
      <div className="absolute bottom-32 right-6 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl" />
    </div>
  );
}

function PromptsBackground() {
  const prompts = [
    { tag: "Summary", text: "Summarize this source in 3 bullet points..." },
    { tag: "Analysis", text: "What are the key arguments in this..." },
    { tag: "Explain", text: "Explain this concept as if I were..." },
  ];
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-transparent to-transparent" />
      <div className="absolute top-6 left-6 right-6 space-y-2">
        {prompts.map((p) => (
          <div
            key={p.tag}
            className="rounded-lg bg-white/[0.04] border border-white/[0.06] px-3 py-2.5 text-xs backdrop-blur-sm"
          >
            <span className="inline-block mb-1 px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-medium">
              {p.tag}
            </span>
            <p className="text-slate-400 truncate">{p.text}</p>
          </div>
        ))}
        <div className="flex gap-2 flex-wrap pt-1">
          {["Research", "Writing", "Study", "Meeting"].map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-[10px] text-slate-500"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChatHubBackground() {
  const messages = [
    { ai: "ChatGPT", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/20", msg: "Here's a detailed analysis..." },
    { ai: "Claude", color: "bg-orange-500/20 text-orange-300 border-orange-500/20", msg: "I can help with that. Let me..." },
    { ai: "Gemini", color: "bg-blue-500/20 text-blue-300 border-blue-500/20", msg: "Based on your question..." },
  ];
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/15 via-transparent to-transparent" />
      <div className="absolute top-6 left-6 right-6 space-y-2.5">
        {messages.map((m) => (
          <div key={m.ai} className="rounded-lg bg-white/[0.04] border border-white/[0.06] p-3 text-xs backdrop-blur-sm">
            <span className={`inline-block mb-1.5 px-2 py-0.5 rounded-full border text-[10px] font-medium ${m.color}`}>
              {m.ai}
            </span>
            <p className="text-slate-400 truncate">{m.msg}</p>
          </div>
        ))}
      </div>
      <div className="absolute bottom-24 left-6 w-20 h-20 bg-emerald-500/10 rounded-full blur-2xl" />
    </div>
  );
}

function DashboardBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-transparent to-transparent" />
      <div className="absolute top-6 left-6 right-6">
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div className="rounded-lg bg-white/[0.04] border border-white/[0.06] p-3">
            <p className="text-[10px] text-slate-600 mb-1">Notebooks</p>
            <p className="text-xl font-bold text-white">12</p>
          </div>
          <div className="rounded-lg bg-white/[0.04] border border-white/[0.06] p-3">
            <p className="text-[10px] text-slate-600 mb-1">Prompts</p>
            <p className="text-xl font-bold text-white">48</p>
          </div>
        </div>
        <div className="rounded-lg bg-white/[0.04] border border-white/[0.06] p-3">
          <div className="flex justify-between items-center mb-2">
            <p className="text-[10px] text-slate-500">Recent activity</p>
          </div>
          <div className="space-y-1.5">
            {["Exported Research notes", "Saved 2 prompts", "Chat synced"].map((a) => (
              <div key={a} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                <span className="text-[11px] text-slate-400">{a}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function NotebookBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/15 via-transparent to-transparent" />
      <div className="absolute top-5 left-5 right-5 space-y-1.5">
        {["Research Project", "Meeting Notes", "Study Guide"].map((nb, i) => (
          <div
            key={nb}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs border ${
              i === 0
                ? "bg-cyan-500/15 border-cyan-500/20 text-cyan-300"
                : "bg-white/[0.04] border-white/[0.06] text-slate-400"
            }`}
          >
            <div className={`w-1.5 h-1.5 rounded-full ${i === 0 ? "bg-cyan-400" : "bg-slate-600"}`} />
            {nb}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Feature definitions ─── */

const bentoFeatures: {
  Icon: any;
  name: string;
  description: string;
  href: string;
  cta: string;
  className: string;
  background: ReactNode;
}[] = [
  {
    Icon: Download,
    name: "Export Everything",
    description:
      "Export chats, sources, and AI-generated artifacts in Markdown, PDF, or plain text. Your data, your way.",
    href: "#features",
    cta: "Learn more",
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
    background: <ExportBackground />,
  },
  {
    Icon: BookMarked,
    name: "Save & Reuse Prompts",
    description:
      "Build a personal prompt library. Tag, search, and insert prompts into NotebookLM with one click — never retype again.",
    href: "#features",
    cta: "Learn more",
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
    background: <PromptsBackground />,
  },
  {
    Icon: LayoutDashboard,
    name: "Unified Dashboard",
    description:
      "All notebooks, prompts, and activity in one dedicated tab.",
    href: "#features",
    cta: "Learn more",
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
    background: <DashboardBackground />,
  },
  {
    Icon: GitBranch,
    name: "Notebook Management",
    description:
      "Search and organize all your NotebookLM notebooks from one place.",
    href: "#features",
    cta: "Learn more",
    className: "lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-2",
    background: <NotebookBackground />,
  },
  {
    Icon: MessagesSquare,
    name: "AI Chat Hub",
    description:
      "Centralize conversations from ChatGPT, Claude, Gemini, and more — all in one searchable repository.",
    href: "#features",
    cta: "Learn more",
    className: "lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:row-end-4",
    background: <ChatHubBackground />,
  },
];

/* ─── Extra feature pills (below bento) ─── */

const extraFeatures = [
  { Icon: Mic2, title: "Audio Summaries", color: "text-cyan-400" },
  { Icon: FileText, title: "Source Management", color: "text-amber-400" },
  { Icon: Sparkles, title: "More Coming Soon", color: "text-slate-500", muted: true },
];

/* ─── Section ─── */

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-28 overflow-hidden">
      {/* Background accents */}
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

        {/* Bento grid */}
        <BentoGrid className="lg:grid-rows-3">
          {bentoFeatures.map((feature) => (
            <BentoCard key={feature.name} {...feature} />
          ))}
        </BentoGrid>

        {/* Extra features row */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {extraFeatures.map((f) => {
            const Icon = f.Icon;
            return (
              <div
                key={f.title}
                className={`flex items-center gap-3 rounded-xl border border-white/[0.08] bg-[#0d1526] px-5 py-4 ${
                  f.muted ? "opacity-60" : ""
                }`}
              >
                <Icon className={`w-5 h-5 shrink-0 ${f.color}`} aria-hidden="true" />
                <span className="text-sm font-medium text-white">{f.title}</span>
                {f.muted && (
                  <span className="ml-auto text-[10px] font-medium text-slate-600 border border-white/10 rounded-full px-2 py-0.5">
                    Soon
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
