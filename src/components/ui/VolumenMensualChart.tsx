import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  data: { mes: string; total: number }[];
};

export default function VolumenMensualChart({ data }: Props) {
  return (
    <div className="bg-surface-1 rounded-xl p-6 border border-primary/20 h-[320px]">
      <h3 className="text-base text-text/70 mb-4">
        Volumen mensual de adquisición
      </h3>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid stroke="var(--color-grid-line)" />
          <XAxis
            dataKey="mes"
            tick={{ fill: "var(--color-text-muted)", fontSize: 12 }}
          />
          <YAxis tick={{ fill: "var(--color-text-muted)", fontSize: 12 }} />
          <Tooltip
            cursor = {false}
            contentStyle={{
              backgroundColor: "var(--color-surface)",
              border: "1px solid var(--color-primary-dark)",
              color: "var(--color-text)"
              ,
            }}
          />
          <Bar dataKey="total" fill="var(--color-bar-fill-soft)"/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}