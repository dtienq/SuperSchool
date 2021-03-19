import React, { useEffect, useState } from 'react';
import NavOne from '@components/NavOne';
import Footer from '@components/Footer';
import PageHeader from '@components/PageHeader';
import LikeCourses from '../components/LikeCourses';
import TopBar from '@components/TopBar';
import coursesApi from '@api/coursesApi';

function LikeCoursesPage() {
  const [likeCourses, setLikeCourses] = useState([]);
  const fetchLikeCourses = async () => {
    const res = await coursesApi.listLikeCourses();
    setLikeCourses(res?.data)
  };
  useEffect(() => {
    fetchLikeCourses()
  }, []);
  return (
    <>
      <TopBar />
      <NavOne />
      <PageHeader title="Các khoá học yêu thích" />
      <LikeCourses dataLike={likeCourses} />
      <Footer />
    </>
  );
}

export default LikeCoursesPage;
