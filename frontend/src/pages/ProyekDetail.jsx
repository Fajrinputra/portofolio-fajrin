import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Code2, ChevronRight } from 'lucide-react';
import { getProjectBySlug, getProjects } from '../services/api';
import Lightbox from '../components/Lightbox';
import Button from '../components/Button';
import SkillBadge from '../components/SkillBadge';

export default function ProyekDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    Promise.all([
      getProjectBySlug(slug),
      getProjects()
    ]).then(([proj, all]) => {
      setProject(proj);
      setAllProjects(all);
    }).catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-accent border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-display font-bold text-text-primary mb-4">Proyek tidak ditemukan</h2>
        <Link to="/proyek" className="text-accent hover:underline flex items-center gap-1">
          <ArrowLeft size={16} /> Kembali ke Proyek
        </Link>
      </div>
    );
  }

  const gallery = Array.isArray(project.gallery) ? project.gallery : [];
  const techStack = Array.isArray(project.tech_stack) ? project.tech_stack : [];
  const challenges = Array.isArray(project.challenges) ? project.challenges : [];
  const features = Array.isArray(project.features) ? project.features : [];

  // Next project navigation
  const currentIdx = allProjects.findIndex(p => p.slug === slug);
  const nextProject = allProjects[currentIdx + 1] || allProjects[0];

  return (
    <div className="bg-bg-primary">
      {/* Breadcrumb */}
      <div className="border-b border-border-color bg-bg-secondary">
        <div className="container-custom py-3">
          <nav className="flex items-center gap-2 text-sm text-text-secondary" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-accent transition-colors">Beranda</Link>
            <ChevronRight size={14} />
            <Link to="/proyek" className="hover:text-accent transition-colors">Proyek</Link>
            <ChevronRight size={14} />
            <span className="text-text-primary truncate max-w-[200px]">{project.title}</span>
          </nav>
        </div>
      </div>

      {/* Cover */}
      {project.thumbnail && (
        <div className="w-full aspect-video max-h-[500px] overflow-hidden">
          <img
            src={project.thumbnail}
            alt={`Cover proyek ${project.title}`}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="container-custom py-12 md:py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="section-label">{project.category}</span>
              <h1 className="font-display font-bold text-h1 text-text-primary mt-2 mb-3 leading-tight">
                {project.title}
              </h1>
              {project.tagline && (
                <p className="text-xl text-text-secondary mb-8">{project.tagline}</p>
              )}
            </motion.div>

            {/* Background */}
            {project.background && (
              <motion.section className="mb-10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                <h2 className="font-display font-semibold text-text-primary text-xl mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 rounded bg-accent inline-block" /> Latar Belakang
                </h2>
                <p className="text-text-secondary font-body leading-relaxed">{project.background}</p>
              </motion.section>
            )}

            {/* Solution */}
            {project.solution && (
              <motion.section className="mb-10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                <h2 className="font-display font-semibold text-text-primary text-xl mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 rounded bg-accent-secondary inline-block" /> Solusi
                </h2>
                <p className="text-text-secondary font-body leading-relaxed">{project.solution}</p>
              </motion.section>
            )}

            {/* Challenges */}
            {challenges.length > 0 && (
              <motion.section className="mb-10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                <h2 className="font-display font-semibold text-text-primary text-xl mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 rounded bg-accent inline-block" /> Tantangan
                </h2>
                <ul className="space-y-3">
                  {challenges.map((c, i) => (
                    <li key={i} className="flex items-start gap-3 text-text-secondary font-body">
                      <span className="mt-1 w-5 h-5 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-xs text-accent flex-shrink-0">{i + 1}</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </motion.section>
            )}

            {/* Features */}
            {features.length > 0 && (
              <motion.section className="mb-10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                <h2 className="font-display font-semibold text-text-primary text-xl mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 rounded bg-accent-secondary inline-block" /> Fitur Utama
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {features.map((f, i) => (
                    <div key={i} className="glass-card p-4 flex items-center gap-3">
                      <span className="text-accent-secondary text-lg">✓</span>
                      <span className="text-sm text-text-secondary font-body">{f}</span>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Impact */}
            {project.impact && (
              <motion.section className="mb-10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                <h2 className="font-display font-semibold text-text-primary text-xl mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 rounded bg-accent inline-block" /> Hasil & Dampak
                </h2>
                <p className="text-text-secondary font-body leading-relaxed">{project.impact}</p>
              </motion.section>
            )}

            {/* Gallery */}
            {gallery.length > 0 && (
              <motion.section className="mb-10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                <h2 className="font-display font-semibold text-text-primary text-xl mb-6 flex items-center gap-2">
                  <span className="w-1 h-5 rounded bg-accent inline-block" /> Galeri
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
                        <img
                          src={src}
                          alt={`Galeri ${project.title} ${i + 1}`}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    );
                  })}
                </div>
              </motion.section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Project Info */}
            <motion.div className="glass-card p-6 sticky top-24" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <h3 className="font-display font-semibold text-text-primary mb-5">Info Proyek</h3>

              {project.role && (
                <div className="mb-4">
                  <p className="text-xs text-text-secondary uppercase tracking-wider mb-1">Role</p>
                  <p className="text-sm text-text-primary font-medium">{project.role}</p>
                </div>
              )}

              {techStack.length > 0 && (
                <div className="mb-6">
                  <p className="text-xs text-text-secondary uppercase tracking-wider mb-2">Tech Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {techStack.map(t => <SkillBadge key={t} skill={t} size="sm" />)}
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-3 pt-4 border-t border-border-color">
                {project.demo_link && (
                  <Button href={project.demo_link} size="sm">
                    <ExternalLink size={15} /> Live Demo
                  </Button>
                )}
                {project.repo_link && (
                  <Button href={project.repo_link} variant="outline" size="sm">
                    <Code2 size={15} /> Source Code
                  </Button>
                )}
              </div>
            </motion.div>

            {/* Next Project */}
            {nextProject && nextProject.slug !== slug && (
              <div className="glass-card p-5">
                <p className="text-xs text-text-secondary mb-2 uppercase tracking-wider">Proyek Berikutnya</p>
                <Link to={`/proyek/${nextProject.slug}`} className="group">
                  <p className="font-display font-semibold text-text-primary group-hover:text-accent transition-colors">
                    {nextProject.title}
                  </p>
                  <span className="text-xs text-accent flex items-center gap-1 mt-1">
                    Lihat Proyek <ChevronRight size={12} />
                  </span>
                </Link>
              </div>
            )}
          </aside>
        </div>

        {/* Back link */}
        <div className="mt-10 pt-8 border-t border-border-color">
          <Link to="/proyek" className="flex items-center gap-2 text-text-secondary hover:text-accent transition-colors text-sm font-medium">
            <ArrowLeft size={16} /> Kembali ke Semua Proyek
          </Link>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox.open && gallery.length > 0 && (
        <Lightbox
          images={gallery}
          currentIndex={lightbox.index}
          onClose={() => setLightbox({ open: false, index: 0 })}
          onPrev={() => setLightbox(prev => ({ ...prev, index: Math.max(0, prev.index - 1) }))}
          onNext={() => setLightbox(prev => ({ ...prev, index: Math.min(gallery.length - 1, prev.index + 1) }))}
          title={project.title}
        />
      )}
    </div>
  );
}
