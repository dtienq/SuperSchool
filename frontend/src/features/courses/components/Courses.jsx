import { Pagination } from 'antd';
import CoursesItem from '@components/CoursesItem';

const Courses = () => {
  return (
    <section className="course-one course-page">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <CoursesItem />
          </div>
          <div className="col-lg-4">
            <CoursesItem />
          </div>
          <div className="col-lg-4">
            <CoursesItem />
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <Pagination defaultCurrent={1} total={50} />
        </div>
      </div>
    </section>
  );
};

export default Courses;
