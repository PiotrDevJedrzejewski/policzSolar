import React from 'react'
import { useSolar } from '../../context/SolarContext'

const StepRoofAge = () => {
    const { inputs, updateField } = useSolar();
    return (
        <div className="steps-container">
            <h2 className="steps-title">Jaki jest wiek Twojego dachu?</h2>
            <div className="steps-radio-group">
                <label>
                    <input className="steps-radio-input" type="radio" name="roof-age" value="0-5"
                        checked={inputs.roofAge === '0-5'}
                        onChange={(e) => updateField('roofAge', e.target.value)} />
                    <span className='steps-radio-input-text'>0-5 lat</span>
                </label>
                <label>
                    <input className="steps-radio-input" type="radio" name="roof-age" value="6-10"
                        checked={inputs.roofAge === '6-10'}
                        onChange={(e) => updateField('roofAge', e.target.value)} />
                    <span className='steps-radio-input-text'>6-10 lat</span>
                </label>
                <label>
                    <input className="steps-radio-input" type="radio" name="roof-age" value="11-20"
                        checked={inputs.roofAge === '11-20'}
                        onChange={(e) => updateField('roofAge', e.target.value)} />
                    <span className='steps-radio-input-text'>11-20 lat</span>
                </label>
                <label>
                    <input className="steps-radio-input" type="radio" name="roof-age" value="21-30"
                        checked={inputs.roofAge === '21-30'}
                        onChange={(e) => updateField('roofAge', e.target.value)} />
                    <span className='steps-radio-input-text'>21-30+ lat</span>
                </label>
            </div>
        </div>
    )
}

export default StepRoofAge
