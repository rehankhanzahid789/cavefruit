import { Link, useNavigate } from 'react-router-dom';
import WavyLabel from './WavyLabel';
import Sticker from './Sticker';
import Reveal from './Reveal';
import { asset } from '../utils';
import { IMG_W, IMG_H } from '../data/products';

// Collectible "trading pack" card, themed in the flavor's pouch colors.
export default function ProductCard({ product, rotate = 0, delay = 0, compact = false }) {
  const navigate = useNavigate();
  const t = product.theme;
  const labelBg = product.slug === 'banana-punch' ? '#9CCB3B' : t.deep;
  const labelInk = product.slug === 'banana-punch' ? '#2A0F24' : '#fff';
  return (
    <Reveal as="li" delay={delay} className={`pcard-wrap ${compact ? 'pcard-wrap--compact' : ''}`}>
      <article
        className="pcard"
        onClick={(e) => { if (!e.target.closest('a')) navigate(`/product/${product.slug}`); }}
        style={{ '--rot': `${rotate}deg`, '--t-bg': t.bg, '--t-deep': t.deep, '--t-ink': t.ink, '--t-line': t.line, '--t-btn-bg': t.btnBg, '--t-btn-ink': t.btnInk }}
      >
        <div className="pcard__top">
          <Sticker bg={t.deep === '#7DAF22' ? '#9CCB3B' : t.deep} ink={labelInk} line="var(--t-line)" rotate={-4}>
            Flavor {String(product.no).padStart(2, '0')} / 03
          </Sticker>
          <Sticker bg="#fff" rotate={5} round>{product.weight}</Sticker>
        </div>
        <div className="pcard__media">
          <img
            src={asset(product.cardImage)}
            alt={`${product.name} freeze-dried fruit snack pouch`}
            width={IMG_W}
            height={IMG_H}
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="pcard__body">
          <WavyLabel as="h3" bg={labelBg} ink={labelInk} shadow="var(--t-line)" className="pcard__label">{product.name}</WavyLabel>
          {!compact && <p className="pcard__line">{product.oneLiner}</p>}
          <Link to={`/product/${product.slug}`} className="btn btn--themed pcard__btn">
            View Flavor <span aria-hidden="true">→</span>
            <span className="sr-only">: {product.name}</span>
          </Link>
        </div>
      </article>
    </Reveal>
  );
}
