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
  data: {
    fuente: string;
    POS: number;
    NEG: number;
    NEU: number;
    ERROR: number;
  }[];
};

export default function PerfilFuenteChart({ data }: Props) {
  return (
    <div className="bg-surface-1 rounded-xl p-6 border border-primary/20 h-[320px]">
      <h3 className="text-base text-text/70 mb-4">
        Distribución de sentimiento por fuente
      </h3>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} >
          <CartesianGrid stroke="var(--color-grid-line)" />
          <XAxis
            dataKey="fuente"
            tick={{ fill: "var(--color-text-muted)", fontSize: 12 }}
          />
          <YAxis tick={{ fill: "var(--color-text-muted)", fontSize: 12 }} />
          <Tooltip
            cursor = {false}
            contentStyle={{
              backgroundColor: "var(--color-surface)",
              border: "1px solid var(--color-primary-dark)",
              color: "var(--color-text)",
            }}
          />

          <Bar dataKey="POS" stackId="a" fill="var(--color-success)"/>
          <Bar dataKey="NEG" stackId="a" fill="var(--color-danger)"/>
          <Bar dataKey="NEU" stackId="a" fill="var(--color-warning)"/>
          <Bar dataKey="ERROR" stackId="a" fill="var(--color-text-subtle)"/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}