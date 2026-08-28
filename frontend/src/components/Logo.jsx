/**
 * Logo "Jr" — persis desain yang dikirim user
 * j lowercase: batang vertikal + hook melengkung ke kiri bawah
 * r lowercase: batang vertikal + arch melengkung ke kanan atas
 * Warna putih di atas background ungu gradient
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
      aria-label="Logo Jr - Fajrin Putra Pratama"
    >
      {/* Background ungu gradient */}
      <rect width="100" height="100" rx="18" fill="url(#jrGradBg)" />

      {/*
        Huruf j — lowercase
        - Batang: garis vertikal tipis dari atas ke bawah
        - Titik: bulat kecil di atas batang
        - Hook: lengkungan ke kiri di bagian bawah
      */}
      {/* Batang j */}
      <rect x="34" y="30" width="10" height="40" rx="5" fill="white" />
      {/* Titik j */}
      <circle cx="39" cy="20" r="5.5" fill="white" />
      {/* Hook bawah j — melengkung ke kiri */}
      <path
        d="M44 65 Q44 80 34 80 Q26 80 24 74"
        stroke="white"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
      />

      {/*
        Huruf r — lowercase
        - Batang: garis vertikal tipis
        - Arch: lengkungan ke kanan di bagian atas batang
      */}
      {/* Batang r */}
      <rect x="54" y="40" width="10" height="38" rx="5" fill="white" />
      {/* Arch r — melengkung ke kanan atas */}
      <path
        d="M59 48 Q59 31 72 31 L78 31"
        stroke="white"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
      />

      <defs>
        <linearGradient id="jrGradBg" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#5B21B6" />
        </linearGradient>
      </defs>
    </svg>
  );
}
