import React from 'react';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';
import { Card } from 'antd';
import { Link } from 'react-router-dom';

const Category = ({ item }) => {
  return (
    <Link to={`/courses/category/${item?.categoryid}?`}>
      <Card title={item?.name} style={{ width: 180 }}>
        <img src={item?.avatar} alt="category" width="120px" height="120px" />
      </Card>
    </Link>
  );
};

function BestViewCategory({ data }) {
  const params = {
    slidesPerView: 5,
    loop: true,
    speed: 1000,
    spaceBetween: 30,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    centeredSlides:true,
    breakpoints: {
      1024: {
        slidesPerView: 5,
      },
      768: {
        slidesPerView: 4,
      },
      640: {
        slidesPerView: 3,
      },
      320: {
        slidesPerView: 2,
      },
    },
  };
  return (
    <section className="course-category-one container">
      <div className="container-fluid text-center">
        <div className="block-title text-center">
          <h2 className="block-title__title">Các lĩnh vực phổ biến</h2>
        </div>
        <div className="course-category-one__carousel">
          <Swiper {...params} shouldSwiperUpdate>
            {data?.map((item, index) => (
              <div className="item">
                <div className="course-category-one__single color-1">
                  <div className="course-category-one__icon">
                    <Category item={item} key={index} />
                  </div>
                </div>
              </div>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export default React.memo(BestViewCategory);
