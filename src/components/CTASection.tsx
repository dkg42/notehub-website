export default function CTASection() {
  return (
    <section className="footer-cta" id="install" data-screen-label="CTA">
      <div className="wrap">
        <span className="eyebrow reveal">
          <span className="dot" />
          Free on Chrome, Brave &amp; Arc
        </span>
        <h2 className="reveal" style={{ ["--d" as never]: ".06s" }}>
          One sidebar for <span className="grad">every chatbot</span>.
        </h2>
        <div className="cta-row reveal" style={{ ["--d" as never]: ".14s" }}>
          <a className="btn btn-primary btn-lg" href="#top">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <circle cx="12" cy="12" r="3.4" />
              <path d="M12 3v6M21 12h-9M5 19l4-7" />
            </svg>
            Add to Chrome — free
          </a>
          <a className="btn btn-ghost btn-lg" href="#pricing">
            Compare plans
          </a>
        </div>
      </div>
    </section>
  );
}
