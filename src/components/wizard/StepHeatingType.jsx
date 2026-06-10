import React from 'react'
import { useSolar } from '../../context/SolarContext'

const StepHeatingType = () => {
    const { inputs, updateField } = useSolar();
    return (
        <div className="steps-container">
            <h2 className="steps-title">Jaki jest rodzaj ogrzewania w Twoim domu?</h2>
            <select className="steps-input"
                value={inputs.heatingType}
                onChange={(e) => updateField('heatingType', e.target.value)}>
                <option value="">Wybierz rodzaj ogrzewania</option>
                <option value="coal">Węglowe</option>
                <option value="electric">Elektryczne</option>
                <option value="gas">Gazowe</option>
                <option value="oil">Olejowe</option>
                <option value="district">Miejskie</option>
                <option value="other">Inne</option>
            </select>
        </div>
    )
}

export default StepHeatingType
