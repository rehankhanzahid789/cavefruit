const PATHS = [
  'M0,70 C220,0 430,120 720,62 C990,8 1200,10 1440,74 L1440,120 L0,120 Z',
  'M0,104 C260,12 520,16 760,66 C1020,120 1240,86 1440,18 L1440,120 L0,120 Z',
  'M0,48 C180,112 380,112 560,58 C760,0 980,8 1180,70 C1290,102 1380,92 1440,64 L1440,120 L0,120 Z',
];

// `from` = colour of the section above, `to` = colour of the section below.
export default function WaveDivider({ from, to, variant = 0, flip = false, className = '' }) {
  return (
    <div className={`wave ${className}`} style={{ background: from }} aria-hidden="true">
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" style={flip ? { transform: 'scaleX(-1)' } : undefined} focusable="false">
        <path d={PATHS[variant % PATHS.length]} fill={to} />
      </svg>
    </div>
  );
}
