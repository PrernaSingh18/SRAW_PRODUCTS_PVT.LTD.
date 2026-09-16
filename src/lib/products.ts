export type Variant = {
  label: string;
  price: number;
  sticks: string;
};

export type Product = {
  slug: string;
  name: string;
  nameHi: string;
  subtitle: string;
  subtitleHi: string;
  category: Category;
  tagline: string;
  description: string;
  notes: string[];
  burnTime: string;
  rating: number;
  reviews: number;
  badge?: string;
  bestseller?: boolean;
  colors: { base: string; accent: string; label: string };
  variants: Variant[];
};

export const categories = [
  "Incense Sticks",
  "Dhoop",
  "Cones",
  "Mosquito Repellent",
] as const;

export type Category = (typeof categories)[number];

const standardVariants: Variant[] = [
  { label: "Small", price: 7, sticks: "~20 sticks" },
  { label: "Regular", price: 15, sticks: "~45 sticks" },
  { label: "Large", price: 25, sticks: "~80 sticks" },
  { label: "Family", price: 45, sticks: "~150 sticks" },
];

const premiumVariants: Variant[] = [
  { label: "Regular", price: 15, sticks: "~45 sticks" },
  { label: "Large", price: 25, sticks: "~80 sticks" },
  { label: "Family", price: 45, sticks: "~150 sticks" },
];

