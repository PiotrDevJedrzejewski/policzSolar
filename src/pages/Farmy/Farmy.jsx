import { useSolar } from '../../context/SolarContext';
import './Farmy.scss';

export default function Farmy() {
  const { inputs } = useSolar();

  return (
    <section className="farmy-page">
      <h1 className="farmy-page__title">Farmy fotowoltaiczne — wyniki</h1>
      <p className="farmy-page__desc">
        Tutaj pojawią się wyniki kalkulacji dla inwestycji w farmę fotowoltaiczną.
      </p>

      {/* Placeholder — results will be implemented here */}
      <div className="farmy-page__placeholder">
        <p>Powierzchnia działki: <strong>{inputs.landArea ? `${inputs.landArea} m²` : '—'}</strong></p>
        <p>Budżet inwestycji: <strong>{inputs.investmentBudget ? `${inputs.investmentBudget} PLN` : '—'}</strong></p>
        <p>Lokalizacja: <strong>{inputs.location || '—'}</strong></p>
      </div>
    </section>
  );
}
