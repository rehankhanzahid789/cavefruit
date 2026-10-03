import { useEffect } from 'react';
import { prefersReducedMotion } from '../utils';

// Writes --py (px) on the element as the page scrolls. Cheap: rAF-throttled, passive listener.
export default function useParallax(ref, factor = 0.12) {
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return undefined;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = Math.min(window.scrollY, window.innerHeight * 1.2);
      el.style.setProperty('--py', `${(y * factor).toFixed(1)}px`);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref, factor]);
}
