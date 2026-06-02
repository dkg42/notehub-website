import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  return (
    <header className="hdr" id="hdr">
      <a className="brand" href="#top">
        <span className="logo-tile">n</span>
        Notehublm
      </a>
      <nav>
        <a href="#surfaces">How it works</a>
        <a href="#tools">Tools</a>
        <a href="#dashboard">Dashboard</a>
        <a href="#platforms">Platforms</a>
        <a href="#pricing">Pricing</a>
      </nav>
      <div className="hdr-right">
        <ThemeToggle />
        <a className="btn btn-primary" href="#install">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <circle cx="12" cy="12" r="3.4" />
            <path d="M12 3v6M21 12h-9M5 19l4-7" />
          </svg>
          Add to Chrome
        </a>
      </div>
    </header>
  );
}
