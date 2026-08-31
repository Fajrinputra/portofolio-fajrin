import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, MapPin, Calendar, GraduationCap, X, ChevronLeft, ChevronRight, Images } from 'lucide-react';
import { getProfile } from '../services/api';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import SkillBadge from '../components/SkillBadge';
import { useLanguage } from '../contexts/LanguageContext';

const goalIcons = ['💡', '🔄', '🤝'];

// Auto-assign emoji berdasarkan nama kategori
function getCategoryIcon(name = '') {
  const lower = name.toLowerCase();
  if (lower.includes('language') || lower.includes('bahasa')) return '💻';
  if (lower.includes('web') || lower.includes('framework')) return '🌐';
  if (lower.includes('tool') || lower.includes('platform')) return '🛠️';
  if (lower.includes('ai') || lower.includes('modern')) return '🤖';
  if (lower.includes('algorithm') || lower.includes('cs') || lower.includes('structure')) return '🧠';
  if (lower.includes('soft') || lower.includes('skill') || lower.includes('leadership')) return '💛';
  if (lower.includes('database') || lower.includes('data')) return '🗄️';
  if (lower.includes('design') || lower.includes('ui') || lower.includes('ux')) return '🎨';
  if (lower.includes('mobile') || lower.includes('android') || lower.includes('ios')) return '📱';
  if (lower.includes('cloud') || lower.includes('devops') || lower.includes('server')) return '☁️';
  if (lower.includes('security') || lower.includes('network')) return '🔒';
  return '📦';
}

