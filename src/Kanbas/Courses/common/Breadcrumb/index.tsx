import { courses, assignments } from "../../../Database";
import { useParams, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { FaBars } from "react-icons/fa6";
import "./index.css";
import { courseNavigationLinks } from "../../Navigation";
import { Link } from "react-router-dom";

function Breadcrumb(props: {
  setSubNavigationOpen: (arg0: boolean) => void;
  subNavigationOpen: boolean;
}) {
  const { courseId } = useParams();
  const course = courses.find((course) => course._id === courseId);
  const { pathname } = useLocation();

  function getAssignmentId(pathname: string) {
    if (!pathname.includes("Assignments")) return undefined;
    const assignmentId = pathname.split("/").pop();

    if (assignmentId === "Assignments") return undefined;

    return assignmentId;
  }

  const assignmentId = getAssignmentId(pathname);

  return (
    <>
      <div className="wd-breadcrumb d-none d-md-inline-flex">
        <Button
          onClick={() => props.setSubNavigationOpen(!props.subNavigationOpen)}
          className="btn wd-menu-toggle"
          aria-expanded={props.subNavigationOpen}
          aria-controls="collapse-sub-navigation"
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
                  <li
                    className={
                      "breadcrumb-item" +
                      (!pathname.includes("Assignments") ||
                      (pathname.includes("Assignments") &&
                        assignmentId === undefined)
                        ? " active"
                        : "")
                    }
                    aria-current="page"
                  >
                    <Link to={courseNavigationLink.link}>
                      {courseNavigationLink.title}
                    </Link>
                  </li>
                )
            )}

            {pathname.includes("Assignments") && assignmentId !== undefined && (
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
