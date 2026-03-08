import { Calendar, Clock, Flag } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  fechaMinima: string;
  fechaMaxima: string;
};

export default function RangoDatasetCard({ fechaMinima, fechaMaxima }: Props) {
  const inicio = new Date(fechaMinima);
  const fin = new Date(fechaMaxima);

  const diffTime = Math.abs(fin.getTime() - inicio.getTime());
  const duracionDias = Math.round(diffTime / (1000 * 60 * 60 * 24));
  const numPuntos = Math.max(2, Math.min(10, Math.floor(duracionDias / 50)));
  const puntos = Array.from({ length: numPuntos });

  const formatoFecha = (fecha: Date) =>
    fecha.toLocaleDateString("es-MX", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <div className="bg-surface-1 border border-primary rounded-xl p-6 flex flex-col gap-6 w-full">

      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-lg tracking-widest text-primary font-medium uppercase">
            Cobertura del dataset
          </p>

          <h3 className="text-xl font-semibold text-text">
            Rango temporal de las noticias analizadas
          </h3>
        </div>

        <div className="text-right">
          <p className="text-3xl font-semibold text-primary leading-none">
            {duracionDias} días
          </p>
          <p className="text-sm text-text-subtle mt-1">
            Duración total
          </p>
        </div>
      </div>

      <div className="relative mt-2">

        <div className="h-4 w-full bg-primary/25 rounded-full relative overflow-hidden">

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              type: "spring",
              stiffness: 90,
              damping: 20
            }}
            style={{ transformOrigin: "left" }}
            className="absolute left-0 top-0 h-full w-full bg-primary rounded-full"
          />

          <div className="absolute inset-0 flex justify-between items-center px-4">
            {puntos.map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-white/40"
              />
            ))}
          </div>

        </div>

        <div className="flex justify-between mt-3 px-1">
          <span className="text-xs font-semibold text-primary/70 tracking-widest uppercase">
            {inicio.toLocaleDateString("es-MX", {
              day: "2-digit",
              month: "short",
              year: "numeric"
            })}
          </span>

          <span className="text-xs font-semibold text-primary/70 tracking-widest uppercase text-right">
            {fin.toLocaleDateString("es-MX", {
              day: "2-digit",
              month: "short",
              year: "numeric"
            })}
          </span>
        </div>

      </div>

      <div className="w-full flex justify-center mt-6">
        <div className="grid md:grid-cols-3 gap-9 w-full max-w">

          <div className="bg-primary/10 rounded-xl px-6 py-6 min-h-32 relative overflow-hidden flex flex-col justify-center group">

            <div className="relative z-10 flex flex-col gap-1">
              <span className="text-base font-bold tracking-widest uppercase text-primary pb-3">
                Fecha inicial
              </span>
              <div className="text-2xl font-semibold text-text leading-tight">
                {formatoFecha(inicio)}
              </div>
            </div>

            <Flag
              size={80}
              className="absolute right-5 bottom-3 text-primary opacity-40"
            />
          </div>

          <div className="bg-primary/10 rounded-xl px-6 py-6 min-h-32 relative overflow-hidden flex flex-col justify-center group">

            <div className="relative z-10 flex flex-col gap-1">
              <span className="text-base font-bold tracking-widest uppercase text-primary pb-3">
                Fecha final
              </span>
              <div className="text-2xl font-semibold text-text leading-tight">
                {formatoFecha(fin)}
              </div>
            </div>

            <Calendar
              size={80}
              className="absolute right-4 bottom-2 text-primary opacity-40 rotate-6"
            />
          </div>

          <div className="bg-primary/10 rounded-xl px-6 py-6 min-h-32 relative overflow-hidden flex flex-col justify-center group">

            <div className="relative z-10 flex flex-col gap-1">
              <span className="text-base font-bold tracking-widest uppercase text-primary pb-3">
                Cobertura total
              </span>
              <div className="text-2xl font-semibold text-text leading-tight">
                {duracionDias} días
              </div>
            </div>

            <Clock
              size={80}
              className="absolute right-4 bottom-2 text-primary opacity-40"
            />
          </div>

        </div>
      </div>

    </div>
  );
}