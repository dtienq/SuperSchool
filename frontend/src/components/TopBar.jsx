import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '@app/userSlice';

function Topbar() {
  const dispatch = useDispatch();
  const isLogin = useSelector(({ userReducer }) => userReducer?.isLogin);
  const currentUser = useSelector(
    ({ userReducer }) => userReducer?.user?.fullname
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
            <>
              <div style={{ color: '#fff' }}>Xin chào {currentUser}</div>
              <div
                className="ml-4"
                style={{ color: '#fff', cursor: 'pointer' }}
                onClick={() => dispatch(logout())}
              >
                Đăng xuất
              </div>
            </>
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
