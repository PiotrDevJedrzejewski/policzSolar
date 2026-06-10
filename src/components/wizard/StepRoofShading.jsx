import React from 'react'
import { MODIFIERS } from '../../utils/solarCalculator'
import { useSolar } from '../../context/SolarContext'

const StepRoofShading = () => {
    const { inputs, updateField } = useSolar();
    return (
        <div className="steps-container">
            <h2 className="steps-title">Jakie jest zacienienie Twojego dachu?</h2>
            <select className="steps-input"
                value={inputs.roofShading}
                onChange={(e) => updateField('roofShading', e.target.value)}>
                <option value="">Wybierz poziom zacienienia</option>
                {MODIFIERS.SHADING.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default StepRoofShading
