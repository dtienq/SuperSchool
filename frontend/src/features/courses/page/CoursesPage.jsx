import React from 'react';
import NavOne from '@components/NavOne';
import Footer from '@components/Footer';
import PageHeader from '@components/PageHeader';
import Courses from '../components/Courses';
import TopBar from '@components/TopBar';
function CoursesPage() {
  return (
    <>
      <TopBar />
      <NavOne />
      <PageHeader title="Các khoá học" />
      <Courses />
      <Footer />
    </>
  );
}

export default CoursesPage;
