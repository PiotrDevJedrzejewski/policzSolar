import { useSolar } from '../../context/SolarContext';
import CalculatorInput from '../../components/CalculatorInput/CalculatorInput';
import './PanelePage.scss';

export default function PanelePage() {
  // const { stage } = useSolar();

  return (
    <section className="panele-page">
      <CalculatorInput />
    </section>
  );
}
