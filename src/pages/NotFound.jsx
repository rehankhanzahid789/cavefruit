import { Link } from 'react-router-dom';
import Decor from '../components/Decor';
import WavyLabel from '../components/WavyLabel';
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function NotFound() {
  useDocumentTitle('Lost in the snack aisle | CraveFruit');
  return (
    <main className="nf" id="main" tabIndex={-1}>
      <Decor kind="strawberry" size={110} rotate={-12} className="nf__d nf__d1" />
      <Decor kind="banana" size={90} rotate={10} delay={0.6} className="nf__d nf__d2" />
      <Decor kind="dragon" size={100} rotate={18} delay={1.1} className="nf__d nf__d3" />
      <Decor kind="leaf" size={70} rotate={40} delay={0.3} className="nf__d nf__d4" />
      <div className="nf__inner">
        <p className="nf__code" aria-hidden="true">404</p>
        <WavyLabel bg="var(--plum)" size="lg">Page not found</WavyLabel>
        <h1 className="nf__title">This page got snacked.</h1>
        <p className="nf__text">We looked everywhere. Not even a crumb. Let&rsquo;s get you back to the good stuff.</p>
        <Link to="/" className="btn btn--hot">Take me home <span aria-hidden="true">→</span></Link>
      </div>
    </main>
  );
}
