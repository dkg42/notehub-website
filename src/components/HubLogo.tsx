type HubLogoProps = {
  size?: number;
};

export default function HubLogo({ size }: HubLogoProps) {
  return (
    <svg
      className="hub-logo"
      viewBox="0 0 24 24"
      fill="none"
      style={size ? { width: size, height: size } : undefined}
      aria-hidden="true"
    >
      <g className="spokes" strokeWidth="1.5" strokeLinecap="round">
        <path d="M12 12V4.3M12 12v7.7M12 12l6.7-3.9M12 12 5.3 8.1M12 12l6.7 3.9M12 12 5.3 15.9" />
      </g>
      <g className="nodes">
        <circle cx="12" cy="4" r="2.15" />
        <circle cx="12" cy="20" r="2.15" />
        <circle cx="18.9" cy="8" r="2.15" />
        <circle cx="5.1" cy="8" r="2.15" />
        <circle cx="18.9" cy="16" r="2.15" />
        <circle cx="5.1" cy="16" r="2.15" />
      </g>
      <circle className="ring" cx="12" cy="12" r="2.7" strokeWidth="1.8" />
    </svg>
  );
}

export function Wordmark({ size }: { size?: number }) {
  return (
    <span className="wordmark" style={size ? { fontSize: size } : undefined}>
      note<b>Hub</b>
      <span className="lm">LM</span>
    </span>
  );
}
