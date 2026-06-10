import { NavLink } from 'react-router';
import './Footer.scss';

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <span className="footer__brand">☀ policzSolar</span>

        <nav className="footer__nav" aria-label="Footer navigation">
          <NavLink to="/" end className="footer__link">Panele słoneczne</NavLink>
          <NavLink to="/pompy-ciepla" className="footer__link">Pompy ciepła</NavLink>
          <NavLink to="/farmy" className="footer__link">Farmy fotowoltaiczne</NavLink>
        </nav>

        <p className="footer__copy">&copy; {year} policzSolar. Wszystkie prawa zastrzeżone.</p>
      </div>
    </footer>
  );
}
