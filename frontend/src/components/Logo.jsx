/**
 * Logo "JEJE" — persis seperti desain referensi terbaru
 * - Bentuk infinity/S yang terpotong dan dimiringkan
 * - Warna putih di atas background ungu gradient
 */
export default function Logo({ size = 36, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Logo Jeje - Fajrin Putra Pratama"
    >
      {/* Background ungu gradient agar sesuai tema website */}
      <rect width="100" height="100" rx="22" fill="url(#jejeGradBg)" />

      {/* Shape S/Infinity yang dimiringkan */}
      <g transform="translate(50, 42) scale(0.68) rotate(-32) translate(-50, -45)">
        <path
          d="M 50 73 L 25 73 A 14 14 0 0 1 25 45 L 75 45 A 14 14 0 0 0 75 17 L 50 17"
          stroke="white"
          strokeWidth="20"
          strokeLinecap="butt"
          fill="none"
        />
      </g>

      {/* Text JEJE di bawah logo */}
      <text
        x="50"
        y="90"
        textAnchor="middle"
        fill="white"
        fontSize="17"
        fontWeight="800"
        fontFamily="system-ui, -apple-system, sans-serif"
        letterSpacing="2"
      >
        JEJE
      </text>

      <defs>
        <linearGradient id="jejeGradBg" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7C3AED" />
          <stop offset="50%" stopColor="#6C5CE7" />
          <stop offset="100%" stopColor="#4C1D95" />
        </linearGradient>
      </defs>
    </svg>
  );
}
