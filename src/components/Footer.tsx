import Link from "next/link";
import HubLogo, { Wordmark } from "@/components/HubLogo";

export default function Footer() {
  return (
    <footer className="site">
      <div className="wrap">
        <div className="brand">
          <HubLogo size={26} />
          <Wordmark size={17} />
        </div>
        <div className="links">
          <a href="/#tools">Tools</a>
          <a href="/#dashboard">Dashboard</a>
          <a href="/#pricing">Pricing</a>
          <a href="/#install">Install</a>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/refunds">Refunds</Link>
        </div>
        <div>© {new Date().getFullYear()} noteHubLM · Synced to your Google account</div>
      </div>
    </footer>
  );
}
