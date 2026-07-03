import apiClient from "../api/client";
import { ENDPOINTS } from "../api/endpoints";
import { Category, ApiResponse } from "../api/types";

export const categoryService = {
  async getAll() {
    const response = await apiClient.get<ApiResponse<Category[]> | any>(ENDPOINTS.CATEGORIES.ALL);
    if (response.data && response.data.data) {
      return response.data.data as Category[];
    }
    return (response.data || []) as Category[];
  },

  async getAllActive() {
    const response = await apiClient.get<ApiResponse<Category[]> | any>(ENDPOINTS.CATEGORIES.ALL_ACTIVE);
    if (response.data && response.data.data) {
      return response.data.data as Category[];
    }
    return (response.data || []) as Category[];
  },

  async getById(id: string) {
    const response = await apiClient.get<ApiResponse<Category> | any>(ENDPOINTS.CATEGORIES.GET_BY_ID(id));
    if (response.data && response.data.data) {
      return response.data.data as Category;
    }
    return response.data as Category;
  },
};
