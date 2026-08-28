import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getPhotos } from '../services/api';
import SectionHeading from '../components/SectionHeading';
import Lightbox from '../components/Lightbox';

export default function Foto() {
  const [photos, setPhotos] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState(['Semua']);
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });

  useEffect(() => {
    getPhotos().then(data => {
      setPhotos(data);
      setFiltered(data);
      const cats = ['Semua', ...new Set(data.map(p => p.category).filter(Boolean))];
      setCategories(cats);
    }).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (activeFilter === 'Semua') setFiltered(photos);
    else setFiltered(photos.filter(p => p.category === activeFilter));
  }, [activeFilter, photos]);

  const openLightbox = (index) => setLightbox({ open: true, index });

  return (
    <div className="bg-bg-primary section-py">
      <div className="container-custom">
        <div className="max-w-2xl mb-10">
          <SectionHeading
            label="Fotografi"
            title="Hasil Foto Freelance"
            subtitle="Dokumentasi momen berharga — wedding, event, produk, dan portrait yang telah saya abadikan."
          />
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map(cat => (
            <motion.button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              whileTap={{ scale: 0.97 }}
              className={`px-5 py-2 rounded-btn text-sm font-medium transition-all duration-200 ${
                activeFilter === cat
                  ? 'bg-accent text-white shadow-glow'
                  : 'bg-bg-secondary border border-border-color text-text-secondary hover:border-accent hover:text-accent'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 rounded-full border-2 border-accent border-t-transparent animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-text-secondary py-12">
            Belum ada foto. Tambahkan di <a href="/manage" className="text-accent">/manage</a>
          </p>
        ) : (
          /* Masonry Grid */
          <AnimatePresence mode="popLayout">
            <div className="masonry-grid">
              {filtered.map((photo, i) => (
                <motion.div
                  key={photo.id}
                  className="masonry-item"
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.25, delay: i * 0.04 }}
                >
                  <motion.div
                    className="relative group rounded-card overflow-hidden cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    onClick={() => openLightbox(i)}
                  >
                    <img
                      src={photo.image_url}
                      alt={photo.title || `Foto freelance ${photo.category}`}
                      loading="lazy"
                      className="w-full h-auto block"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      {photo.category && (
                        <span className="section-label text-white/80">{photo.category}</span>
                      )}
                      {photo.title && (
                        <p className="text-white font-display font-semibold text-sm mt-1">{photo.title}</p>
                      )}
                      {photo.client_name && (
                        <p className="text-white/60 text-xs mt-0.5">Klien: {photo.client_name}</p>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>

      {/* Lightbox */}
      {lightbox.open && filtered.length > 0 && (
        <Lightbox
          images={filtered.map(p => ({ url: p.image_url, alt: p.title || 'Foto freelance' }))}
          currentIndex={lightbox.index}
          onClose={() => setLightbox({ open: false, index: 0 })}
          onPrev={() => setLightbox(p => ({ ...p, index: Math.max(0, p.index - 1) }))}
          onNext={() => setLightbox(p => ({ ...p, index: Math.min(filtered.length - 1, p.index + 1) }))}
          title={filtered[lightbox.index]?.title}
          client={filtered[lightbox.index]?.client_name}
        />
      )}
    </div>
  );
}
