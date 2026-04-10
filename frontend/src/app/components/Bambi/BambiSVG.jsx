// BambiSVG.tsx — The Bambi deer illustration as a React component
export function BambiSVG() {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="72" height="72">
      {/* Body */}
      <ellipse cx="50" cy="62" rx="22" ry="18" fill="#c8906a" />
      {/* Head */}
      <circle cx="50" cy="36" r="16" fill="#c8906a" />
      {/* Forehead white patch */}
      <ellipse cx="50" cy="31" rx="7" ry="5" fill="#e8c4a0" />
      {/* Ears */}
      <ellipse cx="34" cy="26" rx="7" ry="10" fill="#c8906a" transform="rotate(-15 34 26)" />
      <ellipse cx="36" cy="26" rx="4" ry="7" fill="#e8a090" transform="rotate(-15 36 26)" />
      <ellipse cx="66" cy="26" rx="7" ry="10" fill="#c8906a" transform="rotate(15 66 26)" />
      <ellipse cx="64" cy="26" rx="4" ry="7" fill="#e8a090" transform="rotate(15 64 26)" />
      {/* Eyes */}
      <circle cx="43" cy="36" r="5" fill="#2a1a0a" />
      <circle cx="57" cy="36" r="5" fill="#2a1a0a" />
      <circle cx="44.5" cy="34.5" r="1.5" fill="white" />
      <circle cx="58.5" cy="34.5" r="1.5" fill="white" />
      {/* Nose */}
      <ellipse cx="50" cy="44" rx="5" ry="3.5" fill="#1a0a05" />
      <ellipse cx="48.5" cy="43" rx="1.5" ry="1" fill="rgba(255,255,255,0.4)" />
      {/* Mouth */}
      <path d="M 46 47 Q 50 51 54 47" stroke="#1a0a05" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Spots */}
      <circle cx="42" cy="58" r="3.5" fill="rgba(255,255,255,0.3)" />
      <circle cx="52" cy="65" r="3" fill="rgba(255,255,255,0.3)" />
      <circle cx="60" cy="56" r="2.5" fill="rgba(255,255,255,0.3)" />
      {/* Legs */}
      <rect x="38" y="77" width="7" height="14" rx="3" fill="#b07850" />
      <rect x="48" y="77" width="7" height="14" rx="3" fill="#b07850" />
      <rect x="56" y="77" width="7" height="12" rx="3" fill="#b07850" />
      {/* Tail */}
      <circle cx="72" cy="60" r="5" fill="white" />
      {/* Antlers */}
      <line x1="38" y1="22" x2="30" y2="10" stroke="#8b5e3c" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="30" y1="10" x2="24" y2="5" stroke="#8b5e3c" strokeWidth="2" strokeLinecap="round" />
      <line x1="30" y1="10" x2="28" y2="4" stroke="#8b5e3c" strokeWidth="2" strokeLinecap="round" />
      <line x1="62" y1="22" x2="70" y2="10" stroke="#8b5e3c" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="70" y1="10" x2="76" y2="5" stroke="#8b5e3c" strokeWidth="2" strokeLinecap="round" />
      <line x1="70" y1="10" x2="72" y2="4" stroke="#8b5e3c" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
