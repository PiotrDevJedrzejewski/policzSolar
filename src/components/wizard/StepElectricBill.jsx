import React from 'react'
import { useSolar } from '../../context/SolarContext'

const StepElectricBill = () => {
    const { inputs, updateField } = useSolar();
    return (
        <div className="steps-container">
            <h2 className="steps-title">Jaki jest Twój miesięczny rachunek za prąd?</h2>
            <input type="number" className="steps-input" placeholder="Wprowadź kwotę w PLN"
                value={inputs.electricityBill}
                onChange={(e) => updateField('electricityBill', e.target.value)} />
            <div className="steps-radio-group" style={{ margin: '20px 0' }}>
                {/* Niski 100-250zł Przeciętny 250-500zł Wysoki 500zł-1000zł */}
                <label className={`steps-radio ${inputs.electricityBill === '200' ? 'active' : ''}`}>
                    <input className="steps-radio-input" type="radio" name="electricityBill" value="200"
                        checked={inputs.electricityBill === '200'}
                        onChange={(e) => updateField('electricityBill', e.target.value)} />
                    <span className='steps-radio-input-text'>Niski (100-250 PLN)</span>
                </label>
                <label className={`steps-radio ${inputs.electricityBill === '400' ? 'active' : ''}`}>
                    <input className="steps-radio-input" type="radio" name="electricityBill" value="400"
                        checked={inputs.electricityBill === '400'}
                        onChange={(e) => updateField('electricityBill', e.target.value)} />
                    <span className='steps-radio-input-text'>Przeciętny (250-500 PLN)</span>
                </label>
                <label className={`steps-radio ${inputs.electricityBill === '800' ? 'active' : ''}`}>
                    <input className="steps-radio-input" type="radio" name="electricityBill" value="800"
                        checked={inputs.electricityBill === '800'}
                        onChange={(e) => updateField('electricityBill', e.target.value)} />
                    <span className='steps-radio-input-text'>Wysoki (500-1000 PLN)</span>
                </label>
            </div>
            <p className="steps-info">Podaj średnią kwotę, jaką płacisz miesięcznie za prąd. To pomoże nam oszacować, ile możesz zaoszczędzić dzięki instalacji fotowoltaicznej.</p>
        </div>
    )
}

export default StepElectricBill
