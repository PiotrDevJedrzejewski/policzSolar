import React from 'react'
import { useSolar } from '../../context/SolarContext'

const StepHorizonOfInvestment = () => {
    const { inputs, updateField } = useSolar();
    return (
        <div className="steps-container">
            <h2 className="steps-title">Jak szybko planujesz wykonać inwestycję?</h2>
            <select className="steps-input"
                value={inputs.HorizonOfInvestment}
                onChange={(e) => updateField('HorizonOfInvestment', e.target.value)}>
                <option value="0">Teraz</option>
                <option value="0-0.3">Do 3 miesięcy</option>
                <option value="0.3-0.6">Do 6 miesięcy</option>
                <option value="1">Do 1 roku</option>
                <option value="2">Później</option>
            </select>
        </div>
    )
}

export default StepHorizonOfInvestment
