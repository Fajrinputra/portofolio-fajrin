import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getDesigns } from '../services/api';
import SectionHeading from '../components/SectionHeading';
import Card from '../components/Card';

export default function UiUx() {
  const [designs, setDesigns] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState(['Semua']);
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDesigns().then(data => {
      setDesigns(data);
      setFiltered(data);
      const cats = ['Semua', ...new Set(data.map(d => d.category).filter(Boolean))];
      setCategories(cats);
    }).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (activeFilter === 'Semua') setFiltered(designs);
    else setFiltered(designs.filter(d => d.category === activeFilter));
  }, [activeFilter, designs]);

  return (
    <div className="bg-bg-primary section-py">
      <div className="container-custom">
        <div className="max-w-2xl mb-10">
          <SectionHeading
            label="Design"
            title="Design UI/UX"
            subtitle="Kumpulan case study desain antarmuka yang saya kerjakan menggunakan Figma."
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
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((design, i) => (
                <motion.div
                  key={design.id}
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.25, delay: i * 0.05 }}
                >
                  <Card
                    href={`/uiux/${design.slug}`}
                    title={design.title}
                    category={design.category}
                    description={design.description}
                    thumbnail={design.thumbnail}
                    index={i}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
            {filtered.length === 0 && !loading && (
              <p className="col-span-3 text-center text-text-secondary py-12">
                Belum ada design. Tambahkan di <a href="/manage" className="text-accent">/manage</a>
              </p>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
