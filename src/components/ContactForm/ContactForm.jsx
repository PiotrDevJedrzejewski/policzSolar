import React, { useState, useEffect } from 'react'
import './ContactForm.scss'
import { useSolar } from '../../context/SolarContext';
import '../wizard/stepsStyle.scss';
import customFetch from '../../utils/customFetch';
import { FaPhone, FaEnvelope } from "react-icons/fa6";
import { IoMdPerson } from "react-icons/io";

const ContactForm = () => {
    const { setShowContactForm, showContactForm, results } = useSolar();
    const [formData, setFormData] = useState({ email: '', phone: '', name: '' });
    const [status, setStatus] = useState(null); // null | 'sending' | 'success' | 'error'
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (!showContactForm) return; // nic nie dodajemy, cleanup nie potrzebny

        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                setShowContactForm(false);
            }
        };
        document.addEventListener('keydown', handleEsc);
        return () => {
            document.removeEventListener('keydown', handleEsc);
        };
    }, [showContactForm]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            name: formData.name.trim(),
            results,
        };

        const MAX_EMAIL = 50;
        const MAX_PHONE = 15;
        const MAX_NAME = 20;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^(\+?48)?[\s-]?\d{3}[\s-]?\d{3}[\s-]?\d{3}$/;

        if (payload.email.length > MAX_EMAIL || payload.phone.length > MAX_PHONE || payload.name.length > MAX_NAME) {
            setStatus('error');
            setErrorMessage(`Przekroczono maksymalną długość pola (email: ${MAX_EMAIL}, telefon: ${MAX_PHONE}, imię: ${MAX_NAME} znaków).`);
            return;
        }

        if (!payload.email || !payload.phone) {
            setStatus('error');
            setErrorMessage('Podaj email oraz numer telefonu.');
            return;
        }
        if (!emailRegex.test(payload.email)) {
            setStatus('error');
            setErrorMessage('Podaj poprawny adres email.');
            return;
        }
        if (!phoneRegex.test(payload.phone.replace(/\s/g, ''))) {
            setStatus('error');
            setErrorMessage('Podaj poprawny numer telefonu (np. 123456789 lub +48 123 456 789).');
            return;
        }

        setErrorMessage('');
        setStatus('sending');
        try {
            await customFetch.post('/policz-solar', payload);
            setFormData({ email: '', phone: '', name: '' });
            setStatus('success');
        } catch (err) {
            console.error('ContactForm submit error:', err);
            setErrorMessage(err.response?.data?.msg || 'Błąd wysyłania, spróbuj ponownie.');
            setStatus('error');
        }
    };

    return (
        <div className="contact-form">
            <div className="contact-form__overlay" onClick={() => setShowContactForm(false)}></div>
            <div className="contact-form__content">
                <div className="contact-form__exit-btn">
                    <button type="button" onClick={() => setShowContactForm(false)}>X</button>
                </div>
                <h2 className="steps-title">Skontaktuj się z nami</h2>
                {status === 'success' ? (
                    <p className="steps-info">Dziękujemy! Skontaktujemy się z Tobą wkrótce.</p>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="contact-form__input-group">
                            <label htmlFor="email"> <FaEnvelope /> Email:</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} autoComplete="email" placeholder="twojmail@gmail.com" maxLength={50} />
                        </div>
                        <div className="contact-form__input-group">
                            <label htmlFor="phone"> <FaPhone /> Numer telefonu:</label>
                            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} autoComplete="tel" placeholder="+48 123 456 789" maxLength={15} />
                        </div>
                        <p className="steps-info">opcjonalne</p>
                        <div className="contact-form__input-group">
                            <label htmlFor="name"> <IoMdPerson /> Imię:</label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} autoComplete="given-name" maxLength={20} />
                        </div>
                        {status === 'error' && <p className="steps-info" style={{ color: 'red' }}>{errorMessage}</p>}
                        <div className="contact-button-container">
                            <button type="submit" className="contact-button" disabled={status === 'sending'}>
                                {status === 'sending' ? 'Wysyłanie...' : 'Otrzymaj ofertę ➤'}
                            </button>
                        </div>
                        <p className="steps-info">
                            Postaramy się skontaktować z Tobą w ciągu 24 godzin w dni robocze. Czasami może to potrwać dłużej, ale zawsze odpowiadamy na wszystkie wiadomości.
                        </p>
                    </form>
                )}
            </div>
        </div>
    )
}

export default ContactForm

