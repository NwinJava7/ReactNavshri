import { type Weight } from "@/lib/products";

type WeightPickerProps = {
  value: Weight;
  options: Weight[];
  onChange: (weight: Weight) => void;
};

export function WeightPicker({ value, options, onChange }: WeightPickerProps) {
  return (
    <div className="flex items-center gap-1.5" role="group" aria-label="Select pack size">
      {options.map((weight) => {
        const selected = value === weight;
        return (
          <button
            key={weight}
            type="button"
            onClick={() => onChange(weight)}
            className={`h-8 min-w-16 rounded-md border px-2 text-[12px] font-medium ${
              selected
                ? "border-forest bg-forest text-white"
                : "border-stone-300 bg-white text-stone-700 hover:border-forest"
            }`}
          >
            {weight}
          </button>
        );
      })}
    </div>
  );
}
