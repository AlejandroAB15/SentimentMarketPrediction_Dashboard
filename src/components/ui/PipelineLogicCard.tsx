import { GitMerge, Brush, Filter, Copy } from "lucide-react"

const icons = {
  union: GitMerge,
  limpieza: Brush,
  relevancia: Filter,
  dedup: Copy
}

type IconKey = keyof typeof icons

type Props = {
  title: string
  description: string
  icon: IconKey
}

const iconStyles = {
  union: { color: "text-[#00d1ff]", bg: "bg-[#00d1ff10]" },
  limpieza: { color: "text-[#00ffcc]", bg: "bg-[#00ffcc10]" },
  relevancia: { color: "text-[#ffcc00]", bg: "bg-[#ffcc0010]" },
  dedup: { color: "text-[#00cccc]", bg: "bg-[#00cccc10]" }
}

export default function PipelineLogicCard({ title, description, icon }: Props) {

  const Icon = icons[icon]
  const style = iconStyles[icon]

  return (

    <div className="flex-1 bg-[#1a1c1f] hover:bg-[#24272b] border border-[#ffffff05] rounded-xl p-5 flex gap-5 transition-colors items-center">

      <div className={`w-12 h-12 shrink-0 rounded-lg ${style.bg} flex items-center justify-center ${style.color}`}>
        <Icon size={22} strokeWidth={1.5}/>
      </div>

      <div className="flex flex-col gap-1">

        <h4 className="text-[15px] text-white font-semibold tracking-tight leading-none mb-1">
          {title}
        </h4>

        <p className="text-[13px] text-text/40 leading-snug">
          {description}
        </p>
      </div>
    </div>
  )
}