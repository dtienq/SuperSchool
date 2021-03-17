import axiosClient from './axiosClient';

const coursesApi = {
  getTopViewCourses: () => {
    const url = '/course/views/top';
    return axiosClient.get(url);
  },

  getCoursesByAdmin: () => {
    const url = '/admin/view/courses/';
    return axiosClient.get(url);
  },
};
export default coursesApi;
