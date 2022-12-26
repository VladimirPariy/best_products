import axios, { AxiosRequestConfig } from "axios";
import { apiUrls } from "lib/enums/api-urls";
import { getTokenFromStorage } from "lib/utils/token-from-storage";

const defaultAxios = axios.create({ baseURL: apiUrls.BASE_URL });

const authAxios = axios.create({ baseURL: apiUrls.BASE_URL });

const authInterceptor = (
  config: AxiosRequestConfig
): AxiosRequestConfig | void => {
  const token = getTokenFromStorage();
  if (config && token) {
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
};

authAxios.interceptors.request.use(authInterceptor);

export { defaultAxios, authAxios };
