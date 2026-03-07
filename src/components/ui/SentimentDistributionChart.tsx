import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";

type Item = {
  sentimiento: "POS" | "NEG" | "NEU" | "ERROR";
  total: number;
};

type Props = {
  data: Item[];
};

const colors = {
  POS: "#0fba81",
  NEG: "#e43b59",
  NEU: "#dee2e6",
  ERROR: "#d7ab46",
};

export default function SentimentDistributionChart({ data }: Props) {

  const formatted = data.map((d) => ({
    ...d,
    name:
      d.sentimiento === "POS"
        ? "Positivo"
        : d.sentimiento === "NEG"
        ? "Negativo"
        : d.sentimiento === "NEU"
        ? "Neutral"
        : "Error",
  }));

  return (
    <div className="bg-surface-1 border border-[var(--color-grid-line)] rounded-xl p-6 h-full">

      <div className="mb-4">
        <p className="text-[11px] uppercase tracking-[0.18em] text-text-subtle font-semibold">
          DISTRIBUCIÓN DE SENTIMIENTO
        </p>

        <p className="text-sm text-text-muted mt-1">
          Proporción de artículos clasificados por tipo
        </p>
      </div>

      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={formatted} layout="vertical">

          <XAxis type="number" hide />

          <YAxis
            type="category"
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#dee2e6", fontSize: 12 }}
          />

          <Tooltip
            cursor={{ fill: "var(--color-hover-surface)" }} 
            contentStyle={{
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-primary)",
                color: "var(--color-primary)",
              }}
            labelStyle={{
              color: "var(--color-primary)",
            }}
            itemStyle={{
              color: "var(--color-text)",
            }}
          />

          <Bar dataKey="total" radius={[4, 4, 4, 4]}>
            {formatted.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[entry.sentimiento]}
              />
            ))}
          </Bar>

        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}