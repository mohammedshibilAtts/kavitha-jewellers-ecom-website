import axios from "axios";
import { setupInterceptors } from "./interceptors";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "";

export const apiClient = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

setupInterceptors(apiClient);
export default apiClient;
