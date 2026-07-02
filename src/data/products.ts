export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  purity: string;
  weight: number;
  images: string[];
  category: string;
  description: string;
  rating: number;
  reviewsCount: number;
  discountper?: number;
  metal: "gold" | "silver" | "platinum";
}

// 6 extremely neat e-commerce studio shots with pure white or light gray background
const IMAGES_BY_CATEGORY: Record<string, string[]> = {
  rings: [
    "https://aupay-img.s3.eu-north-1.amazonaws.com/kavithajewellers_new/webadmin/assets/products/1782913334685_UJOQ30651_zoom.webp",
    "https://aupay-img.s3.eu-north-1.amazonaws.com/kavithajewellers_new/webadmin/assets/products/1782892614062_JNIR8329_zoom.webp"
  ],
  earrings: [
    "https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=500&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=500&h=500&fit=crop&q=80"
  ],
  "bangles-bracelets": [
    "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&h=500&fit=crop&q=80"
  ],
  solitaire: [
    "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=500&h=500&fit=crop&q=80"
  ],
  mangalsutra: [
    "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=500&h=500&fit=crop&q=80"
  ],
  "necklaces-pendants": [
    "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=500&h=500&fit=crop&q=80"
  ]
};

const getImagesForCategory = (category: string, id: number): string[] => {
  const images = IMAGES_BY_CATEGORY[category] || IMAGES_BY_CATEGORY["rings"];
  return [images[id % images.length]];
};

const baseProducts = [
  {
    name: "Auris Spark Drop Earrings",
    price: 45733,
    originalPrice: 48140,
    purity: "22KT Gold",
    weight: 4.8,
    category: "earrings",
    description: "Elegant Auris Spark Drop Earrings in 22KT yellow gold, designed to add brilliance to your special moments.",
    rating: 4.8,
    reviewsCount: 12,
    discountper: 2.6,
    metal: "gold" as const
  },
  {
    name: "Classic Gold Band Ring",
    price: 24500,
    originalPrice: 24500,
    purity: "22KT Gold",
    weight: 3.2,
    category: "rings",
    description: "Timeless 22KT yellow gold band ring, perfect for daily wear or stackable sets.",
    rating: 4.5,
    reviewsCount: 8,
    metal: "gold" as const
  },
  {
    name: "Solitaire Diamond Studs",
    price: 95000,
    originalPrice: 105000,
    purity: "18KT Gold",
    weight: 1.5,
    category: "solitaire",
    description: "Stunning 18KT gold solitaire diamond earrings with brilliant round cut stones.",
    rating: 4.9,
    reviewsCount: 5,
    metal: "gold" as const
  },
  {
    name: "Traditional Gold Bangle",
    price: 68900,
    originalPrice: 72000,
    purity: "22KT Gold",
    weight: 8.5,
    category: "bangles-bracelets",
    description: "Intricately detailed 22KT yellow gold bangle with a classic Indian traditional look.",
    rating: 4.7,
    reviewsCount: 14,
    metal: "gold" as const
  },
  {
    name: "Divine Floral Pendant Necklace",
    price: 32000,
    originalPrice: 35000,
    purity: "22KT Gold",
    weight: 3.9,
    category: "necklaces-pendants",
    description: "Floral design pendant crafted in 22KT gold featuring custom enamel work.",
    rating: 4.6,
    reviewsCount: 9,
    metal: "gold" as const
  },
  {
    name: "Infinity Diamond Ring",
    price: 38200,
    originalPrice: 42000,
    purity: "18KT Gold",
    weight: 2.8,
    category: "rings",
    description: "Charming infinity style ring set with glistening round diamonds in 18KT gold.",
    rating: 4.8,
    reviewsCount: 11,
    metal: "gold" as const
  },
  {
    name: "Shimmering Silver Anklet",
    price: 4500,
    originalPrice: 5000,
    purity: "999 Silver",
    weight: 12.0,
    category: "bangles-bracelets",
    description: "Delightful pure sterling silver anklet featuring tiny bells and bead work.",
    rating: 4.4,
    reviewsCount: 22,
    metal: "silver" as const
  },
  {
    name: "Rose Gold Mangalsutra",
    price: 52000,
    originalPrice: 55000,
    purity: "18KT Gold",
    weight: 5.5,
    category: "mangalsutra",
    description: "Contemporary style rose gold mangalsutra with black beads and circular diamond cluster.",
    rating: 4.7,
    reviewsCount: 7,
    metal: "gold" as const
  },
  {
    name: "Classic Hoop Earrings",
    price: 18500,
    originalPrice: 19500,
    purity: "22KT Gold",
    weight: 2.2,
    category: "earrings",
    description: "Simple yet stylish 22KT yellow gold hoop earrings, a must-have classic.",
    rating: 4.6,
    reviewsCount: 15,
    metal: "gold" as const
  },
  {
    name: "Elegant Diamond Bracelet",
    price: 125000,
    originalPrice: 135000,
    purity: "18KT Gold",
    weight: 7.2,
    category: "bangles-bracelets",
    description: "Stunning link bracelet set with premium round diamonds in 18KT white gold.",
    rating: 4.9,
    reviewsCount: 3,
    metal: "gold" as const
  }
];

