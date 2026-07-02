import React from 'react'
import './cookie.scss'
import { useSolar } from '../../context/SolarContext';
import { Link } from 'react-router';

const Cookie = () => {
    const { cookiesAccepted, setCookiesAccepted } = useSolar();

    const handleAccept = () => {
        setCookiesAccepted(true);
    };

    if (cookiesAccepted) return null;

    return (
        <div className="cookie">
            <div className="cookie__content">
                <p className="cookie__text">
                    Ta strona używa plików cookie w celu świadczenia usług na najwyższym poziomie. Dalsze korzystanie ze strony oznacza, że zgadzasz się na ich użycie.
                </p>
                <p>
                    <Link to="/polityka-prywatnosci" className="cookie__link">Polityka prywatności</Link>
                </p>
                <button className="cookie__button" onClick={handleAccept}>Akceptuję</button>
            </div>
        </div>
    )
}

export default Cookie