import { useState, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProduct, otherProducts, IMG_W, IMG_H } from '../data/products';
import Gallery from '../components/Gallery';
import WavyLabel from '../components/WavyLabel';
import Sticker from '../components/Sticker';
import WaveDivider from '../components/WaveDivider';
import OutOfStockModal from '../components/OutOfStockModal';
import ProductCard from '../components/ProductCard';
import Decor from '../components/Decor';
import Reveal from '../components/Reveal';
import NotFound from './NotFound';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { asset } from '../utils';

const QUOTES = {
  'dragon-fruit': 'Crunch so loud your group chat can hear it.',
  'banana-punch': 'One chip? Sure. Just kidding. Nobody stops at one.',
  strawberry: 'Plot twist: the healthy snack is the main character.',
};

export default function Product() {
  const { slug } = useParams();
  const product = getProduct(slug);
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  useDocumentTitle(product ? `${product.name} | CraveFruit` : 'Not found | CraveFruit');

  if (!product) return <NotFound />;
  const t = product.theme;
  const vars = {
    '--t-bg': t.bg, '--t-deep': t.deep, '--t-accent': t.accent, '--t-ink': t.ink, '--t-on-deep': t.onDeep,
    '--t-soft': t.soft, '--t-line': t.line, '--t-btn-bg': t.btnBg, '--t-btn-ink': t.btnInk,
  };
  const labelBg = product.slug === 'banana-punch' ? '#9CCB3B' : t.deep;
  const labelInk = product.slug === 'banana-punch' ? '#2A0F24' : '#fff';
  const lifestyle = product.images.filter((im) => im.kind === 'lifestyle');
  const [name1, ...rest] = product.name.split(' ');

  return (
    <main id="main" tabIndex={-1} className="pp" style={vars} key={product.slug}>
      <section className="pp-hero" aria-labelledby="pp-title">
        <Decor kind={t.slice} size={90} rotate={-14} className="pp-hero__d pp-hero__d1" />
        <Decor kind="leaf" size={80} rotate={25} delay={0.8} className="pp-hero__d pp-hero__d2" />
        <Decor kind={t.slice} size={60} rotate={20} delay={1.4} className="pp-hero__d pp-hero__d3" />
        <div className="container pp-hero__grid">
          <Gallery images={product.images} name={product.name} />
          <div className="pp-info">
            <p className="pp-info__crumb"><Link to="/">Home</Link> <span aria-hidden="true">/</span> Flavor {String(product.no).padStart(2, '0')} of 03</p>
            <h1 id="pp-title" className="pp-info__title">
              <WavyLabel bg={labelBg} ink={labelInk} shadow="var(--t-line)" size="xl">{name1}{rest.length ? ` ${rest.join(' ')}` : ''}</WavyLabel>
            </h1>
            <div className="pp-info__stickers">
              <Sticker bg="#fff" line="var(--t-line)" rotate={-3}>Freeze-Dried Fruit Snacks</Sticker>
              <Sticker bg="var(--banana)" line="var(--t-line)" rotate={5} round>{product.weight}</Sticker>
              <Sticker bg="#fff" line="var(--t-line)" rotate={-2}>Real Fruit</Sticker>
            </div>
            <p className="pp-info__desc">{product.description}</p>
            <dl className="pp-facts">
              {product.facts.map((f) => (
                <div key={f.label} className="pp-facts__row">
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
            <button type="button" className="btn btn--themed btn--xl pp-info__buy" onClick={() => setOpen(true)} aria-haspopup="dialog">BUY NOW</button>
          </div>
        </div>
      </section>

      <WaveDivider from={t.bg} to={t.soft} variant={1} />

      <section className="pp-vibe" aria-labelledby="vibe-title">
        <div className="container">
          <Reveal>
            <h2 id="vibe-title" className="h2 pp-vibe__title">Taste the vibe</h2>
          </Reveal>
          <div className="pp-vibe__grid">
            <Reveal className="pp-vibe__tile" style={{ '--rot': '-2deg' }}>
              <img src={asset(lifestyle[0].file)} alt={lifestyle[0].alt} width={IMG_W} height={IMG_H} loading="lazy" decoding="async" style={{ objectPosition: lifestyle[0].position }} />
              <Sticker bg="#fff" line="var(--t-line)" rotate={-5} className="pp-vibe__cap">Snack Mood</Sticker>
            </Reveal>
            <Reveal delay={120} className="pp-vibe__quote">
              <Decor kind="heart" size={54} rotate={-10} className="pp-vibe__heart" />
              <p>{QUOTES[product.slug]}</p>
              <span className="pp-vibe__sig">Real {product.fruit}. Zero boring.</span>
            </Reveal>
            <Reveal delay={200} className="pp-vibe__tile" style={{ '--rot': '2.2deg' }}>
              <img src={asset(lifestyle[1].file)} alt={lifestyle[1].alt} width={IMG_W} height={IMG_H} loading="lazy" decoding="async" style={{ objectPosition: lifestyle[1].position }} />
              <Sticker bg="var(--banana)" line="var(--t-line)" rotate={4} className="pp-vibe__cap pp-vibe__cap--r">Main Character Crunch</Sticker>
            </Reveal>
          </div>
        </div>
      </section>

      <WaveDivider from={t.soft} to={t.deep} variant={2} />

      <section className="pp-collect" aria-labelledby="collect-title">
        <div className="container">
          <Reveal className="pp-collect__head">
            <h2 id="collect-title" className="h2">Collect them all</h2>
            <p>Two more flavors. Zero reasons to stop at one.</p>
          </Reveal>
          <ul className="pp-collect__grid">
            {otherProducts(product.slug).map((p, i) => (
              <ProductCard key={p.slug} product={p} compact rotate={i === 0 ? -2 : 2} delay={i * 120} />
            ))}
          </ul>
        </div>
      </section>

      <OutOfStockModal open={open} onClose={close} product={product} />
    </main>
  );
}
