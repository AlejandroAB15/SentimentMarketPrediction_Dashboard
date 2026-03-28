import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  ReferenceLine,
  Label,
} from "recharts";

type Props = {
  data: {
    fecha: string;
    real: number;
    base: number;
    ponderado: number;
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

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-surface-1 border border-primaryDark rounded-md px-3 py-2 text-xs shadow-lg">
      <p className="text-text/80 mb-2 font-bold">
        {formatFecha(payload[0].payload.fecha)}
      </p>
      <div className="flex flex-col gap-1">
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-text/60 capitalize">{entry.name}:</span>
            <span className="text-text font-mono">
              {entry.value.toLocaleString("es-MX", {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-2 text-[10px] uppercase tracking-wider text-primary">
        Segmento: {payload[0].payload.segmento}
      </p>
    </div>
  );
};

export default function MainPredictionChart({ data }: Props) {
  const processedData = useMemo(() => {
    return data.map((d, index) => {
      const isTrain = d.segmento === "train";
      const isTest = d.segmento === "test";

      const isTransitionPoint =
        (isTrain && data[index + 1]?.segmento === "test") ||
        (isTest && data[index - 1]?.segmento === "train");

      return {
        ...d,

        baseTrain: isTrain || isTransitionPoint ? d.base : null,
        baseTest: isTest || isTransitionPoint ? d.base : null,

        pondTrain: isTrain || isTransitionPoint ? d.ponderado : null,
        pondTest: isTest || isTransitionPoint ? d.ponderado : null,
      };
    });
  }, [data]);

  const transitionDate = useMemo(() => {
    const firstTest = data.find((d) => d.segmento === "test");
    return firstTest ? firstTest.fecha : null;
  }, [data]);

  return (
    <div className="w-full h-[450px] bg-surface-1 border border-primaryDark rounded-xl p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-text">
          Tendencia de Predicción
        </h3>
        <p className="text-base text-text/60">
          Comparativa entre la versión base y ponderada respecto al valor real
        </p>
      </div>

      <ResponsiveContainer width="100%" height="85%">
        <LineChart
          data={processedData}
          margin={{ top: 10, right: 20, left: 30, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#1e293b"
            vertical={false}
          />

          <XAxis
            dataKey="fecha"
            tick={<CustomTick />}
            minTickGap={30}
            axisLine={false}
          />

          <YAxis
            tick={{ fontSize: 12, fill: "#9CA3AF" }}
            domain={["dataMin - 100", "dataMax + 100"]}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: "rgba(23, 124, 124,0.7)", strokeWidth: 1 }}
          />

          <Legend
            verticalAlign="top"
            align="right"
            iconType="circle"
            wrapperStyle={{
              paddingBottom: "20px",
              fontSize: "12px",
            }}
          />

          {transitionDate && (
            <ReferenceLine
              x={transitionDate}
              stroke="#6366f1"
              strokeDasharray="3 3"
            >
              <Label
                value="Inicio de Predicción"
                position="top"
                fill="#d4d4d4"
                fontSize={10}
                fontWeight="bold"
              />
            </ReferenceLine>
          )}

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
            dataKey="baseTrain"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
            name="Base (Entrenamiento)"
          />

          <Line
            type="monotone"
            dataKey="baseTest"
            stroke="#93c5fd"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
            name="Base (Prueba)"
          />

          <Line
            type="monotone"
            dataKey="pondTrain"
            stroke="#22c55e"
            strokeWidth={2}
            dot={false}
            name="Ponderado (Entrenamiento)"
          />

          <Line
            type="monotone"
            dataKey="pondTest"
            stroke="#86efac"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
            name="Ponderado (Prueba)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}