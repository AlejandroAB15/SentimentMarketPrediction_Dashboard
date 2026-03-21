import { useState } from "react";
import { usePrediccion } from "../hooks/usePrediccion";
import PredictionTabs from "../components/ui/PredictionTabs";
import PredictionHeader from "../components/ui/PredictionHeader";
import MainPredictionChart from "../components/ui/MainPredictionChart";
import ErrorChart from "../components/ui/ErrorChart";
import ScatterChart from "../components/ui/ScatterChart";
import InsightsPanel from "../components/ui/InsightsPanel";

export default function Prediccion() {
  const [indice, setIndice] = useState("dji");

  const { data, isLoading, isError } = usePrediccion(indice);

  if (isLoading) {
    return <div className="text-sm text-text/60">Cargando predicción...</div>;
  }

  if (isError || !data) {
    return (
      <div className="text-sm text-danger">
        No fue posible cargar los datos de predicción.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">

      <PredictionTabs active={indice} onChange={setIndice} />

      <PredictionHeader
        metricas={data.metricas}
        resumen={data.resumen}
      />

      <MainPredictionChart data={data.series} />

      <div className="w-full">
        <ErrorChart data={data.error} />
      </div>

      <div className="grid grid-cols-2 gap-10">
        <ScatterChart
          data={data.scatter}
          modeloGanador={
            data.metricas.mape_especifico < data.metricas.mape_general
              ? "especifico"
              : "general"
          }
        />
        <InsightsPanel data={data.raw} />
      </div>

    </div>
  );
}