export const products: Product[] = Array.from({ length: 110 }).map((_, index) => {
  const base = baseProducts[index % baseProducts.length];
  const id = index + 1;

  // Let the first 10 items remain as defined originally but with dynamic 1:1 images
  if (index < 10) {
    return {
      id,
      ...base,
      images: getImagesForCategory(base.category, id)
    };
  }

  // Vary price mathematically based on index
  const priceModifier = 0.65 + (index * 0.04) % 0.8; 
  const price = Math.round((base.price * priceModifier) / 100) * 100;
  const originalPrice = Math.round((base.originalPrice * priceModifier) / 100) * 100;

  // Distribute categories evenly
  const categoriesList = ["rings", "earrings", "bangles-bracelets", "solitaire", "mangalsutra"];
  const category = categoriesList[index % categoriesList.length];

  // Distribute metals
  const metalsList: ("gold" | "silver" | "platinum")[] = ["gold", "silver", "platinum"];
  const metal = metalsList[index % metalsList.length];

  // Assign purity based on metal type
  let purity = "22KT Gold";
  if (metal === "silver") {
    purity = "999 Silver";
  } else if (metal === "platinum") {
    purity = "950 Platinum";
  } else {
    purity = index % 2 === 0 ? "22KT Gold" : "18KT Gold";
  }

  // Vary names
  const prefixes = ["Auris", "Classic", "Divine", "Imperial", "Sparkling", "Ethereal", "Ornate", "Luminous", "Regal", "Majestic"];
  const prefix = prefixes[index % prefixes.length];
  const cleanBaseName = base.name.replace(/^(Auris|Classic|Divine|Traditional|Infinity|Shimmering|Rose Gold|Elegant)\s+/, "");
  const name = `${prefix} ${cleanBaseName}`;

  // Vary weight
  const weight = parseFloat((base.weight * (0.5 + (index * 0.06) % 1.2)).toFixed(1));

  // Vary ratings & reviews
  const rating = parseFloat((4.1 + (index * 0.03) % 0.8).toFixed(1));
  const reviewsCount = Math.round(3 + (index * 4) % 40);

  // Discount percentage (random-like helper)
  const discountper = index % 3 === 0 ? parseFloat((1.5 + (index * 0.1) % 4.5).toFixed(1)) : undefined;

  // Dynamic image matching this item's category
  const images = getImagesForCategory(category, id);

  return {
    id,
    name,
    price,
    originalPrice,
    purity,
    weight,
    images,
    category,
    description: `A beautiful ${purity} ${name} from our special collection. ${base.description}`,
    rating,
    reviewsCount,
    discountper,
    metal
  };
});
