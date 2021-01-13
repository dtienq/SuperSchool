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
      config.headers.Authorization = `Bearer ${token}`;
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
    if (error.response.status === 401) {
      return refreshToken().then((result) => {
        const token = result?.accessToken;
        if (result.status !== 400) {
          const config = error.config;
          localStorage.setItem('token', token);
          config.headers.Authorization = `Bearer ${token}`;
          return axiosClient(config);
        } else {
          //dispatch action logout
        }
      });
    }
    return Promise.reject(error);
  }
);
function getLocalRefreshToken() {
  const token = localStorage.getItem('refreshToken');
  return token;
}
function getLocalToken() {
  const token = localStorage.getItem('token');
  return token;
}
function refreshToken() {
  return axiosClient.post('/api/auth/refresh', {
    refreshToken: getLocalRefreshToken(),
    token: getLocalToken(),
  });
}
export default axiosClient;
