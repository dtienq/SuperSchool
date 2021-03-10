import React from 'react';
import Swiper from 'react-id-swiper';
import { Link } from 'react-router-dom';
import 'swiper/css/swiper.css';

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
                <div className="course-one__single color-1">
                  <div className="course-one__image">
                    <img src="/assets/images/course-1-1.jpg" alt="" />
                    <i className="far fa-heart"></i>
                  </div>
                  <div className="course-one__content">
                    <Link to="/" className="course-one__category">
                      development
                    </Link>
                    <div className="course-one__admin">
                      <img src="/assets/images/team-1-1.jpg" alt="" />
                      by <a href="/teacher-details">Lou Guerrero</a>
                    </div>
                    <h2 className="course-one__title">
                      <Link to="/">New react bootcamp</Link>
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
                      <span className="course-one__stars-count">250</span>
                    </div>
                    <div className="course-one__meta">
                      <Link to="/">
                        <i className="far fa-clock"></i> 10 Hours
                      </Link>
                      <Link to="/">
                        <i className="far fa-folder-open"></i> 6 Lectures
                      </Link>
                      <Link to="/">$18</Link>
                    </div>
                    <Link to="/" className="course-one__link">
                      See Preview
                    </Link>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="course-one__single color-2">
                  <div className="course-one__image">
                    <img src="/assets/images/course-1-2.jpg" alt="" />
                    <i className="far fa-heart"></i>
                  </div>
                  <div className="course-one__content">
                    <Link to="/" className="course-one__category">
                      It & Software
                    </Link>
                    <div className="course-one__admin">
                      <img src="/assets/images/team-1-2.jpg" alt="" />
                      by <a href="/teacher-details">Cora Diaz</a>
                    </div>
                    <h2 className="course-one__title">
                      <Link to="/">Improve editing skills</Link>
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
                      <span className="course-one__stars-count">250</span>
                    </div>
                    <div className="course-one__meta">
                      <Link to="/">
                        <i className="far fa-clock"></i> 10 Hours
                      </Link>
                      <Link to="/">
                        <i className="far fa-folder-open"></i> 6 Lectures
                      </Link>
                      <Link to="/">$18</Link>
                    </div>
                    <Link to="/" className="course-one__link">
                      See Preview
                    </Link>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="course-one__single color-3">
                  <div className="course-one__image">
                    <img src="/assets/images/course-1-3.jpg" alt="" />
                    <i className="far fa-heart"></i>
                  </div>
                  <div className="course-one__content">
                    <Link to="/" className="course-one__category">
                      marketing
                    </Link>
                    <div className="course-one__admin">
                      <img src="/assets/images/team-1-3.jpg" alt="" />
                      by <a href="/teacher-details">Ruth Becker</a>
                    </div>
                    <h2 className="course-one__title">
                      <Link to="/">Marketing strategies</Link>
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
                      <span className="course-one__stars-count">250</span>
                    </div>
                    <div className="course-one__meta">
                      <Link to="/">
                        <i className="far fa-clock"></i> 10 Hours
                      </Link>
                      <Link to="/">
                        <i className="far fa-folder-open"></i> 6 Lectures
                      </Link>
                      <Link to="/">$18</Link>
                    </div>
                    <Link to="/" className="course-one__link">
                      See Preview
                    </Link>
                  </div>
                </div>
              </div>
            </Swiper>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CoursesCarousel;
