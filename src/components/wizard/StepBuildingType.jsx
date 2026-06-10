import React from 'react'
import { useSolar } from '../../context/SolarContext'

const StepBuildingType = () => {
    const { inputs, updateField } = useSolar();
    return (
        <div className="steps-container">
            <h2 className="steps-title">Jaki typ budynku posiadasz?</h2>
            <div className="steps-radio-group">
                <label>
                    <input className='steps-radio-input' type="radio" name="buildingType" value="house"
                        checked={inputs.BuildingType === 'house'}
                        onChange={(e) => updateField('BuildingType', e.target.value)} />
                    <span className="steps-radio-input-text">Dom jednorodzinny</span>
                </label>
                <label>
                    <input className='steps-radio-input' type="radio" name="buildingType" value="apartment"
                        checked={inputs.BuildingType === 'apartment'}
                        onChange={(e) => updateField('BuildingType', e.target.value)} />
                    <span className="steps-radio-input-text">Bliźniak lub szeregowiec</span>
                </label>
                <label>
                    <input className='steps-radio-input' type="radio" name="buildingType" value="commercial"
                        checked={inputs.BuildingType === 'commercial'}
                        onChange={(e) => updateField('BuildingType', e.target.value)} />
                    <span className="steps-radio-input-text">Budynek komercyjny</span>
                </label>
                <label>
                    <input className='steps-radio-input' type="radio" name="buildingType" value="other"
                        checked={inputs.BuildingType === 'other'}
                        onChange={(e) => updateField('BuildingType', e.target.value)} />
                    <span className="steps-radio-input-text">Inny lub grunt</span>
                </label>
            </div>
        </div>
    )
}

export default StepBuildingType
