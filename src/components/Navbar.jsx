import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { asset, scrollToId } from '../utils';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false); // mobile full-screen menu
  const [flavorsOpen, setFlavorsOpen] = useState(false); // desktop dropdown
  const dropRef = useRef(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Close everything on route change
  useEffect(() => { setMenuOpen(false); setFlavorsOpen(false); }, [pathname]);

  // Dropdown: close on outside click / Escape
  useEffect(() => {
    if (!flavorsOpen) return undefined;
    const onDown = (e) => { if (dropRef.current && !dropRef.current.contains(e.target)) setFlavorsOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setFlavorsOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey); };
  }, [flavorsOpen]);

  // Mobile menu: lock scroll + Escape
  useEffect(() => {
    if (!menuOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; document.removeEventListener('keydown', onKey); };
  }, [menuOpen]);

  const goSection = (id) => {
    setMenuOpen(false);
    setFlavorsOpen(false);
    if (pathname === '/') scrollToId(id);
    else navigate('/', { state: { scrollTo: id } });
  };

  return (
    <header className="nav">
      <div className="nav__pill">
        <Link to="/" className="nav__logo" aria-label="CraveFruit home">
          <img src={asset('logo-black.png')} alt="CraveFruit — Crave the Crunch" width="400" height="231" />
        </Link>

        <nav className="nav__links" aria-label="Main">
          <div className="nav__drop" ref={dropRef}>
            <button type="button" className="nav__link" aria-expanded={flavorsOpen} aria-controls="flavor-menu" onClick={() => setFlavorsOpen((o) => !o)}>
              Flavors
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" className={flavorsOpen ? 'is-flipped' : ''}><path d="M5 9l7 7 7-7" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            {flavorsOpen && (
              <ul id="flavor-menu" className="nav__menu">
                {products.map((p) => (
                  <li key={p.slug}>
                    <Link to={`/product/${p.slug}`} className="nav__menu-item" style={{ '--dot': p.theme.bg === '#D61C62' ? p.theme.bg : p.theme.bg, '--line': p.theme.line }}>
                      <span className="nav__dot" aria-hidden="true" />
                      {p.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <button type="button" className="nav__menu-item nav__menu-all" onClick={() => goSection('flavors')}>See all flavors</button>
                </li>
              </ul>
            )}
          </div>
          <button type="button" className="nav__link" onClick={() => goSection('about')}>About</button>
        </nav>

        <button
          type="button"
          className={`nav__burger ${menuOpen ? 'is-open' : ''}`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span /><span /><span />
        </button>
      </div>

      <div id="mobile-menu" className={`mmenu ${menuOpen ? 'is-open' : ''}`} hidden={!menuOpen}>
        <ul>
          {products.map((p, i) => (
            <li key={p.slug} style={{ '--i': i }}>
              <Link to={`/product/${p.slug}`} className="mmenu__link" style={{ '--bg': p.theme.bg, '--ink': p.theme.ink, '--line': p.theme.line }}>
                <span className="mmenu__no">0{p.no}</span>
                {p.name}
              </Link>
            </li>
          ))}
          <li style={{ '--i': 3 }}>
            <button type="button" className="mmenu__link mmenu__link--about" onClick={() => goSection('about')}>About</button>
          </li>
        </ul>
      </div>
    </header>
  );
}
