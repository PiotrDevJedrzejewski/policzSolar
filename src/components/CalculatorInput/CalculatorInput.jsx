import { useNavigate } from 'react-router';
import { useSolar } from '../../context/SolarContext';
import React from 'react';
import './CalculatorInput.scss';
import StepOwnership from '../wizard/StepOwnership';
import StepZipcode from '../wizard/StepZipcode';
import StepPannelPlacement from '../wizard/StepPannelPlacement';
import StepBuildingType from '../wizard/StepBuildingType';
import StepRoofArea from '../wizard/StepRoofArea';
import StepRoofOrientation from '../wizard/StepRoofOrientation';
import StepRoofAge from '../wizard/StepRoofAge';
import StepRoofShading from '../wizard/StepRoofShading';
import StepRoofInsulation from '../wizard/StepRoofInsulation';
import StepElectricBill from '../wizard/StepElectricBill';
import StepHeatingType from '../wizard/StepHeatingType';
import StepPlanning from '../wizard/StepPlanning';
import StepDotation from '../wizard/StepDotation';
import StepHorizonOfInvestment from '../wizard/StepHorizonOfInvestment';
import Gauge from '../clock/Gauge';


export default function CalculatorInput() {
  const navigate = useNavigate();
  const { inputs, updateField, resetInputs, stage, setStage, resetAll } = useSolar();

  const hasBattery = (inputs.planingInTwoYears || []).includes('home-battery');

  const stages = [
    { id: 1, component: <StepZipcode /> },
    { id: 2, component: <StepOwnership /> },
    { id: 3, component: <StepPannelPlacement /> },
    { id: 4, component: <StepElectricBill /> },
    { id: 5, component: <StepBuildingType /> },
    { id: 6, component: <StepRoofArea /> },
    { id: 7, component: <StepRoofOrientation /> },
    { id: 8, component: <StepRoofAge /> },
    { id: 9, component: <StepRoofShading /> },
    { id: 10, component: <StepRoofInsulation /> },
    { id: 11, component: <StepHeatingType /> },
    { id: 12, component: <StepPlanning /> },
    { id: 13, component: <StepDotation />, skip: !hasBattery },
    { id: 14, component: <StepHorizonOfInvestment /> },
  ];

  const activeStages = stages.filter((s) => !s.skip);

  const goNext = () => {
    const next = stages.find((s) => s.id > stage && !s.skip);
    if (next) {
      setStage(next.id);
    } else {
      navigate('/wyniki');
    }
  };

  const goPrev = () => {
    const prev = [...stages].reverse().find((s) => s.id < stage && !s.skip);
    if (prev) setStage(prev.id);
  };

  const isFirst = !activeStages.some((s) => s.id < stage);
  const isLast = !activeStages.some((s) => s.id > stage);

  return (
    <section className="calc-input">
      <div className="calc-input__inner">
        <div className="calc-input__inner-navigation">
          {/* arrow icon */}
          <button type="button" onClick={goPrev} disabled={isFirst}>
            🢀
          </button>
          <p>
            Sprawdz czy instalacja fotowoltaiczna jest dla Ciebie opłacalna!
          </p>
        </div>
        <section className="calc-input__inner-content">
          {stages.find((s) => s.id === stage)?.component}
          <div className="calc-gauge">
            <p className="calc-gauge-steps">Krok: <strong>{activeStages.findIndex((s) => s.id === stage) + 1}/{activeStages.length}</strong></p>

            <Gauge />

            <button className="steps-button" onClick={goNext}>Dalej</button>
          </div>
        </section>
        <button className="calc__resetButton" onClick={resetAll}>
          Reset
        </button>
      </div>
    </section>
  );
}
