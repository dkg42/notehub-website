import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site">
      <div className="wrap">
        <div className="brand">
          <span
            className="logo-tile"
            style={{ width: 24, height: 24, fontSize: 14, borderRadius: 7 }}
          >
            n
          </span>{" "}
          Notehublm
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
        <div>© {new Date().getFullYear()} Notehublm · Synced to your Google account</div>
      </div>
    </footer>
  );
}
