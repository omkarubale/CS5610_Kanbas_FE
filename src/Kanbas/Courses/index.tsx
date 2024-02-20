import { Navigate, Route, Routes } from "react-router-dom";

import "./index.css";
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Breadcrumb from "./common/Breadcrumb";
import NotLeftSide from "../layout/Content/NotLeftSide";
import CoursesHome from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import Grades from "./Grades";

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
            {/* Inside each, we need this structure:
                <MiddleContent></MiddleContent>
                optional : <RightSide></RightSide> */}
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<CoursesHome />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route
              path="Assignments/:assignmentId"
              element={<AssignmentEditor />}
            />
            <Route path="Grades" element={<Grades />} />
          </Routes>
        </NotLeftSide>
      </div>
    </>
  );
}
export default Courses;
