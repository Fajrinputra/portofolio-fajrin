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
      <g transform="translate(50, 50) scale(0.75) rotate(-32) translate(-50, -45)">
        <path
          d="M 50 73 L 25 73 A 14 14 0 0 1 25 45 L 75 45 A 14 14 0 0 0 75 17 L 50 17"
          stroke="white"
          strokeWidth="20"
          strokeLinecap="butt"
          fill="none"
        />
      </g>

    <defs>
        <linearGradient id="jejeGradBg" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="50%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
      </defs>
    </svg>
  );
}
