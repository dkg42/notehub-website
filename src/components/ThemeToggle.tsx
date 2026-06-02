"use client";

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4.2" />
    <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M19.4 4.6l-1.8 1.8M6.4 17.6l-1.8 1.8" />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 14.5A8 8 0 0 1 9.5 4 7 7 0 1 0 20 14.5z" />
  </svg>
);

export default function ThemeToggle() {
  const toggle = () => {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    const next = isLight ? "dark" : "light";
    if (next === "light") document.documentElement.setAttribute("data-theme", "light");
    else document.documentElement.removeAttribute("data-theme");
    try {
      localStorage.setItem("nh-theme", next);
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="theme-toggle"
      aria-label="Toggle light and dark mode"
    >
      <span className="icon-sun" aria-hidden="true">
        <SunIcon />
      </span>
      <span className="icon-moon" aria-hidden="true">
        <MoonIcon />
      </span>
    </button>
  );
}
