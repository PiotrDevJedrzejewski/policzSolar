import { useSolar } from '../../context/SolarContext';
import './PompyCiepla.scss';

export default function PompyCiepla() {
  const { inputs } = useSolar();

  return (
    <section className="pompy-page">
      <h1 className="pompy-page__title">Pompy ciepła — wyniki</h1>
      <p className="pompy-page__desc">
        Tutaj pojawią się wyniki kalkulacji doboru pompy ciepła dla Twojego budynku.
      </p>

      {/* Placeholder — results will be implemented here */}
      <div className="pompy-page__placeholder">
        <p>Ogrzewana powierzchnia: <strong>{inputs.heatedArea ? `${inputs.heatedArea} m²` : '—'}</strong></p>
        <p>Izolacja: <strong>{inputs.insulationType}</strong></p>
        <p>Roczne zużycie energii: <strong>{inputs.powerNeed ? `${inputs.powerNeed} kWh` : '—'}</strong></p>
      </div>
    </section>
  );
}
