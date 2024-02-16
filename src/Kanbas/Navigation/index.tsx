import { Link, useLocation } from "react-router-dom";
import "./index.css";
import {
  FaTachometerAlt,
  FaRegUserCircle,
  FaBook,
  FaRegCalendarAlt,
  FaHistory,
  FaTv,
  FaRegQuestionCircle,
  FaLongArrowAltLeft,
  FaBars,
  FaChevronDown,
  FaGlasses,
  FaHome,
  FaInbox,
} from "react-icons/fa";
import { FaC } from "react-icons/fa6";

import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useState } from "react";

function KanbasNavigation() {
  const links = [
    {
      label: "Account",
      icon: <FaRegUserCircle className="wd-icon-white" />,
    },
    {
      label: "Dashboard",
      icon: <FaTachometerAlt className="" />,
    },
    {
      label: "Courses",
      icon: <FaBook className="" />,
    },
    {
      label: "Calendar",
      icon: <FaRegCalendarAlt className="" />,
    },
    {
      label: "Inbox",
      icon: <FaInbox className="" />,
    },
    {
      label: "History",
      icon: <FaHistory className="" />,
    },
    {
      label: "Studio",
      icon: <FaTv className="" />,
    },
    {
      label: "Commons",
      icon: <FaC className="" />,
    },
    {
      label: "Help",
      icon: <FaRegQuestionCircle className="" />,
    },
  ];

  const { pathname } = useLocation();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="wd-kanbas-navigation-container d-none d-md-block">
        <ul className="wd-kanbas-navigation">
          <li>
            <a href="http://northeastern.edu">
              <img
                src="/assets/NEU_logo.webp"
                alt="N"
                height="80px"
                width="80px"
              />
            </a>
          </li>
          {links.map((link, index) => (
            <li
              key={index}
              className={
                (link.label == "Account" ? "wd-nav-account" : "") +
                " " +
                (pathname.includes(link.label) ? "wd-active" : "")
              }
            >
              <div className="wd-kanbas-nav-item">
                <Link to={`/Kanbas/${link.label}`}>
                  {" "}
                  <div>{link.icon}</div> {link.label}{" "}
                </Link>
              </div>
            </li>
          ))}
        </ul>

        <ul className="wd-kanbas-navigation-bottom">
          <li>
            <div className="wd-kanbas-navigation-bottom-item">
              <Link to="#">
                <div>
                  <FaLongArrowAltLeft />
                </div>
              </Link>
            </div>
          </li>
        </ul>
      </div>

      <div className="wd-mobile-navigation-container d-md-none">
        <nav className="navbar navbar-dark bg-black">
          <div className="container-fluid">
            <div className="col-3 wd-mobile-navigation-left">
              <Button
                variant="dark"
                className="navbar-toggler wd-mobile-navigation-button"
                onClick={handleShow}
              >
                <FaBars />
              </Button>
            </div>

            <div
              className="wd-mobile-navigation-title col-6"
              data-bs-toggle="collapse"
              data-bs-target="#NavbarCoursesMobile"
            >
              <div>CS4550.12631.202410</div>
              <div>Modules</div>
            </div>

            <div className="col-3 wd-mobile-navigation-right">
              {/* <button
                className="navbar-toggler wd-mobile-navigation-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#NavbarCoursesMobile"
                aria-controls="NavbarCoursesMobile"
                aria-expanded="false"
                aria-label="Toggle Courses Navbar"
              >
                <FaChevronDown />
              </button> */}

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
          show={show}
          onHide={handleClose}
        >
          <Offcanvas.Header className="offcanvas-header">
            <h5 className="offcanvas-title" id="NavbarKanbasMobileLabel">
              Kanbas
            </h5>
            <Button
              variant="light"
              className="btn-close"
              onClick={handleClose}
            ></Button>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <ul className="navbar-nav justify-content-end flex-grow-1 px-3 pt-3 wd-kanbas-navigation-mobile">
              {links.map((link, index) => (
                <li key={index} className="nav-item">
                  <Link
                    className={
                      "nav-link" +
                      " " +
                      (pathname.includes(link.label) ? "wd-active" : "")
                    }
                    to={`/Kanbas/${link.label}`}
                  >
                    <span>
                      <div>{link.icon}</div>
                    </span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </>
  );
}
export default KanbasNavigation;
