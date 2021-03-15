import React from 'react';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';
import CoursesItem from '@components/CoursesItem';

const params = {
  slidesPerView: 3,
  loop: true,
  speed: 1000,
  spaceBetween: 30,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    1024: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 2,
    },
    640: {
      slidesPerView: 2,
    },
    320: {
      slidesPerView: 1,
    },
  },
};
function CoursesCarousel({ type }) {
  return (
    <div>
      <section className="course-one__top-title home-one">
        <div className="container">
          <div className="block-title mb-0">
            <h2 className="block-title__title">
              {type === 'new' && 'Các khoá học mới nhất'}
              {type === 'bestview' && 'Các khoá học được xem nhiều nhất'}
            </h2>
          </div>
        </div>
        <div className="course-one__top-title__curve"></div>
      </section>
      <section className="course-one course-one__teacher-details home-one">
        <div className="container">
          <div className="course-one__carousel">
            <Swiper {...params}>
              <div className="item">
                <CoursesItem />
              </div>
              <div className="item">
                <CoursesItem />
              </div>
              <div className="item">
                <CoursesItem />
              </div>
            </Swiper>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CoursesCarousel;
