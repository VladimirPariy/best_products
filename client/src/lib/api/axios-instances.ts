import axios, {AxiosRequestConfig} from "axios";
import {ApiUrls} from "lib/enums/api-urls";
import {getTokenFromStorage} from "lib/utils/TokenFromStorage";

const defaultAxios = axios.create({baseURL: ApiUrls.BASE_URL});

const authAxios = axios.create({baseURL: ApiUrls.BASE_URL})

const authInterceptor = (config: AxiosRequestConfig): AxiosRequestConfig | void => {
  const token = getTokenFromStorage()
  if (config && token) {
    config.headers = {
      Authorization: `Bearer ${token}`
    }
    return config
  }
}

authAxios.interceptors.request.use(authInterceptor)

export {defaultAxios, authAxios}