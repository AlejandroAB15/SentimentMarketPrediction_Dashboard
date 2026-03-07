import { Cpu, Zap, Activity, ShieldCheck } from "lucide-react";

export default function ModelDiagnosticsCard() {
  return (
    <div className="bg-surface-1 border border-[var(--color-grid-line)] rounded-xl p-6 h-full flex flex-col justify-between">

      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-primary font-semibold">
          CONFIGURACIÓN DEL MODELO
        </p>

        <h3 className="text-sm text-text font-semibold mt-1">
          Características del motor de clasificación utilizado
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-6">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-surface-2 rounded-md">
            <Cpu size={16} className="text-primary" />
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-text-subtle font-semibold">
              MODELO
            </p>

            <p className="text-sm text-text font-medium">
              LLaMA 3.1
            </p>

            <p className="text-xs text-text-muted mt-0.5">
              Modelo usado para analizar el impacto económico de las noticias
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2 bg-surface-2 rounded-md">
            <Zap size={16} className="text-primary" />
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-text-subtle font-semibold">
              RUNTIME
            </p>

            <p className="text-sm text-text font-medium">
              Ollama
            </p>

            <p className="text-xs text-text-muted mt-0.5">
              Motor que ejecuta el modelo de clasificación
            </p>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">

        <div className="bg-surface-2 p-3 rounded-md border border-[var(--color-grid-line)]">

          <div className="flex items-center gap-2 mb-1">
            <Activity size={14} className="text-text-muted" />
            <span className="text-xs uppercase tracking-wider text-text-subtle font-semibold">
              Temperatura
            </span>
          </div>

          <p className="text-base font-semibold text-text">
            0
          </p>

          <p className="text-xs text-text-muted">
            Configuración para obtener clasificaciones consistentes
          </p>

        </div>

        <div className="bg-surface-2 p-3 rounded-md border border-[var(--color-grid-line)]">

          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck size={14} className="text-text-muted" />
            <span className="text-xs uppercase tracking-wider text-text-subtle font-semibold">
              Workers
            </span>
          </div>

          <p className="text-base font-semibold text-text">
            3
          </p>

          <p className="text-xs text-text-muted">
            Procesos paralelos usados para clasificar artículos
          </p>

        </div>

      </div>

      <div className="mt-6">
        <div className="bg-primary/10 p-3 rounded-md border-l-2 border-primary">
          <p className="text-xs text-text-muted leading-relaxed">
            La clasificación se ejecuta localmente.
            Los artículos analizados no se envían a servicios externos, solo los resultados.
          </p>
        </div>
      </div>

    </div>
  );
}