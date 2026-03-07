export type PreprocesadoStats = {
  union: { total_original: number }
  saneamiento: { registros_validos: number }
  relevancia: { relevantes: number }
  resumen_final: { total_final_relevantes: number }
}

export function construirFunnelPreprocesado(
  data: PreprocesadoStats
) {

  const original = data.union.total_original
  const validos = data.saneamiento.registros_validos
  const relevantes = data.relevancia.relevantes
  const final = data.resumen_final.total_final_relevantes

  const max = original

  const dataset = [
    { label: "Dataset original", value: original },
    { label: "Registros válidos", value: validos },
    { label: "Artículos relevantes", value: relevantes },
    { label: "Dataset final", value: final }
  ]

  return dataset.map(d => ({
    ...d,
    offset: (max - d.value) / 2
  }))
}