import { useQuery } from "@tanstack/react-query";
import {
  fetchPrediccion,
  fetchMetricas,
  fetchResumenModelos,
} from "../services/prediccion.service";

type Tipo = "general" | "especifico";

export function usePrediccion(indice: string, tipo: Tipo) {
  return useQuery({
    queryKey: ["prediccion", indice, tipo],

    queryFn: async () => {
      const [data, metricas, resumen] = await Promise.all([
        fetchPrediccion(indice),
        fetchMetricas(indice),
        fetchResumenModelos(),
      ]);
      return { data, metricas, resumen };
    },

    placeholderData: (prev) => prev,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,

    select: ({ data, metricas, resumen }) => {
      const resumenIndice =
        resumen.indices.find((item) => item.indice === indice) ?? null;

      return {
        raw: data,
        resumen: resumenIndice,
        alpha:
          data.length > 0
            ? Number(data[0].modelos[tipo]?.ponderado?.alpha ?? null)
            : null,

        metricas: {
          base: metricas[tipo].base,
          ponderado: metricas[tipo].ponderado,
        },

        series: data.map((d) => ({
          fecha: d.fecha,
          real: Number(d.close_real),
          base: Number(d.modelos[tipo].base.pred),
          ponderado: Number(d.modelos[tipo].ponderado.pred),
          segmento: d.segmento,
        })),

        error: data.map((d) => ({
          fecha: d.fecha,
          base: Number(d.modelos[tipo].base.error),
          ponderado: Number(d.modelos[tipo].ponderado.error),
        })),

        diferencia: data.map((d) => ({
          fecha: d.fecha,
          valor:
            Number(d.modelos[tipo].ponderado.error) -
            Number(d.modelos[tipo].base.error),
        })),

        scatter: data
          .map((d) => ({
            real: Number(d.close_real),
            base: Number(d.modelos[tipo]?.base?.pred),
            ponderado: Number(d.modelos[tipo]?.ponderado?.pred),
          }))
          .filter(
            (d) =>
              !isNaN(d.real) &&
              !isNaN(d.base) &&
              !isNaN(d.ponderado)
          ),

        mejorVariante:
          metricas[tipo].ponderado < metricas[tipo].base
            ? "ponderado"
            : "base",
      };
    },
  });
}