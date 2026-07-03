import { InternalAxiosRequestConfig, AxiosResponse } from "axios";

export const setupInterceptors = (client: any) => {
  client.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    },
    (error: any) => {
      return Promise.reject(error);
    }
  );

  client.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: any) => {
      if (error.response && error.response.status === 401) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
          localStorage.removeItem("customer");
          // Optionally trigger event or window reload to update UI state
        }
      }
      return Promise.reject(error);
    }
  );
};
