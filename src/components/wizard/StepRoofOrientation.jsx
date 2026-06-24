import React from 'react'
import { MODIFIERS } from '../../utils/solarCalculator'
import { useSolar } from '../../context/SolarContext'

const StepRoofOrientation = () => {
    const { inputs, updateField } = useSolar();
    return (
        <div className="steps-container">
            <h2 className="steps-title">Jaka jest orientacja Twojego dachu?</h2>
            <select className="steps-input"
                value={inputs.roofOrientation ?? ''}
                onChange={(e) => updateField('roofOrientation', e.target.value)}>
                <option value="">Wybierz orientację dachu</option>
                {MODIFIERS.ORIENTATION.map((orientation) => (
                    <option key={orientation.value} value={orientation.value}>
                        {orientation.label}
                    </option>
                ))}
            </select>
            <div className="steps-radio-group" style={{ marginTop: '20px' }}>
                <label>
                    <input className='steps-radio-input' type="checkbox" name="planning" value="other"
                        onChange={() => updateField('roofOrientation', null)} />
                    <span className='steps-radio-input-text'>Nie wiem</span>
                </label>
            </div>

        </div>
    )
}


export default StepRoofOrientation
