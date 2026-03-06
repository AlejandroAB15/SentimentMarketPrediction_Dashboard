import { PieChart, Pie, ResponsiveContainer, Sector } from "recharts";
import type { SentimientoItem } from "../../services/overview.service";

type Props = {
  data: SentimientoItem[];
};

const COLORS: Record<string, string> = {
  POS: "var(--color-success)",
  NEG: "var(--color-danger)",
  NEU: "var(--color-text-subtle)",
  ERROR: "var(--color-warning)",
};

const LABELS: Record<string, { title: string; subtitle: string }> = {
    POS: {
      title: "Impacto económico positivo",
      subtitle: "Acciones o políticas que favorecen la actividad económica",
    },
    NEU: {
      title: "Sin contribución económica directa",
      subtitle: "Contenido editorial u opinión sin acción económica concreta",
    },
    NEG: {
      title: "Impacto económico negativo",
      subtitle: "Acciones o políticas que incrementan el riesgo económico",
    },
    ERROR: {
      title: "Error de clasificación",
      subtitle: "Artículos con problemas de procesamiento o clasificación",
    },
};

function PieSlice(props: any) {
  const { payload, ...rest } = props;

    return (
      <Sector
        {...rest}
        fill={payload.fill}
      />
    );
}

export default function SentimentPieChart({ data }: Props) {

  const formatted = data.map((d) => ({
    name: d.sentimiento,
    value: d.total,
    fill: COLORS[d.sentimiento],
  }));

  const total = formatted.reduce((acc, v) => acc + v.value, 0);

  return (
    <div className="bg-surface-1 border border-primary rounded-xl p-8">

      <div className="grid grid-cols-2 items-center">

        <div className="relative h-[360px] flex items-center justify-center">

          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={formatted}
                dataKey="value"
                innerRadius={120}
                outerRadius={180}
                paddingAngle={2}
                shape={PieSlice} />
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-semibold text-text">
              {total.toLocaleString()}
            </span>

            <span className="text-sm text-text/60 tracking-wide">
              ARTÍCULOS TOTALES
            </span>
          </div>

        </div>

        <div className="flex flex-col justify-center gap-6">

          {formatted.map((item) => {

            const percent = ((item.value / total) * 100).toFixed(0);
            const meta = LABELS[item.name];

            return (
              <div
                key={item.name}
                className="flex items-start justify-between"
              >

                <div className="flex items-start gap-3">

                  <span
                    className="w-3.5 h-3.5 rounded-full mt-1"
                    style={{ background: COLORS[item.name] }}
                  />

                  <div className="flex flex-col">

                    <span className="text-base text-text font-semibold">
                      {meta.title}
                    </span>

                    <span className="text-sm text-text/50">
                      {meta.subtitle}
                    </span>

                  </div>

                </div>

                <div className="flex flex-col items-end min-w-[70px]">

                  <span
                    className="text-base font-semibold"
                    style={{ color: COLORS[item.name] }}
                  >
                    {percent}%
                  </span>

                  <span className="text-sm text-text/50">
                    {item.value.toLocaleString()} noticias
                  </span>

                </div>

              </div>
            );
          })}

        </div>

      </div>

    </div>
  );
}