import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { KanbasState } from "../../../store";
import { useEffect, useState } from "react";
import { IKanbasQuiz } from "../../../store/interfaces/quizzes";
import { setQuizzes } from "../reducer";
import {
  FaBan,
  FaCaretDown,
  FaCheckCircle,
  FaEllipsisV,
  FaGripVertical,
  FaRocket,
} from "react-icons/fa";
import { Collapse } from "react-bootstrap";
import { FaFilePen } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { getCourseQuizzes } from "../client";
import "./index.css";

function QuizList() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const quizzesList = useSelector(
    (state: KanbasState) => state.quizzesReducer.quizzes
  );

  const [quizzesExpanded, setQuizzesExpanded] = useState(true);

  const handleQuizSelection = (quizId: string) => {
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}`);
  };

  const getDateDisplay = (date: Date) => {
    return "";
  };

  const getAvailableDateDisplay = (
    availableFromDate: Date,
    availableUntilDate: Date
  ) => {
    const today = new Date();

    if (today < availableFromDate) {
      return (
        <>
          <b>Not Available until</b> {availableFromDate.toDateString()}{" "}
        </>
      );
    }

    if (today < availableUntilDate) {
      return <b>Available</b>;
    }

    return <b>Closed</b>;
  };

  useEffect(() => {
    if (courseId !== undefined) {
      getCourseQuizzes(courseId).then((quizzes: IKanbasQuiz[]) => {
        dispatch(setQuizzes(quizzes));
      });
    }
  }, [dispatch]);

  return (
    <>
      <ul className="list-group wd-quizzes-grid">
        <li className="list-group-item">
          <div
            className="wd-quizzes-grid-section d-flex align-items-center"
            onClick={() => setQuizzesExpanded(!quizzesExpanded)}
            aria-controls={"quiz-section-collapse"}
            aria-expanded={quizzesExpanded}
          >
            <FaCaretDown
              style={{ transform: quizzesExpanded ? "" : "rotate(-90deg)" }}
            />
            <div className="ms-1 me-auto">Assignment Quizzes</div>
          </div>

          <Collapse in={quizzesExpanded}>
            <div
              id={"quiz-section-collapse"}
              className="wd-quiz-section-collapse"
            >
              <ul className="list-group">
                {quizzesList?.map((q, qIndex) => (
                  <li
                    key={qIndex}
                    className="list-group-item d-flex align-items-center"
                  >
                    <FaRocket className="ms-2 wd-icon-green" />
                    <div className="wd-quizzes-grid-content-text flex-fill me-auto">
                      <a
                        onClick={() => handleQuizSelection(q._id)}
                        className="wd-event-link"
                      >
                        {q.title}
                      </a>
                      <p className="wd-quizzes-grid-content-details">
                        {getAvailableDateDisplay(
                          q.availableDate,
                          q.availableUntilDate
                        )}{" "}
                        | Due {q.dueDate.toString()} | {q.points} Points |{" "}
                        {q.questionsCount} Questions
                      </p>
                    </div>
                    <span className="float-end wd-quizzes-grid-content-actions d-flex align-items-center">
                      {q.isPublished && (
                        <FaCheckCircle className="wd-icon-green" />
                      )}
                      {!q.isPublished && <FaBan className="me-1" />}
                      <FaEllipsisV className="ms-2" />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Collapse>
        </li>
      </ul>
    </>
  );
}

export default QuizList;
