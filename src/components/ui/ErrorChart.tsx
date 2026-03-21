import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
  Legend,
} from "recharts";

type Props = {
  data: {
    fecha: string;
    general: number;
    especifico: number;
  }[];
};

const formatFecha = (fecha: string) => {
  return new Date(fecha).toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "short",
  });
};

const formatNumber = (value: number) => {
  return value.toLocaleString("en-US", {
    maximumFractionDigits: 1,
  });
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-surface-1 border border-white/10 rounded-lg p-3 text-xs border-primaryDark">
      <div className="mb-2 pb-1 border-b border-white/5 font-medium text-text/50">
        {formatFecha(label)}
      </div>
      <div className="flex flex-col gap-2">
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div 
                className="w-1.5 h-1.5 rounded-full" 
                style={{ backgroundColor: entry.color }} 
              />
              <span className="text-text/80">{entry.name}</span>
            </div>
            <span className="font-mono font-bold text-text">
              {entry.value > 0 ? `+${entry.value.toFixed(2)}` : entry.value.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function ErrorChart({ data }: Props) {
  const valores = data.flatMap(d => [d.general, d.especifico]);
  const max = Math.max(...valores);
  const min = Math.min(...valores);
  const padding = (max - min) * 0.15;
  const domain = [min - padding, max + padding];

  return (
    <div className="w-full bg-surface-1 border border-primaryDark rounded-2xl p-6 shadow-sm overflow-hidden">
      <div className="flex justify-between items-start mb-6">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-semibold text-text">
            Desviación del modelo
          </h3>
          <p className="text-base text-text/40">
            Diferencia en puntos respecto al valor real
          </p>
        </div>
      </div>

      <div className="w-full h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid 
              stroke="rgba(255,255,255,0.03)" 
              vertical={false}
            />
            <ReferenceLine
              y={0}
              stroke="#6366f1"
              strokeOpacity={0.4}
              strokeWidth={1}
              strokeDasharray="4 4"
              label={{
                value: "Precisión Ideal",
                position: "insideBottomLeft",
                fill: "#6366f1",
                fontSize: 9,
                fontWeight: "bold",
                offset: 10
              }}
            />
            <XAxis
              dataKey="fecha"
              tickFormatter={formatFecha}
              tick={{ fontSize: 10, fill: "#9CA3AF" }}
              axisLine={false}
              tickLine={false}
              minTickGap={40}
            />
            <YAxis
              domain={domain}
              tickFormatter={formatNumber}
              tick={{ fontSize: 10, fill: "#9CA3AF" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(23, 124, 124,0.7)", strokeWidth: 1 }} />
            <Legend 
              verticalAlign="top" 
              align="right"
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ paddingTop: "0px", paddingBottom: "25px", fontSize: "11px" }}
            />
            <Line
              type="monotone"
              dataKey="especifico"
              stroke="#10b981"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
              name="Modelo Específico"
              animationDuration={1000}
            />
            <Line
              type="monotone"
              dataKey="general"
              stroke="#3b82f6"
              strokeWidth={2}
              strokeOpacity={0.6}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
              name="Modelo General"
              animationDuration={1000}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}