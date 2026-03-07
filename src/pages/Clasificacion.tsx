import { useClasificacion } from "../hooks/useClasificacion";

import ClasificacionLogicPanel from "../components/ui/ClasificacionLogicPanel";
import StatCardTrend from "../components/ui/StatCardTrend";

import { MapaSemanticoSentimiento } from "../components/ui/MapaSemanticoSentimiento";
import SentimentDistributionChart from "../components/ui/SentimentDistributionChart";
import SentimentEvolutionChart from "../components/ui/SentimentEvolutionChart";

import ModelDiagnosticCard from "../components/ui/ModelDiagnosticCard";

import {
  Database,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
} from "lucide-react";

export default function Clasificacion() {

  const { data, isLoading, isError } = useClasificacion();

  if (isLoading) {
    return (
      <div className="text-text-muted text-sm">
        Cargando clasificación...
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="text-danger text-sm">
        Error al cargar los datos de clasificación.
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <ClasificacionLogicPanel />

      <section className="grid grid-cols-5 gap-4">

        <StatCardTrend
          title="Artículos clasificados"
          value={data.resumen.totalClasificados}
          icon={<Database size={18} />}
          accent="primary"
          trend={data.evolucion.map(e => e.POS + e.NEG + e.NEU)}
        />

        <StatCardTrend
          title="Positivos"
          value={data.conteo.POS}
          icon={<TrendingUp size={18} />}
          accent="success"
          trend={data.evolucion.map(e => e.POS)}
        />

        <StatCardTrend
          title="Negativos"
          value={data.conteo.NEG}
          icon={<TrendingDown size={18} />}
          accent="danger"
          trend={data.evolucion.map(e => e.NEG)}
        />

        <StatCardTrend
          title="Neutrales"
          value={data.conteo.NEU}
          icon={<Minus size={18} />}
          accent="warning"
          trend={data.evolucion.map(e => e.NEU)}
        />

        <StatCardTrend
          title="Tasa de error"
          value={`${data.resumen.tasaError}%`}
          icon={<AlertTriangle size={18} />}
          accent="danger"
          trend={data.evolucion.map(e => e.ERROR)}
        />

      </section>

      <section className="grid grid-cols-12 gap-6">
        
        <div className="col-span-8">
          <MapaSemanticoSentimiento data={data.heatmap} />
        </div>

        <div className="col-span-4 flex flex-col gap-6">

          <div className="flex-1">
            <SentimentDistributionChart data={data.distribucion} />
          </div>

          <div className="flex-1">
            <ModelDiagnosticCard />
          </div>

        </div>

        <div className="col-span-12">
          <SentimentEvolutionChart
            data={data.evolucion}
          />
        </div>
        
      </section>
    </div>
  );
}