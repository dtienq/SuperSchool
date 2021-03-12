import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '@app/userSlice';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

function Topbar() {
  const dispatch = useDispatch();
  const isLogin = useSelector(({ userReducer }) => userReducer?.isLogin);
  const currentUser = useSelector(
    ({ userReducer }) => userReducer?.user?.fullname
  );
  const menu = (
    <Menu>
      <Menu.Item>
        <Link to="/profile">Trang cá nhân</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="love-courses">Khoá học yêu thích</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="studying-courses">Khoá học đang theo học</Link>
      </Menu.Item>
      <Menu.Item onClick={() => dispatch(logout())}>
        <div>Đăng xuất</div>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="topbar-one">
      <div className="container">
        <div className="topbar-one__left">
          <Link to="/" className="d-none d-lg-block">
            phanthanhvi97@gmail.com
          </Link>
          <Link to="/" className="d-none d-lg-block">
            0983345305
          </Link>
        </div>
        <div className="topbar-one__right">
          {isLogin ? (
            <Dropdown overlay={menu}>
              <div
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
                style={{ color: '#fff', cursor: 'pointer' }}
              >
                Xin chào {currentUser}
                <DownOutlined />
              </div>
            </Dropdown>
          ) : (
            <>
              <Link to="/login">Đăng nhập</Link>
              <Link to="/register">Đăng ký</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Topbar;
