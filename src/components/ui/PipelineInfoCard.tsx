type Props = {
  totalArticulos: number
  numeroFuentes: number
  fechaInicio?: string
  fechaFin?: string
}

export default function PipelineCard({
  totalArticulos,
  numeroFuentes,
  fechaInicio,
  fechaFin
}: Props) {

  const steps = [
    "Scraping",
    "Extracción de metadatos",
    "Descarga de contenido",
    "Almacenamiento JSON"
  ]

  const fuentes = [
    "El Financiero",
    "El País",
    "El Universal",
    "Infobae"
  ]

  return (
    <div className="bg-surface-1 border border-primary/20 rounded-xl p-10 flex flex-col gap-10">

      <div className="flex flex-col gap-1">
        <span className="text-lg font-semibold text-text/90">
          Pipeline de adquisición
        </span>

        <span className="text-base text-text/50">
          Flujo de procesamiento utilizado para recolectar y almacenar noticias
        </span>
      </div>

      <div className="relative">

        <div className="absolute top-7 left-0 w-full h-[2px] bg-primary/20" />

        <div className="grid grid-cols-4 gap-6 relative">

          {steps.map((step, i) => (
            <div key={step} className="flex flex-col items-center text-center">

              <div className="w-14 h-14 rounded-full bg-primary border border-primary/40 flex items-center justify-center text-text text-lg font-semibold">
                {i + 1}
              </div>

              <span className="mt-3 text-sm text-text/80 font-medium">
                {step}
              </span>

            </div>
          ))}

        </div>

      </div>

      <div className="grid grid-cols-3 gap-8 text-base text-text/60">

        <div className="flex flex-col gap-1">
          <span className="text-text/40 text-sm">Fuentes</span>
          <span className="text-xl text-text font-semibold">
            {numeroFuentes}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-text/40 text-sm">Artículos</span>
          <span className="text-xl text-text font-semibold">
            {totalArticulos}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-text/40 text-sm">Periodo</span>
          <span className="text-lg text-text font-medium">
            {fechaInicio} — {fechaFin}
          </span>
        </div>

      </div>

      <div className="flex gap-3 flex-wrap">

        {fuentes.map((fuente) => (
          <span
            key={fuente}
            className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-md"
          >
            {fuente}
          </span>
        ))}

      </div>

    </div>
  )
}