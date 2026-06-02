import Image from "next/image";

export default function ScreenshotEditorSection() {
  return (
    <section className="band" style={{ paddingTop: 0 }} data-screen-label="Screenshot editor">
      <div className="wrap">
        <div className="sec-head center reveal" style={{ marginBottom: 44 }}>
          <span className="eyebrow">
            <span className="dot" />
            Screenshot capture &amp; editor
          </span>
          <h2>
            Capture, annotate, <span className="accent">make it shine</span>
          </h2>
          <p>
            Drop any capture onto a gradient backdrop, tune padding, roundness and shadow,
            then annotate and export — built right into the dashboard.
          </p>
        </div>
        <div className="browser reveal" style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div className="browser-bar">
            <span className="lights">
              <i style={{ background: "#ff5f57" }} />
              <i style={{ background: "#febc2e" }} />
              <i style={{ background: "#28c840" }} />
            </span>
            <span className="addr">notehublm.app/screenshots/editor</span>
          </div>
          <Image
            src="/assets/db-screenshot.png"
            alt="Screenshot editor"
            width={3824}
            height={1854}
            sizes="(max-width: 1000px) 100vw, 1000px"
          />
        </div>
      </div>
    </section>
  );
}
