import { useAdquisicion } from "../hooks/useAdquisicion"

import PipelineCard from "../components/ui/PipelineInfoCard"
import AdquisicionTimelineChart from "../components/ui/TimelineAdquisicion"
import VolumenMensualChart from "../components/ui/VolumenMensualChart"
import PerfilFuenteChart from "../components/ui/PerfilFuenteChart"
import SectionHeader from "../components/ui/SectionHeader"
import AnimatedContainer from "../components/ui/AnimatedContainer"

export default function Adquisicion() {

  const { data, isLoading, isError } = useAdquisicion()

  if (isLoading) {
    return (
      <div className="text-sm text-text/60">
        Cargando datos de adquisición...
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className="text-sm text-danger">
        No fue posible cargar los datos de adquisición.
      </div>
    )
  }

  return (

    <div className="flex flex-col gap-10">

      <div className="max-w text-lg text-text leading-relaxed">
        Esta sección describe el proceso de adquisición de datos del sistema.
        El pipeline recolecta noticias económicas mediante scraping automatizado
        desde múltiples medios periodísticos. Durante esta etapa se obtienen los
        metadatos iniciales de cada artículo (título, autor, fecha y enlace) y
        posteriormente se descarga el contenido completo de cada noticia para su
        almacenamiento y procesamiento posterior dentro del sistema.
      </div>
      <AnimatedContainer delay={0.1}>
        <PipelineCard
          totalArticulos={data.resumen.totalArticulos}
          numeroFuentes={data.resumen.numeroFuentes}
          fechaInicio={data.articulosPorDia[0]?.fecha}
          fechaFin={data.articulosPorDia[data.articulosPorDia.length - 1]?.fecha}
        />
      </AnimatedContainer>
      <div className="flex flex-col gap-4">

        <SectionHeader
          title="Actividad de recolección"
          description="Evolución diaria del número de artículos obtenidos por el sistema"
        />

        <AdquisicionTimelineChart data={data.articulosPorDia} />

      </div>

      <div className="flex flex-col gap-6">

        <SectionHeader
          title="Distribución del dataset recolectado"
          description="Análisis del volumen de noticias obtenidas en el tiempo y distribución de sentimiento por fuente"
        />

        <div className="grid grid-cols-2 gap-7">

          <VolumenMensualChart
            data={data.articulosPorMes}
          />

          <PerfilFuenteChart
            data={data.sentimientoStacked}
          />

        </div>

      </div>

    </div>

  )

}