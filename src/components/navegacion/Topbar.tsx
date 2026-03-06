import { useLocation } from "react-router-dom";

type TopbarItem = {
  title: string;
  description: string;
};

const topbarConfig: Record<string, TopbarItem> = {
  "/": {
    title: "Overview",
    description: "Métricas generales del pipeline",
  },
  "/adquisicion": {
    title: "Adquisición",
    description: "Extracción de noticias desde medios digitales",
  },
  "/preprocesado": {
    title: "Preprocesado",
    description: "Filtrado, limpieza y deduplicación del dataset",
  },
  "/clasificacion": {
    title: "Clasificación",
    description: "Análisis de sentimiento usando LLaMA 3.1",
  },
  "/prediccion": {
    title: "Predicción",
    description: "Relación entre sentimiento y comportamiento bursátil",
  },
};

export default function Topbar() {
  const location = useLocation();
  const config = topbarConfig[location.pathname] ?? topbarConfig["/"];

  return (
    <header className="h-20 flex items-center px-8 border-b border-primaryDark bg-surface-1">

      <div className="flex flex-col">
        <h1 className="text-lg font-semibold font-manrope">
          {config.title}
        </h1>

        <span className="text-sm text-text/70">
          {config.description}
        </span>
      </div>

    </header>
  );
}