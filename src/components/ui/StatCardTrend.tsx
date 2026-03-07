import type { ReactNode } from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";

type Accent = "primary" | "success" | "warning" | "danger";

type Props = {
  title: string;
  value: number | string;
  description?: string;
  icon: ReactNode;
  accent?: Accent;
  trend?: number[];
};

export default function StatCardTrend({
  title,
  value,
  description,
  icon,
  accent = "primary",
  trend,
}: Props) {

  const styles = {
    primary: {
      border: "border-primary/30",
      line: "bg-primary",
      iconBg: "bg-primary/15",
      iconColor: "text-primary",
      gradient: "from-primary/10",
    },
    success: {
      border: "border-success/30",
      line: "bg-success",
      iconBg: "bg-success/15",
      iconColor: "text-success",
      gradient: "from-success/10",
    },
    warning: {
      border: "border-warning/30",
      line: "bg-warning",
      iconBg: "bg-warning/15",
      iconColor: "text-warning",
      gradient: "from-warning/10",
    },
    danger: {
      border: "border-danger/30",
      line: "bg-danger",
      iconBg: "bg-danger/15",
      iconColor: "text-danger",
      gradient: "from-danger/10",
    },
  }[accent];

  const trendData =
    trend?.map((v, i) => ({
      x: i,
      y: v,
    })) ?? [];

  return (
    <div
      className={`
        relative
        bg-surface-1
        border border-[var(--color-grid-line)]
        rounded-xl
        p-6
        flex flex-col
        gap-3
        min-h-[170px]
        overflow-hidden
      `}
    >

      <div
        className={`
          absolute inset-0
          bg-gradient-to-br
          ${styles.gradient}
          to-transparent
          opacity-40
          pointer-events-none
        `}
      />

      <div
        className={`
          absolute left-0 top-0 bottom-0 w-[6px]
          ${styles.line}
          rounded-l-xl
        `}
      />

      <div
        className={`
          w-10 h-10
          rounded-lg
          flex items-center justify-center
          ${styles.iconBg}
          ${styles.iconColor}
        `}
      >
        {icon}
      </div>

      <div className="text-sm font-semibold text-text">
        {title}
      </div>

      <div className="text-3xl font-semibold text-text tracking-tight">
        {value}
      </div>

      {trend && trend.length > 1 && (
        <div className={`${styles.iconColor} h-10`}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <Line
                type="monotone"
                dataKey="y"
                stroke="currentColor"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {description && (
        <div className="text-sm text-text-muted leading-relaxed">
          {description}
        </div>
      )}

    </div>
  );
}