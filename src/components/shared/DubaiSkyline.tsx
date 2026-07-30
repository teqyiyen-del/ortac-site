/* Dubai skyline — decorative, three depth layers in dark blue. Vector, not a
   photo: keeps the "no stock imagery" rule and stays crisp at any width. */
export default function DubaiSkyline({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 480 220"
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      {/* back layer — distant towers */}
      <g fill="rgba(45,127,230,0.16)">
        <rect x="6" y="150" width="26" height="70" rx="2" />
        <rect x="38" y="128" width="18" height="92" rx="2" />
        <path d="M62 220 V118 L80 106 L80 220 Z" />
        <rect x="96" y="140" width="22" height="80" rx="2" />
        <rect x="300" y="132" width="20" height="88" rx="2" />
        <path d="M330 220 V124 L346 112 L346 220 Z" />
        <rect x="404" y="146" width="24" height="74" rx="2" />
        <rect x="436" y="160" width="18" height="60" rx="2" />
      </g>

      {/* mid layer */}
      <g fill="rgba(45,127,230,0.26)">
        <rect x="122" y="152" width="30" height="68" rx="2" />
        <path d="M158 220 V138 L172 128 L186 138 V220 Z" />
        <rect x="192" y="160" width="16" height="60" rx="2" />
        <rect x="266" y="150" width="28" height="70" rx="2" />
        <path d="M356 220 V150 L372 138 L388 150 V220 Z" />
        {/* Burj Al Arab — sail */}
        <path d="M420 220 V132 C420 132 432 150 444 168 L444 220 Z" />
        <path d="M420 132 L420 118 L438 150 Z" />
      </g>

      {/* front layer — Burj Khalifa cluster */}
      <g fill="rgba(35,110,215,0.42)">
        <rect x="176" y="176" width="26" height="44" rx="2" />
        {/* Burj Khalifa: stepped setbacks + spire */}
        <path d="M212 220 V112 L228 112 L228 220 Z" />
        <path d="M228 220 V72 L240 72 L240 220 Z" />
        <path d="M240 220 V96 L254 96 L254 220 Z" />
        <path d="M254 220 V132 L268 132 L268 220 Z" />
        <rect x="232" y="30" width="5" height="44" rx="2" />
        <path d="M228 72 L234 44 L240 72 Z" />
        {/* neighbours */}
        <rect x="278" y="168" width="22" height="52" rx="2" />
        <path d="M150 220 V166 L164 158 L164 220 Z" />
      </g>

      {/* ground haze */}
      <rect x="0" y="212" width="480" height="8" fill="rgba(45,127,230,0.34)" />
    </svg>
  );
}
