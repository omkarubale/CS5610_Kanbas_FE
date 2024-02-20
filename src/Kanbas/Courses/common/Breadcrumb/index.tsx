import { courses } from "../../../Database";
import { useParams, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { FaBars } from "react-icons/fa6";
import "./index.css";
import { courseNavigationLinks } from "../../Navigation";
import { Link } from "react-router-dom";

function Breadcrumb() {
  const { courseId } = useParams();
  const course = courses.find((course) => course._id === courseId);
  const { pathname } = useLocation();

  return (
    <>
      <div className="wd-breadcrumb d-none d-md-inline-flex">
        <Button
          type="button"
          className="btn wd-menu-toggle"
          data-bs-toggle="collapse"
          data-bs-target="#wdSectionNavigation"
          aria-expanded="true"
          aria-controls="collapseExample"
        >
          <FaBars />
        </Button>

        <nav aria-label="breadcrumb d-inline-flex">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <a href="">{course?.name}</a>
            </li>
            {courseNavigationLinks.map(
              (courseNavigationLink, index) =>
                pathname.includes(courseNavigationLink.link) && (
                  <li className="breadcrumb-item active" aria-current="page">
                    <Link to="#">{courseNavigationLink.title}</Link>
                  </li>
                )
            )}
          </ol>
        </nav>
      </div>

      <div className="wd-breadcrumb-divider d-none d-md-block">
        <hr />
      </div>
    </>
  );
}

export default Breadcrumb;
