import { assignments } from "../../../Database";
import { useParams, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { FaBars } from "react-icons/fa6";
import "./index.css";
import { courseNavigationLinks } from "../../Navigation";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../store";
import { getCourse } from "../../reducer";
import { useEffect } from "react";

export function getAssignmentId(pathname: string) {
  if (!pathname.includes("Assignments")) return undefined;
  const assignmentId = pathname.split("/").pop();

  if (assignmentId === "Assignments") return undefined;

  return assignmentId;
}

function Breadcrumb(props: {
  setSubNavigationOpen: (arg0: boolean) => void;
  subNavigationOpen: boolean;
}) {
  const { courseId } = useParams();
  const { pathname } = useLocation();

  const course = useSelector(
    (state: KanbasState) => state.coursesReducer.course
  );

  const assignmentId = getAssignmentId(pathname);

  const dispatch = useDispatch();

  useEffect(() => {
    if (courseId !== undefined) getCourse(dispatch, courseId);
  }, [courseId]);

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
            <li className="breadcrumb-item" key={0}>
              <Link to="Home">{course?.name}</Link>
            </li>
            {courseNavigationLinks.map(
              (courseNavigationLink, index) =>
                pathname.includes(courseNavigationLink.link) && (
                  <li
                    key={index}
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

            {pathname.includes("Assignments") &&
              assignmentId !== undefined &&
              assignmentId !== "create" && (
                <li className="breadcrumb-item active">
                  <Link to={"Assignments/" + assignmentId}>
                    {assignments
                      .filter(
                        (assignment) =>
                          assignment.courseId === courseId &&
                          assignment._id === assignmentId
                      )
                      ?.map((a) => a.title)}
                  </Link>
                </li>
              )}
            {pathname.includes("Assignments") &&
              assignmentId !== undefined &&
              assignmentId === "create" && (
                <li className="breadcrumb-item active">
                  <Link to="#">New Assignment</Link>
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
