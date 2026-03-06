import { useQuery } from "@tanstack/react-query";
import { fetchPreprocesado } from "../services/preprocesado.service";

export function usePreprocesado() {
  return useQuery({
    queryKey: ["preprocesado"],
    queryFn: fetchPreprocesado,
  });
}