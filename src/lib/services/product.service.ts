import apiClient from "../api/client";
import { ENDPOINTS } from "../api/endpoints";
import { Product, ApiResponse } from "../api/types";

export const productService = {
  async getAll() {
    const response = await apiClient.get<ApiResponse<Product[]> | any>(ENDPOINTS.PRODUCTS.ALL);
    if (response.data && response.data.data) {
      return response.data.data as Product[];
    }
    return (response.data || []) as Product[];
  },

  async getById(id: string) {
    const response = await apiClient.get<ApiResponse<Product> | any>(ENDPOINTS.PRODUCTS.GET_BY_ID(id));
    if (response.data && response.data.data) {
      return response.data.data as Product;
    }
    return response.data as Product;
  },

  async getByCategory(categoryId: string) {
    const response = await apiClient.get<ApiResponse<Product[]> | any>(ENDPOINTS.PRODUCTS.GET_BY_CATEGORY(categoryId));
    if (response.data && response.data.data) {
      return response.data.data as Product[];
    }
    return (response.data || []) as Product[];
  },

  async getBySubcategory(subcategoryId: string) {
    const response = await apiClient.get<ApiResponse<Product[]> | any>(ENDPOINTS.PRODUCTS.GET_BY_SUBCATEGORY(subcategoryId));
    if (response.data && response.data.data) {
      return response.data.data as Product[];
    }
    return (response.data || []) as Product[];
  },

  async search(query: any) {
    const response = await apiClient.post<ApiResponse<Product[]> | any>(ENDPOINTS.PRODUCTS.SEARCH, query);
    if (response.data && response.data.data) {
      return response.data.data as Product[];
    }
    return (response.data || []) as Product[];
  },
};
