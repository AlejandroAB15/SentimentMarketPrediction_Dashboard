import { useQuery } from "@tanstack/react-query";
import { fetchAdquisicion } from "../services/adquisicion.service";
import {
  agruparArticulosPorMes,
  transformarSentimientoStacked,
} from "../utils/adquisicionTransforms";

export function useAdquisicion() {
  return useQuery({
    queryKey: ["adquisicion"],
    queryFn: fetchAdquisicion,
    select: (data) => ({
      ...data,
      articulosPorMes: agruparArticulosPorMes(data.articulosPorDia),
      sentimientoStacked: transformarSentimientoStacked(
        data.sentimientoPorFuente
      ),
    }),
  });
}