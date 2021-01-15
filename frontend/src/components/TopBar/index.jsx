import React from 'react';
import { Link } from 'react-router-dom';

function index() {
  return (
    <div className="topbar-one">
      <div className="container">
        <div className="topbar-one__left">
          <Link className='d-none d-lg-block'>phanthanhvi97@gmail.com</Link>
          <Link className='d-none d-lg-block'>0983345305</Link>
        </div>
        <div className="topbar-one__right">
          <Link to={'/login'}>Đăng nhập</Link>
          <Link to={'/register'}>Đăng ký</Link>
        </div>
      </div>
    </div>
  );
}

export default index;
