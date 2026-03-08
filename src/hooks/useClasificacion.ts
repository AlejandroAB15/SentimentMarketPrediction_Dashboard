import { useQuery } from "@tanstack/react-query"
import { fetchClasificacion } from "../services/clasificacion.service"
import type {
  Sentimiento,
  PalabrasFrecuentes,
} from "../services/clasificacion.service"

type HeatmapRow = {
  palabra: string

  POS: number
  NEG: number
  NEU: number

  posCount: number
  negCount: number
  neuCount: number

  posIntensity: number
  negIntensity: number
  neuIntensity: number
}

function buildHeatmap(
  palabras: PalabrasFrecuentes,
  conteo: { POS: number; NEG: number; NEU: number }
): HeatmapRow[] {

  const map = new Map<string, HeatmapRow>()

  const add = (
    tipo: Sentimiento,
    palabra: string,
    frecuencia: number
  ) => {

    if (!map.has(palabra)) {
      map.set(palabra, {
        palabra,

        POS: 0,
        NEG: 0,
        NEU: 0,

        posCount: 0,
        negCount: 0,
        neuCount: 0,

        posIntensity: 0,
        negIntensity: 0,
        neuIntensity: 0,
      })
    }

    const row = map.get(palabra)!

    if (tipo === "POS") {
      row.POS = frecuencia
      row.posCount = frecuencia
    }

    if (tipo === "NEG") {
      row.NEG = frecuencia
      row.negCount = frecuencia
    }

    if (tipo === "NEU") {
      row.NEU = frecuencia
      row.neuCount = frecuencia
    }
  }

  palabras.POS.forEach(p => add("POS", p.palabra, p.frecuencia))
  palabras.NEG.forEach(p => add("NEG", p.palabra, p.frecuencia))
  palabras.NEU.forEach(p => add("NEU", p.palabra, p.frecuencia))

  const rows = Array.from(map.values())

  const maxPOS = Math.max(...rows.map(r => r.POS), 1)
  const maxNEG = Math.max(...rows.map(r => r.NEG), 1)
  const maxNEU = Math.max(...rows.map(r => r.NEU), 1)

  rows.forEach(row => {

    const pos = row.POS
    const neg = row.NEG
    const neu = row.NEU

    row.posIntensity = pos / maxPOS
    row.negIntensity = neg / maxNEG
    row.neuIntensity = neu / maxNEU

    row.POS = Math.round((pos / conteo.POS) * 100)
    row.NEG = Math.round((neg / conteo.NEG) * 100)
    row.NEU = Math.round((neu / conteo.NEU) * 100)

  })

  rows.sort(
    (a,b) =>
      (b.posCount + b.negCount + b.neuCount) -
      (a.posCount + a.negCount + a.neuCount)
  )

  return rows.slice(0,15)
}

export function useClasificacion() {
  return useQuery({
    queryKey: ["clasificacion"],
    queryFn: fetchClasificacion,

    select: (data) => {

      const conteo = {
        POS:
          data.distribucionGlobal.find(
            d => d.sentimiento === "POS"
          )?.total ?? 0,

        NEG:
          data.distribucionGlobal.find(
            d => d.sentimiento === "NEG"
          )?.total ?? 0,

        NEU:
          data.distribucionGlobal.find(
            d => d.sentimiento === "NEU"
          )?.total ?? 0,

        ERROR:
          data.distribucionGlobal.find(
            d => d.sentimiento === "ERROR"
          )?.total ?? 0,
      }

      const heatmap = buildHeatmap(
        data.palabrasFrecuentes,
        conteo
      )

      return {
        resumen: data.resumen,
        conteo,
        distribucion: data.distribucionGlobal,
        evolucion: data.evolucionTemporal,
        heatmap,
      }
    },
  })
}