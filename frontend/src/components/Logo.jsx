/**
 * Logo "Jr" — Monogram Jeje
 * Desain kreatif: huruf J dan r yang saling terhubung
 * Warna: gradient ungu sesuai accent website
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
      {/* Background rounded square */}
      <rect width="100" height="100" rx="22" fill="url(#jjGrad)" />

      {/* Huruf J — bold modern */}
      {/* Batang vertikal J */}
      <rect x="21" y="18" width="14" height="50" rx="4" fill="white" />
      {/* Hook bawah J (melengkung ke kiri) */}
      <path
        d="M35 62 Q35 82 21 82 Q14 82 11 76"
        stroke="white"
        strokeWidth="14"
        strokeLinecap="round"
        fill="none"
      />
      {/* Titik di atas J */}
      <circle cx="28" cy="12" r="6" fill="white" />

      {/* Huruf r — minimalis, menyambung dari J */}
      {/* Batang r */}
      <rect x="49" y="38" width="12" height="44" rx="4" fill="white" />
      {/* Kepala r (lengkungan ke kanan atas) */}
      <path
        d="M61 44 Q61 30 76 30 L82 30"
        stroke="white"
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
      />

      <defs>
        <linearGradient id="jjGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7C3AED" />
          <stop offset="50%" stopColor="#6C5CE7" />
          <stop offset="100%" stopColor="#4C1D95" />
        </linearGradient>
      </defs>
    </svg>
  );
}
