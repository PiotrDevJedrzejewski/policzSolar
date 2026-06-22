import { Outlet } from 'react-router';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './Layout.scss';
import ContactForm from '../ContactForm/ContactForm';
import { useSolar } from '../../context/SolarContext';

export default function Layout() {
  const { showContactForm } = useSolar();
  return (
    <div className="layout">
      <Navbar />
      <main className="layout__main">

        {/* Panele default */}
        <Outlet />

      </main>
      <Footer />
      {showContactForm && <ContactForm />}
    </div>
  );
}
