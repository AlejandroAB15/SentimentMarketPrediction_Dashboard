import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  data: { fecha: string; total: number }[];
};

export default function TimelineAdquisicion({ data }: Props) {
  return (
    <div className="bg-surface-1 rounded-xl p-6 border border-primary/20 h-[360px]">
      <h3 className="text-base text-text/70 mb-4">
        Evolución de la recolección de artículos
      </h3>

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid stroke="var(--color-grid-line)" />
          <XAxis
            dataKey="fecha"
            tick={{ fill: "var(--color-text-muted)", fontSize: 12 }}
          />
          <YAxis tick={{ fill: "var(--color-text-muted)", fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--color-surface)",
              border: "1px solid var(--color-primary-dark)",
              color: "var(--color-text)",
            }}
          />
          <Area
            type="monotone"
            dataKey="total"
            stroke="var(--color-primary)"
            fill="var(--color-primary-dark)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}