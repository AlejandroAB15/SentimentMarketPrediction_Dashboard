import {
  ScatterChart as RechartsScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
} from "recharts";

type Props = {
  data: {
    x: number;
    y: number;
  }[];
  modeloGanador: "general" | "especifico";
};

const formatNumber = (value: number) => {
  return value.toLocaleString("en-US", {
    maximumFractionDigits: 0,
  });
};

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const point = payload[0].payload;
  const error = Math.abs(point.x - point.y);

  return (
    <div className="bg-surface-2 border border-primaryDark rounded-lg px-3 py-2 text-xs text-text shadow-xl">
      <div className="mb-2 pb-1 border-b border-white/5 font-medium text-text/40 uppercase tracking-tighter text-[10px]">
        Detalle de Predicción
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between gap-6">
          <span className="text-text/60">Valor Real:</span>
          <span className="font-mono font-bold">{point.x.toFixed(2)}</span>
        </div>
        <div className="flex justify-between gap-6">
          <span className="text-success">Predicción:</span>
          <span className="font-mono font-bold">{point.y.toFixed(2)}</span>
        </div>
        <div className="mt-1 pt-1 border-t border-white/5 flex justify-between gap-6">
          <span className="text-text/40 italic">Error absoluto:</span>
          <span className="font-mono font-bold text-text/80">
            {error.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default function ScatterChart({ data, modeloGanador }: Props) {
  const valores = data.flatMap(d => [d.x, d.y]);
  const max = Math.max(...valores);
  const min = Math.min(...valores);
  const domain = [min - 10, max + 10];

  return (
    <div className="w-full h-full bg-surface-1 border border-primaryDark rounded-xl p-6 flex flex-col gap-4 shadow-sm overflow-hidden">
      
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-semibold text-text">
            Correlación Real vs. Predicción
          </h3>
          <p className="text-base text-text/50">
            Evaluación de precisión del modelo <span className="text-success font-medium">{modeloGanador}</span>
          </p>
        </div>
        
        <div className="flex gap-4 text-[10px] uppercase font-bold tracking-widest text-text/30">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-success opacity-80" /> 
            Predicción
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 border-t border-dashed border-primary" /> 
            Ideal
          </div>
        </div>
      </div>

      <div className="w-full flex-1 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsScatterChart
            margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
          >
            <CartesianGrid
              stroke="rgba(255,255,255,0.03)"
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              type="number"
              dataKey="x"
              domain={domain}
              tickFormatter={formatNumber}
              tick={{ fontSize: 11, fill: "#9CA3AF" }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              type="number"
              dataKey="y"
              domain={domain}
              tickFormatter={formatNumber}
              tick={{ fontSize: 11, fill: "#9CA3AF" }}
              width={60}
              axisLine={false}
              tickLine={false}
            />

            <ReferenceLine
              segment={[
                { x: min, y: min },
                { x: max, y: max },
              ]}
              stroke="#6366f1"
              strokeOpacity={0.4}
              strokeWidth={2}
              strokeDasharray="5 5"
              label={{
                value: "Línea de Identidad",
                position: "insideTopLeft",
                fill: "#6366f1",
                fontSize: 10,
                fontWeight: "bold",
                fillOpacity: 0.5,
                offset: 20
              }}
            />

            <Tooltip content={<CustomTooltip modelo={modeloGanador} />} cursor={{ stroke: "rgba(23, 124, 124,0.7)", strokeWidth: 1 }}  />

            <Scatter
              data={data}
              fill="#0fba81"
              fillOpacity={0.6}
              line={false}
              shape="circle"
            />
          </RechartsScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="text-sm text-primary text-center italic border-t border-white/5 pt-3">
        Entre mas cercanos los puntos a la línea diagonal indica una mayor precisión del modelo.
      </div>
    </div>
  );
}