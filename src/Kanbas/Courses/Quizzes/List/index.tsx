import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { KanbasState } from "../../../store";
import { useEffect, useState } from "react";
import { IKanbasQuiz } from "../../../store/interfaces/quizzes";
import { setQuizzes, toggleQuizPublished } from "../reducer";
import {
  FaBan,
  FaCaretDown,
  FaCheckCircle,
  FaEllipsisV,
  FaRocket,
} from "react-icons/fa";
import { Collapse } from "react-bootstrap";
import { getCourseQuizzes, postQuizSetPublish } from "../client";
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

  const handlePublishToggle = (quizId: string) => {
    const _isPublished =
      quizzesList.find((q) => q._id == quizId)?.isPublished ?? false;

    postQuizSetPublish(quizId, !_isPublished).then(() => {
      dispatch(toggleQuizPublished(quizId));
    });
  };

  const getDateDisplay = (date: Date) => {
    return "";
  };

  const getIsQuizClosed = (availableUntilDate: Date): boolean => {
    const today = new Date();

    if (today < availableUntilDate) {
      return false;
    }

    return true;
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
            <FaCaretDown className={quizzesExpanded ? "" : "caret-rotate"} />
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
                      {q.isPublished ? (
                        <FaCheckCircle
                          onClick={() => handlePublishToggle(q._id)}
                          className={`me-1 ${
                            getIsQuizClosed(q.availableUntilDate)
                              ? "wd-icon-green-muted"
                              : "wd-icon-green"
                          }`}
                        />
                      ) : (
                        <FaBan
                          onClick={() => handlePublishToggle(q._id)}
                          className="me-1"
                        />
                      )}

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
