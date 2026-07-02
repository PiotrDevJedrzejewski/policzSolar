import { NavLink, Link } from 'react-router';
import './Footer.scss';

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <Link to="/" className="footer__logo">
          <span className="footer__brand">☀ policzSolar</span>
        </Link>

        <nav className="footer__nav" aria-label="Footer navigation">
          <NavLink to="/polityka-prywatnosci" end className="footer__link">Polityka prywatności</NavLink>
          <NavLink to="/regulamin" className="footer__link">Regulamin</NavLink>
        </nav>

        <p className="footer__copy">&copy; {year} policzSolar. Wszystkie prawa zastrzeżone.</p>
      </div>
    </footer>
  );
}
