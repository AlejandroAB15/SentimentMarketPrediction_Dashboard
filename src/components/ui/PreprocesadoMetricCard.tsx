type Props = {
  title: string
  value: string | number
  description?: string
  accent?: "default" | "warning"
}

export default function PreprocesadoMetricCard({
  title,
  value,
  description,
  accent = "default"
}: Props) {

  return (

    <div className="bg-[#1a1c1f] border border-[#ffffff08] rounded-xl px-6 py-5 flex flex-col justify-between min-h-[90px]">

      <span className="text-[11px] uppercase tracking-[0.18em] text-text/35 font-semibold">
        {title}
      </span>

      <div className="flex items-baseline gap-2">
        <span
          className={`text-3xl font-bold tracking-tight ${
            accent === "warning"
              ? "text-[#ffcc00]"
              : "text-white"
          }`}
        >
          {value}
        </span>

        {description && (
          <span className="text-xs text-text/35">
            {description}
          </span>
        )}
      </div>
    </div>
  )
}