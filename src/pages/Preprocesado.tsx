import { usePreprocesado } from "../hooks/usePreprocesado"

import PreprocesadoPipeline from "../components/ui/PreprocesadoPipeline"
import PreprocesadoFunnelChart from "../components/ui/PreprocesadoFunnelChart"
import PipelineLogicCard from "../components/ui/PipelineLogicCard"
import PreprocesadoMetricCard from "../components/ui/PreprocesadoMetricCard"
import AnimatedContainer from "../components/ui/AnimatedContainer"

import { construirFunnelPreprocesado } from "../utils/preprocesadoTranforms"

export default function Preprocesado() {

  const { data, isLoading, isError } = usePreprocesado()

  if (isLoading) {
    return (
      <div className="text-sm text-text/60">
        Cargando datos de preprocesado...
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className="text-sm text-danger">
        No fue posible cargar los datos.
      </div>
    )
  }

  const funnelData = construirFunnelPreprocesado(data)

  return (

    <div className="flex flex-col gap-10 p-4 max-w mx-auto">

      <AnimatedContainer>
        <PreprocesadoPipeline />
      </AnimatedContainer>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10">

        <AnimatedContainer delay={0.05}>
          <PreprocesadoFunnelChart data={funnelData} />
        </AnimatedContainer>

        <AnimatedContainer delay={0.1}>
          <div className="flex flex-col h-full">

            <span className="text-[11px] uppercase tracking-[0.2em] text-text/30 font-bold mb-4">
              Lógica del pipeline
            </span>

            <div className="flex-1 flex flex-col gap-4">

              <PipelineLogicCard
                icon="union"
                title="Unión de fuentes"
                description="Integración de noticias provenientes de múltiples medios en un dataset unificado."
              />

              <PipelineLogicCard
                icon="limpieza"
                title="Saneamiento de datos"
                description="Normalización de codificación, limpieza de HTML y eliminación de registros inválidos."
              />

              <PipelineLogicCard
                icon="relevancia"
                title="Filtrado de relevancia"
                description="Aplicación de reglas heurísticas para identificar artículos relacionados con actividad económica."
              />

              <PipelineLogicCard
                icon="dedup"
                title="Deduplicación"
                description="Detección y eliminación de artículos duplicados mediante comparación de títulos y metadatos."
              />

            </div>
          </div>
        </AnimatedContainer>

      </div>

      <div className="grid grid-cols-4 gap-6">

        <AnimatedContainer delay={0.15}>
          <PreprocesadoMetricCard
            title="Dataset inicial"
            value={data.union.total_original}
          />
        </AnimatedContainer>

        <AnimatedContainer delay={0.18}>
          <PreprocesadoMetricCard
            title="Registros válidos"
            value={data.saneamiento.registros_validos}
          />
        </AnimatedContainer>

        <AnimatedContainer delay={0.21}>
          <PreprocesadoMetricCard
            title="Dataset final"
            value={data.resumen_final.total_final_relevantes}
          />
        </AnimatedContainer>

        <AnimatedContainer delay={0.24}>
          <PreprocesadoMetricCard
            title="Reducción total"
            value={`${data.resumen_final.porcentaje_reduccion_total}%`}
            accent="warning"
          />
        </AnimatedContainer>

      </div>

    </div>
  )
}