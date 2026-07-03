import apiClient from "../api/client";
import { ENDPOINTS } from "../api/endpoints";
import { Order, ApiResponse } from "../api/types";

export const orderService = {
  async getMyOrders() {
    const response = await apiClient.get<ApiResponse<Order[]> | any>(ENDPOINTS.ORDERS.MY_ORDERS);
    if (response.data && response.data.data) {
      return response.data.data as Order[];
    }
    return (response.data || []) as Order[];
  },

  async placeOrder(data: { addressId: string; isStorePickup: boolean; [key: string]: any }) {
    const response = await apiClient.post<ApiResponse<Order> | any>(ENDPOINTS.ORDERS.PLACE, data);
    if (response.data && response.data.data) {
      return response.data.data as Order;
    }
    return response.data as Order;
  },

  async getOrderStatusList() {
    const response = await apiClient.get<ApiResponse<any> | any>(ENDPOINTS.ORDERS.STATUS);
    return response.data;
  },
};
export default orderService;