export const products: Product[] = [
  {
    slug: "gulaab",
    name: "Gulaab",
    nameHi: "गुलाब",
    subtitle: "Incense Sticks",
    subtitleHi: "अगरबत्ती",
    category: "Incense Sticks",
    tagline: "Fresh rose petals, gathered at dawn.",
    description:
      "A soft, romantic rose agarbatti rolled on bamboo with natural rose absolute and halmaddi. Gulaab fills a room with the calm of a temple courtyard after morning prayers.",
    notes: ["Rose absolute", "Halmaddi resin", "Honey wax"],
    burnTime: "30–35 minutes per stick",
    rating: 4.8,
    reviews: 412,
    bestseller: true,
    colors: { base: "#d62246", accent: "#fce0e6", label: "#8e1230" },
    variants: standardVariants,
  },
  {
    slug: "chandan",
    name: "Chandan",
    nameHi: "चंदन",
    subtitle: "Incense Sticks",
    subtitleHi: "अगरबत्ती",
    category: "Incense Sticks",
    tagline: "Warm sandalwood for daily pooja.",
    description:
      "Our most traditional fragrance. Creamy sandalwood powder blended with woody oils gives Chandan its steady, grounding smoke — the scent most Indian homes grew up with.",
    notes: ["Sandalwood", "Cedar", "Vetiver"],
    burnTime: "32–38 minutes per stick",
    rating: 4.9,
    reviews: 738,
    bestseller: true,
    badge: "Most loved",
    colors: { base: "#d98324", accent: "#fbebd3", label: "#8f4e0d" },
    variants: standardVariants,
  },
  {
    slug: "lavender",
    name: "Lavender",
    nameHi: "लैवेंडर",
    subtitle: "Incense Sticks",
    subtitleHi: "अगरबत्ती",
    category: "Incense Sticks",
    tagline: "Quiet evenings and slower breathing.",
    description:
      "A modern floral for unwinding. Lavender oil is layered over a light woody base so the smoke stays clean and never sharp — ideal for bedrooms and meditation corners.",
    notes: ["Lavender oil", "White musk", "Bamboo"],
    burnTime: "28–32 minutes per stick",
    rating: 4.7,
    reviews: 289,
    colors: { base: "#6d4ac4", accent: "#e9e1fb", label: "#422a86" },
    variants: standardVariants,
  },
  {
    slug: "mogra",
    name: "Mogra",
    nameHi: "मोगरा",
    subtitle: "Incense Sticks",
    subtitleHi: "अगरबत्ती",
    category: "Incense Sticks",
    tagline: "Night-blooming jasmine, bottled.",
    description:
      "Rich jasmine sambac with a hint of green freshness. Mogra is the fragrance of festive evenings, garlands and family gatherings.",
    notes: ["Jasmine sambac", "Green leaf", "Amber"],
    burnTime: "30–35 minutes per stick",
    rating: 4.8,
    reviews: 356,
    bestseller: true,
    colors: { base: "#1f8a5b", accent: "#d8f2e5", label: "#0f5c3c" },
    variants: standardVariants,
  },
  {
    slug: "neelkanth",
    name: "Neelkanth",
    nameHi: "नीलकंठ",
    subtitle: "Incense Sticks",
    subtitleHi: "अगरबत्ती",
    category: "Incense Sticks",
    tagline: "A temple blend of resin and herbs.",
    description:
      "Named for the blue-throated one. Guggul resin, loban and forest herbs are hand-blended for a deep, smoky devotional fragrance used in aarti and havan.",
    notes: ["Guggul", "Loban", "Forest herbs"],
    burnTime: "35–40 minutes per stick",
    rating: 4.6,
    reviews: 198,
    colors: { base: "#1d63b8", accent: "#dce9fa", label: "#123f7a" },
    variants: standardVariants,
  },
  {
    slug: "black-premium-3-in-1",
    name: "3 In 1 Black Premium",
    nameHi: "ब्लैक प्रीमियम ३-इन-१",
    subtitle: "Incense Sticks",
    subtitleHi: "अगरबत्ती",
    category: "Incense Sticks",
    tagline: "Three signature fragrances, one box.",
    description:
      "Our premium charcoal-free black sticks combine rose, sandal and mogra in a single pack so you can match the fragrance to the mood of the day.",
    notes: ["Rose", "Sandal", "Mogra"],
    burnTime: "34–40 minutes per stick",
    rating: 4.7,
    reviews: 241,
    badge: "Premium",
    colors: { base: "#241c2e", accent: "#dcd6e4", label: "#0e0a14" },
    variants: premiumVariants,
  },
  {
    slug: "srikanth-3-in-1",
    name: "Srikanth 3 In 1",
    nameHi: "श्रीकंठ ३-इन-१",
    subtitle: "Incense Sticks",
    subtitleHi: "अगरबत्ती",
    category: "Incense Sticks",
    tagline: "The house favourite, in a value pack.",
    description:
      "The classic Srikanth trio — a balanced everyday assortment for households that light agarbatti morning and evening.",
    notes: ["Floral", "Woody", "Herbal"],
    burnTime: "30–36 minutes per stick",
    rating: 4.6,
    reviews: 310,
    colors: { base: "#e2590b", accent: "#fce6d4", label: "#9a3a05" },
    variants: premiumVariants,
  },
  {
    slug: "total-out",
    name: "Total Out",
    nameHi: "टोटल आउट",
    subtitle: "Citronella Sticks",
    subtitleHi: "सिट्रोनेला बत्ती",
    category: "Mosquito Repellent",
    tagline: "Citronella that clears the room.",
    description:
      "A natural citronella and lemongrass stick that keeps mosquitoes away without harsh chemical vapour. Safe for verandahs, courtyards and evening study rooms.",
    notes: ["Citronella", "Lemongrass", "Neem"],
    burnTime: "40–45 minutes per stick",
    rating: 4.5,
    reviews: 167,
    badge: "Outdoor",
    colors: { base: "#6c9b12", accent: "#edf6d6", label: "#47670a" },
    variants: [
      { label: "Regular", price: 15, sticks: "~30 sticks" },
      { label: "Large", price: 25, sticks: "~60 sticks" },
    ],
  },
  {
    slug: "sraw-dhoop-batti-cone",
    name: "SRAW Dhoop Batti Cone",
    nameHi: "धूप बत्ती शंकु",
    subtitle: "Dhoop Cones",
    subtitleHi: "धूप शंकु",
    category: "Cones",
    tagline: "Bamboo-free cones, pure smoke.",
    description:
      "Hand-pressed cones made without bamboo sticks, so there is no burnt-wood note. Light one in a brass plate for a slow, resinous fragrance.",
    notes: ["Benzoin", "Sandal dust", "Camphor"],
    burnTime: "18–22 minutes per cone",
    rating: 4.6,
    reviews: 205,
    colors: { base: "#9a5b2e", accent: "#f4e3d3", label: "#61351a" },
    variants: [
      { label: "Box of 12", price: 15, sticks: "12 cones" },
      { label: "Box of 24", price: 25, sticks: "24 cones" },
    ],
  },
  {
    slug: "srikanth-premium-dhoop",
    name: "Shrikanth Premium Dhoop",
    nameHi: "श्रीकंठ प्रीमियम धूप",
    subtitle: "Dhoop Sticks",
    subtitleHi: "धूप बत्ती",
    category: "Dhoop",
    tagline: "Thick, slow-burning temple dhoop.",
    description:
      "Bamboo-free wet dhoop rolled by hand with halmaddi and herbal gums. Burns long and even, with a rich resin trail that lingers after the flame is out.",
    notes: ["Halmaddi", "Guggul", "Herbal gum"],
    burnTime: "25–30 minutes per stick",
    rating: 4.8,
    reviews: 264,
    colors: { base: "#c21d2c", accent: "#fbdddf", label: "#7c1119" },
    variants: [{ label: "Pack of 12", price: 15, sticks: "12 dhoop sticks" }],
  },
  {
    slug: "srikanth-deluxe-premium-dhoop",
    name: "Shrikanth Deluxe Premium Dhoop",
    nameHi: "श्रीकंठ डीलक्स धूप",
    subtitle: "Dhoop Sticks",
    subtitleHi: "धूप बत्ती",
    category: "Dhoop",
    tagline: "Our richest resin blend.",
    description:
      "The deluxe edition of our dhoop, with a higher share of natural resins and essential oils for festivals, weddings and temple use.",
    notes: ["Oudh accord", "Saffron", "Resins"],
    burnTime: "28–34 minutes per stick",
    rating: 4.9,
    reviews: 152,
    badge: "Deluxe",
    colors: { base: "#3a2e8c", accent: "#e1def7", label: "#241c5c" },
    variants: [{ label: "Pack of 12", price: 15, sticks: "12 dhoop sticks" }],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function fromPrice(product: Product) {
  return Math.min(...product.variants.map((v) => v.price));
}

export function formatINR(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}
