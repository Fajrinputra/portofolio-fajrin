import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

export default function Lightbox({ images, currentIndex, onClose, onPrev, onNext, title, client, credentialUrl }) {
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft' && onPrev) onPrev();
    if (e.key === 'ArrowRight' && onNext) onNext();
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  const currentImage = images ? images[currentIndex] : null;
  const imgSrc = typeof currentImage === 'string' ? currentImage : currentImage?.url;
  const imgAlt = typeof currentImage === 'string' ? (title || 'Gambar') : (currentImage?.alt || title || 'Gambar');

  return (
    <AnimatePresence>
      <motion.div
        className="lightbox-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label="Lightbox preview gambar"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Tutup lightbox"
        >
          <X size={20} />
        </button>

        {/* Prev button */}
        {onPrev && images && images.length > 1 && (
          <button
            onClick={e => { e.stopPropagation(); onPrev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Gambar sebelumnya"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {/* Next button */}
        {onNext && images && images.length > 1 && (
          <button
            onClick={e => { e.stopPropagation(); onNext(); }}
            className="absolute right-14 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Gambar berikutnya"
          >
            <ChevronRight size={24} />
          </button>
        )}

        {/* Image */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.2 }}
          className="relative max-w-5xl max-h-[85vh] w-full"
          onClick={e => e.stopPropagation()}
        >
          <img
            src={imgSrc}
            alt={imgAlt}
            className="w-full max-h-[75vh] object-contain rounded-lg"
          />

          {/* Caption */}
          {(title || client || credentialUrl) && (
            <div className="mt-3 text-center">
              {title && (
                <p className="text-white font-display font-semibold text-lg">{title}</p>
              )}
              {client && (
                <p className="text-white/60 text-sm mt-1">Klien: {client}</p>
              )}
              {credentialUrl && (
                <a
                  href={credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-2 text-accent text-sm hover:underline"
                >
                  <ExternalLink size={14} /> Verifikasi Sertifikat
                </a>
              )}
            </div>
          )}

          {/* Image counter */}
          {images && images.length > 1 && (
            <p className="text-center text-white/40 text-xs mt-2">
              {currentIndex + 1} / {images.length}
            </p>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
