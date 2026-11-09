import { useEffect, useState } from "react";
import { CloseIcon } from "@/components/icons";
import { WeightPicker } from "@/components/WeightPicker";
import {
  defaultSize,
  formatINR,
  getVariant,
  productSizes,
  type Product,
  type Weight,
} from "@/lib/products";

type QuickViewProps = {
  product: Product | null;
  initialWeight?: Weight;
  onClose: () => void;
  onAdd: (product: Product, weight: Weight) => void;
};

export function QuickView({ product, initialWeight, onClose, onAdd }: QuickViewProps) {
  const [weight, setWeight] = useState<Weight>(initialWeight ?? "100gm");

  useEffect(() => {
    if (!product) return;
    setWeight(initialWeight ?? defaultSize(product));
  }, [initialWeight, product]);

  if (!product) return null;

  const variant = getVariant(product, weight);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close quick view overlay"
        onClick={onClose}
        className="absolute inset-0 bg-stone-900/35"
      />
      <div className="relative grid w-full max-w-3xl overflow-hidden rounded-[32px] bg-white shadow-2xl md:grid-cols-2">
        <div
          className="relative min-h-[320px]"
          style={{ background: product.accent }}
        >
          <img
            src={product.image}
            alt={`${product.name}`}
            className="absolute inset-0 h-full w-full object-contain p-6"
          />
        </div>
        <div className="p-6 md:p-8">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/80 hover:bg-stone-50"
            aria-label="Close quick view"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
          <p className="text-xs uppercase tracking-[0.22em] text-gold">{product.category}</p>
          <h2 className="mt-2 font-serif text-3xl text-forest">{product.name}</h2>
          <p className="mt-1 text-sm text-stone-500">{product.packLabel}</p>
          <p className="mt-4 text-sm leading-6 text-stone-600">{product.description}</p>
          <div className="mt-5">
            <p className="mb-2 text-xs uppercase tracking-wide text-stone-500">Pack size</p>
            <WeightPicker
              value={weight}
              options={productSizes(product)}
              onChange={setWeight}
            />
          </div>
          <p className="mt-5">
            <span className="text-xl font-semibold">{formatINR(variant.price)}</span>
            <span className="ml-2 text-stone-400 line-through">{formatINR(variant.mrp)}</span>
          </p>
          <button
            type="button"
            disabled={!product.inStock}
            onClick={() => onAdd(product, weight)}
            className="mt-6 h-12 w-full rounded-full bg-forest text-sm font-semibold text-white disabled:bg-stone-300"
          >
            {product.inStock ? `Add ${weight} to basket` : "Sold out"}
          </button>
        </div>
      </div>
    </div>
  );
}
