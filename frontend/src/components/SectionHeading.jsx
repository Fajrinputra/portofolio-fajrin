import { motion } from 'framer-motion';

export default function SectionHeading({ label, title, subtitle, center = false, className = '' }) {
  return (
    <div className={`${center ? 'text-center' : ''} ${className}`}>
      {label && (
        <motion.span
          className="section-label block mb-3"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          {label}
        </motion.span>
      )}
      <motion.h2
        className="font-display font-bold text-h2 text-text-primary leading-tight"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          className="mt-4 text-text-secondary text-base max-w-xl"
          style={center ? { margin: '16px auto 0' } : {}}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        className="mt-4 h-1 w-16 rounded-full"
        style={{ background: 'var(--gradient-accent)', transformOrigin: 'left' }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      />
    </div>
  );
}
