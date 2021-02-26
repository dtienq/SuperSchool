import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';

function CoursesHightLight() {
  const [swiper, setSwiper] = useState(null);

  const goNext = () => {
    if (swiper !== null) {
      swiper.slideNext();
    }
  };

  const goPrev = () => {
    if (swiper !== null) {
      swiper.slidePrev();
    }
  };

  return (
    <div className="banner-wrapper">
      <section className="banner-one banner-carousel__one no-dots">
        <Swiper getSwiper={setSwiper}>
          <div className="banner-one__slide banner-one__slide-one">
            <div className="container">
              <div className="banner-one__bubble-1"></div>
              <div className="banner-one__bubble-2"></div>
              <div className="banner-one__bubble-3"></div>
              <div className="row no-gutters">
                <div className="col-xl-12">
                  <h3 className="banner-one__title banner-one__light-color">
                    Khoá học <br />
                    nổi bật nhất
                  </h3>
                  <p className="banner-one__tag-line">Bạn sẳn sàng học chưa?</p>
                  <Link to="/" className="thm-btn banner-one__btn">
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="banner-one__slide banner-one__slide-one">
            <div className="container">
              <div className="banner-one__bubble-1"></div>
              <div className="banner-one__bubble-2"></div>
              <div className="banner-one__bubble-3"></div>
              <div className="row no-gutters">
                <div className="col-xl-12">
                  <h3 className="banner-one__title banner-one__light-color">
                    Khoá học <br />
                    nổi bật nhất
                  </h3>
                  <p className="banner-one__tag-line">Bạn sẳn sàng học chưa?</p>
                  <Link to="/" className="thm-btn banner-one__btn">
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Swiper>
      </section>
      <div className="banner-carousel-btn">
        <div
          onClick={goPrev}
          className="banner-carousel-btn__left-btn banner-arrow"
        >
          <i className="kipso-icon-left-arrow"></i>
        </div>
        <div
          onClick={goNext}
          className="banner-carousel-btn__right-btn banner-arrow"
        >
          <i className="kipso-icon-right-arrow"></i>
        </div>
      </div>
    </div>
  );
}

export default CoursesHightLight;
