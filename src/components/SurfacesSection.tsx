import Image from "next/image";

export default function SurfacesSection() {
  return (
    <section className="band" id="surfaces" data-screen-label="Two surfaces">
      <div className="wrap">
        <div className="sec-head center reveal">
          <span className="eyebrow">
            <span className="dot" />
            One extension, two surfaces
          </span>
          <h2>
            A sidebar for capture.
            <br />A dashboard for <span className="accent">everything else</span>.
          </h2>
          <p>
            Notehublm rides along with every tab as a side panel, then gives you a full
            command center to manage what you&apos;ve saved — outside Google&apos;s own UI.
          </p>
        </div>

        <div className="surfaces">
          <div className="surface side reveal">
            <div className="kicker">
              <span className="pip t-violet">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="3" />
                  <path d="M15 3v18" />
                </svg>
              </span>
              <span className="t">The side panel</span>
            </div>
            <h3>Capture without leaving the page</h3>
            <p>
              Prompt Hub, Chat History, Clipboard, Screenshot, Tab Manager and one-click
              &quot;Add to NotebookLM&quot; — all in a panel docked beside any chat.
            </p>
            <div className="shot">
              <Image src="/assets/sp-tools.png" alt="Side panel tools" width={746} height={1884} sizes="280px" />
            </div>
          </div>

          <div className="surface reveal" style={{ ["--d" as never]: ".1s" }}>
            <div className="kicker">
              <span className="pip t-indigo">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="3" y="3" width="7" height="7" rx="1.5" />
                  <rect x="14" y="3" width="7" height="7" rx="1.5" />
                  <rect x="3" y="14" width="7" height="7" rx="1.5" />
                  <rect x="14" y="14" width="7" height="7" rx="1.5" />
                </svg>
              </span>
              <span className="t">The dashboard</span>
            </div>
            <h3>A command center for your knowledge</h3>
            <p>
              Notebooks, sources, artifacts, audio, pipelines and analytics — searchable,
              filterable, and synced across every device you sign in on.
            </p>
            <div className="shot">
              <Image src="/assets/db-home.png" alt="Dashboard home" width={3824} height={1854} sizes="(max-width: 980px) 100vw, 560px" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
