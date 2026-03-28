import { Target, Trophy, Zap, Info } from "lucide-react";

type Props = {
  metricas: {
    base: number;
    ponderado: number;
  } | null;

  tipo: "general" | "especifico";
};

export default function PredictionHeader({ metricas, tipo }: Props) {
  const diferencia =
    metricas ? metricas.ponderado - metricas.base : null;

  const mejor =
    metricas && metricas.ponderado < metricas.base
      ? "ponderado"
      : "base";

  return (
    <div className="w-full bg-surface-1 border border-primaryDark rounded-2xl p-7 shadow-sm">

      <div className="flex justify-between items-start mb-6">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-semibold text-text">
            Comparativa del modelo {tipo === "general" ? "general" : "específico"}
          </h3>
          <p className="text-sm text-text/50 w-full">
            Error promedio porcentual (MAPE) calculado sobre el periodo de evaluación (20% final del análisis), que indica qué tan alejadas están las predicciones del valor real.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-text/40">
            <Target size={14} />
            <span className="text-xs font-black uppercase tracking-widest">
              Error Base
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-white tracking-tighter">
              {metricas ? metricas.base.toFixed(2) : "--"}
            </span>
            <span className="text-sm font-bold text-text/40">%</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-primary/60">
            <Zap size={14} />
            <span className="text-xs font-black uppercase tracking-widest">
              Error Ponderado
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-primary tracking-tighter">
              {metricas ? metricas.ponderado.toFixed(2) : "--"}
            </span>
            <span className="text-sm font-bold text-primary/60">%</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-text/40">
            <Info size={14} />
            <span className="text-xs font-black uppercase tracking-widest">
              Diferencia
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-white tracking-tighter">
              {metricas && diferencia !== null
                ? `${diferencia > 0 ? "+" : ""}${diferencia.toFixed(2)}`
                : "--"}
            </span>
            <span className="text-sm font-bold text-text/40">%</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-success/60">
            <Trophy size={14} />
            <span className="text-xs font-black uppercase tracking-widest">
              Versión con menor error
            </span>
          </div>
          <span className="text-xl font-bold text-white leading-none mt-1">
            {metricas
              ? mejor === "ponderado"
                ? "Ponderado"
                : "Base"
              : "--"}
          </span>
        </div>

      </div>
    </div>
  );
}