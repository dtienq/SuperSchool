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
  changePublish: async (id, check) => {
    const url = `/course/disable-course/${id}`;
    return await axiosClient.put(url, { disabled: check });
  },
};
export default coursesApi;
