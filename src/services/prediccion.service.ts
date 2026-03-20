import { apiFetch } from "./api";

export type PrediccionItem = {
  fecha: string;
  segmento: "train" | "test";

  close_real: number;

  pred_general: number;
  pred_especifico: number;

  error_general: number;
  error_especifico: number;
};

export type PrediccionResponse = PrediccionItem[];

export type MetricasResponse = {
  indice: string;
  mape_general: number;
  mape_especifico: number;
};

export type ResumenModelosResponse = {
  indices: {
    indice: string;
    mejor_modelo: {
      con_futuro: {
        tipo: string;
        mape: number;
        ventana: number;
      };
    };
  }[];
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