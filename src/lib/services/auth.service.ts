import apiClient from "../api/client";
import { ENDPOINTS } from "../api/endpoints";
import { AuthResponse, Customer, ApiResponse } from "../api/types";

export const authService = {
  async signup(data: { mobile: string; firstname: string; password?: string }) {
    const response = await apiClient.post<AuthResponse>(ENDPOINTS.AUTH.SIGNUP, data);
    if (response.data && response.data.token) {
      this.setSession(response.data.token, response.data.customer);
    }
    return response.data;
  },

  async login(data: { mobile: string; password?: string }) {
    const response = await apiClient.post<AuthResponse>(ENDPOINTS.AUTH.LOGIN, data);
    if (response.data && response.data.token) {
      this.setSession(response.data.token, response.data.customer);
    }
    return response.data;
  },

  async generateOtp(mobile: string) {
    const response = await apiClient.post<ApiResponse<any>>(ENDPOINTS.AUTH.GENERATE_OTP, { mobile });
    return response.data;
  },

  async verifyOtp(data: { mobile: string; otp: string }) {
    const response = await apiClient.post<ApiResponse<any>>(ENDPOINTS.AUTH.VERIFY_OTP, data);
    return response.data;
  },

  async forgotPassword(data: { mobile: string; mpin: string }) {
    const response = await apiClient.post<ApiResponse<any>>(ENDPOINTS.AUTH.FORGOT_PASSWORD, data);
    return response.data;
  },

  async getProfile(id: string) {
    const response = await apiClient.get<ApiResponse<Customer>>(ENDPOINTS.AUTH.GET_CURRENT(id));
    return response.data;
  },

  setSession(token: string, customer: Customer) {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
      localStorage.setItem("customer", JSON.stringify(customer));
    }
  },

  logout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("customer");
    }
  },

  getCurrentUser(): Customer | null {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("customer");
      return data ? JSON.parse(data) : null;
    }
    return null;
  },

  getToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  },
};
