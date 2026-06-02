import Image from "next/image";

export default function HeroSection() {
  return (
    <>
      <span id="top" />
      <section className="hero" data-screen-label="01 Hero">
        <div className="wrap">
          <span className="eyebrow reveal">
            <span className="dot" />
            Browser extension · 9 AI platforms · NotebookLM
          </span>
          <h1 className="reveal" style={{ ["--d" as never]: ".06s" }}>
            Your second brain for <span className="grad">AI chats</span>.
          </h1>
          <p className="sub reveal" style={{ ["--d" as never]: ".14s" }}>
            Save prompts, capture conversations, annotate screenshots, and automate your
            notebooks — across ChatGPT, Claude, Gemini, Perplexity, Copilot, DeepSeek,
            Mistral, Grok &amp; NotebookLM, all synced to your Google account.
          </p>
          <div className="cta-row reveal" style={{ ["--d" as never]: ".22s" }}>
            <a className="btn btn-primary btn-lg" href="#install">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <circle cx="12" cy="12" r="3.4" />
                <path d="M12 3v6M21 12h-9M5 19l4-7" />
              </svg>
              Add to Chrome — free
            </a>
            <a className="btn btn-ghost btn-lg" href="#surfaces">
              See how it works
            </a>
          </div>
          <div className="note reveal" style={{ ["--d" as never]: ".3s" }}>
            Free forever tier · No credit card · Syncs to Google Drive
          </div>

          <div className="hero-visual" id="heroVisual">
            <div className="browser">
              <div className="browser-bar">
                <span className="lights">
                  <i style={{ background: "#ff5f57" }} />
                  <i style={{ background: "#febc2e" }} />
                  <i style={{ background: "#28c840" }} />
                </span>
                <span className="addr">notehublm.app/dashboard</span>
              </div>
              <Image
                src="/assets/db-home.png"
                alt="Notehublm dashboard — home"
                width={3824}
                height={1854}
                priority
                sizes="(max-width: 1080px) 100vw, 1080px"
              />
            </div>
            <div className="side-dock">
              <Image
                src="/assets/sp-tools.png"
                alt="Notehublm side panel — tools"
                width={746}
                height={1884}
                priority
                sizes="224px"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
