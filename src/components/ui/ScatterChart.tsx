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

const CustomTooltip = ({ active, payload, modelo }: any) => {
  if (!active || !payload?.length) return null;

  const point = payload[0].payload;

  return (
    <div className="bg-surface-2 border border-primaryDark rounded-md px-3 py-2 text-xs text-text shadow-md">
      <div className="flex justify-between gap-3">
        <span className="text-text/70">Real</span>
        <span className="font-medium">
          {point.x.toFixed(2)}
        </span>
      </div>

      <div className="flex justify-between gap-3">
        <span className="text-success">
          Predicción ({modelo})
        </span>
        <span className="font-medium">
          {point.y.toFixed(2)}
        </span>
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
    <div className="w-full bg-surface-1 border border-primaryDark rounded-xl p-5 overflow-hidden">

      <div className="flex flex-col gap-1 mb-4">
        <span className="text-sm text-text/80">
          Relación entre valor real y predicción
        </span>

        <span className="text-xs text-text/50">
          Modelo {modeloGanador}
        </span>

        <span className="text-[11px] text-text/40">
          Cercanía a la diagonal indica mayor precisión
        </span>
      </div>

      <div className="w-full h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsScatterChart
            margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
          >

            <CartesianGrid
              stroke="rgba(222,226,230,0.08)"
              strokeDasharray="3 3"
            />

            <XAxis
              type="number"
              dataKey="x"
              domain={domain}
              tickFormatter={formatNumber}
              tick={{ fontSize: 12, fill: "#dee2e6" }}
              name="Valor real"
            />

            <YAxis
              type="number"
              dataKey="y"
              domain={domain}
              tickFormatter={formatNumber}
              tick={{ fontSize: 12, fill: "#dee2e6" }}
              width={60}
              name={`Predicción (${modeloGanador})`}
            />

            <ReferenceLine
              segment={[
                { x: min, y: min },
                { x: max, y: max },
              ]}
              stroke="#dee2e6"
              strokeOpacity={0.25}
              strokeWidth={1.5}
            />

            <Tooltip content={<CustomTooltip modelo={modeloGanador} />} />

            <Scatter
              data={data}
              fill="#0fba81"
              opacity={0.8}
            />

          </RechartsScatterChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}