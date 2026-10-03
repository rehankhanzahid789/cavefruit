// Tilted sticker badge: thick border + hard (non-blurry) offset shadow.
export default function Sticker({ children, bg = '#fff', ink = 'var(--ink)', line = 'var(--ink)', rotate = -3, round = false, className = '', style }) {
  return (
    <span
      className={`sticker ${round ? 'sticker--round' : ''} ${className}`}
      style={{ '--s-bg': bg, '--s-ink': ink, '--s-line': line, '--r': `${rotate}deg`, ...style }}
    >
      {children}
    </span>
  );
}
