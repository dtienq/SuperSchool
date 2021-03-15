/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Input } from 'antd';

const { Search } = Input;

function NavOne() {
  const [sticky, setSticky] = useState(false);
  const onSearch = (value) => console.log(value);

  const mobileMenu = () => {
    let mainNavToggler = document.querySelector('.menu-toggler');
    let mainNav = document.querySelector('.main-navigation');
    mainNavToggler.addEventListener('click', function () {
      mainNav.style.display =
        mainNav.style.display != 'block' ? 'block' : 'none';
    });
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    mobileMenu();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const handleScroll = () => {
    if (window.scrollY > 70) {
      setSticky(true);
    } else if (window.scrollY < 70) {
      setSticky(false);
    }
  };
  return (
    <header className="site-header site-header__header-one ">
      <nav
        className={`navbar navbar-expand-lg navbar-light header-navigation stricky ${
          sticky ? 'stricked-menu stricky-fixed' : ''
        }`}
      >
        <div className="container d-flex justify-content-between">
          <div className="">
            <Link to="/">
              <Link to="/" className="navbar-brand">
                <div
                  style={{
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    color: 'orange',
                  }}
                >
                  SuperSchool
                </div>
              </Link>
            </Link>
            <button className="menu-toggler">
              <span className="kipso-icon-menu"></span>
            </button>
          </div>
          <div>
            <Search
              placeholder="Nhập từ khoá cần tìm"
              allowClear
              enterButton
              onSearch={onSearch}
              style={{ width: 350 }}
            />
          </div>
          <div>
            <ul className=" navigation-box">
              <li>
                <Link to="/courses">
                  <a>Các lĩnh vực</a>
                </Link>
                <ul className="sub-menu">
                  <li>
                    <Link to="/">Lập trình</Link>
                    <ul className="sub-menu">
                      <li>
                        <Link to="/">
                          <a>Lập trình C++</a>
                        </Link>
                      </li>
                      <li>
                        <Link to="/">
                          <a>Lập trình Android</a>
                        </Link>
                      </li>
                      <li>
                        <Link to="/">
                          <a>Lập trình JAVA</a>
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link to="/">IT và phần mềm</Link>
                    <ul className="sub-menu">
                      <li>
                        <Link to="/">
                          <a>Thủ thuật máy tính</a>
                        </Link>
                      </li>
                      <li>
                        <Link to="/">
                          <a>Hướng dẫn cài đặt</a>
                        </Link>
                      </li>
                      <li>
                        <Link to="/">
                          <a>Bảo mật</a>
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link to="/">Đồ hoạ</Link>
                    <ul className="sub-menu">
                      <li>
                        <Link to="/">
                          <a>Thủ thuật Photoshop</a>
                        </Link>
                      </li>
                      <li>
                        <Link to="/">
                          <a>Thiết kế web</a>
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link to="/">Ngoại ngữ</Link>
                    <ul className="sub-menu">
                      <li>
                        <Link to="/">
                          <a>Tiếng Anh</a>
                        </Link>
                      </li>
                      <li>
                        <Link to="/">
                          <a>Tiếng Nhật</a>
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/contact">
                  <a>Liên hệ</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default NavOne;
