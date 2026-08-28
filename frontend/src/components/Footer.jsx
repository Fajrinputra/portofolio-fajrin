import { Link } from 'react-router-dom';
import { Mail, MessageCircle, Briefcase, AtSign, Code2, Camera, ExternalLink } from 'lucide-react';
import Logo from './Logo';

const footerLinks = [
  {
    label: 'Tentang',
    links: [
      { label: 'Profil Diri', path: '/profil' },
      { label: 'Perjalanan', path: '/perjalanan' },
      { label: 'Organisasi', path: '/organisasi' },
    ],
  },
  {
    label: 'Karya',
    links: [
      { label: 'Proyek', path: '/proyek' },
      { label: 'Design UI/UX', path: '/uiux' },
      { label: 'Foto Freelance', path: '/foto' },
      { label: 'Sertifikat', path: '/sertifikat' },
    ],
  },
  {
    label: 'Lainnya',
    links: [
      { label: 'Beranda', path: '/' },
      { label: 'Kontak', path: '/kontak' },
    ],
  },
];

const socialLinks = [
  { icon: Mail, label: 'Email', href: 'mailto:fajrinputrapratama01@gmail.com' },
  { icon: AtSign, label: 'LinkedIn', href: 'https://www.linkedin.com/in/fajrin-putra-pratama-174b6a1a6?utm_source=share_via&utm_content=profile&utm_medium=member_android' },
  { icon: Code2, label: 'GitHub', href: 'https://github.com/Fajrinputra' },
  { icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/6282182751322' },
  { icon: Camera, label: 'Instagram', href: 'https://www.instagram.com/jjejebae?igsi=MXhldmI1YjliaWp0NQ==' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border-color bg-bg-secondary">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <Logo size={38} />
              <span className="font-display font-semibold text-text-primary">Fajrin<span className="text-accent">.</span></span>
            </Link>
            <p className="text-sm text-text-secondary font-body leading-relaxed mb-6">
              Fresh Graduate Sistem Informasi · Developer & Designer dari Universitas Andalas.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3 flex-wrap">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-border-color text-text-secondary hover:text-accent hover:border-accent transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map(section => (
            <div key={section.label}>
              <h4 className="font-display font-semibold text-text-primary text-sm mb-4">{section.label}</h4>
              <ul className="flex flex-col gap-2.5">
                {section.links.map(link => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-sm text-text-secondary hover:text-accent transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-border-color flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-secondary font-body">
            © {year} Fajrin Putra Pratama. Seluruh hak cipta dilindungi.
          </p>
          <p className="text-xs text-text-secondary font-body">
            Dibangun dengan ❤️ menggunakan React + Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
