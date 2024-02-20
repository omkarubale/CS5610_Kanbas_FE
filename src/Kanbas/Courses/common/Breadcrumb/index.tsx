import { courses, assignments } from "../../../Database";
import { useParams, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { FaBars } from "react-icons/fa6";
import "./index.css";
import { courseNavigationLinks } from "../../Navigation";
import { Link } from "react-router-dom";

function Breadcrumb() {
  const { courseId, assignmentId } = useParams();
  const course = courses.find((course) => course._id === courseId);
  const { pathname } = useLocation();
  // console.log("useParams() : ", useParams());

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
              <Link to="Home">{course?.name}</Link>
            </li>
            {courseNavigationLinks.map(
              (courseNavigationLink) =>
                pathname.includes(courseNavigationLink.link) && (
                  <li className="breadcrumb-item active" aria-current="page">
                    <Link to={courseNavigationLink.link}>
                      {courseNavigationLink.title}
                    </Link>
                  </li>
                )
            )}

            {pathname.includes("Assignments") &&
              typeof assignmentId !== "undefined" && (
                <li className="breadcrumb-item active">
                  <Link to={"Assignments/" + assignmentId}>
                    {assignments
                      .filter(
                        (assignment) =>
                          assignment.course === courseId &&
                          assignment._id === assignmentId
                      )
                      ?.map((a) => a.title)}
                  </Link>
                </li>
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
