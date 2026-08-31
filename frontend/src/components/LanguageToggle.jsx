import { Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function LanguageToggle() {
  const { lang, toggleLang } = useLanguage();

  return (
    <button
      onClick={toggleLang}
      title={lang === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border-color text-text-secondary hover:text-text-primary hover:border-accent/50 bg-bg-secondary/50 hover:bg-bg-secondary transition-all duration-200 text-sm font-medium"
      aria-label="Toggle language"
    >
      <Globe size={14} className="text-accent" />
      <span className="font-semibold tracking-wider text-xs uppercase">
        {lang === 'id' ? 'ID' : 'EN'}
      </span>
    </button>
  );
}
