import type { ReactNode } from "react";

type Tool = {
  tint: string;
  icon: ReactNode;
  title: string;
  body: string;
};

const tools: Tool[] = [
  {
    tint: "t-indigo",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M5 3l1.5 3.5L10 8 6.5 9.5 5 13 3.5 9.5 0 8l3.5-1.5z" transform="translate(3 2)" />
        <path d="M18 13l1 2.2 2.2 1-2.2 1L18 19.4 17 17.2 14.8 16.2 17 15.2z" />
      </svg>
    ),
    title: "Prompt Hub",
    body: "Organize prompts in tagged, searchable folders. Star favourites, duplicate variants, and send straight into any chat input.",
  },
  {
    tint: "t-teal",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M4 5h16v11H8l-4 4z" />
      </svg>
    ),
    title: "Chat History",
    body: "Save entire conversations with one click. Search, filter by platform, re-sync new messages, and jump back to the original chat.",
  },
  {
    tint: "t-emerald",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="6" y="4" width="12" height="17" rx="2" />
        <path d="M9 4V3h6v1" />
      </svg>
    ),
    title: "Clipboard Monitor",
    body: "Everything you copy while browsing, captured into a timestamped history. Promote anything useful into a reusable snippet.",
  },
  {
    tint: "t-amber",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="3" y="6" width="18" height="14" rx="2.5" />
        <circle cx="12" cy="13" r="3.5" />
        <path d="M8 6l1.5-2h5L16 6" />
      </svg>
    ),
    title: "Screenshot Capture",
    body: "Grab the visible area, full page, a selection, or a DOM element. Annotate with text, shapes and drawing, then export as PNG.",
  },
  {
    tint: "t-purple",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M12 3l9 5-9 5-9-5z" />
        <path d="M3 13l9 5 9-5" />
      </svg>
    ),
    title: "Tab Manager",
    body: "See every open tab in the sidebar and turn any URL into a NotebookLM source. Bulk-add tabs to spin up a notebook in seconds.",
  },
  {
    tint: "t-violet",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M3 5.5C3 5 3.4 4.5 4 4.5h6c1.1 0 2 .9 2 2v13c0-1.1-.9-2-2-2H4c-.6 0-1-.5-1-1z" />
        <path d="M21 5.5c0-.5-.4-1-1-1h-6c-1.1 0-2 .9-2 2v13c0-1.1.9-2 2-2h6c.6 0 1-.5 1-1z" />
      </svg>
    ),
    title: "Add to NotebookLM",
    body: "Send the current page straight into any notebook as a source — pick the notebook, hit add, and keep reading.",
  },
];

export default function ToolsSection() {
  return (
    <section className="band" id="tools" style={{ paddingTop: 0 }} data-screen-label="Tools">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">
            <span className="dot" />
            Side panel tools
          </span>
          <h2>Everything you need, one click away</h2>
          <p>The capture toolkit that follows you across every AI tab.</p>
        </div>

        <div className="tools-grid stagger">
          {tools.map((tool) => (
            <div className="tool" key={tool.title}>
              <div className={`tile ${tool.tint}`}>{tool.icon}</div>
              <h3>{tool.title}</h3>
              <p>{tool.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
