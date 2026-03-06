import { apiFetch } from "./api";

export type SentimientoItem = {
  total: number;
  sentimiento: "POS" | "NEG" | "NEU" | "ERROR";
};

export type FuenteItem = {
  total: number;
  fuente: string;
};

export type OverviewResponse = {
  totales: {
    articulos: number;
    original: number;
    relevantes: number;
    noRelevantes: number;
  };
  clasificacion: {
    distribucion: SentimientoItem[];
    tasaError: number;
  };
  fuentes: FuenteItem[];
  rangoFechas: {
    fecha_minima: string;
    fecha_maxima: string;
  };
};

export function fetchOverview() {
  return apiFetch<OverviewResponse>("/overview");
}