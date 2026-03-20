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
    valor: number; // error_general - error_especifico
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

      <div className="flex justify-between gap-3">
        <span className="text-text/70">Ventaja</span>
        <span className="font-medium">
          {payload[0].value.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default function DifferenceChart({ data }: Props) {

  const valores = data.map(d => d.valor);
  const max = Math.max(...valores);
  const min = Math.min(...valores);

  const domain = [min - 10, max + 10];

  return (
    <div className="w-full bg-surface-1 border border-primaryDark rounded-xl p-5 overflow-hidden">

      {/* Header */}
      <div className="flex flex-col gap-1 mb-4">
        <span className="text-sm text-text/80">
          Comparación de desempeño entre modelos
        </span>
        <span className="text-xs text-text/50">
          Diferencia en error (general - específico)
        </span>
        <span className="text-[11px] text-text/40">
          Arriba: modelo específico mejor · Abajo: modelo general mejor
        </span>
      </div>

      <div className="w-full h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 20, left: 12, bottom: 10 }}
          >

            {/* Grid */}
            <CartesianGrid
              stroke="rgba(222,226,230,0.08)"
              strokeDasharray="3 3"
            />

            {/* Línea base */}
            <ReferenceLine
              y={0}
              stroke="#dee2e6"
              strokeOpacity={0.25}
              strokeWidth={1.5}
              label={{
                value: "Empate",
                position: "left",
                fill: "#dee2e6",
                fontSize: 11,
              }}
            />

            {/* Eje X */}
            <XAxis
              dataKey="fecha"
              tickFormatter={formatFecha}
              tick={{ fontSize: 12, fill: "#dee2e6" }}
              minTickGap={20}
            />

            {/* Eje Y */}
            <YAxis
              domain={domain}
              tickFormatter={formatNumber}
              tick={{ fontSize: 12, fill: "#dee2e6" }}
              width={60}
            />

            {/* Tooltip */}
            <Tooltip content={<CustomTooltip />} />

            {/* Legend */}
            <Legend
              wrapperStyle={{
                fontSize: "12px",
                color: "#dee2e6",
              }}
            />

            {/* Línea principal */}
            <Line
              type="monotone"
              dataKey="valor"
              stroke="#0fba81"
              strokeWidth={2.3}
              dot={false}
              name="Diferencia de desempeño"
            />

          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}