import { Pagination, Menu, Dropdown, Button } from 'antd';
import CoursesItem from '@components/CoursesItem';
import { DownOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';

const Courses = () => {
  let { keyword } = useParams();
  console.log(keyword);
  const menu = (
    <Menu>
      <Menu.Item>
        <div>Giá thấp đến cao</div>
      </Menu.Item>
      <Menu.Item>
        <div>Giá cao đến thấp</div>
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <div
        className="d-flex justify-content-end font-weight-bold container mt-3"
        style={{ color: 'orange' }}
      >
        <Dropdown overlay={menu} placement="bottomCenter">
          <Button>
            Sắp xếp <DownOutlined />
          </Button>
        </Dropdown>
      </div>
      <section
        className="course-one course-page"
        style={{ marginTop: '-70px' }}
      >
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
    </>
  );
};

export default Courses;
