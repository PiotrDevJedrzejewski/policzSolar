import React from 'react'
import { useSolar } from '../../context/SolarContext'

const StepRoofArea = () => {
    const { inputs, updateField } = useSolar();
    return (
        <div className="steps-container">
            <div>
                <h2 className="steps-title">Jaka jest powierzchnia Twojego dachu? lub powierzchni użytkowej</h2>
                <input type="number" className="steps-input" placeholder="np. 100"
                    value={inputs.roofArea}
                    onChange={(e) => updateField('roofArea', e.target.value)} />
                <span className="steps-radio-input-text">m²</span>
            </div>
            <p className='steps-info'>Proszę podać wartość w metrach kwadratowych.</p>
        </div>
    )
}

export default StepRoofArea
