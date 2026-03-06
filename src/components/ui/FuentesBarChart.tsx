import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

import type { FuenteItem } from "../../services/overview.service";

type TooltipProps = {
  active?: boolean;
  payload?: any[];
  label?: string;
};

function formatFuente(nombre?: string) {
  if (!nombre) return "";

  return nombre
    .replace("_", " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
}

function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="bg-surface-1 border border-primary/10 rounded-md px-3 py-2 shadow-lg">

      <p className="text-xs text-text/60 pb-1">
        {formatFuente(label)}
      </p>

      <p className="text-sm text-text font-semibold">
        total: {payload[0].value}
      </p>

    </div>
  );
}

type Props = {
  data: FuenteItem[];
};

export default function FuentesBarChart({ data }: Props) {

  const total = data.reduce((acc, v) => acc + v.total, 0);
  const fuentePrincipal = [...data].sort((a,b)=>b.total-a.total)[0];

  return (
    <div className="bg-surface-1 border border-primary rounded-xl p-6">

      <div>
        <h3 className="text-lg text-text font-semibold">
          Artículos por fuente
        </h3>

        <p className="text-base text-text/50 pb-5">
          Comparación de volúmen y métricas de crecimiento mensual
        </p>
      </div>

      <div className="h-[220px]">

        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -10, bottom: 10 }}
          >

            <CartesianGrid
              stroke="var(--color-grid-line)"
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="fuente"
              stroke="var(--color-text)"
              tick={{ fill: "var(--color-text)", fontSize: 12 }}
              tickMargin={10}
              tickFormatter={formatFuente}
            />

            <YAxis
              stroke="var(--color-text-subtle)"
              tick={{ fill: "var(--color-text-muted)", fontSize: 12 }}
            />

            <Tooltip
              cursor={{ fill: "var(--color-hover-surface)" }}
              content={<CustomTooltip />}
            />

            <Bar
              dataKey="total"
              fill="var(--color-bar-fill-soft)"
              radius={[6,6,0,0]}
            />

          </BarChart>
        </ResponsiveContainer>

      </div>

      <div className="grid grid-cols-4 gap-4">

        <div className="bg-primary-dark rounded-lg p-4">
          <p className="text-xs text-text/60 font-semibold">FUENTE PRINCIPAL</p>
          <p className="text-text">{formatFuente(fuentePrincipal.fuente)}</p>
        </div>

        <div className="bg-primary-dark rounded-lg p-4">
          <p className="text-xs text-text/60 font-semibold">PROMEDIO POR MES</p>
          <p className="text-text">
            {Math.round(total / data.length)} artículos
          </p>
        </div>

        <div className="bg-primary-dark rounded-lg p-4">
          <p className="text-xs text-text/60 font-semibold">VOLUMEN TOTAL</p>
          <p className="text-text">{total}</p>
        </div>

        <div className="bg-primary-dark rounded-lg p-4">
          <p className="text-xs text-text/60 font-semibold">NUMERO DE FUENTES</p>
          <p className="text-text">{data.length}</p>
        </div>

      </div>

    </div>
  );
}