import { Outlet } from 'react-router';
import Navbar from '../Navbar/Navbar';
import CalculatorInput from '../CalculatorInput/CalculatorInput';
import Footer from '../Footer/Footer';
import './Layout.scss';
import ContactForm from '../ContactForm/ContactForm';
import { useSolar } from '../../context/SolarContext';

export default function Layout() {
  const { showContactForm } = useSolar();
  return (
    <div className="layout">
      <Navbar />
      <CalculatorInput />
      <main className="layout__main">
        <div className="layout__container">
          <Outlet />
        </div>

      </main>
      <Footer />
      {showContactForm && <ContactForm />}
    </div>
  );
}
