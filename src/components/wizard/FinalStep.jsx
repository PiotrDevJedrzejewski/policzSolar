import React from 'react'
import { useSolar } from '../../context/SolarContext'
import { calculateSolarYield } from '../../utils/solarCalculator'

const currency = (value) => new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
    maximumFractionDigits: 0,
}).format(value || 0);

const number = (value, suffix = '') => `${new Intl.NumberFormat('pl-PL', {
    maximumFractionDigits: 0,
}).format(value || 0)}${suffix}`;

const FinalStep = () => {
    const { inputs, setShowContactForm } = useSolar();
    const results = calculateSolarYield(inputs);

    return (
        <div className="steps-container" style={{ width: '100%' }}>
            <div className="steps-hook-title">
                <h1>Tyle możesz zaoszczędzić przez 25 lat</h1>
                <p>{currency(results.benefit25Years)}</p>
            </div>
            <div className="steps-contact-btn-container">
                <button className="steps-contact-btn" onClick={() => setShowContactForm(true)}>Skontaktuj się z nami</button>
            </div>
            <h2 className="steps-title">Podsumowanie</h2>
            <div className="">
                <div className="steps-info">
                    <strong>Rekomendowana moc instalacji:</strong> {number(results.installedKwp, ' kWp')}
                </div>
                <div className="steps-info">
                    <strong>Szacowana produkcja roczna:</strong> {number(results.yearlyProductionKwh, ' kWh')}
                </div>
                <div className="steps-info">
                    <strong>Przyszle zuzycie energii:</strong> {number(results.yearlyConsumptionKwh, ' kWh/rok')}
                </div>
                <div className="steps-info">
                    <strong>Dodatkowy popyt z planow:</strong> {number(results.additionalPlannedDemandKwh, ' kWh/rok')}
                </div>
                <div className="steps-info">
                    <strong>Autokonsumpcja:</strong> {number(results.selfConsumptionRate, '%')}
                </div>
            </div>

            <h2 className="steps-title">Ekonomia inwestycji</h2>
            <div className="steps-radio-group">
                <div className="steps-info">
                    <strong>Oszczednosc miesieczna:</strong> {currency(results.monthlySavings)}
                </div>
                <div className="steps-info">
                    <strong>Oszczednosc roczna z PV:</strong> {currency(results.yearlySavings)}
                </div>
                <div className="steps-info">
                    <strong>Laczna potencjalna korzysc roczna:</strong> {currency(results.totalPotentialYearlyBenefit)}
                </div>
                <div className="steps-info">
                    <strong>Potencjalna korzysc w 25 lat:</strong> {currency(results.benefit25Years)}
                </div>
                <div className="steps-info">
                    <strong>Koszt brutto systemu:</strong> {currency(results.estimatedSystemCost)}
                </div>
                <div className="steps-info">
                    <strong>Szacowane dotacje i ulgi:</strong> {currency(results.estimatedGrant)}
                </div>
                <div className="steps-info">
                    <strong>Koszt netto:</strong> {currency(results.estimatedNetCost)}
                </div>
                <div className="steps-info">
                    <strong>Zwrot inwestycji:</strong> {results.paybackYears ? `${results.paybackYears} lat` : 'brak danych'}
                </div>
                <div className="steps-info">
                    <strong>Scenariusz dotacji:</strong> {results.grantLabel}
                </div>
            </div>

            {results.planBreakdown.length > 0 && (
                <>
                    <h2 className="steps-title">Wplyw planowanych inwestycji</h2>
                    <div className="steps-radio-group">
                        {results.planBreakdown.map((item) => (
                            <div key={item.key} className="steps-info">
                                <strong>{item.label}:</strong>{' '}
                                +{number(item.addedDemandKwh, ' kWh/rok')}
                                {' | '}wartosc dla PV {currency(item.extraSolarSavings)}
                                {item.extraHeatSavings > 0 ? ` | oszczednosc na ogrzewaniu ${currency(item.extraHeatSavings)}` : ''}
                                <div className="steps-info">{item.note}</div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            <h2 className="steps-title">Zalozenia</h2>
            <div className="steps-radio-group">
                {results.assumptions.map((item) => (
                    <div key={item} className="steps-info">{item}</div>
                ))}
            </div>
        </div>
    )
}

export default FinalStep