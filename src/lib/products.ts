export type Variant = {
  label: string;
  price: number;
  sticks: string;
};

export type ProductImage = {
  src: string;
  alt: string;
  label?: string;
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
  image?: string;
  images?: ProductImage[];
  bannerImage?: string;
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
  { label: "Zipper Pouch 90g", price: 70, sticks: "~110 sticks" },
];

const premiumVariants: Variant[] = [
  { label: "Regular", price: 15, sticks: "~45 sticks" },
  { label: "Large", price: 25, sticks: "~80 sticks" },
  { label: "Family", price: 45, sticks: "~150 sticks" },
  { label: "Zipper Pouch 90g", price: 70, sticks: "~110 sticks" },
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
    image: "/assets/Sri kanth Rose Agarbatti Pouch Design.png",
    images: [
      {
        src: "/assets/Sri kanth Rose Agarbatti Pouch Design.png",
        alt: "Sri Kanth Gulaab Agarbatti Pouch",
        label: "Pouch Pack",
      },
      {
        src: "/assets/Rose Sticker Design.png",
        alt: "Sri Kanth Rose Puja Dhoop Sticks Jar",
        label: "Dhoop Jar",
      },
      {
        src: "/assets/Sri kanth Rose Dhoop Pouch.png",
        alt: "Sri Kanth Rose Dhoop Pouch",
        label: "Dhoop Pouch",
      },
      {
        src: "/assets/Slide 1.jpg",
        alt: "Sri Kanth Complete Showcase",
        label: "Temple Range",
      },
    ],
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
    image: "/assets/Sri kanth Chandan Agarbatti Pouch Design.png",
    images: [
      {
        src: "/assets/Sri kanth Chandan Agarbatti Pouch Design.png",
        alt: "Sri Kanth Chandan Agarbatti Pouch",
        label: "Pouch Pack",
      },
      {
        src: "/assets/Chandan Sticker Design.png",
        alt: "Sri Kanth Chandan Puja Dhoop Sticks Jar",
        label: "Dhoop Jar",
      },
      {
        src: "/assets/Sri kanth Chandan Dhoop Pouch.png",
        alt: "Sri Kanth Chandan Dhoop Pouch",
        label: "Dhoop Pouch",
      },
      {
        src: "/assets/Slide 1.jpg",
        alt: "Sri Kanth Chandan Collection",
        label: "Collection",
      },
    ],
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
    image: "/assets/Sri kanth Lavender Agarbatti Pouch Design.png",
    images: [
      {
        src: "/assets/Sri kanth Lavender Agarbatti Pouch Design.png",
        alt: "Sri Kanth Lavender Agarbatti Pouch",
        label: "Pouch Pack",
      },
      {
        src: "/assets/Lavender Sticker Design.png",
        alt: "Sri Kanth Lavender Puja Dhoop Sticks Jar",
        label: "Dhoop Jar",
      },
      {
        src: "/assets/Slide 1.jpg",
        alt: "Sri Kanth Lavender Range",
        label: "Range View",
      },
    ],
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
    image: "/assets/Sri kanth Mogra Agarbatti Pouch Design.png",
    images: [
      {
        src: "/assets/Sri kanth Mogra Agarbatti Pouch Design.png",
        alt: "Sri Kanth Mogra Agarbatti Pouch",
        label: "Pouch Pack",
      },
      {
        src: "/assets/Mogra Sticker Design.png",
        alt: "Sri Kanth Mogra Puja Dhoop Sticks Jar",
        label: "Dhoop Jar",
      },
      {
        src: "/assets/Sri kanth Mogra Dhoop Pouch.png",
        alt: "Sri Kanth Mogra Dhoop Pouch",
        label: "Dhoop Pouch",
      },
      {
        src: "/assets/Slide 1.jpg",
        alt: "Sri Kanth Mogra in Range",
        label: "Range View",
      },
    ],
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
    image: "/assets/Slide 9.jpg",
    bannerImage: "/assets/Slide 9.jpg",
    images: [
      {
        src: "/assets/Slide 9.jpg",
        alt: "Neelkanth 4-in-1 Sugandhit Puja Agarbatti Kedarnath Shrine",
        label: "Kedarnath Pack",
      },
      {
        src: "/assets/Sri kanth GuggalDhoop Pouch.png",
        alt: "Sri Kanth Guggal Dhoop Pouch",
        label: "Guggal Blend",
      },
      {
        src: "/assets/Sri kanth Loban Dhoop Pouch.png",
        alt: "Sri Kanth Loban Dhoop Pouch",
        label: "Loban Blend",
      },
      {
        src: "/assets/Guggal Sticker Design.png",
        alt: "Guggal Puja Dhoop Jar",
        label: "Guggal Jar",
      },
    ],
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
    image: "/assets/Slide 2.jpg",
    bannerImage: "/assets/Slide 2.jpg",
    images: [
      {
        src: "/assets/Slide 2.jpg",
        alt: "Sri Kanth 3-in-1 Premium Agarbatti Mandapam Display",
        label: "Premium Pack",
      },
      {
        src: "/assets/Sri kanth Agarbatti Pouch Design.png",
        alt: "Sri Kanth Agarbatti Pouch",
        label: "Pouch Pack",
      },
      {
        src: "/assets/Slide 1.jpg",
        alt: "Sri Kanth Agarbatti Range",
        label: "Full Range",
      },
    ],
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
    image: "/assets/Sri kanth Agarbatti Pouch Design.png",
    bannerImage: "/assets/Slide 2.jpg",
    images: [
      {
        src: "/assets/Sri kanth Agarbatti Pouch Design.png",
        alt: "Sri Kanth 3-in-1 Agarbatti Pouch",
        label: "Pouch Pack",
      },
      {
        src: "/assets/Slide 2.jpg",
        alt: "Sri Kanth 3-in-1 Devotional Mandapam Display",
        label: "Temple Display",
      },
      {
        src: "/assets/Slide 1.jpg",
        alt: "Sri Kanth Product Showcase",
        label: "Product Line",
      },
    ],
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
    image: "/assets/Slide 8.jpg",
    bannerImage: "/assets/Slide 8.jpg",
    images: [
      {
        src: "/assets/Slide 8.jpg",
        alt: "Total Out Mosquito Repellent Sticks",
        label: "Banner View",
      },
      {
        src: "/assets/Slide 1.jpg",
        alt: "Total Out in SRAW Product Range",
        label: "Range View",
      },
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
    image: "/assets/Slide 6.jpg",
    images: [
      {
        src: "/assets/Slide 6.jpg",
        alt: "Sri Kanth Dhoop Collection",
        label: "Dhoop Range",
      },
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
    variants: [
      { label: "Pouch of 20", price: 35, sticks: "20 dhoop sticks" },
      { label: "Master Box (12 Pouches)", price: 390, sticks: "240 dhoop sticks" },
    ],
    image: "/assets/Sri kanth Chandan Dhoop Pouch.png",
    bannerImage: "/assets/Slide 6.jpg",
    images: [
      {
        src: "/assets/Sri kanth Chandan Dhoop Pouch.png",
        alt: "Sri Kanth Chandan Dhoop Pouch",
        label: "Chandan Dhoop",
      },
      {
        src: "/assets/Sri kanth GuggalDhoop Pouch.png",
        alt: "Sri Kanth Guggal Dhoop Pouch",
        label: "Guggal Dhoop",
      },
      {
        src: "/assets/Sri kanth Loban Dhoop Pouch.png",
        alt: "Sri Kanth Loban Dhoop Pouch",
        label: "Loban Dhoop",
      },
      {
        src: "/assets/Sri kanth Mogra Dhoop Pouch.png",
        alt: "Sri Kanth Mogra Dhoop Pouch",
        label: "Mogra Dhoop",
      },
      {
        src: "/assets/Sri kanth Rose Dhoop Pouch.png",
        alt: "Sri Kanth Rose Dhoop Pouch",
        label: "Rose Dhoop",
      },
      {
        src: "/assets/Slide 6.jpg",
        alt: "Sri Kanth Wholesale Dhoop Box & Master Carton",
        label: "Wholesale Pack",
      },
    ],
  },
  {
    slug: "srikanth-puja-dhoop-jar",
    name: "Srikanth Puja Dhoop Sticks (Premium Jar)",
    nameHi: "श्रीकंठ पूजा धूप स्टिक्स (प्रीमियम जार)",
    subtitle: "Puja Dhoop Sticks",
    subtitleHi: "पूजा धूप बत्ती",
    category: "Dhoop",
    tagline: "Thick, slow-burning dhoop sticks in airtight golden-lid jars.",
    description:
      "Handcrafted dhoop sticks packed in premium airtight glass jars with golden lids. Each stick releases a soothing, long-lasting aroma of authentic temple resins and pure floral extracts.",
    notes: ["Chandan", "Guggal", "Loban", "Mogra", "Rose", "Lavender"],
    burnTime: "35–45 minutes per stick",
    rating: 4.9,
    reviews: 188,
    badge: "Premium Jar",
    bestseller: true,
    colors: { base: "#b86b1f", accent: "#faebd7", label: "#7a410b" },
    variants: [
      { label: "Single Jar (40 Sticks)", price: 85, sticks: "~40 dhoop sticks" },
      { label: "Assorted Twin Pack", price: 160, sticks: "~80 dhoop sticks" },
      { label: "Complete Box of 6 Jars", price: 475, sticks: "~240 dhoop sticks" },
    ],
    image: "/assets/Chandan Sticker Design.png",
    bannerImage: "/assets/Slide 5.jpg",
    images: [
      {
        src: "/assets/Chandan Sticker Design.png",
        alt: "Chandan Puja Dhoop Jar",
        label: "Chandan Jar",
      },
      {
        src: "/assets/Guggal Sticker Design.png",
        alt: "Guggal Puja Dhoop Jar",
        label: "Guggal Jar",
      },
      {
        src: "/assets/Lobaan Sticker Design.png",
        alt: "Loban Puja Dhoop Jar",
        label: "Loban Jar",
      },
      {
        src: "/assets/Mogra Sticker Design.png",
        alt: "Mogra Puja Dhoop Jar",
        label: "Mogra Jar",
      },
      {
        src: "/assets/Rose Sticker Design.png",
        alt: "Rose Puja Dhoop Jar",
        label: "Rose Jar",
      },
      {
        src: "/assets/Lavender Sticker Design.png",
        alt: "Lavender Puja Dhoop Jar",
        label: "Lavender Jar",
      },
      {
        src: "/assets/Slide 5.jpg",
        alt: "Sri Kanth Puja Dhoop Sticks Waterfall Display",
        label: "Jars Collection",
      },
    ],
  },
  {
    slug: "srikanth-dhoop-pouch",
    name: "Srikanth Dhoop Zipper Pouch",
    nameHi: "श्रीकंठ धूप ज़िपर पाउच",
    subtitle: "Dhoop Zipper Pack",
    subtitleHi: "धूप पाउच",
    category: "Dhoop",
    tagline: "Moisture-lock zipper pouch with 20 pure dhoop sticks.",
    description:
      "Pure organic dhoop sticks sealed in moisture-proof reclosable zipper pouches. Formulated to retain natural oils and provide a clean, divine smoke for pooja and meditation.",
    notes: ["Chandan", "Guggal", "Loban", "Rose", "Mogra"],
    burnTime: "25–30 minutes per stick",
    rating: 4.8,
    reviews: 215,
    colors: { base: "#d95f02", accent: "#fedec9", label: "#8a3c01" },
    variants: [
      { label: "Single Pouch (20 Sticks)", price: 35, sticks: "20 sticks" },
      { label: "Pack of 3 Pouches", price: 99, sticks: "60 sticks" },
      { label: "Family Bundle of 5 Fragrances", price: 165, sticks: "100 sticks" },
    ],
    image: "/assets/Sri kanth Chandan Dhoop Pouch.png",
    bannerImage: "/assets/Slide 6.jpg",
    images: [
      {
        src: "/assets/Sri kanth Chandan Dhoop Pouch.png",
        alt: "Sri Kanth Chandan Dhoop Pouch",
        label: "Chandan",
      },
      {
        src: "/assets/Sri kanth GuggalDhoop Pouch.png",
        alt: "Sri Kanth Guggal Dhoop Pouch",
        label: "Guggal",
      },
      {
        src: "/assets/Sri kanth Loban Dhoop Pouch.png",
        alt: "Sri Kanth Loban Dhoop Pouch",
        label: "Loban",
      },
      {
        src: "/assets/Sri kanth Mogra Dhoop Pouch.png",
        alt: "Sri Kanth Mogra Dhoop Pouch",
        label: "Mogra",
      },
      {
        src: "/assets/Sri kanth Rose Dhoop Pouch.png",
        alt: "Sri Kanth Rose Dhoop Pouch",
        label: "Rose",
      },
      {
        src: "/assets/Slide 6.jpg",
        alt: "Sri Kanth Dhoop Boxes & Wholesale Carton",
        label: "Wholesale Pack",
      },
    ],
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
    image: "/assets/Slide 5.jpg",
    bannerImage: "/assets/Slide 5.jpg",
    images: [
      {
        src: "/assets/Slide 5.jpg",
        alt: "Sri Kanth Puja Dhoop Sticks Jars Collection",
        label: "Jars Collection",
      },
      {
        src: "/assets/Chandan Sticker Design.png",
        alt: "Chandan Puja Dhoop Jar",
        label: "Chandan Jar",
      },
      {
        src: "/assets/Guggal Sticker Design.png",
        alt: "Guggal Puja Dhoop Jar",
        label: "Guggal Jar",
      },
      {
        src: "/assets/Lobaan Sticker Design.png",
        alt: "Loban Puja Dhoop Jar",
        label: "Loban Jar",
      },
      {
        src: "/assets/Slide 6.jpg",
        alt: "Sri Kanth Dhoop Assortment",
        label: "Dhoop Assortment",
      },
    ],
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
