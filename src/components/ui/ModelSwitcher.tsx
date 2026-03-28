import { motion } from "framer-motion";
import { Info } from "lucide-react";
import { useState } from "react";

type Props = {
  value: "general" | "especifico";
  onChange: (value: "general" | "especifico") => void;
};

export default function ModelSwitcher({ value, onChange }: Props) {
  const [showTooltip, setShowTooltip] = useState(false);

  const options: { key: "general" | "especifico"; label: string }[] = [
    { key: "general", label: "General" },
    { key: "especifico", label: "Específico" },
  ];

  return (
    <div className="flex items-center justify-between w-full">
      
      <div className="flex items-center gap-2 relative">
        <span className="text-sm font-semibold text-text">
          Tipo de modelo
        </span>

        <div
          className="relative"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <Info size={14} className="text-text/40 cursor-pointer" />

          {showTooltip && (
            <div className="absolute top-6 left-0 w-64 bg-surface-2 border border-primaryDark text-xs text-text/70 p-3 rounded-lg shadow-lg z-50">
              Alterna entre dos formas de construir la predicción.
              <br /><br />
              El modelo general utiliza un promedio de la información disponible,
              generando una señal más estable.
              <br /><br />
              El modelo específico considera directamente los valores en t1, t2 y t3,
              capturando con mayor detalle los cambios recientes del mercado.
            </div>
          )}
        </div>
      </div>

      <div className="relative flex bg-surface-1 border border-primaryDark rounded-xl p-1 w-[220px]">
        
        <motion.div
          layout
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
          }}
          className="absolute top-1 bottom-1 w-1/2 bg-primary rounded-lg"
          style={{
            left: value === "general" ? "4px" : "calc(50% - 4px)",
          }}
        />

        {options.map((opt) => {
          const active = value === opt.key;

          return (
            <button
              key={opt.key}
              onClick={() => onChange(opt.key)}
              className={`
                relative z-10 w-1/2 py-2 text-sm font-semibold rounded-lg
                transition-colors duration-200
                ${
                  active
                    ? "text-white"
                    : "text-text/60 hover:text-white"
                }
              `}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}