import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Calendar, ExternalLink } from 'lucide-react';
import { getCertificates } from '../services/api';
import SectionHeading from '../components/SectionHeading';
import Lightbox from '../components/Lightbox';

export default function Sertifikat() {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });

  useEffect(() => {
    getCertificates().then(setCerts).finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-bg-primary section-py">
      <div className="container-custom">
        <div className="max-w-2xl mb-14">
          <SectionHeading
            label="Pencapaian"
            title="Sertifikat & Pencapaian"
            subtitle="Berbagai sertifikasi dan penghargaan yang telah saya raih sebagai bukti kompetensi dan semangat belajar."
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certs.map((cert, i) => (
              <motion.div
                key={cert.id}
                className="glass-card overflow-hidden card-hover cursor-pointer"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                onClick={() => setLightbox({ open: true, index: i })}
              >
                {/* Certificate image thumbnail */}
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
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox.open && certs.length > 0 && (
        <Lightbox
          images={certs.map(c => ({ url: c.image_url || '', alt: c.title }))}
          currentIndex={lightbox.index}
          onClose={() => setLightbox({ open: false, index: 0 })}
          onPrev={() => setLightbox(p => ({ ...p, index: Math.max(0, p.index - 1) }))}
          onNext={() => setLightbox(p => ({ ...p, index: Math.min(certs.length - 1, p.index + 1) }))}
          title={certs[lightbox.index]?.title}
          credentialUrl={certs[lightbox.index]?.credential_url}
        />
      )}
    </div>
  );
}
