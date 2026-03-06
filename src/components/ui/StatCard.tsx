import type { ReactNode } from "react";

type Accent = "primary" | "success" | "warning" | "danger";

type Props = {
  title: string;
  value: number | string;
  description?: string;
  icon: ReactNode;
  accent?: Accent;
};

export default function StatCard({
  title,
  value,
  description,
  icon,
  accent = "primary",
}: Props) {

  const styles = {
    primary: {
      border: "border-primary/40",
      line: "bg-primary",
      iconBg: "bg-primary/15",
      iconColor: "text-primary",
    },
    success: {
      border: "border-success/40",
      line: "bg-success",
      iconBg: "bg-success/15",
      iconColor: "text-success",
    },
    warning: {
      border: "border-warning/40",
      line: "bg-warning",
      iconBg: "bg-warning/15",
      iconColor: "text-warning",
    },
    danger: {
      border: "border-danger/40",
      line: "bg-danger",
      iconBg: "bg-danger/15",
      iconColor: "text-danger",
    },
  }[accent];

  return (
    <div
      className={`
        relative
        bg-surface-1
        border ${styles.border}
        rounded-xl
        p-6
        flex flex-col
        gap-3
        min-h-[160px]
        overflow-hidden
      `}
    >

      <div
        className={`
          absolute left-0 top-0 bottom-0 w-[6px]
          ${styles.line}
          rounded-l-xl
        `}
      />

      <div
        className={`
          w-11 h-11
          rounded-lg
          flex items-center justify-center
          ${styles.iconBg}
          ${styles.iconColor}
        `}
      >
        {icon}
      </div>

      <div className="text-lg font-semibold text-text">
        {title}
      </div>

      <div className="text-3xl font-semibold text-text tracking-tight">
        {value}
      </div>

      {description && (
        <div className="text-sm text-text/50 leading-relaxed">
          {description}
        </div>
      )}

    </div>
  );
}