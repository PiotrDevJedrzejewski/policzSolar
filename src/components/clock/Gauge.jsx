import React from 'react'
import { GaugeComponent } from 'react-gauge-component';
import { useSolar } from '../../context/SolarContext'

const MAX_STAGE = 14;

const Gauge = () => {
    const { stage } = useSolar();
    return (
        <div>
            <GaugeComponent
                value={stage}
                minValue={1}
                maxValue={MAX_STAGE}
                type="radial"
                arc={{
                    width: 0.25,
                    padding: 0.01,
                    subArcs: [],
                    effects: { glow: true, glowBlur: 9, glowSpread: 0.3 },
                    colorArray: ["#baff91", "#3dd150", "#237042"],
                    nbSubArcs: 3
                }}
                pointer={{
                    type: "needle",
                    color: "#f0d61e",
                    length: 0.65,
                    width: 11,
                    maxFps: 60,
                    baseColor: "#f0d61e",
                    strokeWidth: 0
                }}
                labels={{
                    valueLabel: {
                        hide: true,
                    },
                    tickLabels: { hideMinMax: true },
                }}

            />
        </div>
    )
}

export default Gauge





