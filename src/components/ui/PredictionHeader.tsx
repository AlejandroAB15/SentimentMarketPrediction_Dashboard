type Props = {
  metricas: {
    mape_general: number;
    mape_especifico: number;
  } | null;

  resumen: {
    mejor_modelo: {
      con_futuro: {
        tipo: string;
        mape: number;
        ventana: number;
      };
    };
  } | null;
};

export default function PredictionHeader({
  metricas,
  resumen,
}: Props) {

  const modelo = resumen?.mejor_modelo?.con_futuro;

  return (
    <div className="w-full border-b border-primaryDark pb-6">

      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-10 gap-y-4">

        {/* Error general */}
        <div className="flex flex-col">
          <span className="text-xs text-text/60">
            Error porcentual promedio del modelo general
          </span>
          <span className="text-lg font-semibold text-white">
            {metricas ? metricas.mape_general.toFixed(2) : "--"}%
          </span>
        </div>

        {/* Error específico */}
        <div className="flex flex-col">
          <span className="text-xs text-text/60">
            Error porcentual promedio del modelo específico
          </span>
          <span className="text-lg font-semibold text-primary">
            {metricas ? metricas.mape_especifico.toFixed(2) : "--"}%
          </span>
        </div>

        {/* Modelo ganador */}
        <div className="flex flex-col">
          <span className="text-xs text-text/60">
            Modelo con mejor desempeño
          </span>
          <span className="text-lg font-semibold text-white">
            {modelo
              ? modelo.tipo === "general"
                ? "Modelo general"
                : "Modelo específico"
              : "--"}
          </span>
        </div>

        {/* Ventana */}
        <div className="flex flex-col">
          <span className="text-xs text-text/60">
            Ventana óptima utilizada
          </span>
          <span className="text-lg font-semibold text-white">
            {modelo?.ventana ? `${modelo.ventana} días` : "--"}
          </span>
        </div>

      </div>

    </div>
  );
}