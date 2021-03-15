import React from 'react';
import TopBar from '@components/TopBar';
import NavOne from '@components/NavOne';
import Footer from '@components/Footer';
import PageHeader from '@components/PageHeader';
import CourseDetails from '../components/CoursesDetail';
function CoursesDetailPage() {
  return (
    <>
      <TopBar />
      <NavOne />
      <PageHeader title="Chi tiết khoá học" />
      <CourseDetails />
      <Footer />
    </>
  );
}

export default CoursesDetailPage;
