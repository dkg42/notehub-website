import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import HubLogo, { Wordmark } from "@/components/HubLogo";

export default function Navbar() {
  return (
    <header className="hdr" id="hdr">
      <Link className="brand" href="/#top" aria-label="noteHubLM home">
        <HubLogo />
        <Wordmark />
      </Link>
      <nav>
        <Link href="/#surfaces">How it works</Link>
        <Link href="/#tools">Tools</Link>
        <Link href="/#dashboard">Dashboard</Link>
        <Link href="/#platforms">Platforms</Link>
        <Link href="/#pricing">Pricing</Link>
      </nav>
      <div className="hdr-right">
        <ThemeToggle />
        <Link className="btn btn-primary" href="/#install">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <circle cx="12" cy="12" r="3.4" />
            <path d="M12 3v6M21 12h-9M5 19l4-7" />
          </svg>
          Add to Chrome
        </Link>
      </div>
    </header>
  );
}
