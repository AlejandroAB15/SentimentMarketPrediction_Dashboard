import {
  ScatterChart as RechartsScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
  Legend,
} from "recharts";

type Point = {
  real: number;
  base: number;
  ponderado: number;
};

type Props = {
  data: Point[];
};

const formatNumber = (value: number) => {
  return value.toLocaleString("en-US", {
    maximumFractionDigits: 0,
  });
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  allData: Point[];
}

const CustomTooltip = ({ active, payload, allData }: CustomTooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;

  const realValue = payload[0].payload.x;
  const match = allData.find((d) => d.real === realValue);
  if (!match) return null;

  const { real, base, ponderado } = match;

  const formatDiff = (pred: number, actual: number) => {
    const diff = pred - actual;
    return `${diff > 0 ? "+" : ""}${diff.toFixed(2)}`;
  };

  return (
    <div className="bg-surface-2 border border-primaryDark rounded-lg px-3 py-2 text-xs text-text shadow-xl min-w-[180px]">
      <div className="mb-2 pb-1 border-b border-white/10 text-text/40 text-[10px] uppercase font-bold tracking-wider">
        Comparación de Modelos
      </div>

      <div className="flex justify-between mb-2 items-center">
        <span className="text-text/60">Valor Real</span>
        <span className="font-mono font-bold text-sm">
          {real.toFixed(2)}
        </span>
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span className="text-blue-400/80">Base</span>
          </div>
          <div className="font-mono text-[11px]">
            <span className="font-bold">{base.toFixed(2)}</span>
            <span className="text-text/40 ml-1">
              ({formatDiff(base, real)})
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span className="text-green-400/80">Ponderado</span>
          </div>
          <div className="font-mono text-[11px]">
            <span className="font-bold">{ponderado.toFixed(2)}</span>
            <span className="text-text/40 ml-1">
              ({formatDiff(ponderado, real)})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ScatterChart({ data }: Props) {
  const cleanData = data.filter(
    (d) =>
      d.real != null &&
      d.base != null &&
      d.ponderado != null &&
      !isNaN(d.real) &&
      !isNaN(d.base) &&
      !isNaN(d.ponderado)
  );

  const baseData = cleanData.map((d) => ({
    x: d.real,
    y: d.base,
  }));

  const ponderadoData = cleanData.map((d) => ({
    x: d.real,
    y: d.ponderado,
  }));

  const valores = cleanData.flatMap((d) => [
    d.real,
    d.base,
    d.ponderado,
  ]);

  const max = valores.length ? Math.max(...valores) : 1;
  const min = valores.length ? Math.min(...valores) : 0;

  const padding = (max - min) * 0.1;

  const domain = [
    min - padding,
    max + padding,
  ];

  return (
    <div className="w-full h-full bg-surface-1 border border-primaryDark rounded-xl p-5 flex flex-col gap-3 shadow-sm overflow-hidden">

      <div className="flex flex-col gap-0.5">
        <h3 className="text-lg font-semibold text-text">
          Correlación Real vs. Predicción
        </h3>
        <p className="text-sm text-text/50">
          Comparación entre modelo base y ponderado
        </p>
      </div>

      <div className="w-full flex-1 min-h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsScatterChart
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          >
            <CartesianGrid
              stroke="rgba(255,255,255,0.03)"
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              type="number"
              dataKey="x"
              name="Real"
              domain={domain}
              tickFormatter={formatNumber}
              tick={{ fontSize: 10, fill: "#9CA3AF" }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              type="number"
              dataKey="y"
              name="Predicción"
              domain={domain}
              tickFormatter={formatNumber}
              tick={{ fontSize: 10, fill: "#9CA3AF" }}
              width={50}
              axisLine={false}
              tickLine={false}
            />

            <ReferenceLine
              segment={[
                { x: min, y: min },
                { x: max, y: max },
              ]}
              stroke="#6366f1"
              strokeOpacity={0.6}
              strokeWidth={1.5}
              strokeDasharray="5 5"
            />

            <Tooltip content={<CustomTooltip allData={cleanData} />} />

            <Legend verticalAlign="top" height={25} />

            <Scatter
              name="Base"
              data={baseData}
              dataKey="y"
              fill="#3b82f6"
              fillOpacity={0.7}
            />

            <Scatter
              name="Ponderado"
              data={ponderadoData}
              dataKey="y"
              fill="#10b981"
              fillOpacity={0.8}
            />
          </RechartsScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="text-xs text-primary/70 text-center italic border-t border-white/5 pt-2">
        Entre mas cercanos se encuentran los puntos a la diagonal implica mejor precisión en la predicción.
      </div>
    </div>
  );
}