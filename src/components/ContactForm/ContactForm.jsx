import React from 'react'
import './ContactForm.scss'
import { useSolar } from '../../context/SolarContext';
import '../wizard/stepsStyle.scss';
import customFetch from '../../utils/customFetch';

const ContactForm = () => {
    const { setShowContactForm, results } = useSolar();
    const [formData, setFormData] = React.useState({ email: '', phone: '', name: '' });
    const [status, setStatus] = React.useState(null); // null | 'sending' | 'success' | 'error'
    const [errorMessage, setErrorMessage] = React.useState('');

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

        if (!payload.email && !payload.phone) {
            setStatus('error');
            setErrorMessage('Podaj email albo numer telefonu.');
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
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} autoComplete="email" />
                        </div>
                        <p className="steps-info">Lub</p>
                        <div className="contact-form__input-group">
                            <label htmlFor="phone">Numer telefonu:</label>
                            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} autoComplete="tel" />
                        </div>
                        <p className="steps-info">opcjonalne</p>
                        <div className="contact-form__input-group">
                            <label htmlFor="name">Imię:</label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} autoComplete="given-name" />
                        </div>
                        {status === 'error' && <p className="steps-info" style={{ color: 'red' }}>{errorMessage}</p>}
                        <div className="contact-button-container">
                            <button type="submit" className="contact-button" disabled={status === 'sending'}>
                                {status === 'sending' ? 'Wysyłanie...' : 'Wyślij'}
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

