import React from 'react'
import { useSolar } from '../../context/SolarContext'

const StepRoofInsulation = () => {
    const { inputs, updateField } = useSolar();
    return (
        <div className="steps-container">
            <h2 className="steps-title">Jaki jest stan izolacji Twojego budynku?</h2>
            <select className="steps-input"
                value={inputs.insulationQuality ?? ''}
                onChange={(e) => updateField('insulationQuality', e.target.value)}>
                <option value="">Wybierz stan izolacji</option>
                <option value="good">Dobra izolacja</option>
                <option value="average">Przeciętna izolacja</option>
                <option value="poor">Słaba izolacja</option>
            </select>
            <div className="steps-radio-group" style={{ marginTop: '20px' }}>
                <label>
                    <input className='steps-radio-input' type="checkbox" name="planning" value="other"
                        onChange={() => updateField('insulationQuality', null)} />
                    <span className='steps-radio-input-text'>Nie wiem</span>
                </label>
            </div>
        </div>
    )
}

export default StepRoofInsulation
