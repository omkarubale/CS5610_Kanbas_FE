import { courses } from "../../Kanbas/Database";
import { Navigate, Route, Routes, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { FaBars } from "react-icons/fa6";
import "./index.css";
import CourseNavigation from "./Navigation";

function Courses() {
  const { courseId } = useParams();
  console.log("courseId", courseId);
  const course = courses.find((course) => course._id === courseId);
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
            {/* <li className="breadcrumb-item active" aria-current="page">
              <a href="#">Modules</a>
            </li> */}
          </ol>
        </nav>
      </div>

      <div className="wd-breadcrumb-divider d-none d-md-block">
        <hr />
      </div>

      <div className="wd-after-breadcrumb">
        <div className="wd-course-navigation-container">
          <CourseNavigation />
        </div>
        <div className="wd-not-left-side flex-fill">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<h1>Home</h1>} />
            <Route path="Modules" element={<h1>Modules</h1>} />
            <Route path="Piazza" element={<h1>Piazza</h1>} />
            <Route path="Assignments" element={<h1>Assignments</h1>} />
            <Route
              path="Assignments/:assignmentId"
              element={<h1>Assignment Editor</h1>}
            />
            <Route path="Grades" element={<h1>Grades</h1>} />
            {/* Inside each, we need this structure:
              <div className="middle-content flex-fill"></div>
              <div className="wd-right-side d-none d-lg-block"></div> */}
          </Routes>
        </div>
      </div>
    </>
  );
}
export default Courses;
