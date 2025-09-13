import { redirect } from "next/navigation";

import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

import cookie from "src/lib/cookie";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

export const baseAxios = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_APP_URL}/Prod/api/v1`,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
} as AxiosRequestConfig);

// Add request interceptor to include token
baseAxios.interceptors.request.use(async (config) => {
  try {
    const token = cookie.getToken();

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  } catch (error) {
    console.error("Error in axios interceptor:", error);
    return config;
  }
});

// Interceptor cho response
baseAxios.interceptors.response.use(
  (response: AxiosResponse) => {
    switch (response.status) {
      case 200: // OK
      case 201: // Created
      case 204: // No Content
        return response.data;
      default:
        return response.data;
    }
  },
  async (error: AxiosError<any, CustomAxiosRequestConfig>) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    // check if token expired
    if (error.response?.status === 401 && !originalRequest?._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshResponse = await baseAxios.post("/auth/refresh", {
          refreshToken: cookie.getRefreshToken(),
        });

        // Save token
        const { accessToken, refreshToken } = refreshResponse.data;
        cookie.setToken(accessToken);
        cookie.setRefreshToken(refreshToken);

        // Update headers
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

        // run queue that requests failed before token expired
        processQueue(null, accessToken);

        return baseAxios(originalRequest);
      } catch (refreshError) {
        // if refresh token expired
        processQueue(refreshError, null);
        cookie.deleteToken();
        cookie.deleteRefreshToken();
        redirect("/login");
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    if (error.response) {
      switch (error.response.status) {
        case 401:
          cookie.deleteToken();

          redirect("/login");

          break;
        case 400:
        case 403:
        case 404:
        case 500:
        case 502:
        case 503:
        case 504:
          return Promise.reject(error.response.data);
        default:
          return Promise.reject(error.response.data);
      }

      // @ts-ignore
      return Promise.reject(error?.response.data);
    } else if (error.request) {
      return Promise.reject(error.request);
    } else {
      return Promise.reject(error.message);
    }
  },
);

export default baseAxios;
