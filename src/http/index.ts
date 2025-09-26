import type { AxiosError } from "axios";
import axios from "axios";

export const API_URL = window.location.origin;
const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.defaults.baseURL = API_URL;

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("access_token")}`;
  return config;
});

$api.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    
    const { data, status } = error;
    switch (status) {
      case 400:
        console.error('error 400 - ', data);
        break;

      case 401:
        console.log("unauthorised");
        break;

      case 404:
        console.error("not found");
        break;

      case 500:
        console.error("server error");
        break;
    }

    return Promise.reject(error);
  }
);

export default $api;
