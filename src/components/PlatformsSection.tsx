const platforms: { label: string; tile: string; color: string }[] = [
  { label: "ChatGPT", tile: "C", color: "#10a37f" },
  { label: "Claude", tile: "A", color: "#d97757" },
  { label: "Gemini", tile: "G", color: "#4285f4" },
  { label: "Perplexity", tile: "P", color: "#20b8cd" },
  { label: "Copilot", tile: "M", color: "#0a84ff" },
  { label: "DeepSeek", tile: "D", color: "#4d6bfe" },
  { label: "Mistral", tile: "M", color: "#ff7000" },
  { label: "Grok", tile: "X", color: "#1d1d1f" },
  { label: "NotebookLM", tile: "N", color: "#7c3aed" },
];

export default function PlatformsSection() {
  return (
    <section className="platforms" id="platforms" data-screen-label="Platforms">
      <div className="wrap">
        <div className="label eyebrow reveal" style={{ justifyContent: "center", display: "flex" }}>
          Works natively on nine major AI platforms
        </div>
        <div className="plat-row stagger">
          {platforms.map((p) => (
            <span className="plat" key={p.label}>
              <span className="mono-tile" style={{ background: p.color }}>
                {p.tile}
              </span>
              {p.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
