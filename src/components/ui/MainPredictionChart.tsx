import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

type Props = {
  data: {
    fecha: string;
    real: number;
    general: number;
    especifico: number;
    segmento: "train" | "test";
  }[];
};

const formatFecha = (fecha: string) => {
  return new Date(fecha).toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const CustomTick = ({ x, y, payload }: any) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={12}
        textAnchor="middle"
        className="fill-text/60 text-xs"
      >
        {formatFecha(payload.value)}
      </text>
    </g>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-surface-1 border border-primaryDark rounded-md px-3 py-2 text-xs text-white shadow-md">
      <div className="mb-1 text-text/60">
        {formatFecha(label)}
      </div>

      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex justify-between gap-3">
          <span className="capitalize text-text/70">
            {entry.name}
          </span>
          <span className="text-primary font-bold">
            {entry.value.toFixed(2)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function MainPredictionChart({ data }: Props) {
  return (
    <div className="w-full bg-surface-1 border border-primaryDark rounded-xl p-4">

      <div className="h-[420px] w-full ">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 20, left: 30, bottom: 0 }}
          >

            <CartesianGrid stroke="var(--color-grid-line)" />

            <XAxis
              dataKey="fecha"
              tick={<CustomTick />}
            />

            <YAxis
              tick={{
                fontSize: 12,
                fill: "#9CA3AF",
              }}
              domain={['dataMin - 200', 'dataMax + 200']} 
            />

            <Tooltip content={<CustomTooltip />} />

            <Legend
              wrapperStyle={{
                fontSize: "12px",
                color: "#9CA3AF",
              }}
            />

            <Line
              type="monotone"
              dataKey="real"
              stroke="#ffffff"
              strokeWidth={2}
              dot={false}
              name="Real"
            />

            <Line
              type="monotone"
              dataKey="general"
              stroke="#3b82f6"
              strokeDasharray="5 5"
              dot={false}
              name="General"
            />

            <Line
              type="monotone"
              dataKey="especifico"
              stroke="#22c55e"
              strokeDasharray="4 4"
              dot={false}
              name="Específico"
            />

          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}