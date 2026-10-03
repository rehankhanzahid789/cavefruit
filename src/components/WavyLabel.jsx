// The scalloped name-tag pill from the pouches. Pure CSS (see .wavy in global.css) so the
// waves keep a constant size no matter how long the flavor name is.
export default function WavyLabel({ children, bg = 'var(--plum)', ink = '#fff', shadow, as: Tag = 'span', size = 'md', className = '' }) {
  return (
    <Tag
      className={`wavy wavy--${size} ${className}`}
      style={{ '--wl-bg': bg, '--wl-ink': ink, ...(shadow ? { '--wl-shadow': shadow } : null) }}
    >
      {children}
    </Tag>
  );
}
