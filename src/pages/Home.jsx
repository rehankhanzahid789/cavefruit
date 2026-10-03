import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { products, lifestyleShots, IMG_W, IMG_H } from '../data/products';
import Marquee from '../components/Marquee';
import ProductCard from '../components/ProductCard';
import Sticker from '../components/Sticker';
import WaveDivider from '../components/WaveDivider';
import WavyLabel from '../components/WavyLabel';
import Decor from '../components/Decor';
import Reveal from '../components/Reveal';
import useDocumentTitle from '../hooks/useDocumentTitle';
import useParallax from '../hooks/useParallax';
import { asset, scrollToId } from '../utils';

const TILTS = [-2.5, 1.5, -1];

const VALUES = [
  { title: 'Real Fruit', text: 'Just fruit. No filler, no fake stuff.', bg: '#FFD93B', icon: 'fruit' },
  { title: 'Freeze-Dried Crunch', text: 'All the flavor. Extra loud crunch.', bg: '#D9A9EE', icon: 'snow' },
  { title: 'No Boring Allowed', text: 'Healthy, but make it fun.', bg: '#9CCB3B', icon: 'bolt' },
  { title: 'Made for Snackers', text: 'Built for cravings, group chats and bags.', bg: '#F6B8CF', icon: 'heart' },
];

function ValueIcon({ kind }) {
  const common = { viewBox: '0 0 48 48', width: 44, height: 44, 'aria-hidden': true, focusable: 'false', fill: 'none', stroke: '#2A0F24', strokeWidth: 3.5, strokeLinecap: 'round', strokeLinejoin: 'round' };
  if (kind === 'snow') return (<svg {...common}><path d="M24 5v38M7.5 14.5l33 19M40.5 14.5l-33 19M18 8l6 5 6-5M18 40l6-5 6 5" /></svg>);
  if (kind === 'bolt') return (<svg {...common}><path d="M27 4L9 27h13l-3 17 20-25H26z" fill="#fff" /></svg>);
  if (kind === 'heart') return (<svg {...common}><path d="M24 42C6 30 3 17 12 11c6-4 11-1 12 4 1-5 6-8 12-4 9 6 6 19-12 31z" fill="#fff" /></svg>);
  return (<svg {...common}><circle cx="24" cy="26" r="16" fill="#fff" /><path d="M24 10c0-4 3-6 7-6M24 10c-1-4-4-6-8-6" /><circle cx="24" cy="26" r="6" /></svg>);
}

