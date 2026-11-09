import { useRef, useState } from "react";
import WhatsAppButton from "@/components/WhatsAppButton";
import { TickerBar } from "@/components/TickerBar";
import { categories } from "@/lib/products";
import {
  CartIcon,
  ChevronIcon,
  CloseIcon,
  GridIcon,
  MenuIcon,
  SearchIcon,
  UserIcon,
} from "@/components/icons";

type HeaderProps = {
  query: string;
  onQueryChange: (value: string) => void;
  activeCategory: string;
  onCategoryChange: (value: string) => void;
  cartCount: number;
  onOpenCart: () => void;
};

export function Header({
  query,
  onQueryChange,
  activeCategory,
  onCategoryChange,
  cartCount,
  onOpenCart,
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const navItems = ["All", ...categories];

  return (
    <header className="sticky top-0 z-40 bg-white">
      <div className="h-[3px] bg-[#E8C96A]" />

      <div className="mx-auto flex h-[72px] max-w-[1400px] items-center gap-4 px-4 md:px-7">
        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center text-stone-800"
            aria-label="Open menu"
          >
            {menuOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
          {menuOpen && (
            <nav className="absolute left-0 top-12 z-30 flex w-56 flex-col gap-1 rounded-2xl border border-stone-100 bg-white p-3 shadow-xl">
              {navItems.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    onCategoryChange(item);
                    setMenuOpen(false);
                  }}
                  className={`rounded-xl px-3 py-2 text-left text-sm ${
                    activeCategory === item
                      ? "bg-[#3B1414] text-white"
                      : "text-stone-700 hover:bg-stone-50"
                  }`}
                >
                  {item === "All" ? "All Categories" : item}
                </button>
              ))}
            </nav>
          )}
        </div>

        <button
          type="button"
          onClick={() => onCategoryChange("All")}
          className="shrink-0 overflow-hidden rounded-md"
          aria-label="NAVSHRI home"
        >
          <img
            src="/logo.png"
            alt="NAVSHRI — From Farm to Family"
            width={220}
            height={72}
            className="h-[52px] w-auto object-cover"
          />
        </button>

        <button
          type="button"
          onClick={() => onCategoryChange("All")}
          className="shrink-0"
          aria-label="NAVSHRI Farms"
        >
          <img
            src="/logo-farms.png"
            alt="NAVSHRI Farms"
            width={220}
            height={72}
            className="h-[52px] w-auto object-contain"
          />
        </button>

        <div className="mx-4 hidden min-w-0 flex-1 items-center lg:flex">
          <GridIcon className="mr-2 h-4 w-4 shrink-0 text-stone-400" />
          <select
            value={activeCategory}
            onChange={(event) => onCategoryChange(event.target.value)}
            className="appearance-none bg-transparent pr-3 text-[15px] text-stone-700 outline-none"
          >
            <option value="All">All Categories</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <span className="mx-2 h-5 w-px bg-stone-200" />
          <input
            ref={searchRef}
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="What are you looking for?"
            className="h-10 min-w-0 flex-1 bg-transparent text-[15px] text-stone-800 outline-none placeholder:text-stone-400"
          />
        </div>

        <div className="ml-auto flex items-center gap-3 sm:gap-5">
          <button
            type="button"
            onClick={() => searchRef.current?.focus()}
            className="inline-flex h-10 w-10 items-center justify-center text-stone-700 lg:hidden"
            aria-label="Search"
          >
            <SearchIcon className="h-5 w-5" />
          </button>

          <WhatsAppButton />

          <div className="relative">
            <button
              type="button"
              onClick={() => setLoginOpen((open) => !open)}
              className="inline-flex items-center gap-1.5 text-stone-800 outline-none"
            >
              <UserIcon className="h-5 w-5" />
              <span className="text-[15px]">{user ? user.split("@")[0] : "Log in"}</span>
              <ChevronIcon className="h-4 w-4 text-stone-500" />
            </button>
            {loginOpen && (
              <div className="absolute right-0 top-11 z-30 w-72 rounded-2xl border border-stone-100 bg-white p-4 shadow-xl">
                {user ? (
                  <div className="space-y-3">
                    <p className="text-sm text-stone-600">
                      Signed in as <span className="font-medium text-stone-900">{user}</span>
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setUser(null);
                        setLoginOpen(false);
                      }}
                      className="h-10 w-full rounded-full border border-stone-200 text-sm"
                    >
                      Sign out
                    </button>
                  </div>
                ) : (
                  <form
                    className="space-y-3"
                    onSubmit={(event) => {
                      event.preventDefault();
                      if (!email.trim()) return;
                      setUser(email.trim());
                      setLoginOpen(false);
                    }}
                  >
                    <p className="text-sm font-medium text-stone-800">Welcome back</p>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="Email"
                      className="h-10 w-full rounded-xl border border-stone-200 px-3 text-sm outline-none focus:border-[#3B1414]"
                    />
                    <input
                      type="password"
                      required
                      placeholder="Password"
                      className="h-10 w-full rounded-xl border border-stone-200 px-3 text-sm outline-none focus:border-[#3B1414]"
                    />
                    <button
                      type="submit"
                      className="h-10 w-full rounded-full bg-[#3B1414] text-sm font-medium text-white"
                    >
                      Log in
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => {
              setLoginOpen(false);
              onOpenCart();
            }}
            className="relative inline-flex items-center gap-1.5 text-stone-800"
            aria-label="Open cart"
          >
            <CartIcon className="h-5 w-5" />
            <span className="text-[15px]">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -right-3 -top-2 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-[#E03B3B] px-1 text-[10px] font-semibold text-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="h-[7px] bg-[#2B1548]" />

      <div className="border-b border-stone-100 px-4 py-2 lg:hidden">
        <div className="relative mx-auto max-w-[1400px]">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="What are you looking for?"
            className="h-10 w-full rounded-full border border-stone-200 bg-stone-50 pl-10 pr-4 text-sm outline-none"
          />
        </div>
      </div>

      <TickerBar />
    </header>
  );
}
