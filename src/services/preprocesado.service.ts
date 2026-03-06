import { apiFetch } from "./api";

export type UnionFuentes = {
  total_original: number;
  por_fuente: {
    el_pais: number;
    el_financiero: number;
    infobae: number;
    el_universal: number;
  };
};

export type Saneamiento = {
  registros_validos: number;
  registros_eliminados: number;
};

export type Relevancia = {
  relevantes: number;
  no_relevantes: number;
};

export type Deduplicacion = {
  duplicados_relevantes: number;
  duplicados_no_relevantes: number;
};

export type ResumenFinal = {
  total_final_relevantes: number;
  porcentaje_reduccion_total: number;
};

export type PreprocesadoResponse = {
  union: UnionFuentes;
  saneamiento: Saneamiento;
  relevancia: Relevancia;
  deduplicacion: Deduplicacion;
  resumen_final: ResumenFinal;
  fecha_actualizacion: string;
};

export function fetchPreprocesado() {
  return apiFetch<PreprocesadoResponse>("/preprocesado");
}