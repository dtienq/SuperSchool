/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Index() {
  const [sticky, setSticky] = useState(false);

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
    searchButton();
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

  const searchButton = () => {
    let searchToggle = document.querySelector('.search-toggle');
    let searchPopup = document.querySelector('.search-popup');
    let searchClose = document.querySelector('.cancel');
    let searchOverlay = document.querySelector('.search-overlay');

    if (searchToggle)
      searchToggle.addEventListener('click', function () {
        if (searchPopup) searchPopup.classList.add('active');
      });

    if (searchClose)
      searchClose.addEventListener('click', function () {
        searchPopup.classList.remove('active');
      });

    if (searchOverlay)
      searchOverlay.addEventListener('click', function () {
        searchPopup.classList.remove('active');
      });
  };
  return (
    <header className="site-header site-header__header-one ">
      <nav
        className={`navbar navbar-expand-lg navbar-light header-navigation stricky ${
          sticky ? 'stricked-menu stricky-fixed' : ''
        }`}
      >
        <div className="container clearfix">
          <div className="logo-box clearfix">
            <Link to="/">
              <Link className="navbar-brand">
                <img
                  src="/assets/images/logo-dark.png"
                  className="main-logo"
                  width="128"
                  alt="Awesome Image"
                />
              </Link>
            </Link>
            <div className="header__social">
              <Link>
                <i className="fab fa-twitter"></i>
              </Link>
              <Link>
                <i className="fab fa-facebook-square"></i>
              </Link>
              <Link>
                <i className="fab fa-pinterest-p"></i>
              </Link>
              <Link>
                <i className="fab fa-instagram"></i>
              </Link>
            </div>
            <button className="menu-toggler">
              <span className="kipso-icon-menu"></span>
            </button>
          </div>
          <div className="main-navigation">
            <ul className=" navigation-box">
              <li className="current">
                <Link>
                  <a>Home</a>
                </Link>
                <ul className="sub-menu">
                  <li>
                    <Link>
                      <a>Home 01</a>
                    </Link>
                  </li>
                  <li>
                    <Link>
                      <a>Home 02</a>
                    </Link>
                  </li>
                  <li>
                    <Link>
                      <a>Home 03</a>
                    </Link>
                  </li>
                  <li>
                    <Link>Header Versions</Link>
                    <ul className="sub-menu">
                      <li>
                        <Link>
                          <a>Header 01</a>
                        </Link>
                      </li>
                      <li>
                        <Link>
                          <a>Header 02</a>
                        </Link>
                      </li>
                      <li>
                        <Link>
                          <a>Header 03</a>
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <Link>Pages</Link>
                <ul className="sub-menu">
                  <li>
                    <Link>
                      <a>About Page</a>
                    </Link>
                  </li>
                  <li>
                    <Link>
                      <a>Gallery</a>
                    </Link>
                  </li>
                  <li>
                    <Link>
                      <a>Pricing Plans</a>
                    </Link>
                  </li>
                  <li>
                    <Link>
                      <a>FAQ'S</a>
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <a>Courses</a>
                <ul className="sub-menu">
                  <li>
                    <Link href="/courses">
                      <a>Courses</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/course-details">
                      <a>Courses Details</a>
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link href="/teachers">
                  <a>Teachers</a>
                </Link>
                <ul className="sub-menu">
                  <li>
                    <Link>
                      <a>Teachers</a>
                    </Link>
                  </li>
                  <li>
                    <Link>
                      <a>Teachers Details</a>
                    </Link>
                  </li>
                  <li>
                    <Link>
                      <a>Become Teacher</a>
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link href="/news">
                  <a>News</a>
                </Link>
                <ul className="sub-menu">
                  <li>
                    <Link>
                      <a>News Page</a>
                    </Link>
                  </li>
                  <li>
                    <Link>
                      <a>News Details</a>
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link>
                  <a>Contact</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="right-side-box">
            <a
              className="header__search-btn search-popup__toggler search-toggle"
              href="#"
            >
              <i className="kipso-icon-magnifying-glass"></i>
            </a>
          </div>
        </div>
      </nav>
      <div className="site-header__decor">
        <div className="site-header__decor-row">
          <div className="site-header__decor-single">
            <div className="site-header__decor-inner-1"></div>
          </div>
          <div className="site-header__decor-single">
            <div className="site-header__decor-inner-2"></div>
          </div>
          <div className="site-header__decor-single">
            <div className="site-header__decor-inner-3"></div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Index;