export default function Home() {
  useDocumentTitle('CraveFruit | Crave the Crunch');
  const { state } = useLocation();
  const frameRef = useRef(null);
  useParallax(frameRef, 0.08);

  useEffect(() => {
    if (state && state.scrollTo) {
      const id = state.scrollTo;
      const timer = setTimeout(() => scrollToId(id), 80);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [state]);

  return (
    <main id="main" tabIndex={-1}>
      {/* 1 ── HERO ─────────────────────────────── */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__text">
          <div className="hero__copy">
            <Sticker bg="#FFD93B" rotate={-8} className="hero__st hero__st--a">Real Fruit</Sticker>
            <Sticker bg="#9CCB3B" rotate={6} className="hero__st hero__st--b">No Added Nonsense</Sticker>
            <Sticker bg="#D9A9EE" rotate={-4} className="hero__st hero__st--c">100 Gram</Sticker>
            <h1 id="hero-title" className="hero__title">Crave the Crunch.</h1>
            <p className="hero__sub">Real fruit. Freeze-dried. Dangerously snackable.</p>
            <button type="button" className="btn btn--hot btn--lg" onClick={() => scrollToId('flavors')}>
              Meet the Flavors
            </button>
          </div>
        </div>
        <div className="hero__stage">
          <Decor kind="strawberry" size={84} rotate={-14} className="hero__d hero__d1" />
          <Decor kind="banana" size={64} rotate={12} delay={0.7} className="hero__d hero__d2" />
          <Decor kind="leaf" size={70} rotate={30} delay={1.2} className="hero__d hero__d3" />
          <div className="hero__frame" ref={frameRef}>
            <img
              className="hero__img"
              src={asset('hero.webp')}
              alt="Three CraveFruit pouches — Dragon Fruit, Banana Punch and Strawberry — on pink pedestals with fresh fruit"
              width="1920"
              height="1080"
              fetchpriority="high"
              decoding="async"
            />
          </div>
        </div>
      </section>

      {/* 2 ── MARQUEE ──────────────────────────── */}
      <WaveDivider from="#F9D3E1" to="#2A0F24" variant={0} />
      <Marquee />
      <WaveDivider from="#2A0F24" to="#FFF4F8" variant={1} flip />

      {/* 3 ── FLAVORS ──────────────────────────── */}
      <section className="flavors" id="flavors" aria-labelledby="flavors-title">
        <div className="container">
          <Reveal className="sec-head">
            <h2 id="flavors-title" className="h2">Pick your flavor.<br />Collect them all.</h2>
            <p className="sec-head__sub">Three flavors. Three moods. One very crunchy series.</p>
          </Reveal>
          <ul className="flavors__grid">
            {products.map((p, i) => (
              <ProductCard key={p.slug} product={p} rotate={TILTS[i]} delay={i * 120} />
            ))}
          </ul>
        </div>
      </section>

      {/* 4 ── ABOUT ────────────────────────────── */}
      <WaveDivider from="#FFF4F8" to="#F9D3E1" variant={2} />
      <section className="about" id="about" aria-labelledby="about-title">
        <div className="container">
          <Reveal className="about__head">
            <h2 id="about-title" className="h2">Healthy ≠ boring.</h2>
            <p className="about__p">
              We turn real fruit into bold, crunchy snacks. Fruit got stuck in the &ldquo;good for you&rdquo; corner for way too long. So we freeze-dry the real stuff until it&rsquo;s loud, light and dangerously snackable, then pack it in pouches that look as good as they taste.
            </p>
          </Reveal>
          <Reveal className="about__banner">
            <img
              src={asset('about.webp')}
              alt="Dragon Fruit, Banana Punch and Strawberry pouches in a pink and yellow arch set with fresh fruit"
              width="1200"
              height="400"
              loading="lazy"
              decoding="async"
            />
            <Sticker bg="#FFD93B" rotate={-6} className="about__badge">Freeze-Dried Fruit Snacks</Sticker>
          </Reveal>
          <ul className="about__values">
            {VALUES.map((v, i) => (
              <Reveal as="li" key={v.title} delay={i * 90} className="value">
                <div className="value__card" style={{ '--v-bg': v.bg, '--rot': `${i % 2 ? 1.6 : -1.6}deg` }}>
                  <span className="value__icon"><ValueIcon kind={v.icon} /></span>
                  <h3 className="value__title">{v.title}</h3>
                  <p>{v.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 5 ── WHY CRAVE / LIFESTYLE COLLAGE ───── */}
      <WaveDivider from="#F9D3E1" to="#FBF4C5" variant={0} flip />
      <section className="why" aria-labelledby="why-title">
        <Decor kind="leaf" size={90} rotate={-20} className="why__d why__d1" />
        <Decor kind="banana" size={70} rotate={15} delay={0.9} className="why__d why__d2" />
        <div className="container">
          <Reveal className="sec-head">
            <h2 id="why-title" className="h2">Why Crave?</h2>
            <p className="sec-head__sub">Because snack time should feel like the main event.</p>
          </Reveal>
          <ul className="collage">
            {lifestyleShots.map((s, i) => (
              <Reveal as="li" key={`${s.image.file}`} delay={(i % 3) * 100} className="collage__item">
                <figure className="collage__fig" style={{ '--rot': `${[-2.2, 1.8, -1.2, 2, -2, 1.4][i]}deg`, '--ratio': s.ratio, '--line': s.product.theme.line }}>
                  <img
                    src={asset(s.image.file)}
                    alt={s.image.alt}
                    width={IMG_W}
                    height={IMG_H}
                    loading="lazy"
                    decoding="async"
                    style={{ objectPosition: s.image.position }}
                  />
                  <Sticker bg={s.product.theme.bg} ink={s.product.theme.ink} line={s.product.theme.line} rotate={i % 2 ? 4 : -5} className="collage__cap">{s.caption}</Sticker>
                </figure>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 6 ── FINAL CTA ────────────────────────── */}
      <WaveDivider from="#FBF4C5" to="#D61C62" variant={1} />
      <Marquee bg="#D61C62" ink="#fff" dot="#FFD93B" reverse />
      <WaveDivider from="#D61C62" to="#D9A9EE" variant={2} flip />
      <section className="cta" aria-labelledby="cta-title">
        <div className="container">
          <Reveal className="sec-head sec-head--center">
            <h2 id="cta-title" className="h2">Which flavor<br />are YOU?</h2>
            <p className="sec-head__sub">Choose wisely. Or choose all three. We won&rsquo;t judge.</p>
          </Reveal>
          <ul className="cta__grid">
            {products.map((p, i) => (
              <Reveal as="li" key={p.slug} delay={i * 110} className="cta__item">
                <Link to={`/product/${p.slug}`} className="cta__card" style={{ '--rot': `${TILTS[i]}deg`, '--t-bg': p.theme.bg, '--t-line': p.theme.line }} aria-label={`${p.name} — view flavor`}>
                  <span className="cta__img">
                    <img src={asset(p.ctaImage)} alt="" width={IMG_W} height={IMG_H} loading="lazy" decoding="async" />
                  </span>
                  <WavyLabel as="span" bg={p.slug === 'banana-punch' ? '#9CCB3B' : p.theme.deep} ink={p.slug === 'banana-punch' ? '#2A0F24' : '#fff'} shadow="var(--t-line)" size="sm" className="cta__label">{p.name}</WavyLabel>
                  <span className="btn btn--white cta__btn">{`I’m ${p.name.split(' ')[0]}`} <span aria-hidden="true">→</span></span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
