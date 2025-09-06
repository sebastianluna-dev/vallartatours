import "./wave-mark.comp.css";

// Three navy waves, the ornament of the sky-blue bands.
export function WaveMark() {
  return (
    <svg className="wave-mark" viewBox="0 0 284 150" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="24" strokeLinecap="round">
        <path d="M14 24 Q 46 -4 78 24 T 142 24 T 206 24 T 270 24" />
        <path d="M14 58 Q 46 30 78 58 T 142 58 T 206 58 T 270 58" />
        <path d="M14 92 Q 46 64 78 92 T 142 92 T 206 92 T 270 92" />
      </g>
    </svg>
  );
}
