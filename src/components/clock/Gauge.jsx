import React, { useMemo } from 'react'
import { GaugeComponent } from 'react-gauge-component';
import { useSolar, INITIAL_STATE } from '../../context/SolarContext'
import { calculateSolarYield } from '../../utils/solarCalculator'

const MAX_BENEFIT = calculateSolarYield(INITIAL_STATE).totalPotentialYearlyBenefit * 1.5;

const Gauge = () => {
    const { inputs } = useSolar();
    const yearlyBenefit = useMemo(
        () => calculateSolarYield(inputs).totalPotentialYearlyBenefit,
        [inputs]
    );
    return (
        <div>
            <GaugeComponent
                value={yearlyBenefit}
                minValue={0}
                maxValue={MAX_BENEFIT}
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
                        formatTextValue: (value) =>
                            `${new Intl.NumberFormat('pl-PL', { maximumFractionDigits: 0 }).format(value)} zł/rok`,
                        style: {
                            fontSize: "36px",
                            fontStyle: "italic",
                            fill: "#6b7280",
                            fontWeight: "bold",

                        },
                        offsetY: 40,
                    },
                    tickLabels: { hideMinMax: true },
                    offsetY: 8
                }}

            />
        </div>
    )
}

export default Gauge





