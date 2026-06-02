export default function FoundationsSection() {
  return (
    <section className="band" style={{ paddingTop: 0 }} data-screen-label="Foundations">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">
            <span className="dot" />
            Built in across the board
          </span>
          <h2>The fundamentals, handled</h2>
        </div>
        <div className="tri stagger">
          <div className="card">
            <div className="tile t-indigo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
              </svg>
            </div>
            <h3>Universal LLM support</h3>
            <p>
              Switch between nine models freely without losing your prompts, snippets or
              saved threads — capture works the same everywhere.
            </p>
          </div>
          <div className="card">
            <div className="tile t-emerald">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M6 18a4 4 0 0 1 0-8 6 6 0 0 1 11.3-1.5A4.5 4.5 0 0 1 18 18z" />
              </svg>
            </div>
            <h3>Google Drive sync</h3>
            <p>
              Prompts, notebooks, snippets and pipelines back up to a private Drive app
              folder. Sign in once; pick up on any device.
            </p>
          </div>
          <div className="card">
            <div className="tile t-purple">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M4 4h16v12H4z" />
                <path d="M2 20h20" />
                <path d="M8 9l2 2-2 2M12 13h3" />
              </svg>
            </div>
            <h3>Export, dark mode &amp; ⌘K</h3>
            <p>
              Export to Markdown, PDF, Docs or text. A polished light/dark theme and a
              Cmd+K command palette keep you on the keyboard.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
