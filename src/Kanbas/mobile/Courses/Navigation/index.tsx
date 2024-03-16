import { Link, useLocation } from "react-router-dom";
import "./index.css";
import { useParams } from "react-router";
import { Collapse } from "react-bootstrap";
import { courseNavigationLinks } from "../../../Courses/Navigation";
import { useDispatch } from "react-redux";
import {
  setNavigationTitle,
  setSubNavigationTitle,
} from "../../../Navigation/reducer";

function CourseNavigationMobile(props: { showMobileSubNav: boolean }) {
  const { courseId } = useParams();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  if (courseId != undefined) {
    dispatch(setNavigationTitle(courseId));
  }

  courseNavigationLinks.forEach((link) => {
    if (pathname.includes(link.link)) {
      dispatch(setSubNavigationTitle(link.title));
    }
  });

  return (
    <>
      <Collapse
        in={props.showMobileSubNav}
        className="wd-courses-navigation-mobile-content"
        data-bs-theme="dark"
      >
        <div className="bg-white p-4">
          <ul className="wd-course-navigation-mobile">
            {courseNavigationLinks.map((courseNavigationLink, index) => (
              <li
                key={index}
                className={
                  pathname.includes(courseNavigationLink.link)
                    ? "wd-submenu-active-mobile"
                    : ""
                }
                aria-current="page"
              >
                <Link
                  to={courseNavigationLink.link}
                  onClick={() =>
                    dispatch(setSubNavigationTitle(courseNavigationLink.title))
                  }
                >
                  {courseNavigationLink.icon}
                  {courseNavigationLink.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Collapse>
    </>
  );
}

export default CourseNavigationMobile;
