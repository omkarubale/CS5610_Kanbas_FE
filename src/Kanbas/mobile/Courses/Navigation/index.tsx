import { Link, useLocation } from "react-router-dom";
import "./index.css";
import { useParams } from "react-router";
import { Collapse } from "react-bootstrap";
import { courseNavigationLinks } from "../../../Courses/Navigation";

function CourseNavigationMobile(props: {
  setMobileHeaderLine1: (text: string) => void;
  setMobileHeaderLine2: (text: string) => void;
  showMobileSubNav: boolean;
}) {
  const { courseId } = useParams();
  const { pathname } = useLocation();

  if (courseId != undefined) {
    props.setMobileHeaderLine1(courseId);
  }

  courseNavigationLinks.forEach((link) => {
    if (pathname.includes(link.link)) {
      props.setMobileHeaderLine2(link.title);
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
            {courseNavigationLinks.map((courseNavigationLink) => (
              <li
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
                    props.setMobileHeaderLine2(courseNavigationLink.title)
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
