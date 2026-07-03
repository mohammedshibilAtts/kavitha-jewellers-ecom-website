import apiClient from "../api/client";
import { ENDPOINTS } from "../api/endpoints";
import { Cart, ApiResponse } from "../api/types";

export const cartService = {
  async getCart() {
    const response = await apiClient.get<ApiResponse<Cart> | any>(ENDPOINTS.CART.GET);
    if (response.data && response.data.data) {
      return response.data.data as Cart;
    }
    return response.data as Cart;
  },

  async addToCart(itemId: string, collectionId?: string) {
    const response = await apiClient.post<ApiResponse<Cart> | any>(ENDPOINTS.CART.CREATE, {
      itemId,
      collectionId,
    });
    if (response.data && response.data.data) {
      return response.data.data as Cart;
    }
    return response.data as Cart;
  },

  async removeFromCart(itemId: string) {
    const response = await apiClient.delete<ApiResponse<any> | any>(ENDPOINTS.CART.REMOVE_ITEM, {
      data: { itemId },
    });
    return response.data;
  },
};
export default cartService;
