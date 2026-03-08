import { FileText, Database, FilterX, AlertTriangle } from "lucide-react";

import { useOverview } from "../hooks/useOverview";
import StatCard from "../components/ui/StatCard";
import SentimentPieChart from "../components/ui/SentimentPieChart";
import FuentesBarChart from "../components/ui/FuentesBarChart";
import RangoCard from "../components/ui/RangoDatasetCard";
import AnimatedContainer from "../components/ui/AnimatedContainer";

export default function Overview() {
  const { data, isLoading, isError } = useOverview();

  if (isLoading) {
    return (
      <div className="text-sm text-text/60">
        Cargando métricas del pipeline...
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="text-sm text-danger">
        No fue posible cargar los datos del dashboard.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">

      <div className="max-w text-xl text-text leading-relaxed">
        A continuación se muestra una vista general del pipeline de análisis.
        Se presentan métricas del dataset recopilado, la distribución de
        sentimiento detectada por el modelo y la procedencia de las noticias
        utilizadas en el sistema.
      </div>

      <div className="grid grid-cols-4 gap-7">

      <AnimatedContainer delay={0}>
        <StatCard
          title="Artículos originales"
          value={data.totales.original}
          description="Noticias recopiladas antes del filtrado."
          icon={<Database size={18} />}
          accent="primary"
        />
      </AnimatedContainer>

      <AnimatedContainer delay={0.05}>
        <StatCard
          title="Artículos finales"
          value={data.totales.articulos}
          description="Total de artículos utilizados en el análisis."
          icon={<FileText size={18} />}
          accent="success"
        />
      </AnimatedContainer>

      <AnimatedContainer delay={0.1}>
        <StatCard
          title="No relevantes"
          value={data.totales.noRelevantes}
          description="Artículos descartados por el filtro de relevancia."
          icon={<FilterX size={18} />}
          accent="warning"
        />
      </AnimatedContainer>

      <AnimatedContainer delay={0.15}>
        <StatCard
          title="Tasa de error"
          value={`${data.clasificacion.tasaError}%`}
          description="Clasificaciones fallidas del modelo."
          icon={<AlertTriangle size={18} />}
          accent="danger"
        />
      </AnimatedContainer>

      </div>
      
      <AnimatedContainer delay={0.2}>
        <RangoCard
          fechaMinima={data.rangoFechas.fecha_minima}
          fechaMaxima={data.rangoFechas.fecha_maxima}
        />
      </AnimatedContainer>

      <div className="grid grid-cols-2 gap-7">

      <SentimentPieChart
        data={data.clasificacion.distribucion}
      />

      <FuentesBarChart
        data={data.fuentes}
      />

    </div>
  </div>
  );
}