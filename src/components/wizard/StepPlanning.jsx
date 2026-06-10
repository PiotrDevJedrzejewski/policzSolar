import React from 'react'
import { useSolar } from '../../context/SolarContext'

const StepPlanning = () => {
    const { inputs, updateField } = useSolar();

    const handleChange = (value) => {
        const current = inputs?.planingInTwoYears || [];
        const updated = current.includes(value)
            ? current.filter((v) => v !== value)
            : [...current, value];
        updateField('planingInTwoYears', updated);
    };

    return (
        <div className="steps-container">
            <h2 className="steps-title">Czy planujesz dodatkowe inwestycje w fotowoltaikę?</h2>
            <div className="steps-radio-group">
                <label>
                    <input className='steps-radio-input' type="checkbox" name="planning" value="electric-car"
                        checked={inputs?.planingInTwoYears?.includes('electric-car')}
                        onChange={() => handleChange('electric-car')} />
                    <span className='steps-radio-input-text'>Samochód elektryczny</span>
                </label>
                <label>
                    <input className='steps-radio-input' type="checkbox" name="planning" value="home-battery"
                        checked={inputs?.planingInTwoYears?.includes('home-battery')}
                        onChange={() => handleChange('home-battery')} />
                    <span className='steps-radio-input-text'>Domowa bateria</span>
                </label>
                <label>
                    <input className='steps-radio-input' type="checkbox" name="planning" value="heat-pump"
                        checked={inputs?.planingInTwoYears?.includes('heat-pump')}
                        onChange={() => handleChange('heat-pump')} />
                    <span className='steps-radio-input-text'>Pompa ciepła</span>
                </label>
                <label>
                    <input className='steps-radio-input' type="checkbox" name="planning" value="air-conditioning"
                        checked={inputs?.planingInTwoYears?.includes('air-conditioning')}
                        onChange={() => handleChange('air-conditioning')} />
                    <span className='steps-radio-input-text'>Klimatyzacja</span>
                </label>
                <label>
                    <input className='steps-radio-input' type="checkbox" name="planning" value="other"
                        checked={inputs?.planingInTwoYears?.includes('other')}
                        onChange={() => handleChange('other')} />
                    <span className='steps-radio-input-text'>Inne</span>
                </label>
            </div>
        </div>
    )
}

export default StepPlanning
