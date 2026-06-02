import Image from "next/image";

export default function DashboardBentoSection() {
  return (
    <section className="band" id="dashboard" style={{ paddingTop: 0 }} data-screen-label="Dashboard power">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">
            <span className="dot" />
            NotebookLM, supercharged
          </span>
          <h2>Run NotebookLM like a power user</h2>
          <p>Browse, automate, and act on every notebook from one dashboard — no tab juggling.</p>
        </div>

        <div className="bento">
          <div className="cell c-pipelines tall reveal">
            <div className="body">
              <span className="eyebrow">
                <span className="dot" />
                Pipelines · Automation
              </span>
              <h3>Triggers in, actions out</h3>
              <p>
                Build trigger-action rules that handle the boring parts: auto-tag, move to
                folder, generate audio, archive, or add sources when conditions hit. Start
                from templates and watch a full run history.
              </p>
              <div className="chips">
                <span className="chip">≥ 5 sources → generate audio</span>
                <span className="chip">tag added → move folder</span>
                <span className="chip">run history</span>
              </div>
            </div>
            <div className="shot">
              <Image src="/assets/db-pipelines.png" alt="Pipelines" width={3824} height={1854} sizes="(max-width: 980px) 100vw, 760px" />
            </div>
          </div>

          <div className="cell c-audio reveal" style={{ ["--d" as never]: ".08s" }}>
            <div className="body">
              <span className="eyebrow">
                <span className="dot" />
                AI Audio Overviews
              </span>
              <h3>Podcasts from your sources</h3>
              <p>
                Generate Deep Dive, Brief, Critique or Debate episodes in 12 languages,
                then download for offline listening.
              </p>
              <div className="voice-row">
                <span className="voice on">Deep Dive</span>
                <span className="voice">Brief</span>
                <span className="voice">Critique</span>
                <span className="voice">Debate</span>
              </div>
            </div>
          </div>

          <div className="cell c-notebook tall reveal">
            <div className="body">
              <span className="eyebrow">
                <span className="dot" />
                NotebookLM Integration
              </span>
              <h3>Every notebook, one place</h3>
              <p>
                Browse, search and manage all your notebooks — add sources and sync
                metadata without opening Google&apos;s UI.
              </p>
            </div>
            <div className="shot">
              <Image src="/assets/db-notebook.png" alt="Notebook detail" width={3824} height={1854} sizes="(max-width: 980px) 100vw, 380px" />
            </div>
          </div>

          <div className="cell c-sources tall reveal" style={{ ["--d" as never]: ".08s" }}>
            <div className="body">
              <span className="eyebrow">
                <span className="dot" />
                Source Management
              </span>
              <h3>One table for every source</h3>
              <p>
                Search, filter, sort and bulk-import from CSV, RSS or open tabs. Validate
                URLs and move sources safely.
              </p>
            </div>
            <div className="shot">
              <Image src="/assets/db-sources.png" alt="All sources" width={3824} height={1854} sizes="(max-width: 980px) 100vw, 380px" />
            </div>
          </div>

          <div className="cell c-analytics tall reveal">
            <div className="body">
              <span className="eyebrow">
                <span className="dot" />
                Analytics
              </span>
              <h3>See what&apos;s thriving</h3>
              <p>
                Track notebook growth, source counts, artifact generation and sync health
                over time.
              </p>
            </div>
            <div className="shot">
              <Image src="/assets/db-analytics.png" alt="Analytics" width={3824} height={1854} sizes="(max-width: 980px) 100vw, 380px" />
            </div>
          </div>

          <div className="cell c-artifacts reveal" style={{ ["--d" as never]: ".08s" }}>
            <div className="body">
              <span className="eyebrow">
                <span className="dot" />
                Artifact Library
              </span>
              <h3>All your generated artifacts, gathered</h3>
              <p>
                Audio, video and slide artifacts collected in one filterable gallery —
                quick playback, download and metadata at a glance, no digging through
                individual notebooks.
              </p>
              <div className="chips">
                <span className="chip">Audio</span>
                <span className="chip">Video</span>
                <span className="chip">Slides</span>
                <span className="chip">Quizzes</span>
                <span className="chip">Flashcards</span>
              </div>
            </div>
          </div>

          <div className="cell c-diff reveal">
            <div className="body">
              <span className="eyebrow">
                <span className="dot" />
                Source Diff
              </span>
              <h3>Compare any two notebooks</h3>
              <p>
                See which sources two notebooks share and where they differ — matched by
                URL, falling back to title — before you merge.
              </p>
              <div className="chips">
                <span className="chip">match by URL</span>
                <span className="chip">shared / unique</span>
                <span className="chip">pre-merge check</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