// Komponen Galeri Foto Pribadi dengan Lightbox
function PersonalGallery({ photos }) {
  const [lightboxIdx, setLightboxIdx] = useState(null);

  useEffect(() => {
    if (lightboxIdx === null) return;
    const handle = (e) => {
      if (e.key === 'Escape') setLightboxIdx(null);
      if (e.key === 'ArrowRight') setLightboxIdx(i => Math.min(i + 1, photos.length - 1));
      if (e.key === 'ArrowLeft') setLightboxIdx(i => Math.max(i - 1, 0));
    };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [lightboxIdx, photos.length]);

  return (
    <section className="section-py border-b border-border-color">
      <div className="container-custom">
        <SectionHeading
          label="Galeri"
          title="Foto Saya"
          subtitle="Kumpulan momen dan kenangan yang membentuk perjalanan saya."
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="columns-2 sm:columns-3 lg:columns-4 gap-3 mt-10"
        >
          {photos.map((url, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              onClick={() => setLightboxIdx(i)}
              className="break-inside-avoid mb-3 w-full overflow-hidden rounded-xl border border-border-color hover:border-accent/50 transition-all duration-200 group block"
            >
              <img
                src={url}
                alt={`Foto ${i + 1}`}
                className="w-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </motion.button>
          ))}
        </motion.div>

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
              <button className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10" onClick={() => setLightboxIdx(null)}>
                <X size={28} />
              </button>
              <span className="absolute top-4 left-4 text-white/70 text-sm flex items-center gap-2">
                <Images size={14} /> {lightboxIdx + 1} / {photos.length}
              </span>
              {lightboxIdx > 0 && (
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10 p-2"
                  onClick={e => { e.stopPropagation(); setLightboxIdx(i => i - 1); }}
                >
                  <ChevronLeft size={36} />
                </button>
              )}
              <motion.img
                key={lightboxIdx}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                src={photos[lightboxIdx]}
                alt=""
                className="max-w-full max-h-[88vh] object-contain rounded-xl shadow-2xl"
                onClick={e => e.stopPropagation()}
              />
              {lightboxIdx < photos.length - 1 && (
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
    </section>
  );
}


export default function Profil() {
  const { t } = useLanguage();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);


  useEffect(() => {
    getProfile()
      .then(setProfile)
      .finally(() => setLoading(false));
  }, []);

  const skillCategories = (() => {
    const s = profile?.skills;
    if (Array.isArray(s)) return s;
    if (typeof s === 'string') { try { return JSON.parse(s); } catch { return []; } }
    return [];
  })();
  const goals = (() => {
    try {
      const g = profile?.goals;
      return Array.isArray(g) ? g : (typeof g === 'string' ? JSON.parse(g) : []);
    } catch { return []; }
  })();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-accent border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-bg-primary">
      {/* Hero Section */}
      <section className="section-py border-b border-border-color">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Photo */}
            <motion.div
              className="flex justify-center md:justify-start"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative">
                {/* Container foto: tinggi dan lebar fixed, object-cover agar full-fill tanpa gap */}
                <div
                  className="w-64 h-80 md:w-72 md:h-96 rounded-2xl overflow-hidden border-2 border-accent/30"
                  style={{ background: 'var(--color-bg-secondary)' }}
                >
                  {profile?.photo_url ? (
                    <img
                      src={profile.photo_url}
                      alt={`Foto profil ${profile.full_name}`}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-bg-secondary text-6xl">
                      👤
                    </div>
                  )}
                </div>
                {/* Decorative */}
                <div className="absolute -bottom-3 -right-3 w-16 h-16 rounded-xl border border-accent-secondary/40"
                  style={{ background: 'var(--gradient-card)' }} />
                <div className="absolute -top-3 -left-3 w-10 h-10 rounded-lg bg-accent/20 border border-accent/30" />
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="section-label">Profil Diri</span>
              <h1 className="font-display font-bold text-h1 text-text-primary mt-2 mb-2 leading-tight">
                {profile?.full_name || 'Fajrin Putra Pratama'}
              </h1>
              <p className="text-text-secondary text-lg mb-6">{profile?.tagline}</p>

              {/* Data diri pills */}
              <div className="flex flex-wrap gap-3 mb-6">
                {profile?.birth_place && (
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <MapPin size={15} className="text-accent" />
                    {profile.birth_place}
                  </div>
                )}
                {profile?.birth_date && (
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <Calendar size={15} className="text-accent" />
                    {new Date(profile.birth_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                )}
              </div>

              {/* Education highlight */}
              <div className="glass-card p-4 mb-6 border-l-2 border-accent">
                <div className="flex items-start gap-3">
                  <GraduationCap size={20} className="text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-text-primary">S1 Sistem Informasi, Universitas Andalas</p>
                    <p className="text-xs text-text-secondary mt-0.5">2022 – 2026 · Predikat Pujian · IPK 3.59</p>
                    <p className="text-xs text-accent-secondary mt-1">Masa studi 3 tahun 11 bulan</p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              {profile?.cv_url && (
                <Button href={profile.cv_url} size="lg">
                  <Download size={18} /> Download CV
                </Button>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      {profile?.bio && (
        <section className="section-py border-b border-border-color">
          <div className="container-custom max-w-3xl">
            <SectionHeading label="Bio" title="Tentang Saya" />
            <motion.div
              className="mt-8 space-y-4 text-text-secondary font-body leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {profile.bio.split('\n').filter(Boolean).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Personal Photos Gallery */}
      {(() => {
        const photos = Array.isArray(profile?.personal_photos)
          ? profile.personal_photos
          : (() => { try { return JSON.parse(profile?.personal_photos || '[]'); } catch { return []; } })();
        if (!photos || photos.length === 0) return null;
        return (
          <PersonalGallery photos={photos} />
        );
      })()}

      {/* Goals/Values */}
      {goals.length > 0 && (
        <section className="section-py border-b border-border-color bg-bg-secondary">
          <div className="container-custom">
            <SectionHeading label="Values" title="Prinsip & Tujuan" center />
            <div className="grid md:grid-cols-3 gap-6 mt-10">
              {goals.map((goal, i) => (
                <motion.div
                  key={i}
                  className="glass-card p-6 text-center card-hover"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="text-4xl mb-4">{goalIcons[i] || '⭐'}</div>
                  <h3 className="font-display font-semibold text-text-primary mb-3">{goal.title}</h3>
                  <p className="text-sm text-text-secondary font-body leading-relaxed">{goal.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Skills Section — Grid kartu per kategori */}
      <section className="section-py">
        <div className="container-custom">
          <SectionHeading label={t('profil_skills_label')} title={t('profil_skills_title')} />

          {skillCategories.length > 0 ? (
            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              {skillCategories.map((cat, i) => (
                <motion.div
                  key={i}
                  className="glass-card p-5 card-hover"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                >
                  {/* Header kategori */}
                  <div className="flex items-center gap-2.5 mb-4">
                    <span className="text-xl">{cat.icon || getCategoryIcon(cat.category)}</span>
                    <h3 className="font-display font-semibold text-text-primary text-base">
                      {cat.category}
                    </h3>
                  </div>
                  {/* Skill pills */}
                  <div className="flex flex-wrap gap-2">
                    {(cat.items || []).map(skill => (
                      <span
                        key={skill}
                        className="px-3 py-1 text-xs font-medium rounded-full border border-border-color text-text-secondary bg-bg-secondary hover:border-accent/50 hover:text-accent transition-colors duration-150"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <p className="text-text-secondary mt-6">Belum ada data skill. Isi di <a href="/manage" className="text-accent">/manage</a></p>
          )}
        </div>
      </section>
    </div>
  );
}
