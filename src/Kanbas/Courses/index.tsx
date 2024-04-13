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
import Quizzes from "./Quizzes";
import QuizDetails from "./Quizzes/Details";
import QuizEditor from "./Quizzes/Editor";
import QuizQuestionEditor from "./Quizzes/Editor/Questions/Editor";
import QuizPreview from "./Quizzes/Preview";
import QuizDetailsEditor from "./Quizzes/Editor/Details";
import QuizQuestionsEditor from "./Quizzes/Editor/Questions";

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
            <Route path="Quizzes" element={<Quizzes />} />
            <Route path="Quizzes/:quizId" element={<QuizDetails />} />
            <Route
              path="Quizzes/create"
              element={<QuizDetailsEditor isCreate={true} />}
            />
            <Route path="Quizzes/:quizId/edit" element={<QuizEditor />} />
            <Route
              path="Quizzes/:quizId/edit/details"
              element={<QuizDetailsEditor isCreate={false} />}
            />
            <Route
              path="Quizzes/:quizId/edit/questions"
              element={<QuizQuestionsEditor />}
            />
            <Route
              path="Quizzes/:quizId/questions/:questionId"
              element={<QuizQuestionEditor isCreate={false} />}
            />
            <Route
              path="Quizzes/:quizId/questions/create"
              element={<QuizQuestionEditor isCreate={true} />}
            />
            <Route path="Quizzes/:quizId/preview" element={<QuizPreview />} />
          </Routes>
        </NotLeftSide>
      </div>
    </>
  );
}
export default Courses;
