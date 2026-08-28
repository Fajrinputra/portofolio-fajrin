import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Code2, Palette, Camera, ChevronRight } from 'lucide-react';
import { getProfile, getProjects, getPhotos } from '../services/api';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import Card from '../components/Card';
import SkillBadge from '../components/SkillBadge';

// --- Hero Section ---
function HeroSection({ profile }) {
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.6, ease: 'easeOut' } }),
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: 'var(--color-accent)' }} />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full opacity-8 blur-3xl"
          style={{ background: 'var(--color-accent-secondary)' }} />
      </div>

      <div className="container-custom relative z-10 py-20">
        <div className="max-w-3xl">
          <motion.div custom={0} variants={textVariants} initial="hidden" animate="visible">
            <span className="section-label">👋 Halo, saya</span>
          </motion.div>

          <motion.h1
            custom={1}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="font-display font-bold text-h1 text-text-primary mt-3 mb-4 leading-tight"
          >
            Fajrin Putra<br />
            <span className="gradient-text">Pratama</span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="text-xl md:text-2xl text-text-secondary font-body mb-6 leading-relaxed"
          >
            {profile?.tagline || 'Fresh Graduate Sistem Informasi · Developer & Designer'}
          </motion.p>

          <motion.p
            custom={3}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="text-text-secondary font-body max-w-2xl mb-10 leading-relaxed"
          >
            {profile?.bio?.split('.')[0]}. Saya bersemangat dalam membangun produk digital yang bermakna.
          </motion.p>

          <motion.div
            custom={4}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-4"
          >
            <Button href="/proyek" size="lg">
              Lihat Proyek <ArrowRight size={18} />
            </Button>
            <Button href="/kontak" variant="outline" size="lg">
              Hubungi Saya
            </Button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-0.5 h-12 bg-gradient-to-b from-transparent to-accent opacity-60" />
        </motion.div>
      </div>
    </section>
  );
}

// --- Skills Marquee ---
const allSkills = [
  'React.js', 'Laravel', 'PHP', 'JavaScript', 'Express.js', 'Tailwind CSS',
  'MySQL', 'PostgreSQL', 'Figma', 'CodeIgniter', 'Bootstrap', 'Redis',
  'Fotografi', 'Video Editing', 'Social Media', 'Node.js'
];

function SkillsMarquee() {
  return (
    <section className="py-12 border-y border-border-color bg-bg-secondary overflow-hidden">
      <div className="relative flex gap-0 overflow-hidden">
        {/* Two identical tracks for seamless loop */}
        {[0, 1].map(i => (
          <div key={i} className="marquee-track flex-shrink-0 flex gap-4 items-center">
            {allSkills.map((skill) => (
              <div key={skill} className="flex items-center gap-4">
                <SkillBadge skill={skill} size="lg" />
                <span className="text-accent" aria-hidden="true">✦</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

// --- Preview Section ---
function PreviewSection({ title, label, icon: Icon, href, children }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-accent/10 text-accent">
            <Icon size={20} />
          </div>
          <div>
            <p className="section-label">{label}</p>
            <h3 className="font-display font-semibold text-text-primary">{title}</h3>
          </div>
        </div>
        <Link to={href} className="flex items-center gap-1 text-sm text-accent hover:gap-2 transition-all font-medium">
          Lihat Semua <ChevronRight size={16} />
        </Link>
      </div>
      {children}
    </div>
  );
}

// --- CTA Section ---
function CTASection() {
  return (
    <section className="section-py">
      <div className="container-custom">
        <motion.div
          className="relative rounded-2xl overflow-hidden p-10 md:p-16 text-center"
          style={{ background: 'var(--gradient-card)' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 border border-accent/20 rounded-2xl pointer-events-none" />
          <span className="section-label">Mari Berkolaborasi</span>
          <h2 className="font-display font-bold text-h2 text-text-primary mt-3 mb-4">
            Punya ide? Mari wujudkan<br className="hidden md:block" />
            <span className="gradient-text"> bersama.</span>
          </h2>
          <p className="text-text-secondary font-body mb-8 max-w-lg mx-auto">
            Saya terbuka untuk peluang kerja, freelance, maupun kolaborasi proyek.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href="/kontak" size="lg">Hubungi Saya</Button>
            <Button href="/profil" variant="outline" size="lg">
              <Download size={18} /> Download CV
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// --- Main Home Page ---
export default function Home() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    getProfile().then(setProfile).catch(() => {});
    getProjects().then(data => setProjects(data.slice(0, 3))).catch(() => {});
    getPhotos().then(data => setPhotos(data.slice(0, 6))).catch(() => {});
  }, []);

  return (
    <>
      <HeroSection profile={profile} />
      <SkillsMarquee />

      {/* Quick Intro */}
      <section className="section-py">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <SectionHeading
                label="Tentang Saya"
                title="Fresh Graduate yang Bersemangat"
                subtitle={profile?.bio || 'Memuat...'}
              />
              <div className="flex gap-4 mt-8">
                <Button href="/profil">Selengkapnya</Button>
                <Button href="/profil" variant="outline">
                  <Download size={16} /> Download CV
                </Button>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {[
                { value: '3.59', label: 'IPK', suffix: '' },
                { value: '4', label: 'Proyek', suffix: '+' },
                { value: '3', label: 'Design Case Study', suffix: '+' },
                { value: '2026', label: 'Lulus', suffix: '' },
              ].map(({ value, label, suffix }, i) => (
                <motion.div
                  key={label}
                  className="glass-card p-6 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <p className="font-display font-bold text-3xl gradient-text">{value}{suffix}</p>
                  <p className="text-sm text-text-secondary mt-1">{label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Preview Sections */}
      <section className="section-py bg-bg-secondary">
        <div className="container-custom flex flex-col gap-14">
          {/* Projects preview */}
          <PreviewSection title="Proyek Terbaru" label="Portfolio" icon={Code2} href="/proyek">
            {projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((p, i) => (
                  <Card
                    key={p.id}
                    href={`/proyek/${p.slug}`}
                    title={p.title}
                    category={p.category}
                    description={p.tagline}
                    thumbnail={p.thumbnail}
                    tags={p.tech_stack?.slice(0, 3)}
                    index={i}
                  />
                ))}
              </div>
            ) : (
              <p className="text-text-secondary text-sm">Belum ada proyek. Tambahkan di <a href="/manage" className="text-accent">/manage</a></p>
            )}
          </PreviewSection>

          {/* Photo preview */}
          <PreviewSection title="Foto Freelance" label="Fotografi" icon={Camera} href="/foto">
            {photos.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {photos.map((photo, i) => (
                  <motion.div
                    key={photo.id}
                    className="aspect-square rounded-card overflow-hidden"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <img
                      src={photo.image_url}
                      alt={photo.title || 'Foto freelance'}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-text-secondary text-sm">Belum ada foto. Tambahkan di <a href="/manage" className="text-accent">/manage</a></p>
            )}
          </PreviewSection>
        </div>
      </section>

      <CTASection />
    </>
  );
}
