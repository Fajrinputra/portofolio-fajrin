import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const translations = {
  id: {
    // Navbar
    nav_home: 'Beranda',
    nav_profile: 'Profil',
    nav_journey: 'Perjalanan',
    nav_org: 'Organisasi',
    nav_project: 'Proyek',
    nav_uiux: 'UI/UX',
    nav_photo: 'Foto',
    nav_certificate: 'Sertifikat',
    nav_contact: 'Kontak',
    // Home
    home_greeting: 'Halo, saya',
    home_tagline: 'Fresh Graduate Sistem Informasi · Developer & Designer',
    home_cta_project: 'Lihat Proyek',
    home_cta_contact: 'Hubungi Saya',
    // Profil
    profil_label: 'Tentang',
    profil_title: 'Tentang Saya',
    profil_bio_label: 'Bio',
    profil_bio_title: 'Tentang Saya',
    profil_skills_label: 'Kemampuan',
    profil_skills_title: 'Skill & Teknologi',
    profil_goals_label: 'Values',
    profil_goals_title: 'Prinsip & Tujuan',
    profil_gallery_label: 'Galeri',
    profil_gallery_title: 'Foto Saya',
    profil_download_cv: 'Download CV',
    // Perjalanan
    journey_label: 'Riwayat Pendidikan',
    journey_title: 'Perjalanan Pendidikan',
    // Sertifikat
    cert_label: 'Pencapaian',
    cert_title: 'Sertifikat & Pencapaian',
    cert_all: 'Semua',
    // Kontak
    contact_title: 'Mari Terhubung',
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
    contact_verify: 'Verifikasi',
    // Proyek
    project_label: 'Portfolio',
    project_title: 'Proyek Pengembangan',
    project_all: 'Semua',
    project_detail: 'Lihat Detail',
    // Organisasi
    org_label: 'Pengalaman',
    org_title: 'Pengalaman Organisasi',
    org_detail: 'Lihat Detail',
    // Footer
    footer_copy: 'Dibuat dengan ❤️ oleh Fajrin Putra Pratama',
  },
  en: {
    // Navbar
    nav_home: 'Home',
    nav_profile: 'Profile',
    nav_journey: 'Education',
    nav_org: 'Organization',
    nav_project: 'Projects',
    nav_uiux: 'UI/UX',
    nav_photo: 'Photos',
    nav_certificate: 'Certificates',
    nav_contact: 'Contact',
    // Home
    home_greeting: 'Hi, I am',
    home_tagline: 'Information Systems Graduate · Developer & Designer',
    home_cta_project: 'View Projects',
    home_cta_contact: 'Contact Me',
    // Profil
    profil_label: 'About',
    profil_title: 'About Me',
    profil_bio_label: 'Bio',
    profil_bio_title: 'About Me',
    profil_skills_label: 'Skills',
    profil_skills_title: 'Skills & Technologies',
    profil_goals_label: 'Values',
    profil_goals_title: 'Principles & Goals',
    profil_gallery_label: 'Gallery',
    profil_gallery_title: 'My Photos',
    profil_download_cv: 'Download CV',
    // Perjalanan
    journey_label: 'Education History',
    journey_title: 'Education Journey',
    // Sertifikat
    cert_label: 'Achievements',
    cert_title: 'Certificates & Achievements',
    cert_all: 'All',
    // Kontak
    contact_title: "Let's Connect",
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
    contact_verify: 'Verify',
    // Proyek
    project_label: 'Portfolio',
    project_title: 'Development Projects',
    project_all: 'All',
    project_detail: 'View Detail',
    // Organisasi
    org_label: 'Experience',
    org_title: 'Organizational Experience',
    org_detail: 'View Detail',
    // Footer
    footer_copy: 'Made with ❤️ by Fajrin Putra Pratama',
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
