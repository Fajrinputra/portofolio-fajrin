import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const translations = {
  id: {
    // ── Navbar ──────────────────────────────────────────
    nav_home: 'Beranda',
    nav_profile: 'Profil',
    nav_journey: 'Perjalanan',
    nav_org: 'Organisasi',
    nav_project: 'Proyek',
    nav_uiux: 'UI/UX',
    nav_photo: 'Foto',
    nav_certificate: 'Sertifikat',
    nav_contact: 'Kontak',

    // ── Home ─────────────────────────────────────────────
    home_greeting: '👋 Halo, saya',
    home_motivated: 'bersemangat dalam membangun produk digital yang bermakna.',
    home_cta_project: 'Lihat Proyek',
    home_cta_contact: 'Hubungi Saya',
    home_about_label: 'Tentang Saya',
    home_about_title: 'Fresh Graduate yang Bersemangat',
    home_more: 'Selengkapnya',
    home_download_cv: 'Download CV',
    home_see_all: 'Lihat Semua',
    home_loading: 'Memuat...',
    home_stat_gpa: 'IPK',
    home_stat_projects: 'Proyek',
    home_stat_design: 'Design Case Study',
    home_stat_graduate: 'Lulus',
    home_projects_label: 'Portfolio',
    home_projects_title: 'Proyek Terbaru',
    home_photo_label: 'Fotografi',
    home_photo_title: 'Foto Freelance',
    home_cta_label: 'Mari Berkolaborasi',
    home_cta_title: 'Punya ide? Mari wujudkan',
    home_cta_together: ' bersama.',
    home_cta_desc: 'Saya terbuka untuk peluang kerja, freelance, maupun kolaborasi proyek.',
    home_no_project: 'Belum ada proyek.',
    home_no_photo: 'Belum ada foto.',

    // ── Profil ───────────────────────────────────────────
    profil_label: 'Profil Diri',
    profil_bio_label: 'Bio',
    profil_bio_title: 'Tentang Saya',
    profil_skills_label: 'Kemampuan',
    profil_skills_title: 'Skill & Teknologi',
    profil_goals_label: 'Values',
    profil_goals_title: 'Prinsip & Tujuan',
    profil_gallery_label: 'Galeri',
    profil_gallery_title: 'Foto Saya',
    profil_gallery_subtitle: 'Kumpulan momen dan kenangan yang membentuk perjalanan saya.',
    profil_download_cv: 'Download CV',
    profil_education: 'S1 Sistem Informasi, Universitas Andalas',
    profil_edu_period: '2022 – 2026 · Predikat Pujian · IPK 3.59',
    profil_edu_duration: 'Masa studi 3 tahun 11 bulan',
    profil_no_skill: 'Belum ada data skill.',

    // ── Perjalanan ───────────────────────────────────────
    journey_label: 'Riwayat Pendidikan',
    journey_title: 'Perjalanan Pendidikan',
    journey_subtitle: 'Dari bangku SD hingga meraih gelar Sarjana Sistem Informasi dari Universitas Andalas — perjalanan panjang yang membentuk siapa saya hari ini.',
    journey_empty: 'Belum ada data perjalanan.',

    // ── Organisasi ───────────────────────────────────────
    org_label: 'Pengalaman',
    org_title: 'Pengalaman Organisasi',
    org_subtitle: 'Berbagai organisasi tempat saya berkontribusi dan mengembangkan kepemimpinan serta kolaborasi.',
    org_detail: 'Lihat Detail',
    org_gallery: 'Galeri',
    org_achievements: 'Pencapaian',
    org_period: 'Periode',
    org_back: 'Kembali ke Organisasi',
    org_not_found: 'Organisasi tidak ditemukan',
    org_empty: 'Belum ada organisasi.',

    // ── Proyek ───────────────────────────────────────────
    project_label: 'Portfolio',
    project_title: 'Proyek Pengembangan',
    project_subtitle: 'Kumpulan proyek software yang saya kerjakan — mulai dari sistem ERP hingga web application.',
    project_all: 'Semua',
    project_detail: 'Lihat Detail',
    project_detail_back: 'Kembali ke Proyek',
    project_not_found: 'Proyek tidak ditemukan',
    project_features: 'Fitur Utama',
    project_tech: 'Teknologi yang Digunakan',
    project_challenges: 'Tantangan & Solusi',
    project_links: 'Tautan',
    project_demo: 'Demo Live',
    project_repo: 'Repository',
    project_next: 'Proyek Berikutnya',
    project_empty: 'Tidak ada proyek di kategori ini.',

    // ── UI/UX ────────────────────────────────────────────
    uiux_label: 'Design',
    uiux_title: 'Design UI/UX',
    uiux_subtitle: 'Kumpulan case study desain antarmuka yang saya kerjakan menggunakan Figma.',
    uiux_process: 'Proses Desain',
    uiux_gallery: 'Galeri Design',
    uiux_figma: 'Buka di Figma',
    uiux_back: 'Kembali ke UI/UX',
    uiux_empty: 'Belum ada design.',

    // ── Foto ─────────────────────────────────────────────
    photo_label: 'Fotografi',
    photo_title: 'Portofolio Foto',
    photo_subtitle: 'Koleksi foto freelance dari berbagai momen dan sesi pemotretan.',
    photo_all: 'Semua',
    photo_empty: 'Belum ada foto.',

    // ── Sertifikat ───────────────────────────────────────
    cert_label: 'Pencapaian',
    cert_title: 'Sertifikat & Pencapaian',
    cert_subtitle: 'Berbagai sertifikasi dan penghargaan yang telah saya raih sebagai bukti kompetensi dan semangat belajar.',
    cert_all: 'Semua',
    cert_verify: 'Verifikasi',
    cert_empty: 'Belum ada sertifikat.',

    // ── Kontak ───────────────────────────────────────────
    contact_title: 'Mari Terhubung',
    contact_subtitle: 'Saya terbuka untuk peluang kerja, freelance, kolaborasi proyek, atau sekadar ngobrol tentang teknologi dan desain.',
    contact_send: 'Kirim Pesan',
    contact_name: 'Nama Lengkap',
    contact_email: 'Alamat Email',
    contact_message: 'Pesan',
    contact_sending: 'Mengirim...',
    contact_sent: '✓ Pesan Terkirim!',
    contact_error: '❌ Gagal, coba lagi',
    contact_direct: 'Kontak Langsung',
    contact_cv: 'Curriculum Vitae',
    contact_cv_desc: 'Unduh CV saya untuk informasi lengkap pengalaman dan kemampuan.',
    contact_download_cv: 'Download CV',
    contact_label: 'Kontak',

    // ── Footer ───────────────────────────────────────────
    footer_copy: 'Dibuat dengan ❤️ oleh Fajrin Putra Pratama',
    footer_tagline: 'Fresh Graduate Sistem Informasi · Developer & Designer',

    // ── Admin ────────────────────────────────────────────
    add_to_manage: 'Tambahkan di',
  },

  en: {
    // ── Navbar ──────────────────────────────────────────
    nav_home: 'Home',
    nav_profile: 'Profile',
    nav_journey: 'Education',
    nav_org: 'Organization',
    nav_project: 'Projects',
    nav_uiux: 'UI/UX',
    nav_photo: 'Photos',
    nav_certificate: 'Certificates',
    nav_contact: 'Contact',

    // ── Home ─────────────────────────────────────────────
    home_greeting: '👋 Hi, I am',
    home_motivated: 'passionate about building meaningful digital products.',
    home_cta_project: 'View Projects',
    home_cta_contact: 'Contact Me',
    home_about_label: 'About Me',
    home_about_title: 'Enthusiastic Fresh Graduate',
    home_more: 'Learn More',
    home_download_cv: 'Download CV',
    home_see_all: 'See All',
    home_loading: 'Loading...',
    home_stat_gpa: 'GPA',
    home_stat_projects: 'Projects',
    home_stat_design: 'Design Case Studies',
    home_stat_graduate: 'Graduated',
    home_projects_label: 'Portfolio',
    home_projects_title: 'Latest Projects',
    home_photo_label: 'Photography',
    home_photo_title: 'Freelance Photos',
    home_cta_label: "Let's Collaborate",
    home_cta_title: 'Have an idea? Let\'s bring it',
    home_cta_together: ' to life.',
    home_cta_desc: "I'm open to job opportunities, freelance, and project collaborations.",
    home_no_project: 'No projects yet.',
    home_no_photo: 'No photos yet.',

    // ── Profil ───────────────────────────────────────────
    profil_label: 'Personal Profile',
    profil_bio_label: 'Bio',
    profil_bio_title: 'About Me',
    profil_skills_label: 'Skills',
    profil_skills_title: 'Skills & Technologies',
    profil_goals_label: 'Values',
    profil_goals_title: 'Principles & Goals',
    profil_gallery_label: 'Gallery',
    profil_gallery_title: 'My Photos',
    profil_gallery_subtitle: 'A collection of moments and memories that shaped my journey.',
    profil_download_cv: 'Download CV',
    profil_education: 'Bachelor of Information Systems, Andalas University',
    profil_edu_period: '2022 – 2026 · Cum Laude · GPA 3.59',
    profil_edu_duration: 'Study duration: 3 years 11 months',
    profil_no_skill: 'No skill data yet.',

    // ── Perjalanan ───────────────────────────────────────
    journey_label: 'Education History',
    journey_title: 'Education Journey',
    journey_subtitle: 'From elementary school to earning a Bachelor of Information Systems from Andalas University — a long journey that shaped who I am today.',
    journey_empty: 'No education data yet.',

    // ── Organisasi ───────────────────────────────────────
    org_label: 'Experience',
    org_title: 'Organizational Experience',
    org_subtitle: 'Various organizations where I contributed and developed leadership and collaboration skills.',
    org_detail: 'View Detail',
    org_gallery: 'Gallery',
    org_achievements: 'Achievements',
    org_period: 'Period',
    org_back: 'Back to Organizations',
    org_not_found: 'Organization not found',
    org_empty: 'No organization data yet.',

    // ── Proyek ───────────────────────────────────────────
    project_label: 'Portfolio',
    project_title: 'Development Projects',
    project_subtitle: 'A collection of software projects I have worked on — from ERP systems to web applications.',
    project_all: 'All',
    project_detail: 'View Detail',
    project_detail_back: 'Back to Projects',
    project_not_found: 'Project not found',
    project_features: 'Key Features',
    project_tech: 'Technologies Used',
    project_challenges: 'Challenges & Solutions',
    project_links: 'Links',
    project_demo: 'Live Demo',
    project_repo: 'Repository',
    project_next: 'Next Project',
    project_empty: 'No projects in this category.',

    // ── UI/UX ────────────────────────────────────────────
    uiux_label: 'Design',
    uiux_title: 'UI/UX Design',
    uiux_subtitle: 'A collection of interface design case studies I created using Figma.',
    uiux_process: 'Design Process',
    uiux_gallery: 'Design Gallery',
    uiux_figma: 'Open in Figma',
    uiux_back: 'Back to UI/UX',
    uiux_empty: 'No designs yet.',

    // ── Foto ─────────────────────────────────────────────
    photo_label: 'Photography',
    photo_title: 'Photo Portfolio',
    photo_subtitle: 'A collection of freelance photos from various moments and photo sessions.',
    photo_all: 'All',
    photo_empty: 'No photos yet.',

    // ── Sertifikat ───────────────────────────────────────
    cert_label: 'Achievements',
    cert_title: 'Certificates & Achievements',
    cert_subtitle: 'Various certifications and awards I have earned as proof of competence and enthusiasm for learning.',
    cert_all: 'All',
    cert_verify: 'Verify',
    cert_empty: 'No certificates yet.',

    // ── Kontak ───────────────────────────────────────────
    contact_title: "Let's Connect",
    contact_subtitle: "I'm open to job opportunities, freelance, project collaboration, or just chatting about technology and design.",
    contact_send: 'Send Message',
    contact_name: 'Full Name',
    contact_email: 'Email Address',
    contact_message: 'Message',
    contact_sending: 'Sending...',
    contact_sent: '✓ Message Sent!',
    contact_error: '❌ Failed, try again',
    contact_direct: 'Direct Contact',
    contact_cv: 'Curriculum Vitae',
    contact_cv_desc: 'Download my CV for complete information about my experience and skills.',
    contact_download_cv: 'Download CV',
    contact_label: 'Contact',

    // ── Footer ───────────────────────────────────────────
    footer_copy: 'Made with ❤️ by Fajrin Putra Pratama',
    footer_tagline: 'Information Systems Graduate · Developer & Designer',

    // ── Admin ────────────────────────────────────────────
    add_to_manage: 'Add at',
  },
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('portfolio_lang') || 'id');

  const toggleLang = () => {
    const next = lang === 'id' ? 'en' : 'id';
    setLang(next);
    localStorage.setItem('portfolio_lang', next);
  };

  const t = (key) => translations[lang]?.[key] ?? translations['id']?.[key] ?? key;

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
