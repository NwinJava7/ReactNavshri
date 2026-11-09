import { useEffect, useMemo, useState } from "react";
import { CartDrawer, type CartLine } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { QuickView } from "@/components/QuickView";
import { BrandHero } from "@/components/BrandHero";
import { ArrowUpIcon } from "@/components/icons";
import {
  cartKey,
  parseCartKey,
  products,
  type Category,
  type Product,
  type Weight,
} from "@/lib/products";

type CartMap = Record<string, number>;

export function Store() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState<CartMap>({});
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [quickView, setQuickView] = useState<{ product: Product; weight: Weight } | null>(
    null,
  );
  const [toast, setToast] = useState("");
  const [showTop, setShowTop] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const storedCart = window.localStorage.getItem("navshri-cart");
    const storedWish = window.localStorage.getItem("navshri-wish");
    if (storedCart) setCart(JSON.parse(storedCart) as CartMap);
    if (storedWish) setWishlist(JSON.parse(storedWish) as string[]);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem("navshri-cart", JSON.stringify(cart));
  }, [cart, ready]);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem("navshri-wish", JSON.stringify(wishlist));
  }, [ready, wishlist]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 2200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const visible = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        category === "All" || product.category === (category as Category);
      const haystack = `${product.name} ${product.category} ${product.packLabel}`.toLowerCase();
      const matchesQuery = haystack.includes(query.trim().toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  const lines: CartLine[] = Object.entries(cart)
    .map(([key, qty]) => {
      const { id, weight } = parseCartKey(key);
      const product = products.find((item) => item.id === id);
      return product ? { key, product, weight, qty } : null;
    })
    .filter((line): line is CartLine => line !== null);

  const cartCount = lines.reduce((sum, line) => sum + line.qty, 0);

  function notify(message: string) {
    setToast(message);
  }

  function addToCart(product: Product, weight: Weight) {
    if (!product.inStock) {
      notify("This pack is sold out");
      return;
    }
    const key = cartKey(product.id, weight);
    setCart((current) => ({ ...current, [key]: (current[key] ?? 0) + 1 }));
    setQuickView(null);
    setCartOpen(true);
    notify(`${product.name} (${weight}) added to basket`);
  }

  function setQty(key: string, qty: number) {
    setCart((current) => {
      const next = { ...current };
      if (qty <= 0) delete next[key];
      else next[key] = qty;
      return next;
    });
  }

  return (
    <div className="min-h-screen bg-white text-stone-900">
      <Header
        query={query}
        onQueryChange={setQuery}
        activeCategory={category}
        onCategoryChange={setCategory}
        cartCount={cartCount}
        onOpenCart={() => setCartOpen(true)}
      />

      <BrandHero />

      <main className="mx-auto max-w-[1400px] px-4 pb-20 pt-10 md:px-8">
        {visible.length === 0 ? (
          <p className="py-20 text-center text-stone-500">No products match this search.</p>
        ) : (
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                wished={wishlist.includes(product.id)}
                onWish={() =>
                  setWishlist((current) =>
                    current.includes(product.id)
                      ? current.filter((id) => id !== product.id)
                      : [...current, product.id],
                  )
                }
                onQuickView={(weight) => setQuickView({ product, weight })}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />

      <CartDrawer
        open={cartOpen}
        lines={lines}
        onClose={() => setCartOpen(false)}
        onQty={setQty}
        onRemove={(key) => setQty(key, 0)}
      />
      <QuickView
        product={quickView?.product ?? null}
        initialWeight={quickView?.weight}
        onClose={() => setQuickView(null)}
        onAdd={addToCart}
      />

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-forest px-4 py-2 text-sm text-white shadow-lg">
          {toast}
        </div>
      )}

      {showTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-forest text-white shadow-lg"
          aria-label="Back to top"
        >
          <ArrowUpIcon className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
