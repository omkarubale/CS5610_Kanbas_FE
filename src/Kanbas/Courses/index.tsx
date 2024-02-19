import { Navigate, Route, Routes } from "react-router-dom";

import "./index.css";
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Breadcrumb from "./common/Breadcrumb";
import NotLeftSide from "../layout/Content/NotLeftSide";

function Courses() {
  return (
    <>
      <Breadcrumb />

      <div className="wd-after-breadcrumb">
        <div className="wd-course-navigation-container">
          <CourseNavigation />
        </div>
        <NotLeftSide>
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<h1>Home</h1>} />
            <Route path="Modules" element={<Modules />} />
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
        </NotLeftSide>
      </div>
    </>
  );
}
export default Courses;
