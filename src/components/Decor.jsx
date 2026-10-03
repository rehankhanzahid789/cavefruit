// Floating fruit slices / leaves / hearts drawn in SVG. Purely decorative.
const seeds = [[40, 38], [58, 34], [64, 52], [50, 62], [34, 56], [46, 48], [56, 46]];

function Shape({ kind }) {
  switch (kind) {
    case 'dragon':
      return (
        <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="#C2187A" /><circle cx="50" cy="50" r="38" fill="#F46BB5" />
          {[...seeds, [30, 42], [68, 40], [42, 70], [60, 68]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx="2.4" ry="1.8" fill="#2A0F24" />)}</svg>
      );
    case 'banana':
      return (
        <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="#E6B422" /><circle cx="50" cy="50" r="40" fill="#FFD93B" /><circle cx="50" cy="50" r="30" fill="#FFF0A0" /><circle cx="50" cy="50" r="7" fill="#E6B422" /></svg>
      );
    case 'strawberry':
      return (
        <svg viewBox="0 0 100 100"><path d="M50 94C14 66 4 38 24 22c13-10 24-3 26 8 2-11 13-18 26-8 20 16 10 44-26 72z" fill="#E3263A" />
          <path d="M34 14c8 6 12 4 16-6 4 10 8 12 16 6-4 10-10 14-16 14s-12-4-16-14z" fill="#9CCB3B" />
          {[[36, 44], [54, 40], [64, 56], [46, 62], [50, 78], [30, 58]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx="2" ry="3" fill="#FFE27A" />)}</svg>
      );
    case 'leaf':
      return (
        <svg viewBox="0 0 100 100"><path d="M8 92C6 44 40 8 94 6c2 54-32 88-86 86z" fill="#9CCB3B" /><path d="M10 90C36 62 58 40 90 10" stroke="#6E9A22" strokeWidth="3" fill="none" strokeLinecap="round" /></svg>
      );
    case 'heart':
      return (
        <svg viewBox="0 0 100 100"><path d="M50 88C10 60 6 30 26 18c12-7 22-1 24 9 2-10 12-16 24-9 20 12 16 42-24 70z" fill="none" stroke="#fff" strokeWidth="7" strokeLinejoin="round" /></svg>
      );
    default:
      return (
        <svg viewBox="0 0 100 100"><path d="M50 4l12 32 34 4-26 22 8 34-28-18-28 18 8-34L4 40l34-4z" fill="#FFD93B" stroke="#2A0F24" strokeWidth="4" strokeLinejoin="round" /></svg>
      );
  }
}

export default function Decor({ kind, size = 72, rotate = 0, delay = 0, style, className = '' }) {
  return (
    <span
      className={`decor ${className}`}
      aria-hidden="true"
      style={{ '--sz': `${size}px`, '--r': `${rotate}deg`, '--bd': `${delay}s`, ...style }}
    >
      <Shape kind={kind} />
    </span>
  );
}
