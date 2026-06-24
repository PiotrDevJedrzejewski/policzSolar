import React from 'react'
import { useSolar } from '../../context/SolarContext'

const StepDotation = () => {
    const { inputs, updateField } = useSolar();
    return (
        <div className="steps-container">
            <h2 className="steps-title">Jakie jest Twoje planowane dofinansowanie?</h2>
            <div className="steps-radio-group">
                <label>
                    <input className='steps-radio-input' type="radio" name="dotation" value="none"
                        checked={inputs.IntrestInDotaions === 'none'}
                        onChange={(e) => updateField('IntrestInDotaions', e.target.value)} />
                    <span className='steps-radio-input-text'>Brak</span>
                </label>
                <label>
                    <input className='steps-radio-input' type="radio" name="dotation" value="basic"
                        checked={inputs.IntrestInDotaions === 'basic'}
                        onChange={(e) => updateField('IntrestInDotaions', e.target.value)} />
                    <span className='steps-radio-input-text'>Podstawowe (np. Mój Prąd)</span>
                </label>
                <label>
                    <input className='steps-radio-input' type="radio" name="dotation" value="advanced"
                        checked={inputs.IntrestInDotaions === 'advanced'}
                        onChange={(e) => updateField('IntrestInDotaions', e.target.value)} />
                    <span className='steps-radio-input-text'>Rozszerzone (np. Czyste Powietrze)</span>
                </label>
            </div>
        </div>
    )
}

export default StepDotation
