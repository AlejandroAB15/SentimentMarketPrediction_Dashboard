import { BarChart3, Zap, Target, Activity } from "lucide-react";

type Props = {
  data: {
    close_real: number;
    pred_general: number;
    pred_especifico: number;
    error_general: number;
    error_especifico: number;
    segmento: "train" | "test";
  }[];
};

export default function InsightsPanel({ data }: Props) {
  const testData = data.filter((d) => d.segmento === "test");
  const total = testData.length;

  const mejorEspecifico = testData.filter(
    (d) => d.error_especifico < d.error_general
  ).length;

  const porcentajeMejor = (mejorEspecifico / total) * 100;

  const errorPromGeneral =
    testData.reduce((acc, d) => acc + Math.abs(d.error_general), 0) / total;

  const errorPromEspecifico =
    testData.reduce((acc, d) => acc + Math.abs(d.error_especifico), 0) / total;

  const modeloGanador =
    errorPromEspecifico < errorPromGeneral ? "Específico" : "General";

  const volatilidadAlta = testData.filter(
    (d) => Math.abs(d.error_especifico) > errorPromEspecifico * 1.5
  ).length;

  const porcentajeVolatilidad = (volatilidadAlta / total) * 100;

  return (
    <div className="w-full h-full bg-surface-1 border border-primaryDark rounded-2xl p-7 flex flex-col shadow-sm">
      
      <div className="mb-8 flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="text-base font-bold text-text uppercase tracking-widest">
            Interpretación del Modelo
          </h3>
          <p className="text-xs text-text/40">
            Métricas obtenidas a partir de comparación de valores reales contra el resultado del conjunto de prueba
          </p>
        </div>
        <div className="p-2 bg-surface-2 rounded-lg border border-white/5">
          <BarChart3 size={20} className="text-primary" />
        </div>
      </div>

      <div className="flex flex-col flex-1 justify-between gap-8">
        
        <div className="grid grid-cols-3 gap-5">
          
          <div className="bg-surface-2/30 border border-white/5 rounded-2xl p-5 flex flex-col gap-3 transition-all hover:bg-surface-2/60">
            <div className="flex items-center gap-2 text-success">
              <Zap size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Dominante</span>
            </div>
            <div className="text-3xl font-black text-success tracking-tight">
              {modeloGanador}
            </div>
          </div>

          <div className="bg-surface-2/30 border border-white/5 rounded-2xl p-5 flex flex-col gap-3 transition-all hover:bg-surface-2/60">
            <div className="flex items-center gap-2 text-primary">
              <Target size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Precisión</span>
            </div>
            <div className="text-3xl font-black text-text tracking-tight">
              {porcentajeMejor.toFixed(1)}%
            </div>
          </div>

          <div className="bg-surface-2/30 border border-white/5 rounded-2xl p-5 flex flex-col gap-3 transition-all hover:bg-surface-2/60">
            <div className="flex items-center gap-2 text-text/60">
              <Activity size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Error Absoluto Medio</span>
            </div>
            <div className="text-3xl font-black text-text tracking-tight">
              {errorPromEspecifico.toFixed(1)}
            </div>
          </div>

        </div>

        <div className="flex flex-col gap-4 flex-1 justify-center">
          
          <div className="group bg-surface-2/20 border border-white/5 rounded-2xl p-5 flex items-center gap-4 transition-all hover:border-success/30">
            <div className="w-1 h-10 bg-success rounded-full opacity-40 group-hover:opacity-100 transition-opacity" />
            <p className="text-sm leading-relaxed text-text/80">
              El modelo <span className="text-success font-bold text-base">{modeloGanador.toLowerCase()}</span> arroja mejores predicciones en este periodo.
            </p>
          </div>

          <div className="group bg-surface-2/20 border border-white/5 rounded-2xl p-5 flex items-center gap-4 transition-all hover:border-primary/30">
            <div className="w-1 h-10 bg-primary rounded-full opacity-40 group-hover:opacity-100 transition-opacity" />
            <p className="text-sm leading-relaxed text-text/80">
              Se observa un rendimiento superior al general en el <span className="text-text font-bold text-base">{porcentajeMejor.toFixed(1)}%</span> del conjunto de prueba.
            </p>
          </div>

          <div className="group bg-surface-2/20 border border-white/5 rounded-2xl p-5 flex items-center gap-4 transition-all hover:border-warning/30">
            <div className="w-1 h-10 bg-warning rounded-full opacity-40 group-hover:opacity-100 transition-opacity" />
            <p className="text-sm leading-relaxed text-text/80">
              El modelo presentó errores significativos en el <span className="text-warning font-bold text-base">{porcentajeVolatilidad.toFixed(1)}%</span> de los datos. (Superando el error medio por al menos 50%)
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}