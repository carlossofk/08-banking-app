
import { HTTP_METHODS } from '@core/constants/http-methods';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';


interface HttpRequestOptions<T> extends AxiosRequestConfig {
  method: HTTP_METHODS;
  url: string;
  data?: T;
  token?: string;
}

export const http = <T, R>({
  method,
  url,
  data,
  token,
  ...config
}: HttpRequestOptions<T>): Promise<AxiosResponse<R>> => {
  
  const headers = token 
    ? { ...config.headers, Authorization: `Bearer ${token}` } 
    : config.headers;

  return  axios.request<R>({
    method,
    url,
    data,
    headers,
    ...config,
  });

};