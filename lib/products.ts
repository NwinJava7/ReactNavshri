export type Category =
  | "Haldi"
  | "Chilli"
  | "Masala"
  | "Makhana"
  | "Sattu"
  | "Dry Fruits"
  | "Water"
  | "Mushrooms"
  | "Notebooks";
export type Weight = string;

export type PricePoint = {
  price: number;
  mrp: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: Category;
  packLabel: string;
  inStock: boolean;
  badge?: string;
  accent: string;
  image: string;
  description: string;
  variants: Record<string, PricePoint>;
};

export const weights: Weight[] = ["100gm", "200gm", "500gm"];

export const categories: Category[] = [
  "Haldi",
  "Chilli",
  "Masala",
  "Makhana",
  "Sattu",
  "Dry Fruits",
  "Water",
  "Mushrooms",
  "Notebooks",
];

function variants(basePrice: number, baseMrp: number): Record<Weight, PricePoint> {
  return {
    "100gm": { price: basePrice, mrp: baseMrp },
    "200gm": {
      price: Math.round(basePrice * 1.85),
      mrp: Math.round(baseMrp * 1.9),
    },
    "500gm": {
      price: Math.round(basePrice * 4.4),
      mrp: Math.round(baseMrp * 4.6),
    },
  };
}

export const products: Product[] = [
  {
    id: "hal-01",
    slug: "turmeric-powder",
    name: "Turmeric Powder",
    category: "Haldi",
    packLabel: "Premium pouch",
    inStock: true,
    accent: "#F6E6C8",
    image: "/products/turmeric-powder.png",
    description:
      "Navshri premium turmeric powder — 100% natural, no additives. Stone-bright colour and a warm farm aroma.",
    variants: {
      "100gm": { price: 35, mrp: 45 },
      "200gm": { price: 70, mrp: 90 },
      "500gm": { price: 175, mrp: 220 },
    },
  },
  {
    id: "chi-01",
    slug: "red-chilli-powder",
    name: "Red Chilli Powder",
    category: "Chilli",
    packLabel: "Premium pouch",
    inStock: true,
    accent: "#F6D4D0",
    image: "/products/red-chilli-powder.png",
    description:
      "Navshri premium red chilli powder — 100% natural heat and a deep kitchen-red colour.",
    variants: {
      "100gm": { price: 60, mrp: 75 },
      "200gm": { price: 119, mrp: 149 },
      "500gm": { price: 175, mrp: 220 },
    },
  },
  {
    id: "mas-01",
    slug: "spices-combo-pack",
    name: "Spices Combo Pack",
    category: "Masala",
    packLabel: "Turmeric · Chilli · Coriander",
    inStock: true,
    accent: "#F3EEE6",
    image: "/products/spices-combo-pack-v3.png",
    description:
      "The farm trio in one box: turmeric powder, red chilli powder, and coriander powder.",
    variants: {
      "100gm": { price: 140, mrp: 175 },
      "200gm": { price: 280, mrp: 350 },
      "500gm": { price: 699, mrp: 849 },
    },
  },
  {
    id: "mak-01",
    slug: "makhana",
    name: "Makhana",
    category: "Makhana",
    packLabel: "Roasted fox nuts",
    inStock: true,
    badge: "21% off",
    accent: "#F3E6D8",
    image: "/products/makhana-v2.jpg",
    description:
      "Navshri roasted makhana — lightly seasoned fox nuts / lotus seeds. A natural, airy crunch.",
    variants: variants(149, 189),
  },
  {
    id: "sat-01",
    slug: "sattu",
    name: "Sattu",
    category: "Sattu",
    packLabel: "Roasted gram flour",
    inStock: true,
    accent: "#F4E8D0",
    image: "/products/sattu-v2.jpg",
    description:
      "Navshri roasted gram flour — 100% natural sattu, high in protein and fibre.",
    variants: {
      "100gm": { price: 21, mrp: 29 },
      "200gm": { price: 39, mrp: 49 },
      "500gm": { price: 100, mrp: 129 },
    },
  },
  {
    id: "dry-01",
    slug: "kaju",
    name: "Kaju",
    category: "Dry Fruits",
    packLabel: "Premium cashews",
    inStock: true,
    accent: "#F6EEDC",
    image: "/products/kaju-v2.jpg",
    description:
      "Navshri premium kaju — rich, crunchy cashews packed fresh. From farm to family.",
    variants: {
      "100gm": { price: 99, mrp: 129 },
      "200gm": { price: 199, mrp: 249 },
      "500gm": { price: 499, mrp: 599 },
    },
  },
  {
    id: "wat-01",
    slug: "packaged-drinking-water",
    name: "Packaged Drinking Water",
    category: "Water",
    packLabel: "NAVSHRI Bottle",
    inStock: true,
    accent: "#F8E4D4",
    image: "/products/drinking-water.jpg",
    description:
      "Navshri packaged drinking water — clean, light, and ready for the road. Choose 500ml or 1L.",
    variants: {
      "500ml": { price: 10, mrp: 12 },
      "1L": { price: 20, mrp: 25 },
    },
  },
  {
    id: "mus-01",
    slug: "fresh-button-mushrooms",
    name: "Fresh Button Mushrooms",
    category: "Mushrooms",
    packLabel: "NAVSHRI Mushrooms",
    inStock: true,
    accent: "#E8EEF4",
    image: "/products/mushrooms.jpg",
    description:
      "Navshri fresh button mushrooms — farm-picked, packed, and sent to the family kitchen.",
    variants: {
      "200gm": { price: 50, mrp: 60 },
      "400gm": { price: 100, mrp: 120 },
    },
  },
  {
    id: "nb-01",
    slug: "navshri-notebook",
    name: "Navshri Notebook",
    category: "Notebooks",
    packLabel: "Explore, grow, and learn",
    inStock: true,
    accent: "#DCEAF8",
    image: "/products/notebook.jpg",
    description:
      "Navshri school notebook — English, Hindi, or Maths. One simple book for every subject, ₹30 each.",
    variants: {
      English: { price: 30, mrp: 40 },
      Hindi: { price: 30, mrp: 40 },
      Maths: { price: 30, mrp: 40 },
    },
  },
];

export function formatINR(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(value);
}

export function productSizes(product: Product): Weight[] {
  return Object.keys(product.variants);
}

export function defaultSize(product: Product): Weight {
  return productSizes(product)[0];
}

export function getVariant(product: Product, weight: Weight) {
  return product.variants[weight] ?? product.variants[defaultSize(product)];
}

export function discountPercent(price: number, mrp: number) {
  return Math.round((1 - price / mrp) * 100);
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function cartKey(productId: string, weight: Weight) {
  return `${productId}::${weight}`;
}

export function parseCartKey(key: string): { id: string; weight: Weight } {
  const [id, weight] = key.split("::");
  return { id, weight: weight || "100gm" };
}
