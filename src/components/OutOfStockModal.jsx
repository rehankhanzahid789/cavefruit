import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Decor from './Decor';

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function OutOfStockModal({ open, onClose, product }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);

  // Lock body scroll, move focus in, restore focus on close.
  useEffect(() => {
    if (!open) return undefined;
    const previouslyFocused = document.activeElement;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    const { overflow, paddingRight } = document.body.style;
    document.body.style.overflow = 'hidden';
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [open]);

  // Escape closes; Tab is trapped inside the dialog.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const nodes = dialogRef.current?.querySelectorAll(FOCUSABLE);
      if (!nodes || nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      } else if (!dialogRef.current.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;
  const t = product.theme;

  return createPortal(
    <div
      className="modal"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{ '--t-bg': t.bg, '--t-deep': t.deep, '--t-ink': t.ink, '--t-on-deep': t.onDeep, '--t-line': t.line, '--t-btn-bg': t.btnBg, '--t-btn-ink': t.btnInk }}
    >
      <div ref={dialogRef} className="modal__card" role="dialog" aria-modal="true" aria-labelledby="oos-title" aria-describedby="oos-desc">
        <button type="button" className="modal__x" onClick={onClose} aria-label="Close dialog">
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" /></svg>
        </button>
        <Decor kind={t.slice} size={64} rotate={-14} className="modal__decor modal__decor--a" />
        <Decor kind="leaf" size={46} rotate={30} className="modal__decor modal__decor--b" />
        <h2 id="oos-title" className="modal__title">😭 We&rsquo;re out of stock!</h2>
        <p id="oos-desc" className="modal__text">
          {product.name} sold out faster than you can say crunch. Check back soon!
        </p>
        <button type="button" ref={closeRef} className="btn btn--themed" onClick={onClose}>Got it</button>
      </div>
    </div>,
    document.body
  );
}
