import React, { useEffect } from 'react';
import TopBar from '@components/TopBar';
import NavOne from '@components/NavOne';
import Footer from '@components/Footer';
import PageHeader from '@components/PageHeader';
import CourseDetails from '../components/CoursesDetail';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getDetailCourses } from '@features/courses/coursesSlice';

function CoursesDetailPage() {
  const dispatch = useDispatch();
  const { coursesId } = useParams();
  useEffect(() => {
    if (coursesId) {
      dispatch(getDetailCourses(coursesId));
    }
  }, []);
  return (
    <>
      <TopBar />
      <NavOne />
      <PageHeader title="Chi tiết khoá học" />
      <CourseDetails coursesId={coursesId} />
      <Footer />
    </>
  );
}

export default CoursesDetailPage;
