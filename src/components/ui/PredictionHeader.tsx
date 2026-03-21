import { Target, Trophy, Calendar, Zap } from "lucide-react";

type Props = {
  metricas: {
    mape_general: number;
    mape_especifico: number;
  } | null;

  resumen: {
    mejor_modelo: {
      con_futuro: {
        tipo: string;
        mape: number;
        ventana: number;
      };
    };
  } | null;
};

export default function PredictionHeader({ metricas, resumen }: Props) {
  const modelo = resumen?.mejor_modelo?.con_futuro;

  return (
    <div className="w-full bg-surface-1 border border-primaryDark rounded-2xl p-7 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-text/40">
            <Target size={14} />
            <span className="text-xs font-black uppercase tracking-widest">Error General</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-white tracking-tighter">
              {metricas ? metricas.mape_general.toFixed(2) : "--"}
            </span>
            <span className="text-sm font-bold text-text/40">%</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-primary/60">
            <Zap size={14} />
            <span className="text-xs font-black uppercase tracking-widest">Error Específico</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-primary tracking-tighter">
              {metricas ? metricas.mape_especifico.toFixed(2) : "--"}
            </span>
            <span className="text-sm font-bold text-primary/60">%</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-success/60">
            <Trophy size={14} />
            <span className="text-xs font-black uppercase tracking-widest">Modelo más preciso</span>
          </div>
          <span className="text-xl font-bold text-white leading-none mt-1">
            {modelo
              ? modelo.tipo === "general"
                ? "Modelo General"
                : "Modelo Específico"
              : "--"}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-text/40">
            <Calendar size={14} />
            <span className="text-xs font-black uppercase tracking-widest">Ventana óptima</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-white tracking-tighter">
              {modelo?.ventana ? modelo.ventana : "--"}
            </span>
            <span className="text-sm font-bold text-text/40"> día(s)</span>
          </div>
        </div>

      </div>
    </div>
  );
}