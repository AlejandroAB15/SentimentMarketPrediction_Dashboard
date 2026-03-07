import {
  GitMerge,
  Brush,
  Filter,
  Copy,
  ChevronRight
} from "lucide-react"
import SectionHeader from "./SectionHeader"

export default function PreprocesadoPipeline() {

  const steps = [
    { step: "PASO 01", title: "Unión de fuentes", icon: GitMerge },
    { step: "PASO 02", title: "Saneamiento de datos", icon: Brush },
    { step: "PASO 03", title: "Filtro de relevancia", icon: Filter },
    { step: "PASO 04", title: "Deduplicación", icon: Copy }
  ]

  return (

    <div className="flex flex-col gap-6">
      <SectionHeader
        title="Pipeline de ejecución"
        description="Etapas del procesamiento aplicadas al dataset"
      />
      <div className="flex items-center w-full">
        {steps.map((s, i) => {
          const Icon = s.icon

          return (
            <>
              <div key={s.title} className="flex-1 flex justify-center">

                <div className="flex items-center gap-6 bg-surface-1 border border-primary/20 rounded-xl px-8 py-7 w-[320px]">

                  <div className="w-14 h-14 rounded-lg bg-primary/15 flex items-center justify-center text-primary">
                    <Icon size={26}/>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-[11px] uppercase tracking-wide text-text/40">
                      {s.step}
                    </span>
                    <span className="text-lg text-text/90 font-medium">
                      {s.title}
                    </span>
                  </div>
                </div>
              </div>
              {i < steps.length - 1 && (

                <div className="w-[80px] flex justify-center items-center">
                  <ChevronRight
                    size={70}
                    className="text-text/30"
                  />
                </div>
              )}
            </>
          )
        })}
      </div>
    </div>
  )
}