import React from 'react'
import { useSolar } from '../../context/SolarContext'

const StepPannelPlacement = () => {
    const { inputs, updateField } = useSolar();

    const handleChange = (value) => {
        const current = inputs?.PannelPlacement || [];
        const updated = current.includes(value)
            ? current.filter((v) => v !== value)
            : [...current, value];
        updateField('PannelPlacement', updated);
    };

    return (
        <div className="steps-container">
            <h2 className="steps-title">Gdzie chcesz umieścić panele fotowoltaiczne?</h2>
            <div className="steps-radio-group">
                <label>
                    <input type="checkbox" name="placement" value="roof"
                        checked={inputs?.PannelPlacement?.includes('roof')}
                        onChange={() => handleChange('roof')} />
                    <span className="steps-radio-input-text">Na dachu</span>
                </label>
                <label>
                    <input type="checkbox" name="placement" value="ground"
                        checked={inputs?.PannelPlacement?.includes('ground')}
                        onChange={() => handleChange('ground')} />
                    <span className="steps-radio-input-text">Na ziemi</span>
                </label>
            </div>
        </div>
    )
}

export default StepPannelPlacement
