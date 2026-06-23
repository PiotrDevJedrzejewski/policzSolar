import React from 'react'
import { useSolar } from '../../context/SolarContext'
import './cyrografWithDevil.scss'
import { FaCircleCheck, FaPowerOff, FaSackDollar, FaSun, FaBoltLightning, FaArrowRight, FaStar, FaHouseCircleCheck, FaPhoneVolume } from "react-icons/fa6";
import { LuClipboardList } from "react-icons/lu";
import { ImCalendar } from "react-icons/im";
import { TbCircleNumber1Filled, TbCircleNumber2Filled, TbCircleNumber3Filled } from "react-icons/tb";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { FaRegClock } from "react-icons/fa";
import handsomefella from '../../assets/dude.png'


const currency = (value) => new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
    maximumFractionDigits: 0,
}).format(value || 0);

const number = (value, suffix = '') => `${new Intl.NumberFormat('pl-PL', {
    maximumFractionDigits: 0,
}).format(value || 0)}${suffix}`;

const CyrografWithDevil = () => {
    const { inputs, setShowContactForm, results } = useSolar();


    return (
        <div className="cyrograf-with-devil">
            <div className="cwd-results">
                <div className="cwd-results-first-column">
                    <div className="cwd-results-first-column__title">
                        <h1 className="cwd-results-first-column__title-main">Dziekujemy! Twoja wycena jest gotowa</h1>
                        <h2 className="cwd-results-first-column__title-sub">Nasza instalacja fotowoltaiczna zostala dopasowana do Twoich potrzeb i profilu zuzycia energii</h2>
                    </div>
                    <div className="cwd-results-first-column__benefit">
                        <div className="cwd-results-first-column__benefit-wrapper">
                            <div className="cwd-results-first-column__benefit-icon">
                                <FaCircleCheck />
                            </div>
                            <h1 className="cwd-results-first-column__benefit-title">Oszczedzaj od pierwszego dnia</h1>
                            <h2 className="cwd-results-first-column__benefit-subtitle">Zacznij placic nizsze rachunki za prad juz od pierwszego miesiaca po instalacji</h2>
                        </div>
                        <div className="cwd-results-first-column__benefit-wrapper">
                            <div className="cwd-results-first-column__benefit-icon"><FaCircleCheck /></div>
                            <h1 className="cwd-results-first-column__benefit-title">Bezpieczena inwestycja na lata</h1>
                            <h2 className="cwd-results-first-column__benefit-subtitle">25 lat gwarancji na panele i wysokiej jakosci komponenty</h2>
                        </div>
                        <div className="cwd-results-first-column__benefit-wrapper">
                            <div className="cwd-results-first-column__benefit-icon"><FaCircleCheck /></div>
                            <h1 className="cwd-results-first-column__benefit-title">Kompleksowa obsługa</h1>
                            <h2 className="cwd-results-first-column__benefit-subtitle">Zajmujemy się wszystkim, od projektu po instalację i serwis</h2>
                        </div>
                        <div className="cwd-results-first-column__benefit-wrapper">
                            <div className="cwd-results-first-column__benefit-icon"><FaCircleCheck /></div>
                            <h1 className="cwd-results-first-column__benefit-title">
                                Ekologiczne rozwiazanie
                            </h1>
                            <h2 className="cwd-results-first-column__benefit-subtitle">
                                Zmniejsz swoj wplyw na srodowisko i przyczyn sie do czystszego powietrza dla przyszlych pokolen
                            </h2>
                        </div>
                    </div>
                </div>
                <div className="cwd-results-second-column">
                    <div className="cwd-results-second-column__wrappper">
                        <h1 className="cwd-results-second-column__wrappper__title">Twoj potencjalny zysk przez 25 lat</h1>
                        <span className="cwd-results-second-column__wrappper__number"> NUMBER </span>
                        <div className="cwd-results-second-column__dynamic-four">
                            <div className="cwd-results-second-column__dynamic-four-item">
                                {/* icon scss in _cwd-results.scss */}
                                <FaPowerOff className="icon-power-off" />
                                <p>Rekomendowana moc instalacji</p>
                                <span> 4 kWP </span>
                            </div>
                            <div className="cwd-results-second-column__dynamic-four-item">
                                <FaSun className="icon-sun" />
                                <p>Szacowane produkcja roczna</p>
                                <span> 3429 KWh </span>
                            </div>
                            <div className="cwd-results-second-column__dynamic-four-item">
                                <FaBoltLightning className="icon-bolt-lightning" />
                                <p>Autokonsumpcja</p>
                                <span> 22% </span>
                            </div>
                            <div className="cwd-results-second-column__dynamic-four-item">
                                <FaSackDollar className="icon-sack-dollar" />
                                <p>Oszczędność roczna</p>
                                <span> Wysoka! </span>
                            </div>
                        </div>
                        <div className="cwd-results-second-column__button-container">
                            <button className="cwd-results-second-column__button-container-button" onClick={() => setShowContactForm(true)}>Otrzymaj pełną wycenę na e-mail <FaArrowRight /></button>
                        </div>
                    </div>
                </div>
            </div>
            {/* tittle,3,guarentee in next.scss */}
            <div className="cwd-next-title">
                <h1 className="cwd-next-title__title">Co dalej? - 3 proste kroki do Twojej instalacji</h1>
            </div>
            <div className="cwd-three-column">
                <div className="cwd-three-column__item">
                    <div className="cwd-three-column__item-first-row">
                        <div className="cwd-three-column__item-first-row-number">
                            <TbCircleNumber1Filled />
                        </div>
                        <div className="cwd-three-column__item-first-row-text">Otrzymaj wycenę e-mailem</div>
                    </div>
                    <div className="cwd-three-column__item-second-row">
                        <div className="cwd-three-column__item-second-row-icon"><LuClipboardList /></div>
                        <div className="cwd-three-column__item-second-row-text">W ciągu kilku minut otrzymasz szczegółową wycenę dopasowaną do Twoich potrzeb.</div>
                    </div>
                </div>
                <div className="cwd-three-column__item">
                    <div className="cwd-three-column__item-first-row">
                        <div className="cwd-three-column__item-first-row-number">
                            <TbCircleNumber2Filled />
                        </div>
                        <div className="cwd-three-column__item-first-row-text">Skontaktujemy się z Tobą</div>
                    </div>
                    <div className="cwd-three-column__item-second-row">
                        <div className="cwd-three-column__item-second-row-icon"><ImCalendar /></div>
                        <div className="cwd-three-column__item-second-row-text">Nasz doradca oddzwoni, aby omówić szczegóły i odpowiedzieć na wszystkie Twoje pytania.</div>
                    </div>
                </div>
                <div className="cwd-three-column__item">
                    <div className="cwd-three-column__item-first-row">
                        <div className="cwd-three-column__item-first-row-number">
                            <TbCircleNumber3Filled />
                        </div>
                        <div className="cwd-three-column__item-first-row-text">Montaż i oszczędności</div>
                    </div>
                    <div className="cwd-three-column__item-second-row">
                        <div className="cwd-three-column__item-second-row-icon"><FaHouseCircleCheck /></div>
                        <div className="cwd-three-column__item-second-row-text">Umawiamy dogodne terminy montażu i zaczynasz oszczędzać na rachunkach za prąd.</div>
                    </div>
                </div>
            </div>
            <div className="cwd-guarantee">
                <div className="cwd-guarantee__icon-wrapper">
                    <IoShieldCheckmarkOutline />
                </div>
                <div className="cwd-guarantee__title-wrapper">
                    <h1 className="cwd-guarantee__title-main">Gwarancja bezpieczeństwa i jakosci</h1>
                    <h2 className="cwd-guarantee__title-sub">Dzialamy zgodnie z najwyższymi standardami. Uzywamy sprawdzone komponenty i zapewniamy pelne wsparcie posprzedazowe</h2>
                </div>
                <div className="cwd-guarantee__rating-wrapper">

                    <div className="cwd-guarantee__rating-number"><p>4.9/5</p></div>
                    <div className="cwd-guarantee__rating-stars">
                        <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                    </div>

                </div>
            </div>
            <div className="cwd-add">
                <div className="cwd-add-container">
                    <div className="cwd-add-container-column">
                        <div className="cwd-add-container-column__img-container">
                            <img src={handsomefella} alt="handsomefella" className="cwd-add-container-column__img" />
                        </div>
                    </div>
                    <div className="cwd-add-container-column">
                        <div className="cwd-add-container-column__title">
                            <h1 className="cwd-add-container-column__subtitle">Masz Pytania? Porozmawiaj z naszym ekspertem</h1>
                            <h2 className="cwd-add-container-column__subtitle-2">Pomożemy dobrać najlepsze rozwiązania dla Ciebie</h2>
                        </div>

                        <div className="cwd-add-container-column__table">
                            <div className="cwd-add-container-column__table-item">
                                <div className="cwd-add-container-column__table-item-wrapper">
                                    <div className="cwd-add-container-column__table-item-icon">
                                        <FaCircleCheck />
                                    </div>
                                    <div className="cwd-add-container-column__table-item-text">
                                        <p>Darmowa konsultacja</p>
                                    </div>
                                </div>
                            </div>
                            <div className="cwd-add-container-column__table-item">
                                <div className="cwd-add-container-column__table-item-wrapper">
                                    <div className="cwd-add-container-column__table-item-icon">
                                        <FaCircleCheck />
                                    </div>
                                    <div className="cwd-add-container-column__table-item-text">
                                        <p>Szybka odpowiedź</p>
                                    </div>
                                </div>
                            </div>
                            <div className="cwd-add-container-column__table-item">
                                <div className="cwd-add-container-column__table-item-wrapper">
                                    <div className="cwd-add-container-column__table-item-icon">
                                        <FaCircleCheck />
                                    </div>
                                    <div className="cwd-add-container-column__table-item-text">
                                        <p>Bez zobowiązań</p>
                                    </div>
                                </div>
                            </div>
                            <div className="cwd-add-container-column__table-item">
                                <div className="cwd-add-container-column__table-item-wrapper">
                                    <div className="cwd-add-container-column__table-item-icon">
                                        <FaCircleCheck />
                                    </div>
                                    <div className="cwd-add-container-column__table-item-text">
                                        <p>Pomoc bez formalności</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="cwd-add-container-column">
                        <div className="cwd-add-container-column__button-wrapper">
                            <div className="cwd-add-container-column__button-icon">
                                <FaPhoneVolume />
                            </div>
                            <div className="cwd-add-container-column__button-title">Skontaktuj się z nami</div>
                            <div className="cwd-add-container-column__button-btn">
                                <button onClick={() => setShowContactForm(true)}>Napisz teraz!</button>
                            </div>
                            <div className="cwd-add-container-column__button-text">
                                24/7 Całodobowa Pomoc
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="cwd-footer">
                <div className="cwd-footer-column">
                    <div className="cwd-footer-column-icon">
                        <IoShieldCheckmarkOutline />
                    </div>
                    <div className="cwd-footer-column-text">
                        <p>25 lat gwarancji na panele</p>
                    </div>
                </div>
                <div className="cwd-footer-column">
                    <div className="cwd-footer-column-icon"><RiVerifiedBadgeFill /></div>
                    <div className="cwd-footer-column-text">
                        <p>Certyfikowani instalatorzy</p>
                    </div>
                </div>
                <div className="cwd-footer-column">
                    <div className="cwd-footer-column-icon"><FaSackDollar /></div>
                    <div className="cwd-footer-column-text">
                        <p>0 zł zaliczki</p>
                    </div>
                </div>
                <div className="cwd-footer-column">
                    <div className="cwd-footer-column-icon"><FaRegClock /></div>
                    <div className="cwd-footer-column-text">
                        <p>Montaż w 1 dzień</p>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default CyrografWithDevil