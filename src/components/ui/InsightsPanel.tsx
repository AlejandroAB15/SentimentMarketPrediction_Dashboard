import { BarChart3, Target, Activity, SlidersHorizontal } from "lucide-react";

type Props = {
  data: any[];
  ganadorOficial?: string;
  alpha?: number | null;
};

export default function InsightsPanel({ data, ganadorOficial, alpha }: Props) {
  const tipo = ganadorOficial === "especifico" ? "especifico" : "general";

  const testData = data.filter((d) => d.segmento === "test");
  const total = testData.length;

  if (total === 0) return null;

  const maeBase =
    testData.reduce((acc, d) => acc + Math.abs(d.modelos[tipo].base.error), 0) / total;

  const maePonderado =
    testData.reduce((acc, d) => acc + Math.abs(d.modelos[tipo].ponderado.error), 0) / total;

  const esPonderadoMejor = maePonderado < maeBase;

  const mejorVariante = esPonderadoMejor ? "Ponderado" : "Base";
  const maeGanador = esPonderadoMejor ? maePonderado : maeBase;

  const mejoraPromedio = Math.abs(maeBase - maePonderado);

  const diasGanados = testData.filter((d) => {
    const errBase = Math.abs(d.modelos[tipo].base.error);
    const errPond = Math.abs(d.modelos[tipo].ponderado.error);
    return esPonderadoMejor ? errPond < errBase : errBase < errPond;
  }).length;

  const porcentajeConsistencia = (diasGanados / total) * 100;

  const volatilidadAlta = testData.filter((d) => {
    const errorActual = esPonderadoMejor
      ? d.modelos[tipo].ponderado.error
      : d.modelos[tipo].base.error;

    return Math.abs(errorActual) > maeGanador * 1.5;
  }).length;

  const porcentajeVolatilidad = (volatilidadAlta / total) * 100;

  return (
    <div className="w-full h-full bg-surface-1 border border-primaryDark rounded-2xl p-7 flex flex-col shadow-sm">

      <div className="mb-8 flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="text-base font-bold text-text uppercase tracking-widest">
            Análisis de los resultados
          </h3>
          <p className="text-xs text-text/40">
            Resumen del desempeño en el conjunto de prueba
          </p>
        </div>
        <div className="p-2 bg-surface-2 rounded-lg border border-white/5">
          <BarChart3 size={20} className="text-primary" />
        </div>
      </div>

      <div className="flex flex-col flex-1 justify-between gap-8">

        <div className="grid grid-cols-3 gap-5">

          <div className="bg-surface-2/30 border border-white/5 rounded-2xl p-5 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-primary">
              <Target size={16} />
              <span className="text-sm font-black uppercase opacity-60">
                Mejor variante
              </span>
            </div>
            <div className="text-3xl font-black text-primary">
              {mejorVariante}
            </div>
          </div>

          <div className="bg-surface-2/30 border border-white/5 rounded-2xl p-5 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-text/60">
              <Activity size={16} />
              <span className="text-sm font-black uppercase opacity-60">
                Consistencia
              </span>
            </div>
            <div className="text-3xl font-black text-text">
              {porcentajeConsistencia.toFixed(1)}%
            </div>
          </div>

          <div className="bg-surface-2/30 border border-white/5 rounded-2xl p-5 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-warning">
              <SlidersHorizontal size={16} />
              <span className="text-sm font-black uppercase opacity-60">
                Peso asignado (Alpha)
              </span>
            </div>
            <div className="text-3xl font-black text-warning">
              {alpha != null ? alpha.toFixed(2) : "--"}
            </div>
          </div>

        </div>

        <div className="flex flex-col gap-4 flex-1 justify-center">

          <div className="bg-surface-2/20 border border-white/5 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-1 h-10 bg-success rounded-full" />
            <p className="text-sm text-text/80">
              El modelo <span className="text-success font-bold">{mejorVariante.toLowerCase()}</span> reduce el error promedio en{" "}
              <span className="font-bold">{mejoraPromedio.toFixed(2)} puntos</span> frente al otro modelo.
            </p>
          </div>

          <div className="bg-surface-2/20 border border-white/5 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-1 h-10 bg-primary rounded-full" />
            <p className="text-sm text-text/80">
              Supera al otro modelo en el <span className="font-bold">{porcentajeConsistencia.toFixed(1)}%</span> de los casos.
            </p>
          </div>

          <div className="bg-surface-2/20 border border-white/5 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-1 h-10 bg-warning rounded-full" />
            <p className="text-sm text-text/80">
              Un <span className="font-bold">{porcentajeVolatilidad.toFixed(1)}%</span> de los datos supera 1.5 veces el error promedio.
            </p>
          </div>

          {alpha != null && (
            <div className="bg-surface-2/20 border border-white/5 rounded-2xl p-5 flex items-center gap-4">
              <div className="w-1 h-10 bg-warning rounded-full" />
              <p className="text-sm text-text/80">
                Se utilizó un <span className="font-bold">alpha de {alpha.toFixed(2)}</span>, que define el peso asignado a la información reciente en el modelo ponderado. 
                Un valor alto implica mayor sensibilidad a cambios recientes del mercado, permitiendo que las predicciones se ajusten más rápidamente a nuevas tendencias.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}