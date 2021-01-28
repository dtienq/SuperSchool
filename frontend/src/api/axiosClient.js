import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});
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
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return refreshToken()
        .then((result) => {
          if (result.status === 200) {
            const token = result?.data?.access_token;
            localStorage.setItem('token', token);
            axiosClient.defaults.headers.Authorization = token;
            return axiosClient(originalRequest);
          } else {
            console.log('refresh token that bai, log out');
          }
        })
        .catch(() => console.log('log out luon ne'));
    }
    return Promise.reject(error);
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
  return axios.post(`${process.env.REACT_APP_API_URL}/auth/refresh-token`, {
    refresh_token: getLocalRefreshToken(),
    access_token: getLocalToken(),
  });
}
export default axiosClient;
