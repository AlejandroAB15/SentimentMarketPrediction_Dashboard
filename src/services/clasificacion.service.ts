import { apiFetch } from "./api";

export type Sentimiento = "POS" | "NEG" | "NEU" | "ERROR";

export type DistribucionSentimiento = {
  sentimiento: Sentimiento;
  total: number;
};

export type EvolucionTemporalItem = {
  periodo: string;
  POS: number;
  NEG: number;
  NEU: number;
  ERROR: number;
};

export type PalabraFrecuente = {
  palabra: string;
  frecuencia: number;
};

export type PalabrasFrecuentes = {
  POS: PalabraFrecuente[];
  NEG: PalabraFrecuente[];
  NEU: PalabraFrecuente[];
};

export type ClasificacionResponse = {
  resumen: {
    totalClasificados: number;
    tasaError: number;
  };
  distribucionGlobal: DistribucionSentimiento[];
  evolucionTemporal: EvolucionTemporalItem[];
  palabrasFrecuentes: PalabrasFrecuentes;
};

export function fetchClasificacion() {
  return apiFetch<ClasificacionResponse>("/clasificacion");
}