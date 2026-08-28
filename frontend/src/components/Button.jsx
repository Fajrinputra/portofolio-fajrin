import { motion } from 'framer-motion';

const variants = {
  primary: 'bg-accent hover:opacity-90 text-white shadow-glow',
  outline: 'border border-accent text-accent hover:bg-accent hover:text-white',
  ghost: 'text-text-secondary hover:text-text-primary hover:bg-white/5',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  href,
  target,
  rel,
  type = 'button',
  disabled = false,
  ...props
}) {
  const sizeClass = size === 'sm'
    ? 'px-4 py-2 text-sm'
    : size === 'lg'
    ? 'px-8 py-4 text-base'
    : 'px-6 py-3 text-sm';

  const base = `inline-flex items-center gap-2 font-medium rounded-btn transition-all duration-200 ${sizeClass} ${variants[variant]} ${disabled ? 'opacity-50 pointer-events-none' : ''} ${className}`;

  const el = href ? (
    <a href={href} target={target} rel={rel} className={base} {...props}>
      {children}
    </a>
  ) : (
    <button type={type} onClick={onClick} disabled={disabled} className={base} {...props}>
      {children}
    </button>
  );

  return (
    <motion.div
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      className="inline-block"
    >
      {el}
    </motion.div>
  );
}
