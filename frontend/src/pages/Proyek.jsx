import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getProjects } from '../services/api';
import SectionHeading from '../components/SectionHeading';
import Card from '../components/Card';

const CATEGORIES = ['Semua', 'Enterprise/ERP', 'Web Development', 'Lainnya'];

export default function Proyek() {
  const [projects, setProjects] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects().then(data => {
      setProjects(data);
      setFiltered(data);
    }).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (activeFilter === 'Semua') {
      setFiltered(projects);
    } else {
      setFiltered(projects.filter(p => p.category === activeFilter));
    }
  }, [activeFilter, projects]);

  return (
    <div className="bg-bg-primary section-py">
      <div className="container-custom">
        <div className="max-w-2xl mb-10">
          <SectionHeading
            label="Portfolio"
            title="Proyek Pengembangan"
            subtitle="Kumpulan proyek software yang saya kerjakan — mulai dari sistem ERP hingga web application."
          />
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map(cat => (
            <motion.button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2 rounded-btn text-sm font-medium transition-all duration-200 ${
                activeFilter === cat
                  ? 'bg-accent text-white shadow-glow'
                  : 'bg-bg-secondary border border-border-color text-text-secondary hover:border-accent hover:text-accent'
              }`}
              whileTap={{ scale: 0.97 }}
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
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-text-secondary">
              {projects.length === 0
                ? <>Belum ada proyek. Tambahkan di <a href="/manage" className="text-accent">/manage</a></>
                : 'Tidak ada proyek di kategori ini.'
              }
            </p>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.25, delay: i * 0.05 }}
                >
                  <Card
                    href={`/proyek/${project.slug}`}
                    title={project.title}
                    category={project.category}
                    description={project.tagline}
                    thumbnail={project.thumbnail}
                    tags={Array.isArray(project.tech_stack) ? project.tech_stack.slice(0, 3) : []}
                    externalLink={project.demo_link}
                    repoLink={project.repo_link}
                    index={i}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
