import { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router';
import './Navbar.scss';
import logo from '../../assets/policzSolar512x512.png';

const NAV_ITEMS = [
  {
    label: 'Sprawdź inne produkty',
    children: [
      { label: 'Panele słoneczne', to: '/' },
      { label: 'Magazyny energii', to: '/magazyny-energii' },
      { label: 'Farmy fotowoltaiczne', to: '/farmy' },
    ],
  },
];

function DropdownMenu({ items, isOpen }) {
  return (
    <ul className={`navbar__dropdown${isOpen ? ' navbar__dropdown--open' : ''}`} role="menu">
      {items.map((item) => (
        <li key={item.to} role="none">
          <NavLink
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `navbar__dropdown-link${isActive ? ' navbar__dropdown-link--active' : ''}`
            }
            role="menuitem"
          >
            {item.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

function NavItem({ item }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!item.children) {
    return (
      <li className="navbar__item">
        <NavLink
          to={item.to}
          className={({ isActive }) =>
            `navbar__link${isActive ? ' navbar__link--active' : ''}`
          }
        >
          {item.label}
        </NavLink>
      </li>
    );
  }

  return (
    <li className="navbar__item navbar__item--dropdown" ref={ref}>
      <button
        className={`navbar__link navbar__link--trigger${open ? ' navbar__link--open' : ''}`}
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="true"
        aria-expanded={open}
      >
        {item.label}
        <span className="navbar__chevron" aria-hidden="true">▾</span>
      </button>
      <DropdownMenu items={item.children} isOpen={open} />
    </li>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <NavLink to="/" className="navbar__logo">
          <div className="navbar__logo-container">
            <img src={logo} alt="Policz Solar logo" className="navbar__logo-image" />
          </div>
          Policz Solar
        </NavLink>

        {/* <button
          className="navbar__hamburger"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Menu"
          aria-expanded={mobileOpen}
        >
          <span />
          <span />
          <span />
        </button> */}

        <nav className={`navbar__nav${mobileOpen ? ' navbar__nav--open' : ''}`}>
          {/* <ul className="navbar__list">
            {NAV_ITEMS.map((item) => (
              <NavItem key={item.label} item={item} />
            ))}
          </ul> */}
        </nav>
      </div>
    </header>
  );
}
