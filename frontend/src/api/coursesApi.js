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
  // 3 khoa hoc noi bac
  getCoursesHightLight: () => {
    const url = '/course/top-highlight';
    return axiosClient.get(url);
  },
  // top 10 view
  getTop10ViewCourses: () => {
    const url = '/course/top10View';
    return axiosClient.get(url);
  },
  // top 10 newest courses
  getTop10NewestCourses: () => {
    const url = '/course/top10Newest';
    return axiosClient.get(url);
  },
};
export default coursesApi;
