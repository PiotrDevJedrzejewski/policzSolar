import { Outlet, useLocation } from 'react-router';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './Layout.scss';
import ContactForm from '../ContactForm/ContactForm';
import { useSolar } from '../../context/SolarContext';
import Cookie from '../popup/Cookie';

const HIDE_COOKIE_PATHS = ['/polityka-prywatnosci', '/regulamin'];

export default function Layout() {
  const { showContactForm } = useSolar();
  const { pathname } = useLocation();
  const hideCookie = HIDE_COOKIE_PATHS.includes(pathname);

  return (
    <div className="layout">
      <Navbar />
      <main className="layout__main">

        {/* Panele default */}
        <Outlet />

      </main>
      <Footer />
      {showContactForm && <ContactForm />}
      {!hideCookie && <Cookie />}
    </div>
  );
}
