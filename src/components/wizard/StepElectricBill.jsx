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
            <p className="steps-info">Podaj średnią kwotę, jaką płacisz miesięcznie za prąd. To pomoże nam oszacować, ile możesz zaoszczędzić dzięki instalacji fotowoltaicznej.</p>
        </div>
    )
}

export default StepElectricBill
