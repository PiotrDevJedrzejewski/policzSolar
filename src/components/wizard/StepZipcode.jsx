import React from 'react'
import './stepsStyle.scss';
import { MODIFIERS } from '../../utils/solarCalculator'
import { useSolar } from '../../context/SolarContext';

const StepZipcode = () => {
    const { inputs, updateField } = useSolar();
    return (
        <div className="steps-container">
            <h2 className="steps-title">Podaj swój kod pocztowy</h2>
            <input type="text" className="steps-input" placeholder="np. 00-001"
                value={inputs.zipCode}
                onChange={(e) => updateField('zipCode', e.target.value)} />
            <h2 className="steps-title">Wpisz nazwę swojej miejscowości</h2>
            <input type="text" className="steps-input" placeholder="np. Warszawa"
                value={inputs.city}
                onChange={(e) => updateField('city', e.target.value)} />
            <h2 className="steps-title">Wybierz województwo</h2>
            <select className="steps-input"
                value={inputs.Region}
                onChange={(e) => updateField('Region', e.target.value)}>
                <option value="">Wybierz województwo</option>
                {MODIFIERS.REGION.map(region => (
                    <option key={region.value} value={region.value}>
                        {region.label}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default StepZipcode