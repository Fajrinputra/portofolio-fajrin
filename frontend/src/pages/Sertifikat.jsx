import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Calendar, ExternalLink, Tag } from 'lucide-react';
import { getCertificates } from '../services/api';
import SectionHeading from '../components/SectionHeading';
import Lightbox from '../components/Lightbox';
import { useLanguage } from '../contexts/LanguageContext';

export default function Sertifikat() {
  const { t, lang } = useLanguage();
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState({ open: false, index: 0, filtered: [] });
  const [activeCategory, setActiveCategory] = useState('Semua');

  useEffect(() => {
    getCertificates().then(setCerts).finally(() => setLoading(false));
  }, []);

  // Ambil daftar kategori unik
  const categories = useMemo(() => {
    const cats = [...new Set(certs.map(c => c.category || 'Umum').filter(Boolean))].sort();
    return [t('cert_all'), ...cats];
  }, [certs, t]);

  // Filter berdasarkan kategori aktif — reset saat bahasa berubah
  const allLabel = t('cert_all');
  // Filter berdasarkan kategori aktif
  const filtered = useMemo(() =>
    activeCategory === allLabel
      ? certs
      : certs.filter(c => (c.category || 'Umum') === activeCategory),
    [certs, activeCategory, allLabel]
  );

  const openLightbox = (cert) => {
    const idx = filtered.indexOf(cert);
    setLightbox({ open: true, index: idx, filtered });
  };

  return (
    <div className="bg-bg-primary section-py">
      <div className="container-custom">
        <div className="max-w-2xl mb-10">
          <SectionHeading
            label={t('cert_label')}
            title={t('cert_title')}
            subtitle={lang === 'en'
              ? 'Various certifications and awards I have earned as proof of competence and enthusiasm for learning.'
              : 'Berbagai sertifikasi dan penghargaan yang telah saya raih sebagai bukti kompetensi dan semangat belajar.'
            }
          />
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 rounded-full border-2 border-accent border-t-transparent animate-spin" />
          </div>
        ) : certs.length === 0 ? (
          <p className="text-center text-text-secondary py-12">
            Belum ada sertifikat. Tambahkan di <a href="/manage" className="text-accent">/manage</a>
          </p>
        ) : (
          <>
            {/* Category filter tabs */}
            {categories.length > 2 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                      activeCategory === cat
                        ? 'bg-accent text-white border-accent'
                        : 'border-border-color text-text-secondary hover:border-accent/50 hover:text-accent bg-bg-secondary'
                    }`}
                  >
                    {cat !== 'Semua' && <Tag size={12} />}
                    {cat}
                    <span className="text-xs opacity-70">
                      ({cat === 'Semua' ? certs.length : certs.filter(c => (c.category || 'Umum') === cat).length})
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Grid sertifikat */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {filtered.map((cert, i) => (
                  <motion.div
                    key={cert.id}
                    className="glass-card overflow-hidden card-hover cursor-pointer"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.06 }}
                    whileHover={{ y: -4 }}
                    onClick={() => openLightbox(cert)}
                  >
                    {/* Thumbnail */}
                    <div className="aspect-video bg-bg-secondary flex items-center justify-center overflow-hidden">
                      {cert.image_url ? (
                        <img
                          src={cert.image_url}
                          alt={`Sertifikat ${cert.title}`}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      ) : (
                        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-accent/10 text-accent">
                          <Award size={32} />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-5">
                      {/* Kategori badge */}
                      {cert.category && (
                        <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20 mb-2">
                          <Tag size={10} /> {cert.category}
                        </span>
                      )}
                      <h3 className="font-display font-semibold text-text-primary leading-snug mb-2">
                        {cert.title}
                      </h3>
                      {cert.issuer && (
                        <p className="text-sm text-accent font-medium mb-2">{cert.issuer}</p>
                      )}
                      {cert.issued_date && (
                        <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                          <Calendar size={12} />
                          {new Date(cert.issued_date).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
                        </div>
                      )}
                      {cert.credential_url && (
                        <a
                          href={cert.credential_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="inline-flex items-center gap-1 mt-3 text-xs text-accent hover:underline"
                        >
                          <ExternalLink size={12} /> Verifikasi
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </div>

      {/* Lightbox */}
      {lightbox.open && lightbox.filtered.length > 0 && (
        <Lightbox
          images={lightbox.filtered.map(c => ({ url: c.image_url || '', alt: c.title }))}
          currentIndex={lightbox.index}
          onClose={() => setLightbox(p => ({ ...p, open: false }))}
          onPrev={() => setLightbox(p => ({ ...p, index: Math.max(0, p.index - 1) }))}
          onNext={() => setLightbox(p => ({ ...p, index: Math.min(lightbox.filtered.length - 1, p.index + 1) }))}
          title={lightbox.filtered[lightbox.index]?.title}
          credentialUrl={lightbox.filtered[lightbox.index]?.credential_url}
        />
      )}
    </div>
  );
}
