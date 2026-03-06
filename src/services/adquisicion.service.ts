import { apiFetch } from "./api";

export type ArticulosPorFuente = {
  fuente: string;
  total: number;
};

export type SentimientoItem = {
  sentimiento: "POS" | "NEG" | "NEU" | "ERROR";
  total: number;
};

export type SentimientoPorFuente = {
  fuente: string;
  sentimientos: SentimientoItem[];
};

export type ArticulosPorDia = {
  fecha: string;
  total: number;
};

export type AdquisicionResponse = {
  resumen: {
    numeroFuentes: number;
    totalArticulos: number;
  };
  articulosPorFuente: ArticulosPorFuente[];
  sentimientoPorFuente: SentimientoPorFuente[];
  articulosPorDia: ArticulosPorDia[];
};

export function fetchAdquisicion() {
  return apiFetch<AdquisicionResponse>("/adquisicion");
}