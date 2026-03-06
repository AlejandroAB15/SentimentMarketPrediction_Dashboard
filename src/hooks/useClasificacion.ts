import { useQuery } from "@tanstack/react-query";
import { fetchClasificacion } from "../services/clasificacion.service";

export function useClasificacion() {
  return useQuery({
    queryKey: ["clasificacion"],
    queryFn: fetchClasificacion,
  });
}