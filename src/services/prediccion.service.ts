import { apiFetch } from "./api";

export type ModeloDetalle = {
  pred: number;
  error: number;
  ventana: number;
  alpha?: number;
};

export type PrediccionItem = {
  fecha: string;
  segmento: "train" | "test";
  close_real: number;

  modelos: {
    general: {
      base: ModeloDetalle;
      ponderado: ModeloDetalle;
    };
    especifico: {
      base: ModeloDetalle;
      ponderado: ModeloDetalle;
    };
  };
};

export type PrediccionResponse = PrediccionItem[];

export type MetricasResponse = {
  indice: string;
  general: {
    base: number;
    ponderado: number;
  };
  especifico: {
    base: number;
    ponderado: number;
  };
};

export type ResumenModelosResponse = {
  indices: {
    indice: string;
    general_base: number;
    general_ponderado: number;
    especifico_base: number;
    especifico_ponderado: number;
  }[];
  fecha_actualizacion: string;
};

export function fetchPrediccion(indice: string) {
  return apiFetch<PrediccionResponse>(`/prediccion/${indice}`);
}

export function fetchMetricas(indice: string) {
  return apiFetch<MetricasResponse>(`/prediccion/${indice}/metricas`);
}

export function fetchResumenModelos() {
  return apiFetch<ResumenModelosResponse>(`/prediccion/resumen_modelos`);
}