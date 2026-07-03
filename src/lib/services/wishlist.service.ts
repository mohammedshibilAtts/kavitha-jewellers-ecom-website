import apiClient from "../api/client";
import { ENDPOINTS } from "../api/endpoints";
import { ApiResponse } from "../api/types";

export const wishlistService = {
  async getWishlist(customerId: string) {
    const response = await apiClient.get<ApiResponse<any[]> | any>(
      `${ENDPOINTS.WISHLIST.GET}?customer=${customerId}`
    );
    if (response.data && response.data.data) {
      return response.data.data;
    }
    return response.data || [];
  },

  async toggleWishlist(customerId: string, itemId: string) {
    const response = await apiClient.post<ApiResponse<any> | any>(ENDPOINTS.WISHLIST.TOGGLE, {
      id_customer: customerId,
      itemId,
    });
    return response.data;
  },
};
export default wishlistService;
