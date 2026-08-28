import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Calendar, Briefcase, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { getOrganizationBySlug } from '../services/api';
import SectionHeading from '../components/SectionHeading';

export default function OrganisasiDetail() {
  const { identifier } = useParams();
  const [org, setOrg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lightboxIdx, setLightboxIdx] = useState(null);

  useEffect(() => {
    getOrganizationBySlug(identifier)
      .then(setOrg)
      .catch(() => setOrg(null))
      .finally(() => setLoading(false));
  }, [identifier]);

  // Lightbox keyboard nav
  useEffect(() => {
    if (lightboxIdx === null) return;
    const gallery = safeGallery(org?.gallery);
    const handle = (e) => {
      if (e.key === 'Escape') setLightboxIdx(null);
      if (e.key === 'ArrowRight') setLightboxIdx(i => Math.min(i + 1, gallery.length - 1));
      if (e.key === 'ArrowLeft') setLightboxIdx(i => Math.max(i - 1, 0));
    };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [lightboxIdx, org]);

  const safeGallery = (g) => {
    if (Array.isArray(g)) return g;
    if (typeof g === 'string') { try { return JSON.parse(g); } catch { return []; } }
    return [];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!org) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
        <h1 className="text-2xl font-display font-bold">Organisasi tidak ditemukan</h1>
        <Link to="/organisasi" className="text-accent hover:underline flex items-center gap-1">
          <ArrowLeft size={16} /> Kembali ke Organisasi
        </Link>
      </div>
    );
  }

  const gallery = safeGallery(org.gallery);

  return (
    <div className="section-py">
      <div className="container-custom">

        {/* Back button */}
        <Link
          to="/organisasi"
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft size={16} /> Kembali ke Organisasi
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row gap-6 items-start mb-12"
        >
          {/* Logo */}
          {org.logo_url ? (
            <img
              src={org.logo_url}
              alt={org.org_name}
              className="w-24 h-24 object-contain rounded-xl border border-border-color bg-bg-secondary p-2 flex-shrink-0"
            />
          ) : (
            <div
              className="w-24 h-24 rounded-xl flex items-center justify-center text-white text-3xl font-display font-bold flex-shrink-0"
              style={{ background: 'var(--gradient-accent)' }}
            >
              {org.org_name?.charAt(0) || 'O'}
            </div>
          )}

          <div className="flex-1">
            <p className="section-label mb-2">Pengalaman Organisasi</p>
            <h1 className="font-display font-bold text-3xl md:text-4xl text-text-primary mb-2">
              {org.org_name}
            </h1>
            <div className="flex flex-wrap gap-4 text-sm text-text-secondary mt-3">
              <span className="flex items-center gap-1.5">
                <Briefcase size={14} className="text-accent" /> {org.role}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={14} className="text-accent" /> {org.period}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Main content grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Deskripsi */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2 space-y-6"
          >
            {org.description && (
              <div>
                <h2 className="font-display font-semibold text-xl mb-3">Deskripsi Peran</h2>
                <p className="text-text-secondary font-body leading-relaxed">{org.description}</p>
              </div>
            )}
            {org.achievements && (
              <div>
                <h2 className="font-display font-semibold text-xl mb-3">Pencapaian</h2>
                <p className="text-text-secondary font-body leading-relaxed whitespace-pre-line">{org.achievements}</p>
              </div>
            )}
          </motion.div>

          {/* Sidebar info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="glass-card p-5 space-y-4">
              <h3 className="font-display font-semibold text-sm text-text-secondary uppercase tracking-wider">Detail</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-text-secondary block">Organisasi</span>
                  <span className="text-text-primary font-medium">{org.org_name}</span>
                </div>
                <div>
                  <span className="text-text-secondary block">Posisi</span>
                  <span className="text-text-primary font-medium">{org.role}</span>
                </div>
                <div>
                  <span className="text-text-secondary block">Periode</span>
                  <span className="text-text-primary font-medium">{org.period}</span>
                </div>
                {gallery.length > 0 && (
                  <div>
                    <span className="text-text-secondary block">Foto Kegiatan</span>
                    <span className="text-accent font-medium">{gallery.length} foto</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Gallery Foto */}
        {gallery.length > 0 && (
          <div>
            <SectionHeading
              title="Galeri Kegiatan"
              subtitle={`${gallery.length} foto dokumentasi dari ${org.org_name}`}
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-8"
            >
              {gallery.map((url, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setLightboxIdx(i)}
                  className="aspect-square overflow-hidden rounded-xl border border-border-color hover:border-accent/50 transition-all duration-200 group"
                >
                  <img
                    src={url}
                    alt={`Foto ${org.org_name} ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </motion.button>
              ))}
            </motion.div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/92 z-[100] flex items-center justify-center p-4"
            onClick={() => setLightboxIdx(null)}
          >
            {/* Close */}
            <button className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10" onClick={() => setLightboxIdx(null)}>
              <X size={28} />
            </button>

            {/* Counter */}
            <span className="absolute top-4 left-4 text-white/70 text-sm">
              {lightboxIdx + 1} / {gallery.length}
            </span>

            {/* Prev */}
            {lightboxIdx > 0 && (
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10 p-2"
                onClick={e => { e.stopPropagation(); setLightboxIdx(i => i - 1); }}
              >
                <ChevronLeft size={36} />
              </button>
            )}

            {/* Image */}
            <motion.img
              key={lightboxIdx}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={gallery[lightboxIdx]}
              alt=""
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
              onClick={e => e.stopPropagation()}
            />

            {/* Next */}
            {lightboxIdx < gallery.length - 1 && (
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10 p-2"
                onClick={e => { e.stopPropagation(); setLightboxIdx(i => i + 1); }}
              >
                <ChevronRight size={36} />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
