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
    maximumFractionDigits: 0,
  });
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-surface-2 border border-primaryDark rounded-md px-3 py-2 text-xs text-text shadow-md">
      <div className="mb-1 text-text/60">
        {formatFecha(label)}
      </div>

      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex justify-between gap-3">
          <span
            className={
              entry.name === "Modelo general"
                ? "text-blue-400"
                : "text-success"
            }
          >
            {entry.name}
          </span>
          <span className="font-medium">
            {entry.value.toFixed(2)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function ErrorChart({ data }: Props) {

  const valores = data.flatMap(d => [d.general, d.especifico]);
  const max = Math.max(...valores);
  const min = Math.min(...valores);

  const domain = [min - 10, max + 10];

  return (
    <div className="w-full bg-surface-1 border border-primaryDark rounded-xl p-5 overflow-hidden">

      <div className="flex flex-col gap-1 mb-4">
        <span className="text-sm text-text/80">
          Desviación de los modelos
        </span>
        <span className="text-xs text-text/50">
          Diferencia en puntos del índice respecto al valor real
        </span>
      </div>

      <div className="w-full h-[340px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 20, left: 18, bottom: 10 }}
          >

            <CartesianGrid
              stroke="rgba(222,226,230,0.08)"
              strokeDasharray="3 3"
            />

            <ReferenceLine
              y={0}
              stroke="#dee2e6"
              strokeOpacity={0.25}
              strokeWidth={1.5}
              label={{
                value: "Sin error",
                position: "left",
                fill: "#dee2e6",
                fontSize: 11,
              }}
            />

            <XAxis
              dataKey="fecha"
              tickFormatter={formatFecha}
              tick={{ fontSize: 12, fill: "#dee2e6" }}
              minTickGap={20}
            />

            <YAxis
              domain={domain}
              tickFormatter={formatNumber}
              tick={{ fontSize: 12, fill: "#dee2e6" }}
              width={45}
            />

            <Tooltip content={<CustomTooltip />} />

            <Legend
              wrapperStyle={{
                fontSize: "12px",
                color: "#dee2e6",
              }}
            />
            <Line
              type="monotone"
              dataKey="especifico"
              stroke="#0fba81"
              strokeWidth={2.3}
              dot={false}
              name="Modelo específico"
            />

            <Line
              type="monotone"
              dataKey="general"
              stroke="#3b82f6"
              strokeWidth={1.6}
              strokeOpacity={0.7}
              dot={false}
              name="Modelo general"
            />

          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}