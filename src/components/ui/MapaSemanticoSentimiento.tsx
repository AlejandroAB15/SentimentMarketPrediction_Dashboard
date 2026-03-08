import React from "react"

type HeatmapRow = {
  palabra: string

  POS: number
  NEG: number
  NEU: number

  posIntensity: number
  negIntensity: number
  neuIntensity: number
}

type Props = {
  data: HeatmapRow[]
}

function getColor(tipo: "POS" | "NEG" | "NEU", intensidad: number) {

  const min = 0.2
  const max = 0.9
  const opacity = min + intensidad * (max - min)

  if (tipo === "POS") return `rgba(15,186,129,${opacity})`
  if (tipo === "NEG") return `rgba(228,59,89,${opacity})`

  return `rgba(55,65,81,${opacity})`
}

function LeyendaIntensidad() {

  const primaryColor = "#177c7c"

  return (
    <div className="flex items-center gap-3 text-[11px] font-medium text-text-subtle">

      <span className="uppercase tracking-wider">
        Baja
      </span>

      <div className="flex gap-1">
        {[0.2,0.4,0.6,0.8,1].map((op,i)=>(
          <div
            key={i}
            className="h-2.5 w-4 rounded-sm"
            style={{
              backgroundColor: primaryColor,
              opacity: op
            }}
          />
        ))}
      </div>

      <span className="uppercase tracking-wider">
        Alta
      </span>

    </div>
  )
}

export function MapaSemanticoSentimiento({ data }: Props) {

  return (
    <div className="bg-surface-1 border border-[var(--color-grid-line)] rounded-xl p-6 text-text">

      <div className="flex items-start justify-between mb-6">

        <div>
          <p className="text-base uppercase tracking-[0.18em] text-primary font-semibold">
            MAPA SEMÁNTICO DE SENTIMIENTO
          </p>

          <p className="text-sm text-text-muted mt-1">
            Relación entre términos frecuentes y sentimiento económico
          </p>
        </div>

        <LeyendaIntensidad />

      </div>

      <div className="grid grid-cols-[180px_repeat(3,1fr)] gap-x-4 gap-y-2 items-center">

        <div className="text-sm uppercase tracking-widest text-primary font-semibold">
          Keywords
        </div>

        <div className="text-xs uppercase tracking-widest text-text-subtle font-semibold text-center">
          Positivo
        </div>

        <div className="text-xs uppercase tracking-widest text-text-subtle font-semibold text-center">
          Negativo
        </div>

        <div className="text-xs uppercase tracking-widest text-text-subtle font-semibold text-center">
          Neutral
        </div>

        {data.map((row,index)=>(
          <React.Fragment key={index}>

            <div className="text-xs font-semibold text-text-muted uppercase py-1">
              {row.palabra}
            </div>

            <div
              className="h-9 rounded-md flex items-center justify-center text-xs font-semibold transition-all hover:brightness-110"
              style={{ backgroundColor: getColor("POS",row.posIntensity) }}
            >
              {row.POS}%
            </div>

            <div
              className="h-9 rounded-md flex items-center justify-center text-xs font-semibold transition-all hover:brightness-110"
              style={{ backgroundColor: getColor("NEG",row.negIntensity) }}
            >
              {row.NEG}%
            </div>

            <div
              className="h-9 rounded-md flex items-center justify-center text-xs font-semibold transition-all hover:brightness-110"
              style={{ backgroundColor: getColor("NEU",row.neuIntensity) }}
            >
              {row.NEU}%
            </div>

          </React.Fragment>
        ))}

      </div>
    </div>
  )
}