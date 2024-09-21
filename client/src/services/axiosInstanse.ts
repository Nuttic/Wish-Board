import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { User } from '../entities/User/types/user';

type RetryConfig = {
  sent?: boolean;
} & InternalAxiosRequestConfig;

type TokensRefreshResponse = {
  accessToken: string;
  user: User; // Убедитесь, что тип User правильно импортирован и определен
};

const axiosInstance: AxiosInstance = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

let accessToken = '';

export function setAccessToken(token: string) {
  accessToken = token;
}

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    if (!config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${accessToken}`; // Исправлено
    }
    return config;
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const prevRequest: RetryConfig | undefined = error?.config;
    if (!prevRequest) {
      return Promise.reject(error);
    }
    if (error?.response?.status === 403 && !prevRequest.sent) {
      try {
        const response = await axios.get<TokensRefreshResponse>('/api/tokens/refresh'); // Используем POST
        const newAccessToken = response.data.accessToken;
        setAccessToken(newAccessToken);
        prevRequest.sent = true;
        prevRequest.headers.Authorization = `Bearer ${newAccessToken}`; // Исправлено
        return axiosInstance(prevRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError); // Обработка ошибок при обновлении токена
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
