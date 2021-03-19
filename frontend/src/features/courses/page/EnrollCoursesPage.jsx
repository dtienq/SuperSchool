import React, { useEffect, useState } from 'react';
import NavOne from '@components/NavOne';
import Footer from '@components/Footer';
import PageHeader from '@components/PageHeader';
import EnrollCourses from '../components/EnrollCourses';
import TopBar from '@components/TopBar';
import coursesApi from '@api/coursesApi';

function EnrollCoursesPage() {
  const [enrollCourses, setEnrollCourses] = useState([]);
  const fetchEnrollCourses = async () => {
    const res = await coursesApi.listEnrollCourses();
    setEnrollCourses(res?.data);
  };
  useEffect(() => {
    fetchEnrollCourses();
  }, []);
  return (
    <>
      <TopBar />
      <NavOne />
      <PageHeader title="Các khoá học đang theo dõi" />
      <EnrollCourses dataEnroll={enrollCourses} />
      <Footer />
    </>
  );
}

export default EnrollCoursesPage;
