import type { AxiosError, InternalAxiosRequestConfig } from 'axios';

import apiClient from './client';

const AUTH_STORAGE_KEY = 'auth_access_token';

function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(AUTH_STORAGE_KEY);
  } catch {
    return null;
  }
}

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_user');
        localStorage.removeItem('auth_access_token');
        localStorage.removeItem('auth_refresh_token');
        window.location.href = '/auth/login';
      }
    }

    return Promise.reject(error);
  },
);
