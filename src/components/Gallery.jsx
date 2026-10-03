import { useRef, useState } from 'react';
import { asset } from '../utils';
import { IMG_W, IMG_H } from '../data/products';

export default function Gallery({ images, name }) {
  const [i, setI] = useState(0);
  const startX = useRef(null);
  const n = images.length;
  const go = (next) => setI(((next % n) + n) % n);
  const cur = images[i];

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(i + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(i - 1); }
  };
  const onPointerDown = (e) => { startX.current = e.clientX; };
  const onPointerUp = (e) => {
    if (startX.current == null) return;
    const dx = e.clientX - startX.current;
    startX.current = null;
    if (Math.abs(dx) > 40) go(dx < 0 ? i + 1 : i - 1);
  };

  return (
    <div className="gallery" role="group" aria-roledescription="carousel" aria-label={`${name} photos`}>
      <div
        className="gallery__main"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => { startX.current = null; }}
        aria-label={`${name} photo ${i + 1} of ${n}. Use left and right arrow keys to change photo.`}
      >
        <img
          key={cur.file}
          className="gallery__img"
          src={asset(cur.file)}
          alt={cur.alt}
          width={IMG_W}
          height={IMG_H}
          decoding="async"
          draggable="false"
          style={{ objectPosition: cur.position }}
        />
        <button type="button" className="gallery__arrow gallery__arrow--prev" onClick={() => go(i - 1)} aria-label="Previous photo">
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <button type="button" className="gallery__arrow gallery__arrow--next" onClick={() => go(i + 1)} aria-label="Next photo">
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <span className="gallery__count" aria-hidden="true">{i + 1} / {n}</span>
      </div>
      <ul className="gallery__thumbs">
        {images.map((img, idx) => (
          <li key={img.file}>
            <button type="button" className="gallery__thumb" aria-label={`Show photo ${idx + 1}: ${img.alt}`} aria-current={idx === i ? 'true' : undefined} onClick={() => setI(idx)}>
              <img src={asset(img.file)} alt="" width={IMG_W} height={IMG_H} loading="lazy" decoding="async" style={{ objectPosition: img.kind === 'lifestyle' ? 'center 22%' : 'center 48%' }} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
