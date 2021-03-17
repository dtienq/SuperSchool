import axiosClient from './axiosClient';

const profileApi = {
  changePassword: (data) => {
    const url = '/users/changePassword';
    return axiosClient.post(url, { data });
  },
};

export default profileApi;
