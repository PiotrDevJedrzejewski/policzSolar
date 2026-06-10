import React from 'react'
import './ContactForm.scss'
import { useSolar } from '../../context/SolarContext';
import '../wizard/stepsStyle.scss';
import customFetch from '../../utils/customFetch';

const ContactForm = () => {
    const { setShowContactForm } = useSolar();

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="contact-form">
            <div className="contact-form__content">
                <div className="contact-form__exit-btn">
                    <button type="button" onClick={() => setShowContactForm(false)}>X</button>
                </div>
                <h2 className="steps-title">Skontaktuj się z nami</h2>
                <form >
                    <div className="contact-form__input-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" />
                    </div>
                    <p className="steps-info">Lub</p>
                    <div className="contact-form__input-group">
                        <label htmlFor="phone">Numer telefonu:</label>
                        <input type="tel" id="phone" name="phone" />
                    </div>
                    <p className="steps-info">opcjonalne</p>
                    <div className="contact-form__input-group">
                        <label htmlFor="name">Imię:</label>
                        <input type="text" id="name" name="name" />
                    </div>
                    <div className="contact-button-container">
                        <button type="submit" className="contact-button">Wyślij</button>
                    </div>
                    <p className="steps-info">
                        Postaramy się skontaktować z Tobą w ciągu 24 godzin w dni robocze. Czasami może to potrwać dłużej, ale zawsze odpowiadamy na wszystkie wiadomości.
                    </p>
                </form>
            </div>
        </div>
    )
}

export default ContactForm