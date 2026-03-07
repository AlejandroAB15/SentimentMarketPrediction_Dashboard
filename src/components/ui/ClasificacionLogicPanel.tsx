export default function ClasificacionLogicPanel() {
  return (
    <section className="bg-surface-1 border border-[var(--color-grid-line)] rounded-xl p-6">

      <div className="mb-6">
        <p className="text-[11px] uppercase tracking-[0.18em] text-text-subtle font-semibold">
          LÓGICA DE CLASIFICACIÓN
        </p>

        <p className="text-sm text-text-muted mt-1">
          El modelo analiza los textos periodísticos recopilados relevantes con respecto a Donald Trump y clasifica el impacto
          esperado provocado sobre los mercados financieros según las acciones descritas en ellos.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">

        <div className="bg-surface-2 rounded-lg p-4 border border-[var(--color-grid-line)]">
          <p className="text-xs text-success font-semibold uppercase">POSITIVO</p>
          <p className="text-sm text-text-muted mt-2">
            Acciones que favorecen la actividad económica o reducen incertidumbre.
          </p>
        </div>

        <div className="bg-surface-2 rounded-lg p-4 border border-[var(--color-grid-line)]">
          <p className="text-xs text-danger font-semibold uppercase">NEGATIVO</p>
          <p className="text-sm text-text-muted mt-2">
            Eventos que incrementan riesgo económico o tensiones comerciales.
          </p>
        </div>

        <div className="bg-surface-2 rounded-lg p-4 border border-[var(--color-grid-line)]">
          <p className="text-xs text-text-subtle font-semibold uppercase">NEUTRAL</p>
          <p className="text-sm text-text-muted mt-2">
            Contenido informativo sin impacto económico claro.
          </p>
        </div>

      </div>
    </section>
  );
}