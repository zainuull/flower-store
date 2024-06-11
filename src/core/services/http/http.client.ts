import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

// Then you can get the token like this:
const token = cookies.get('token');

const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

console.log(headers);

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  headers: headers,
});

type HTTPRequestConfig = AxiosRequestConfig;

const api = (axios: AxiosInstance) => {
  return {
    get: <T>(url: string, query?: any, config: HTTPRequestConfig = {}) => {
      let urlAdd = '';
      if (query) {
        for (const key in query) {
          if (key) {
            urlAdd += `&${key}=${query[key]}`;
          }
        }
      }
      if (urlAdd) {
        url += urlAdd.replace('&', '?');
      }
      return axios.get<T>(url, config);
    },
    delete: <T>(url: string, config: HTTPRequestConfig = {}) => {
      return axios.delete<T>(url, config);
    },
    put: <T>(url: string, body: unknown, config: HTTPRequestConfig = {}) => {
      return axios.put<T>(url, body, config);
    },
    patch: <T>(url: string, body: unknown, config: HTTPRequestConfig = {}) => {
      return axios.patch<T>(url, body, config);
    },
    post: <T>(url: string, body: unknown, config: HTTPRequestConfig = {}) => {
      return axios.post<T>(url, body, config);
    },
  };
};

const Http = api(instance);

export { Http };
