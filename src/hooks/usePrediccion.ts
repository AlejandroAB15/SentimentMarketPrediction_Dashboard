import { useQuery } from "@tanstack/react-query";
import {
  fetchPrediccion,
  fetchMetricas,
  fetchResumenModelos,
} from "../services/prediccion.service";

export function usePrediccion(indice: string) {
  return useQuery({
    queryKey: ["prediccion", indice],
    queryFn: async () => {
      const [data, metricas, resumen] = await Promise.all([
        fetchPrediccion(indice),
        fetchMetricas(indice),
        fetchResumenModelos(),
      ]);

      return { data, metricas, resumen };
    },

    select: ({ data, metricas, resumen }) => {

      const resumenIndice = resumen.indices.find((item) => item.indice === indice) ?? null;

      return {
        raw: data,
        metricas,
        resumen: resumenIndice,

        series: data.map((d) => ({
          fecha: d.fecha,
          real: d.close_real,
          general: d.pred_general,
          especifico: d.pred_especifico,
          segmento: d.segmento,
        })),

        error: data.map((d) => ({
          fecha: d.fecha,
          general: d.pred_general - d.close_real,
          especifico: d.pred_especifico - d.close_real,
        })),

        diferencia: data.map((d) => ({
          fecha: d.fecha,
          valor: d.error_general - d.error_especifico,
        })),

        scatter: data.map((d) => {
          const usarEspecifico =
            metricas.mape_especifico < metricas.mape_general;

          return {
            x: d.close_real,
            y: usarEspecifico ? d.pred_especifico : d.pred_general,
            modelo: usarEspecifico ? "especifico" : "general",
          };
        }),
      };
    },
  });
}