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
  getCoursesByTeacher: async (id) => {
    const url = `/admin/view/teachercourses/${id}`;
    await axiosClient.get(url);
    return await axiosClient.get(url);
  },
  findById: async (id) => {
    const url = `/course/findById/${id}`;
    return axiosClient.get(url);
  },
};
export default coursesApi;
