import { Navigate, Route, Routes } from "react-router-dom";

import "./index.css";
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Breadcrumb from "./common/Breadcrumb";
import NotLeftSide from "../layout/Content/NotLeftSide";
import CoursesHome from "./Home";

function Courses() {
  return (
    <>
      <Breadcrumb />

      <div className="wd-after-breadcrumb">
        <div className="wd-course-navigation-container d-none d-md-block">
          <CourseNavigation />
        </div>
        <NotLeftSide>
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<CoursesHome />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Piazza" element={<h1>Piazza</h1>} />
            <Route path="Assignments" element={<h1>Assignments</h1>} />
            <Route
              path="Assignments/:assignmentId"
              element={<h1>Assignment Editor</h1>}
            />
            <Route path="Grades" element={<h1>Grades</h1>} />
            {/* Inside each, we need this structure:
              <MiddleContent></MiddleContent>
              optional : <RightSide></RightSide> */}
          </Routes>
        </NotLeftSide>
      </div>
    </>
  );
}
export default Courses;
