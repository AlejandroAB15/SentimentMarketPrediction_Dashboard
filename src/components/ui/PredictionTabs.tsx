type Props = {
  active: string;
  onChange: (value: string) => void;
};

const indices = ["dji", "nasdaq", "sp500"];

export default function PredictionTabs({ active, onChange }: Props) {
  return (
    <div className="flex gap-3">
      {indices.map((i) => (
        <button
          key={i}
          onClick={() => onChange(i)}
          className={`
            px-5 py-2 rounded-lg text-sm border border-primaryDark
            transition-all duration-200
            ${active === i
              ? "bg-primary text-white"
              : "text-text/70 hover:bg-white/5"}
          `}
        >
          {i.toUpperCase()}
        </button>
      ))}
    </div>
  );
}