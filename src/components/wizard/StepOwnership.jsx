import React from 'react'
import './stepsStyle.scss';
import { useSolar } from '../../context/SolarContext';

const StepOwnership = () => {
    const { inputs, updateField } = useSolar();
    return (
        <div className="steps-container">
            <h2 className="steps-title">Czy jesteś właścicielem budynku?</h2>
            <div className="steps-radio-group">
                <label>
                    <input className='steps-radio-input' type="radio" name="ownership" value="own"
                        checked={inputs.Ownership === 'own'}
                        onChange={(e) => updateField('Ownership', e.target.value)} />
                    <span className='steps-radio-input-text'>Tak</span>
                </label>
                <label>
                    <input className='steps-radio-input' type="radio" name="ownership" value="rent"
                        checked={inputs.Ownership === 'rent'}
                        onChange={(e) => updateField('Ownership', e.target.value)} />
                    <span className='steps-radio-input-text'>Nie</span>
                </label>
            </div>
        </div>
    )
}

export default StepOwnership