import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

type Item = {
  periodo: string;
  POS: number;
  NEG: number;
  NEU: number;
  ERROR: number;
};

type Props = {
  data: Item[];
};

type TooltipItem = {
  name: string;
  value: number;
  color: string;
};

type TooltipProps = {
  active?: boolean;
  payload?: TooltipItem[];
  label?: string;
};

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {

  if (!active || !payload || payload.length === 0) return null;

  const names: Record<string, string> = {
    POS: "Positivo",
    NEG: "Negativo",
    NEU: "Neutral",
    ERROR: "Error",
  };

  return (
    <div className="bg-surface-1 border border-[var(--color-grid-line)] rounded-md p-3 text-sm shadow-lg">

      <p className="text-text mb-2">{label}</p>

      {payload.map((p) => (
        <div
          key={p.name}
          className="flex items-center justify-between gap-6 text-text-muted"
        >

          <div className="flex items-center gap-2">

            <div
              className="w-2 h-2 rounded-full"
              style={{ background: p.color }}
            />

            <span>{names[p.name] ?? p.name}</span>

          </div>

          <span className="text-text">{p.value}</span>

        </div>
      ))}

    </div>
  );
};

export default function SentimentEvolutionChart({ data }: Props) {

  return (
    <div className="bg-surface-1 border border-[var(--color-grid-line)] rounded-xl p-6 h-[360px]">

      <div className="mb-4">

        <p className="text-[11px] uppercase tracking-[0.18em] text-text-subtle font-semibold">
          EVOLUCIÓN DEL SENTIMIENTO
        </p>

        <p className="text-sm text-text-muted mt-1">
          Tendencia semanal del sentimiento económico detectado
        </p>

      </div>

      <ResponsiveContainer width="100%" height="85%">
        <AreaChart data={data}>

          <CartesianGrid
            stroke="rgba(222,226,230,0.08)"
            vertical={false}
          />

          <XAxis
            dataKey="periodo"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#dee2e6", fontSize: 11 }}
          />

          <YAxis hide />

          <Tooltip content={<CustomTooltip />} />

          <Area
            type="monotone"
            dataKey="POS"
            stackId="1"
            stroke="#0fba81"
            fill="#0fba81"
            fillOpacity={0.6}
          />

          <Area
            type="monotone"
            dataKey="NEG"
            stackId="1"
            stroke="#e43b59"
            fill="#e43b59"
            fillOpacity={0.6}
          />

          <Area
            type="monotone"
            dataKey="NEU"
            stackId="1"
            stroke="#dee2e6"
            fill="#dee2e6"
            fillOpacity={0.25}
          />

          <Area
            type="monotone"
            dataKey="ERROR"
            stackId="1"
            stroke="#d7ab46"
            fill="#d7ab46"
            fillOpacity={0.4}
          />

        </AreaChart>
      </ResponsiveContainer>

    </div>
  );
}