/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';

function CoursesItem({ data }) {
  return (
    <div className="course-one__single">
      <div className="course-one__image">
        <img src={data?.imagePath} alt="" />
      </div>
      <div className="course-one__content">
        <a href="#" className="course-one__category">
          development
        </a>
        <div className="course-one__admin">
          <img src="/assets/images/team-1-1.jpg" alt="" />
          by{' '}
          <Link href="/teacher-details">
            <a>Lou Guerrero</a>
          </Link>
        </div>
        <h2
          className="course-one__title"
          style={{ height: '55px', textOverflow: 'ellipsis' }}
        >
          <Link to="/courses/detail/idne">
            <a>{data?.title}</a>
          </Link>
        </h2>
        <div className="course-one__stars">
          <span className="course-one__stars-wrap">
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
          </span>
          <span className="course-one__count">4.8</span>
          <span className="course-one__stars-count">{data?.views}</span>
        </div>
        <div className="course-one__meta">
          <a href="/course-details">
            <i className="fas fa-user"></i>
            {data?.totalstudents}
          </a>
          <a href="/course-details">
            {/* <i className="far fa-folder-open"></i> 6 Lectures */}
          </a>
          <a href="/course-details">{data?.price}</a>
        </div>
        <a href="#" className="course-one__link">
          Xem chi tiết
        </a>
      </div>
    </div>
  );
}

export default React.memo(CoursesItem);
