type Props = {
  data: {
    close_real: number;
    pred_general: number;
    pred_especifico: number;
    error_general: number;
    error_especifico: number;
    segmento: "train" | "test";
  }[];
};

export default function InsightsPanel({ data }: Props) {

  const testData = data.filter(d => d.segmento === "test");

  const total = testData.length;

  const mejorEspecifico = testData.filter(
    d => d.error_especifico < d.error_general
  ).length;

  const porcentajeMejor = (mejorEspecifico / total) * 100;

  const errorPromGeneral =
    testData.reduce((acc, d) => acc + Math.abs(d.error_general), 0) / total;

  const errorPromEspecifico =
    testData.reduce((acc, d) => acc + Math.abs(d.error_especifico), 0) / total;

  const modeloGanador =
    errorPromEspecifico < errorPromGeneral ? "Específico" : "General";

  const volatilidadAlta = testData.filter(
    d => Math.abs(d.error_especifico) > errorPromEspecifico * 1.5
  ).length;

  const porcentajeVolatilidad = (volatilidadAlta / total) * 100;

  return (
    <div className="w-full h-full bg-surface-1 border border-primaryDark rounded-xl p-6 flex flex-col">

      {/* Header */}
      <div className="mb-4">
        <h3 className="text-base text-text font-medium">
          Interpretación del modelo
        </h3>
        <p className="text-xs text-text/50">
          Evaluación basada en el conjunto de prueba
        </p>
      </div>

      {/* Contenido centrado */}
      <div className="flex flex-col flex-1 justify-center gap-6">

        {/* Métricas */}
        <div className="grid grid-cols-3 gap-4">

          <div className="bg-surface-2 rounded-lg p-4">
            <div className="text-xs text-text/50 mb-1">
              Modelo dominante
            </div>
            <div className="text-lg font-semibold text-success">
              {modeloGanador}
            </div>
          </div>

          <div className="bg-surface-2 rounded-lg p-4">
            <div className="text-xs text-text/50 mb-1">
              Casos donde gana
            </div>
            <div className="text-lg font-semibold text-text">
              {porcentajeMejor.toFixed(1)}%
            </div>
          </div>

          <div className="bg-surface-2 rounded-lg p-4">
            <div className="text-xs text-text/50 mb-1">
              Error promedio
            </div>
            <div className="text-lg font-semibold text-text">
              {errorPromEspecifico.toFixed(1)}
            </div>
          </div>

        </div>

        {/* Insights */}
        <div className="flex flex-col gap-3 text-sm">

          <div className="bg-surface-2 rounded-lg p-3 text-text/70">
            El modelo{" "}
            <span className="text-success font-medium">
              {modeloGanador.toLowerCase()}
            </span>{" "}
            presenta mejor desempeño global en el periodo evaluado.
          </div>

          <div className="bg-surface-2 rounded-lg p-3 text-text/70">
            El modelo específico supera al general en{" "}
            <span className="text-text font-medium">
              {porcentajeMejor.toFixed(1)}%
            </span>{" "}
            de los casos.
          </div>

          <div className="bg-surface-2 rounded-lg p-3 text-text/70">
            Se identifican desviaciones relevantes en{" "}
            <span className="text-warning font-medium">
              {porcentajeVolatilidad.toFixed(1)}%
            </span>{" "}
            de los datos.
          </div>

        </div>

      </div>

    </div>
  );
}