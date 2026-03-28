import { useState } from "react";
import { usePrediccion } from "../hooks/usePrediccion";

import PredictionTabs from "../components/ui/PredictionTabs";
import ModelSwitcher from "../components/ui/ModelSwitcher";

import PredictionHeader from "../components/ui/PredictionHeader";
import MainPredictionChart from "../components/ui/MainPredictionChart";
import ErrorChart from "../components/ui/ErrorChart";
import ScatterChart from "../components/ui/ScatterChart";
import InsightsPanel from "../components/ui/InsightsPanel";

export default function Prediccion() {
  const [indice, setIndice] = useState("dji");
  const [tipo, setTipo] = useState<"general" | "especifico">("general");

  const { data, isError } = usePrediccion(indice, tipo);

  if (isError || !data) {
    return (
      <div className="text-sm text-danger">
        No fue posible cargar los datos de predicción.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">

      <div className="flex flex-col gap-4">
        <PredictionTabs active={indice} onChange={setIndice} />
        <ModelSwitcher value={tipo} onChange={setTipo} />
      </div>

      <PredictionHeader
        metricas={data.metricas}
        tipo={tipo}
      />

      <div className="bg-surface-2/20 border border-white/5 rounded-xl px-5 py-3 text-base text-text/70">
        Se comparan dos variantes del modelo: la versión <span className="font-semibold text-primary">base</span>, que corresponde a la predicción obtenida mediante regresión lineal múltiple, y la versión <span className="font-semibold text-warning">ponderada</span>, que asigna pesos a los datos cuantitativos y cualitativos con el objetivo de capturar su relación, buscando reducir el error (idealmente por debajo del 5%) y mantener el seguimiento de la tendencia del mercado.
      </div>

      <MainPredictionChart data={data.series} />

      <ErrorChart data={data.error} />

      <div className="grid grid-cols-2 gap-10">
        <div className="w-full">
          <ScatterChart data={data.scatter} />
        </div>

        <div className="w-full">
          <InsightsPanel
            data={data.raw}
            ganadorOficial={data.mejorVariante}
            alpha={data.alpha} 
          />
        </div>
      </div>


    </div>
  );
}