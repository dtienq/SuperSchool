import React from 'react';
import NavOne from '@components/NavOne';
import Footer from '@components/Footer';
import PageHeader from '@components/PageHeader';
import TopBar from '@components/TopBar';
import Courses from '../components/Courses';

function Search() {
  return (
    <>
      <TopBar />
      <NavOne />
      <PageHeader title="Các khoá học tìm thấy" />
      <Courses />
      <Footer />
    </>
  );
}

export default Search;
