import axiosClient from './axiosClient';

const userApi = {
  getAll: (params) => {
    const url = '/user';
    return axiosClient.get(url, { params });
  },

  get: (id) => {
    const url = `/user/${id}`;
    return axiosClient.get(url);
  },
  getMe: async () => {
    const token = localStorage.getItem('token');
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  },
  //using
  login: (data) => {
    const url = '/auth/login';
    return axiosClient.post(url, data);
  },
  googleLogin: (idToken) => {
    const url = '/auth/google-login';
    return axiosClient.post(url, idToken);
  },
  checkLogin: () => {
    const url = '/auth/check-login';
    return axiosClient.post(url, {});
  },
  checkEmail: (email) => {
    const url = '/auth/check-email';
    return axiosClient.post(url, email);
  },
  confirmOTP: (data) => {
    const url = '/auth/confirm-otp';
    return axiosClient.post(url, data);
  },
  register: (data) => {
    const url = '/auth/register';
    return axiosClient.post(url, data);
  },
};

export default userApi;
