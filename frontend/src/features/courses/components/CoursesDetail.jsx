/*eslint-disable*/
import React from 'react';

const CoursesDetail = () => {
  return (
    <section className="course-details">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="course-details__content">
              <div className="course-details__top">
                <div className="course-details__top-left">
                  <h2 className="course-details__title">
                    Improve editing skills
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
                </div>
                <div className="course-details__top-right">
                  <a href="#" className="course-one__category">
                    marketing
                  </a>
                </div>
              </div>
              <div className="course-one__image">
                <img src="/assets/images/course-d-1.jpg" alt="" />
                <i className="far fa-heart"></i>
              </div>

              <ul
                className="course-details__tab-navs list-unstyled nav nav-tabs"
                role="tablist"
              >
                <li>
                  <a
                    className="active"
                    role="tab"
                    data-toggle="tab"
                    href="#overview"
                  >
                    Giới thiệu khoá học
                  </a>
                </li>
                <li>
                  <a
                    className=""
                    role="tab"
                    data-toggle="tab"
                    href="#curriculum"
                  >
                    Danh sách bài học
                  </a>
                </li>
                <li>
                  <a className="" role="tab" data-toggle="tab" href="#review">
                    Đánh giá
                  </a>
                </li>
              </ul>
              <div className="tab-content course-details__tab-content ">
                <div
                  className="tab-pane show active  animated fadeInUp"
                  role="tabpanel"
                  id="overview"
                >
                  <p className="course-details__tab-text">
                    Aelltes port lacus quis enim var sed efficitur turpis gilla
                    sed sit Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry’s
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged.
                  </p>
                  <br />
                  <p className="course-details__tab-text">
                    It was popularised in the 1960s with the release of Letraset
                    sheets containing Lorem Ipsum passages, and more recently
                    with desktop publishing software like Aldus PageMaker
                    including versions of lorem ipsum amet finibus eros. Lorem
                    Ipsum is simply dummy text of the printing and typesetting
                    industry. Lorem Ipsum has been the industry’s standard dummy
                    text ever since the 1500s, when an unknown printer took a
                    galley of type and scrambled it to make a type specimen
                    book. It has survived not only five centuries, but also the
                    leap into electronic typesetting.
                  </p>
                  <br />
                  <ul className="list-unstyled course-details__overview-list">
                    <li>It has survived not only five centuries</li>
                    <li>Lorem Ipsum is simply dummy text of the new design</li>
                    <li>Printng and type setting ipsum</li>
                    <li>Take a look at our round up of the best shows</li>
                  </ul>
                </div>
                <div
                  className="tab-pane  animated fadeInUp"
                  role="tabpanel"
                  id="curriculum"
                >
                  <ul className="course-details__curriculum-list list-unstyled">
                    <li>
                      <div className="course-details__curriculum-list-left">
                        <div className="course-details__meta-icon video-icon">
                          <i className="fas fa-play"></i>
                        </div>
                        <div
                          className="font-weight-bold"
                          style={{ cursor: 'pointer' }}
                        >
                          Introduction to Editing
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div
                  className="tab-pane  animated fadeInUp"
                  role="tabpanel"
                  id="review"
                >
                  <div className="row justify-content-center">
                    <div className="col-xl-5 justify-content-xl-end justify-content-sm-center d-flex">
                      <div className="course-details__review-box">
                        <p className="course-details__review-count">4.6</p>
                        <div className="course-details__review-stars">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star-half"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="course-details__comment">
                    <div className="course-details__comment-single">
                      <div className="course-details__comment-top">
                        <div className="course-details__comment-img">
                          <img src="/assets/images/team-1-2.jpg" alt="" />
                        </div>
                        <div className="course-details__comment-right">
                          <h2 className="course-details__comment-name">
                            Lina Kelley
                          </h2>
                          <div className="course-details__comment-meta">
                            <div className="course-details__comment-stars">
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star star-disabled"></i>
                              <i className="fa fa-star star-disabled"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="course-details__comment-text">
                        Lorem ipsum is simply free text used by copytyping
                        refreshing. Neque porro est qui dolorem ipsum quia quaed
                        inventore veritatis et quasi architecto beatae vitae
                        dicta sunt explicabo.
                      </p>
                    </div>
                  </div>
                  <form action="#" className="course-details__comment-form">
                    <h2 className="course-details__title">Thêm đánh giá</h2>
                    <div className="row">
                      <div className="col-lg-12">
                        <textarea />
                        <button
                          type="submit"
                          className="thm-btn course-details__comment-form-btn"
                        >
                          Đánh giá
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="course-details__price mb-5">
              <p className="course-details__price-text">Giá khoá học</p>
              <p className="course-details__price-amount">$18.00</p>
              <div
                className="thm-btn course-details__price-btn"
                style={{ cursor: 'pointer' }}
              >
                Mua khoá này
              </div>
            </div>
            <div className="course-details__list">
              <h2 className="course-details__list-title">
                Thông tin giảng viên
              </h2>
              <div className="course-details__list-item">
                <div className="course-details__list-img">
                  <img src="/assets/images/lc-1-1.jpg" alt="" />
                </div>
                <div className="course-details__list-content">
                  <h3>Họ và tên: Phan Thành Vĩ</h3>
                  <h3>Email: phanthanhvi97@gmail.com</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoursesDetail;
