import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GraduationCap, School, BookOpen, Star } from 'lucide-react';

const levelIcons = {
  'SD': BookOpen,
  'SMP': School,
  'SMA': GraduationCap,
  'Kuliah': Star,
};

const levelColors = {
  'SD': '#6C5CE7',
  'SMP': '#00D9C0',
  'SMA': '#6C5CE7',
  'Kuliah': '#00D9C0',
};

export default function Timeline({ items = [] }) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-border-color hidden md:block" />

      <div className="flex flex-col gap-12 md:gap-16">
        {items.map((item, index) => {
          const isEven = index % 2 === 0;
          const Icon = levelIcons[item.level] || BookOpen;
          const color = levelColors[item.level] || '#6C5CE7';
          const isHighlight = item.achievement;

          return (
            <motion.div
              key={item.id || index}
              className={`relative flex flex-col md:flex-row items-center gap-6 md:gap-0 ${isEven ? '' : 'md:flex-row-reverse'}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Content box */}
              <div className={`w-full md:w-5/12 ${isEven ? 'md:pr-10 md:text-right' : 'md:pl-10'}`}>
                <motion.div
                  className={`glass-card p-6 card-hover ${isHighlight ? 'ring-1 ring-accent-secondary' : ''}`}
                  whileHover={{ y: -4, boxShadow: '0 8px 40px rgba(108,92,231,0.2)' }}
                >
                  {isHighlight && (
                    <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-accent-secondary/10 text-accent-secondary border border-accent-secondary/30 mb-3">
                      ✨ Highlight
                    </span>
                  )}
                  <span className="section-label" style={{ color }}>
                    {item.level}
                  </span>
                  <h3 className="font-display font-semibold text-text-primary mt-1 mb-1 leading-snug">
                    {item.institution_name}
                  </h3>
                  <p className="text-xs text-text-secondary mb-3">{item.period}</p>
                  {item.description && (
                    <p className="text-sm text-text-secondary font-body leading-relaxed">{item.description}</p>
                  )}
                  {item.achievement && (
                    <div className="mt-3 pt-3 border-t border-border-color">
                      <p className="text-sm font-medium text-accent-secondary">🏆 {item.achievement}</p>
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Center node */}
              <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 flex-shrink-0"
                style={{ background: 'var(--color-bg-primary)', borderColor: color, boxShadow: `0 0 16px ${color}60` }}>
                <Icon size={20} style={{ color }} />
              </div>

              {/* Spacer for opposite side */}
              <div className="hidden md:block md:w-5/12" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
