/**
 * RikosLogo — replica el logo real del cartel:
 * círculo oscuro, hamburgesa arriba, "Riko's" amarillo script, "FOOD TRUCK" abajo.
 */
export default function RikosLogo({ size = 56 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0 }}
      aria-label="Riko's Food Truck logo"
    >
      {/* Outer glow ring */}
      <defs>
        <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2a0a0a" />
          <stop offset="100%" stopColor="#0d0000" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Main circle */}
      <circle cx="50" cy="50" r="47" fill="url(#bgGrad)" stroke="#c0392b" strokeWidth="2.5" />

      {/* Inner circle border */}
      <circle cx="50" cy="52" r="38" fill="none" stroke="#e74c3c" strokeWidth="0.8" opacity="0.4" />

      {/* Burger icon at top */}
      <text x="50" y="32" textAnchor="middle" fontSize="22" style={{ userSelect: 'none' }}>🍔</text>

      {/* "Riko's" — bold yellow script style */}
      <text
        x="50"
        y="58"
        textAnchor="middle"
        fontFamily="Pacifico, cursive"
        fontSize="22"
        fill="#F4C430"
        stroke="#222"
        strokeWidth="1.2"
        paintOrder="stroke"
        filter="url(#glow)"
        letterSpacing="0.5"
      >
        Riko's
      </text>

      {/* "FOOD TRUCK" banner */}
      <rect x="18" y="63" width="64" height="13" rx="3" fill="#c0392b" />
      <text
        x="50"
        y="73"
        textAnchor="middle"
        fontFamily="'DM Sans', sans-serif"
        fontSize="7.5"
        fontWeight="800"
        fill="white"
        letterSpacing="2"
      >
        FOOD TRUCK
      </text>
    </svg>
  );
}
