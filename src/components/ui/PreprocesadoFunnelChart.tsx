import { motion } from "framer-motion"

type FunnelItem = {
  label: string
  value: number
  percentage?: number
}

type Props = {
  data: FunnelItem[]
}

export default function PreprocesadoFunnelChart({ data }: Props) {

  const finalValue = data[data.length - 1]?.value ?? 0

  return (

    <div className="bg-[#1a1c1f] border border-[#ffffff0a] rounded-2xl p-10 flex flex-col gap-10 w-full">

      <div className="flex justify-between items-end">

        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Reducción del dataset
          </h2>

          <p className="text-base text-text/40">
            Distribución del volumen a través de las etapas del preprocesado
          </p>
        </div>

        <div className="text-right">
          <div className="text-4xl font-bold text-[#177c7c] leading-none">
            {finalValue.toLocaleString()}
          </div>

          <div className="text-[11px] uppercase tracking-[0.2em] text-text/30 font-bold mt-2">
            registros finales
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center w-full gap-2">

        {data.map((item, index) => {
          const isLast = index === data.length - 1
          const width = 100 - index * 6
          const slope = 3

          return (
            <div key={index} className="w-full flex justify-center">

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 80,
                  damping: 18,
                  delay: index * 0.08
                }}
                style={{
                  transformOrigin: "center",
                  width: `${width}%`,
                  clipPath: `polygon(${slope}% 0%, ${100 - slope}% 0%, ${100 - (slope * 1.5)}% 100%, ${slope * 1.5}% 100%)`
                }}
                className={`
                  relative h-20 flex items-center justify-between
                  px-16
                  ${isLast
                    ? "bg-gradient-to-r from-[#177c7c] to-[#1da1a1] text-white shadow-[0_10px_40px_rgba(23,124,124,0.2)]"
                    : "bg-[#24272b] text-text/70 border-x border-white/5"}
                `}
              >

                <span
                  className={`text-base font-semibold ${
                    isLast ? "text-white" : "text-[#177c7c]"
                  }`}
                >
                  {item.label}
                </span>

                <div className="flex items-center gap-4">
                  <span
                    className={`text-xl font-bold ${
                      isLast ? "text-white" : "text-text"
                    }`}
                  >
                    {item.value.toLocaleString()}
                  </span>

                  {item.percentage !== undefined && (
                    <span className="text-xs bg-black/20 px-2 py-1 rounded font-mono opacity-60">
                      -{item.percentage}%
                    </span>
                  )}
                </div>

              </motion.div>

            </div>
          )
        })}

      </div>

    </div>

  )
}