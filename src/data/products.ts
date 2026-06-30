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
  discountper?:number;
  metal: "gold" | "silver" | "platinum";
}

export const products: Product[] = [
  {
    id: 1,
    name: "Auris Spark Drop Earrings",
    price: 45733,
    originalPrice: 48140,
    purity: "22KT Gold",
    weight: 4.8,
    images: ["/images/earring_product.png"],
    category: "earrings",
    description: "Elegant Auris Spark Drop Earrings in 22KT yellow gold, designed to add brilliance to your special moments.",
    rating: 4.8,
    reviewsCount: 12,
    discountper:2.6,
    metal: "gold"
  },
  {
    id: 2,
    name: "Classic Gold Band Ring",
    price: 24500,
    originalPrice: 24500,
    purity: "22KT Gold",
    weight: 3.2,
    images: ["/images/earring_product.png"],
    category: "rings",
    description: "Timeless 22KT yellow gold band ring, perfect for daily wear or stackable sets.",
    rating: 4.5,
    reviewsCount: 8,
    metal: "gold"
  },
  {
    id: 3,
    name: "Solitaire Diamond Studs",
    price: 95000,
    originalPrice: 105000,
    purity: "18KT Gold",
    weight: 1.5,
    images: ["/images/earring_product.png"],
    category: "solitaire",
    description: "Stunning 18KT gold solitaire diamond earrings with brilliant round cut stones.",
    rating: 4.9,
    reviewsCount: 5,
    metal: "gold"
  },
  {
    id: 4,
    name: "Traditional Gold Bangle",
    price: 68900,
    originalPrice: 72000,
    purity: "22KT Gold",
    weight: 8.5,
    images: ["/images/earring_product.png"],
    category: "bangles-bracelets",
    description: "Intricately detailed 22KT yellow gold bangle with a classic Indian traditional look.",
    rating: 4.7,
    reviewsCount: 14,
    metal: "gold"
  },
  {
    id: 5,
    name: "Divine Floral Pendant Necklace",
    price: 32000,
    originalPrice: 35000,
    purity: "22KT Gold",
    weight: 3.9,
    images: ["/images/earring_product.png"],
    category: "necklaces-pendants",
    description: "Floral design pendant crafted in 22KT gold featuring custom enamel work.",
    rating: 4.6,
    reviewsCount: 9,
    metal: "gold"
  },
  {
    id: 6,
    name: "Infinity Diamond Ring",
    price: 38200,
    originalPrice: 42000,
    purity: "18KT Gold",
    weight: 2.8,
    images: ["/images/earring_product.png"],
    category: "rings",
    description: "Charming infinity style ring set with glistening round diamonds in 18KT gold.",
    rating: 4.8,
    reviewsCount: 11,
    metal: "gold"
  },
  {
    id: 7,
    name: "Shimmering Silver Anklet",
    price: 4500,
    originalPrice: 5000,
    purity: "999 Silver",
    weight: 12.0,
    images: ["/images/earring_product.png"],
    category: "bangles-bracelets",
    description: "Delightful pure sterling silver anklet featuring tiny bells and bead work.",
    rating: 4.4,
    reviewsCount: 22,
    metal: "silver"
  },
  {
    id: 8,
    name: "Rose Gold Mangalsutra",
    price: 52000,
    originalPrice: 55000,
    purity: "18KT Gold",
    weight: 5.5,
    images: ["/images/earring_product.png"],
    category: "mangalsutra",
    description: "Contemporary style rose gold mangalsutra with black beads and circular diamond cluster.",
    rating: 4.7,
    reviewsCount: 7,
    metal: "gold"
  },
  {
    id: 9,
    name: "Classic Hoop Earrings",
    price: 18500,
    originalPrice: 19500,
    purity: "22KT Gold",
    weight: 2.2,
    images: ["/images/earring_product.png"],
    category: "earrings",
    description: "Simple yet stylish 22KT yellow gold hoop earrings, a must-have classic.",
    rating: 4.6,
    reviewsCount: 15,
    metal: "gold"
  },
  {
    id: 10,
    name: "Elegant Diamond Bracelet",
    price: 125000,
    originalPrice: 135000,
    purity: "18KT Gold",
    weight: 7.2,
    images: ["/images/earring_product.png"],
    category: "bangles-bracelets",
    description: "Stunning link bracelet set with premium round diamonds in 18KT white gold.",
    rating: 4.9,
    reviewsCount: 3,
    metal: "gold"
  }
];
