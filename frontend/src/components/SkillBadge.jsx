export default function SkillBadge({ skill, size = 'md' }) {
  const sizeClass = size === 'sm'
    ? 'text-xs px-3 py-1'
    : size === 'lg'
    ? 'text-sm px-5 py-2.5'
    : 'text-sm px-4 py-2';

  return (
    <span
      className={`inline-flex items-center gap-1.5 ${sizeClass} rounded-full border border-border-color bg-bg-secondary text-text-secondary font-body font-medium transition-all duration-200 hover:border-accent hover:text-accent hover:bg-accent/5`}
    >
      {skill}
    </span>
  );
}
