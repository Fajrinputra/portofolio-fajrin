import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink, Code2, ArrowRight } from 'lucide-react';

/**
 * Generic Card component
 * variants: 'project' | 'design' | 'org' | 'certificate' | 'simple'
 */
export default function Card({
  variant = 'simple',
  title,
  subtitle,
  description,
  thumbnail,
  category,
  tags = [],
  period,
  href,
  externalLink,
  repoLink,
  onClick,
  highlight,
  badge,
  index = 0,
}) {
  // Safety guard — API bisa return string JSON untuk JSON fields
  const safeTags = Array.isArray(tags) ? tags : [];
  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: index * 0.08, ease: 'easeOut' },
    },
  };

  const Inner = () => (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -4 }}
      className={`glass-card overflow-hidden card-hover h-full flex flex-col ${highlight ? 'ring-1 ring-accent' : ''}`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {/* Thumbnail */}
      {thumbnail && (
        <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
          <img
            src={thumbnail}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            style={{ transition: 'transform 0.5s ease' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          />
          {category && (
            <span className="absolute top-3 left-3 section-label bg-bg-primary/80 backdrop-blur-sm px-3 py-1 rounded-full text-accent">
              {category}
            </span>
          )}
          {badge && (
            <span className="absolute top-3 right-3 text-xs font-medium px-3 py-1 rounded-full bg-accent text-white">
              {badge}
            </span>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Without thumbnail category */}
        {!thumbnail && category && (
          <span className="section-label mb-2">{category}</span>
        )}
        {period && (
          <span className="text-xs text-text-secondary font-body mb-1">{period}</span>
        )}
        <h3 className="font-display font-semibold text-base text-text-primary mb-2 leading-snug">
          {title}
        </h3>
        {subtitle && (
          <p className="text-sm text-accent font-body mb-2">{subtitle}</p>
        )}
        {description && (
          <p className="text-sm text-text-secondary font-body line-clamp-3 flex-1">
            {description}
          </p>
        )}

        {/* Tags — pill besar seperti referensi */}
        {safeTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {safeTags.map(tag => (
              <span
                key={tag}
                className="text-xs font-semibold px-3 py-1 rounded-full bg-accent/15 text-accent border border-accent/30 tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Links row */}
        {(externalLink || repoLink || href) && (
          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border-color">
            {href && (
              <span className="text-sm text-accent font-medium flex items-center gap-1 hover:gap-2 transition-all">
                Lihat Detail <ArrowRight size={14} />
              </span>
            )}
            {externalLink && (
              <a href={externalLink} target="_blank" rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="text-text-secondary hover:text-accent transition-colors"
                aria-label="Demo link">
                <ExternalLink size={16} />
              </a>
            )}
            {repoLink && (
              <a href={repoLink} target="_blank" rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="text-text-secondary hover:text-accent transition-colors"
                aria-label="Repository link">
                <Code2 size={16} />
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <Link to={href} className="block group h-full">
        <Inner />
      </Link>
    );
  }

  return <Inner />;
}
