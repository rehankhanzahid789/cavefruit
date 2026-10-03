const WORDS = ['CRAVE THE CRUNCH', 'REAL FRUIT', 'FREEZE-DRIED', 'SNACK LOUD'];

export default function Marquee({ bg = 'var(--ink)', ink = 'var(--pink-300)', dot = 'var(--banana)', reverse = false }) {
  const run = (hidden) => (
    <ul className="marquee__run" aria-hidden={hidden || undefined}>
      {[...WORDS, ...WORDS].map((w, i) => (
        <li key={i}>
          <span>{w}</span>
          <i aria-hidden="true">•</i>
        </li>
      ))}
    </ul>
  );
  return (
    <div className={`marquee ${reverse ? 'marquee--rev' : ''}`} style={{ '--m-bg': bg, '--m-ink': ink, '--m-dot': dot }} role="presentation">
      <p className="sr-only">Crave the crunch. Real fruit. Freeze-dried. Snack loud.</p>
      <div className="marquee__track">
        {run(true)}
        {run(true)}
      </div>
    </div>
  );
}
