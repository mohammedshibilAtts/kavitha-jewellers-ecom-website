export interface Product {
  _id: string;
  id?: number; // legacy support
  name: string;
  price: number;
  originalPrice?: number;
  purity: string;
  weight: number;
  images: string[];
  category: string; // Category string name or ID reference
  description: string;
  rating?: number;
  reviewsCount?: number;
  discountper?: number;
  metal: "gold" | "silver" | "platinum" | string;
  isActive?: boolean;
  bestSeller?: boolean;
  sku?: string;
  isSold?: boolean;
}

export interface Category {
  _id: string;
  category_name: string;
  name?: string;
  image?: string;
  categoryBanner?: string;
  metal_name?: string;
  pathurl?: string;
  isActive?: boolean;
  branch?: string;
  metal?: string;
}

export interface CartItem {
  product: Product | string;
  quantity: number;
  weight?: number;
  selectedSize?: string;
  purity?: string;
}

export interface Cart {
  _id: string;
  customer: string;
  items: CartItem[];
  totalPrice: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Customer {
  _id: string;
  mobile: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  cus_img?: string;
  id_proof?: string;
  isActive?: boolean;
  branch?: string;
  walletBalance?: number;
}

export interface OrderItem {
  product: Product | string;
  quantity: number;
  price: number;
  weight?: number;
  purity?: string;
  selectedSize?: string;
}

export interface Order {
  _id: string;
  customer: string;
  items: OrderItem[];
  totalAmount: number;
  paymentStatus: "pending" | "paid" | "failed";
  orderStatus: "ordered" | "shipped" | "delivered" | "cancelled";
  deliveryAddress?: {
    fullname: string;
    mobile: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pincode: string;
  };
  trackingId?: string;
  paymentId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T> {
  status: string;
  message?: string;
  data: T;
}

export interface AuthResponse {
  status: string;
  token: string;
  customer: Customer;
}

export interface Scheme {
  _id: string;
  scheme_name: string;
  logo: string;
  scheme_type: number;
  description: any[];
  pathurl: string;
}

