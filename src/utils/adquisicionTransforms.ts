import type { ArticulosPorDia } from "../services/adquisicion.service";
import type { SentimientoPorFuente } from "../services/adquisicion.service";

export type ArticulosPorMes = {
  mes: string;
  total: number;
};

export type SentimientoStacked = {
  fuente: string;
  POS: number;
  NEG: number;
  NEU: number;
  ERROR: number;
};

export function agruparArticulosPorMes(data: ArticulosPorDia[]): ArticulosPorMes[] {
  const acumulado: Record<string, number> = {};

  data.forEach((item) => {
    const mes = item.fecha.slice(0, 7);

    if (!acumulado[mes]) {
      acumulado[mes] = 0;
    }

    acumulado[mes] += item.total;
  });

  return Object.entries(acumulado)
    .map(([mes, total]) => ({ mes, total }))
    .sort((a, b) => a.mes.localeCompare(b.mes));
}

export function transformarSentimientoStacked(
  data: SentimientoPorFuente[]
): SentimientoStacked[] {
  return data.map((fuente) => {
    const base: SentimientoStacked = {
      fuente: fuente.fuente,
      POS: 0,
      NEG: 0,
      NEU: 0,
      ERROR: 0,
    };

    fuente.sentimientos.forEach((s) => {
      base[s.sentimiento] = s.total;
    });

    return base;
  });
}