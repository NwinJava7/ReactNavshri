import { CloseIcon } from "@/components/icons";
import { formatINR, getVariant, type Product, type Weight } from "@/lib/products";

export type CartLine = {
  key: string;
  product: Product;
  weight: Weight;
  qty: number;
};

type CartDrawerProps = {
  open: boolean;
  lines: CartLine[];
  onClose: () => void;
  onQty: (key: string, qty: number) => void;
  onRemove: (key: string) => void;
};

export function CartDrawer({ open, lines, onClose, onQty, onRemove }: CartDrawerProps) {
  const total = lines.reduce((sum, line) => {
    return sum + getVariant(line.product, line.weight).price * line.qty;
  }, 0);

  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}>
      <button
        type="button"
        aria-label="Close cart overlay"
        onClick={onClose}
        className={`absolute inset-0 bg-stone-900/30 transition-opacity ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-stone-100 px-5 py-4">
          <div>
            <p className="font-serif text-2xl text-forest">Your basket</p>
            <p className="text-xs uppercase tracking-[0.2em] text-gold">From farm to family</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-stone-50"
            aria-label="Close cart"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {lines.length === 0 ? (
            <p className="py-16 text-center text-sm text-stone-500">
              Your basket is empty. Add a little farm freshness.
            </p>
          ) : (
            <ul className="space-y-4">
              {lines.map((line) => {
                const variant = getVariant(line.product, line.weight);
                return (
                  <li key={line.key} className="flex gap-3 border-b border-stone-100 pb-4">
                    <div
                      className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl"
                      style={{ background: line.product.accent }}
                    >
                      <img
                        src={line.product.image}
                        alt={line.product.name}
                        className="absolute inset-0 h-full w-full object-contain p-1"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-stone-900">{line.product.name}</p>
                      <p className="text-xs text-stone-500">{line.weight}</p>
                      <p className="mt-1 text-sm font-semibold">{formatINR(variant.price)}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onQty(line.key, line.qty - 1)}
                          className="h-7 w-7 rounded-full border border-stone-200 text-sm"
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-sm">{line.qty}</span>
                        <button
                          type="button"
                          onClick={() => onQty(line.key, line.qty + 1)}
                          className="h-7 w-7 rounded-full border border-stone-200 text-sm"
                        >
                          +
                        </button>
                        <button
                          type="button"
                          onClick={() => onRemove(line.key)}
                          className="ml-auto text-xs text-stone-400 hover:text-terracotta"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="border-t border-stone-100 px-5 py-4">
          <div className="mb-3 flex items-center justify-between text-sm">
            <span className="text-stone-500">Subtotal</span>
            <span className="font-semibold">{formatINR(total)}</span>
          </div>
          <button
            type="button"
            disabled={lines.length === 0}
            className="h-12 w-full rounded-full bg-forest text-sm font-semibold text-white disabled:opacity-40"
          >
            Checkout
          </button>
        </div>
      </aside>
    </div>
  );
}
