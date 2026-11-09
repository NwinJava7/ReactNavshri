import { useState } from "react";
import { BookmarkFilledIcon, BookmarkIcon } from "@/components/icons";
import { LivingEye } from "@/components/LivingEye";
import { WeightPicker } from "@/components/WeightPicker";
import {
  defaultSize,
  discountPercent,
  formatINR,
  getVariant,
  productSizes,
  type Product,
  type Weight,
} from "@/lib/products";

type ProductCardProps = {
  product: Product;
  wished: boolean;
  onWish: () => void;
  onQuickView: (weight: Weight) => void;
};

export function ProductCard({
  product,
  wished,
  onWish,
  onQuickView,
}: ProductCardProps) {
  const [weight, setWeight] = useState<Weight>(defaultSize(product));
  const variant = getVariant(product, weight);
  const off = discountPercent(variant.price, variant.mrp);
  const badge = product.badge ?? (off > 0 ? `${off}% off` : undefined);

  return (
    <article className="group">
      <div
        className="relative aspect-square overflow-hidden rounded-[28px] bg-white"
        style={{ background: product.accent }}
      >
        {badge && (
          <span
            className={`absolute right-3 top-3 z-10 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${
              product.inStock
                ? "bg-white/85 text-forest"
                : "bg-white/85 text-stone-500"
            }`}
          >
            {off > 0 ? `${off}% off` : badge}
          </span>
        )}

        <button
          type="button"
          onClick={() => onQuickView(weight)}
          className="absolute inset-0"
        >
          <img
            src={product.image}
            alt={`${product.name}`}
            className="absolute inset-0 h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </button>

        <button
          type="button"
          onClick={() => onQuickView(weight)}
          className="absolute bottom-3 right-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-stone-700 shadow-sm backdrop-blur-sm hover:bg-white"
          aria-label={`Quick view ${product.name}`}
        >
          <LivingEye delayMs={(product.id.charCodeAt(product.id.length - 1) % 8) * 280} />
        </button>
      </div>

      <div className="px-1 pt-4">
        <h3 className="text-[15px] font-medium text-stone-900">
          {product.name} — {product.packLabel}
        </h3>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
          <WeightPicker
            value={weight}
            options={productSizes(product)}
            onChange={setWeight}
          />
          <div className="flex items-center gap-2">
            <p className="text-sm">
              <span className="font-semibold text-stone-900">{formatINR(variant.price)}</span>
              <span className="ml-2 text-stone-400 line-through">{formatINR(variant.mrp)}</span>
            </p>
            <button
              type="button"
              onClick={onWish}
              className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${
                wished ? "text-forest" : "text-stone-400 hover:text-forest"
              }`}
              aria-label="Save to wishlist"
            >
              {wished ? (
                <BookmarkFilledIcon className="h-4 w-4" />
              ) : (
                <BookmarkIcon className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
