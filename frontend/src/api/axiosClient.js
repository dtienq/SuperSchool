import axios from 'axios';
import queryString from 'query-string';
import store from '../app/store';
import { logout } from '@app/userSlice';

const { dispatch } = store;
const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_API_DEVELOPMENT
    : process.env.REACT_APP_API_PRODUCTION;
const axiosClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

let isRefreshing = false;
let subscribers = [];
function subscribeTokenRefresh(cb) {
  subscribers.push(cb);
}
function onRefreshed(token) {
  subscribers.map((cb) => cb(token));
}

axiosClient.interceptors.request.use(
  (config) => {
    const token = getLocalToken();
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    const { config: originalRequest, response } = error;
    const status = response?.status;
    if (status === 401 && !originalRequest._retry) {
      if (!isRefreshing) {
        isRefreshing = true;
        originalRequest._retry = true;
        return refreshToken()
          .then((result) => {
            isRefreshing = false;
            const token = result?.data?.access_token;
            localStorage.setItem('token', token);
            originalRequest.headers.Authorization = token;
            axiosClient(originalRequest);
            onRefreshed(token);
            subscribers = [];
          })
          .catch((err) => {
            dispatch(logout());
            console.log(err);
          });
      }
      return new Promise((resolve) => {
        subscribeTokenRefresh((token) => {
          originalRequest.headers.Authorization = token;
          resolve(axiosClient(originalRequest));
        });
      });
    }
  }
);
function getLocalRefreshToken() {
  const token = localStorage.getItem('refresh_token');
  return token;
}
function getLocalToken() {
  const token = localStorage.getItem('token');
  return token;
}
function refreshToken() {
  return axios.post(`${BASE_URL}/auth/refresh-token`, {
    refresh_token: getLocalRefreshToken(),
    access_token: getLocalToken(),
  });
}

export default axiosClient;
