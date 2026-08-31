import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';
import LanguageToggle from './LanguageToggle';

const NAV_LINKS = [
  { label: 'Beranda', path: '/' },
  { label: 'Profil', path: '/profil' },
  { label: 'Perjalanan', path: '/perjalanan' },
  { label: 'Organisasi', path: '/organisasi' },
  { label: 'Proyek', path: '/proyek' },
  { label: 'UI/UX', path: '/uiux' },
  { label: 'Foto', path: '/foto' },
  { label: 'Sertifikat', path: '/sertifikat' },
  { label: 'Kontak', path: '/kontak' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Tutup mobile menu saat resize ke desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-150 ${
      isActive
        ? 'text-accent'
        : 'text-text-secondary hover:text-text-primary'
    }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-bg-primary/90 backdrop-blur-md border-b border-border-color shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
          <Logo size={36} />
          <span className="font-display font-semibold text-text-primary hidden sm:inline">
            Fajrin<span className="text-accent">.</span>
          </span>
        </Link>

        {/* Desktop Nav — semua link flat */}
        <nav className="hidden md:flex items-center gap-5" aria-label="Navigasi utama">
          {NAV_LINKS.map(({ label, path }) => (
            <NavLink key={path} to={path} end={path === '/'} className={linkClass}>
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
          {/* Hamburger — mobile only */}
          <button
            className="md:hidden p-2 rounded-btn text-text-secondary hover:text-text-primary hover:bg-white/5 transition-colors"
            onClick={() => setOpen(prev => !prev)}
            aria-label={open ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border-color bg-bg-primary/95 backdrop-blur-md">
          <nav className="container-custom py-4 flex flex-col gap-1" aria-label="Navigasi mobile">
            {NAV_LINKS.map(({ label, path }) => (
              <NavLink
                key={path}
                to={path}
                end={path === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2.5 rounded-btn text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-accent bg-accent/8'
                      : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
