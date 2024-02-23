import { Link, useLocation } from "react-router-dom";
import "./index.css";
import { FaBars, FaGlasses, FaChevronDown } from "react-icons/fa";
import { kanbasNavigationLinks } from "../../Navigation";
import { Routes, Route, Navigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useState } from "react";
import CourseNavigationMobile from "../Courses/Navigation";

import Dashboard from "./../../Dashboard";

function KanbasNavigationMobile() {
  const { pathname } = useLocation();
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [showMobileSubNav, setShowMobileSubNav] = useState(false);
  const handleCloseMobileNav = () => setShowMobileNav(false);
  const handleShowNav = () => setShowMobileNav(true);

  const [mobileHeaderLine1, setMobileHeaderLine1] = useState("");
  const [mobileHeaderLine2, setMobileHeaderLine2] = useState("");

  function resetMobileHeader(line2Header: string) {
    setMobileHeaderLine1("");
    setMobileHeaderLine2(line2Header);
  }

  return (
    <>
      <div className="wd-mobile-navigation-container d-md-none">
        <nav className="navbar navbar-dark bg-black">
          <div className="container-fluid">
            <div className="col-3 wd-mobile-navigation-left">
              <Button
                variant="dark"
                className="navbar-toggler wd-mobile-navigation-button"
                onClick={handleShowNav}
              >
                <FaBars />
              </Button>
            </div>

            <div
              className="wd-mobile-navigation-title col-6"
              onClick={() => setShowMobileSubNav(!showMobileSubNav)}
              aria-controls="collapse-sub-navigation-mobile"
              aria-expanded={showMobileSubNav}
            >
              <div>{mobileHeaderLine1}</div>
              <div>{mobileHeaderLine2}</div>
            </div>

            <div className="col-3 wd-mobile-navigation-right">
              <Button
                className="navbar-toggler wd-mobile-navigation-button"
                onClick={() => setShowMobileSubNav(!showMobileSubNav)}
                aria-controls="collapse-sub-navigation-mobile"
                aria-expanded={showMobileSubNav}
                aria-label="Toggle Courses Navbar"
                variant="dark"
              >
                <FaChevronDown />
              </Button>

              <Button
                variant="dark"
                className="navbar-toggler wd-mobile-navigation-button"
              >
                <FaGlasses />
              </Button>
            </div>
          </div>
        </nav>

        <Offcanvas
          className="wd-kanbas-navigation-mobile-content"
          show={showMobileNav}
          onHide={handleCloseMobileNav}
        >
          <Offcanvas.Header className="offcanvas-header">
            <h5 className="offcanvas-title" id="NavbarKanbasMobileLabel">
              Kanbas
            </h5>
            <Button
              variant="light"
              className="btn-close"
              onClick={handleCloseMobileNav}
            ></Button>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <ul className="navbar-nav justify-content-end flex-grow-1 px-3 pt-3 wd-kanbas-navigation-mobile">
              {kanbasNavigationLinks.map((link, index) => (
                <li key={index} className="nav-item">
                  <Link
                    className={
                      "nav-link" +
                      " " +
                      (pathname.includes(link.label) ? "wd-active" : "")
                    }
                    onClick={() => resetMobileHeader(link.label)}
                    to={`/Kanbas/${link.label}`}
                  >
                    <span>
                      <div>{link.mobile_icon}</div>
                    </span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Offcanvas.Body>
        </Offcanvas>

        <Routes>
          <Route path="/" element={<Navigate to="Dashboard" />} />
          <Route path="Account" element={<></>} />
          <Route path="Dashboard" element={<Dashboard />} />
          <Route
            path="Courses/:courseId/*"
            element={
              <CourseNavigationMobile
                showMobileSubNav={showMobileSubNav}
                setMobileHeaderLine1={setMobileHeaderLine1}
                setMobileHeaderLine2={setMobileHeaderLine2}
              />
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default KanbasNavigationMobile;
