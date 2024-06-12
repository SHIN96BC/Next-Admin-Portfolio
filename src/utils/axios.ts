import axios, { AxiosRequestConfig } from 'axios';

// next
import { getSession } from 'next-auth/react';
import {firebaseAuth} from "@Src/utils/firebase";

const axiosServices = axios.create({ baseURL: process.env.API_SERVER_URL || 'http://localhost:3010/' });

// ==============================|| AXIOS - FOR MOCK SERVICES ||============================== //

axiosServices.interceptors.request.use(
  async (config) => {
    if (firebaseAuth.currentUser && config.headers) {
      const token = await firebaseAuth.currentUser.getIdToken(false);
      console.log('interceptors token = ', token);
      // config.headers['Authorization'] = `Bearer ${token}`;
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosServices.interceptors.response.use(
  (response) => response,
  (error) => {
    // if (error.response.status === 401 && !window.location.href.includes('/login')) {
    //   window.location.pathname = '/login';
    // }
    return Promise.reject((error.response && error.response.data) || 'Wrong Services');
  }
);

export default axiosServices;

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];
  const res = await axiosServices.get(url, { ...config });

  return res.data;
};

export const fetcherPost = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];
  const res = await axiosServices.post(url, { ...config });

  return res.data;
};
