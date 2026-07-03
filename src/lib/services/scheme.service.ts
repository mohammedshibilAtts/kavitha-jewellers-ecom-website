import apiClient from "../api/client";
import { ENDPOINTS } from "../api/endpoints";
import { Scheme, ApiResponse } from "../api/types";

export const schemeService = {
  async getAll() {
    const response = await apiClient.get<ApiResponse<Scheme[]> | any>(ENDPOINTS.SCHEMES.ALL);
    if (response.data && response.data.data) {
      return response.data.data as Scheme[];
    }
    return (response.data || []) as Scheme[];
  },
};
