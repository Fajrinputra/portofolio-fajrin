import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, ChevronRight } from 'lucide-react';
import { getDesignBySlug } from '../services/api';
import Lightbox from '../components/Lightbox';
import Button from '../components/Button';

export default function UiUxDetail() {
  const { slug } = useParams();
  const [design, setDesign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });

  useEffect(() => {
    window.scrollTo(0, 0);
    getDesignBySlug(slug)
      .then(setDesign)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border-2 border-accent border-t-transparent animate-spin" />
    </div>
  );

  if (!design) return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h2 className="text-2xl font-display font-bold text-text-primary mb-4">Design tidak ditemukan</h2>
      <Link to="/uiux" className="text-accent hover:underline flex items-center gap-1">
        <ArrowLeft size={16} /> Kembali ke Design UI/UX
      </Link>
    </div>
  );

  const gallery = Array.isArray(design.gallery) ? design.gallery : [];

  return (
    <div className="bg-bg-primary">
      {/* Breadcrumb */}
      <div className="border-b border-border-color bg-bg-secondary">
        <div className="container-custom py-3">
          <nav className="flex items-center gap-2 text-sm text-text-secondary" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-accent transition-colors">Beranda</Link>
            <ChevronRight size={14} />
            <Link to="/uiux" className="hover:text-accent transition-colors">Design UI/UX</Link>
            <ChevronRight size={14} />
            <span className="text-text-primary truncate max-w-[200px]">{design.title}</span>
          </nav>
        </div>
      </div>

      {/* Cover */}
      {design.thumbnail && (
        <div className="w-full aspect-video max-h-[480px] overflow-hidden">
          <img src={design.thumbnail} alt={`Cover design ${design.title}`} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="container-custom py-12 md:py-16 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="section-label">{design.category}</span>
          <h1 className="font-display font-bold text-h1 text-text-primary mt-2 mb-4 leading-tight">
            {design.title}
          </h1>
        </motion.div>

        {/* Figma link */}
        {design.figma_link && (
          <div className="mb-8">
            <Button href={design.figma_link} size="sm">
              <ExternalLink size={15} /> Lihat di Figma
            </Button>
          </div>
        )}

        {/* Description */}
        {design.description && (
          <motion.section className="mb-10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="font-display font-semibold text-text-primary text-xl mb-4 flex items-center gap-2">
              <span className="w-1 h-5 rounded bg-accent inline-block" /> Deskripsi
            </h2>
            <p className="text-text-secondary font-body leading-relaxed">{design.description}</p>
          </motion.section>
        )}

        {/* Design Process */}
        {design.process && (
          <motion.section className="mb-10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="font-display font-semibold text-text-primary text-xl mb-4 flex items-center gap-2">
              <span className="w-1 h-5 rounded bg-accent-secondary inline-block" /> Proses Desain
            </h2>
            <div className="glass-card p-6">
              <p className="text-text-secondary font-body leading-relaxed">{design.process}</p>
            </div>
          </motion.section>
        )}

        {/* Gallery */}
        {gallery.length > 0 && (
          <motion.section className="mb-10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="font-display font-semibold text-text-primary text-xl mb-6 flex items-center gap-2">
              <span className="w-1 h-5 rounded bg-accent inline-block" /> Galeri Mockup
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {gallery.map((img, i) => {
                const src = typeof img === 'string' ? img : img.url;
                return (
                  <motion.div
                    key={i}
                    className="aspect-video rounded-card overflow-hidden cursor-pointer"
                    whileHover={{ scale: 1.03 }}
                    onClick={() => setLightbox({ open: true, index: i })}
                  >
                    <img src={src} alt={`Mockup ${design.title} ${i + 1}`} loading="lazy" className="w-full h-full object-cover" />
                  </motion.div>
                );
              })}
            </div>
          </motion.section>
        )}

        {/* Back */}
        <div className="mt-10 pt-8 border-t border-border-color">
          <Link to="/uiux" className="flex items-center gap-2 text-text-secondary hover:text-accent transition-colors text-sm font-medium">
            <ArrowLeft size={16} /> Kembali ke Design UI/UX
          </Link>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox.open && gallery.length > 0 && (
        <Lightbox
          images={gallery}
          currentIndex={lightbox.index}
          onClose={() => setLightbox({ open: false, index: 0 })}
          onPrev={() => setLightbox(p => ({ ...p, index: Math.max(0, p.index - 1) }))}
          onNext={() => setLightbox(p => ({ ...p, index: Math.min(gallery.length - 1, p.index + 1) }))}
          title={design.title}
        />
      )}
    </div>
  );
}
