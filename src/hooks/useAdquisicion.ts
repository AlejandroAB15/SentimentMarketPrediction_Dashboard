import { useQuery } from "@tanstack/react-query";
import { fetchAdquisicion } from "../services/adquisicion.service";

export function useAdquisicion() {
  return useQuery({
    queryKey: ["adquisicion"],
    queryFn: fetchAdquisicion,
  });
}