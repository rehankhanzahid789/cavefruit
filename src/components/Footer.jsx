import { asset } from '../utils';

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

const PEOPLE = [
  { role: 'Developer', name: 'Rehan Zahid', href: 'https://www.linkedin.com/in/dev-rehan-zahid/' },
  { role: 'Designer', name: 'Laraib Khalid', href: 'https://www.linkedin.com/in/laraibkhalid-/' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <svg className="footer__wave" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path d="M0,40 C160,92 340,92 520,44 C720,-8 940,-4 1140,46 C1260,76 1360,70 1440,36 L1440,80 L0,80 Z" fill="#2A0F24" />
      </svg>
      <span className="footer__dot footer__dot--a" aria-hidden="true" />
      <span className="footer__dot footer__dot--b" aria-hidden="true" />
      <span className="footer__dot footer__dot--c" aria-hidden="true" />
      <span className="footer__dot footer__dot--d" aria-hidden="true" />
      <div className="container footer__inner">
        <img className="footer__logo" src={asset('logo-white.png')} alt="CraveFruit" width="400" height="231" loading="lazy" decoding="async" />
        <p className="footer__tag">Crave the Crunch</p>
        <ul className="footer__people">
          {PEOPLE.map((p) => (
            <li key={p.href}>
              <a className="pill-link" href={p.href} target="_blank" rel="noopener noreferrer" aria-label={`${p.role}: ${p.name} on LinkedIn (opens in a new tab)`}>
                <LinkedInIcon />
                <span><small>{p.role}</small>{p.name}</span>
              </a>
            </li>
          ))}
        </ul>
        <p className="footer__copy">© 2026 CraveFruit. Crave the Crunch.</p>
      </div>
    </footer>
  );
}
