import { createContext, useContext, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const SolarContext = createContext(null);

// ─── Initial state covering all three calculator types ─────────────────────
export const INITIAL_STATE = {
  zipCode: '',
  Region: '',
  City: '',
  Ownership: 'own', // own | rent
  electricityBill: '300', // in PLN 100-2000+ slider
  PannelPlacement: ['roof'], // 'roof' | 'ground' (multi-select)
  BuildingType: 'house', // single-family | multi-family | commercial
  roofArea: '45', // in m² 20-100+ slider
  roofOrientation: 'S', // N, NE, E, SE, S, SW, W, NW
  roofAge: '0-5', // 0-5 | 6-10 | 11-20 | 21-30
  roofShading: 'none', // none, partial, heavy
  insulationQuality: 'average', // poor, average, good
  heatingType: 'electric', // electric, gas, coal, heat pump
  planingInTwoYears: ['heat-pump'], // multi-select: electric-car, home-battery, heat-pump, air-conditioning, other
  IntrestInDotaions: 'basic', // none, basic, advanced
  HorizonOfInvestment: '0', // 0 -> now, 3mo, 6mo, 1yr, 3yr, 5yr
};

export function SolarProvider({ children }) {
  const [inputs, setInputs] = useLocalStorage('solar_inputs', INITIAL_STATE);
  const [stage, setStage] = useLocalStorage('solar_stage', 1);
  const [discount, setDiscount] = useLocalStorage('solar_discount', 0);
  const [showContactForm, setShowContactForm] = useState(false);

  const updateField = (field, value) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  const resetInputs = () => {
    setInputs(INITIAL_STATE);
  };

  const resetAll = () => {
    resetInputs();
    setStage(1);
    setDiscount(0);
    setShowContactForm(false);
    useLocalStorage.remove('solar_inputs');
    useLocalStorage.remove('solar_stage');
    useLocalStorage.remove('solar_discount');
  };

  return (
    <SolarContext.Provider value={{ inputs, updateField, resetInputs, stage, setStage, discount, setDiscount, showContactForm, resetAll, setShowContactForm }}>
      {children}
    </SolarContext.Provider>
  );
}

export function useSolar() {
  const context = useContext(SolarContext);
  if (!context) {
    throw new Error('useSolar must be used within a SolarProvider');
  }
  return context;
}
