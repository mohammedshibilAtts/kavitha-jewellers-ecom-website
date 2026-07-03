export const ENDPOINTS = {
  // Authentication & Customer endpoints
  AUTH: {
    SIGNUP: "/client/customer/signup",
    LOGIN: "/client/customer/login",
    GENERATE_OTP: "/client/customer/generate-otp",
    VERIFY_OTP: "/client/customer/verify-otp",
    FORGOT_PASSWORD: "/client/customer/forgot-password",
    CHANGE_PASSWORD: "/client/customer/changepass",
    GET_CURRENT: (id: string) => `/client/customer/${id}`,
  },

  // Products
  PRODUCTS: {
    ALL: "/shop/products/all",
    GET_BY_ID: (id: string) => `/shop/products/${id}`,
    GET_BY_CATEGORY: (categoryId: string) => `/client/product/category/${categoryId}`,
    GET_BY_SUBCATEGORY: (subcategoryId: string) => `/shop/products/subcategory/${subcategoryId}`,
    SEARCH: "/shop/products/search",
  },

  // Categories
  CATEGORIES: {
    ALL: "/client/category/all",
    ALL_ACTIVE: "/client/category/all",
    GET_BY_ID: (id: string) => `/client/category/${id}`,
  },

  // Cart
  CART: {
    GET: "/shop/cart/carts",
    CREATE: "/shop/cart/carts",
    ADD_ITEM: "/shop/cart/carts/items",
    REMOVE_ITEM: "/shop/cart/carts/items",
  },

  // Wishlist
  WISHLIST: {
    GET: "/client/wishlist",
    TOGGLE: "/client/wishlist",
  },

  // Orders
  ORDERS: {
    PLACE: "/shop/order/order",
    MY_ORDERS: "/shop/order/order",
    STATUS: "/shop/order/status",
  },
  // Schemes
  SCHEMES: {
    ALL: "/client/scheme",
  },
};
