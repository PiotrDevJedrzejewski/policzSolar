import { useSolar } from '../../context/SolarContext';
import CalculatorInput from '../../components/CalculatorInput/CalculatorInput';
import './PanelePage.scss';

export default function PanelePage() {
  // const { stage } = useSolar();

  return (
    <div style={{ width: '100%' }}>
      <section className="panele-page">
        <CalculatorInput />
      </section>
      {/* <div className="panele-page__content">
        hello
      </div> */}
    </div>
  );
}
