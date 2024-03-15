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
import { useState } from "react";

function Courses() {
  const [subNavigationOpen, setSubNavigationOpen] = useState(true);

  return (
    <>
      <Breadcrumb
        subNavigationOpen={subNavigationOpen}
        setSubNavigationOpen={setSubNavigationOpen}
      />

      <div className="wd-after-breadcrumb">
        <CourseNavigation subNavigationOpen={subNavigationOpen} />

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
              element={<AssignmentEditor isCreate={false} />}
            />
            <Route
              path="Assignments/create"
              element={<AssignmentEditor isCreate={true} />}
            />
            <Route path="Grades" element={<Grades />} />
          </Routes>
        </NotLeftSide>
      </div>
    </>
  );
}
export default Courses;
