import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { KanbasState } from "../../../store";
import { useEffect, useRef, useState } from "react";
import { IKanbasQuiz } from "../../../store/interfaces/quizzes";
import { setQuiz, setQuizzes, setQuizPublished } from "../reducer";
import {
  FaBan,
  FaCaretDown,
  FaCheckCircle,
  FaEdit,
  FaEllipsisV,
  FaRocket,
} from "react-icons/fa";
import { Collapse } from "react-bootstrap";
import { getCourseQuizzes, postQuizSetPublish } from "../client";
import "./index.css";
import moment from "moment";
import { MdDelete } from "react-icons/md";
import DeleteQuizModal from "./Delete";
import { getCurrentHumanReadableDate } from "../../common/Utils";

export const quizzesDropDownEllipsisOption = [
  { item: "Edit", icon: <FaEdit className="me-1" /> },
  { item: "Delete", icon: <MdDelete className="me-1" /> },
];

function QuizList() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const quizzesList = useSelector(
    (state: KanbasState) => state.quizzesReducer.quizzes
  );

  const [quizzesExpanded, setQuizzesExpanded] = useState(true);
  const [showDropdowns, setShowDropdowns] = useState(
    Array(quizzesList.length).fill(false)
  );
  const [showDeleteQuizModal, setShowDeleteQuizModal] = useState(false);

  const handleQuizSelection = (quizId: string) => {
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}`);
  };

  const handlePublishToggle = (quizId: string) => {
    const _isPublished =
      quizzesList.find((q) => q._id == quizId)?.isPublished ?? false;

    postQuizSetPublish(quizId, !_isPublished).then(() => {
      dispatch(setQuizPublished({ quizId, isPublish: !_isPublished }));
    });
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
          <b>Not Available until</b>{" "}
          {getCurrentHumanReadableDate(availableFromDate)}{" "}
        </>
      );
    }

    if (today < availableUntilDate) {
      return <b>Available</b>;
    }

    return <b>Closed</b>;
  };

  const toggleDropdown = (index: number) => {
    setShowDropdowns((prevState) =>
      prevState.map((value, idx) => (idx === index ? !value : value))
    );
  };

  const handleDropdownSelectedOption = async (
    selectedItem: string,
    quiz: IKanbasQuiz
  ) => {
    dispatch(setQuiz(quiz));
    setShowDropdowns(Array(quizzesList.length).fill(false));

    switch (selectedItem) {
      case "Edit":
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}/edit`);
        break;
      case "Delete":
        setShowDeleteQuizModal(true);
        break;
    }
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
                        | Due {getCurrentHumanReadableDate(q.dueDate)} |{" "}
                        {q.points} Points | {q.questionsCount} Questions
                      </p>
                    </div>
                    <div className="float-end d-flex">
                      <div className="wd-quizzes-grid-content-actions d-flex align-items-center">
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
                      </div>
                      <div>
                        <div
                          className="dropdown"
                          onClick={() => toggleDropdown(qIndex)}
                        >
                          <button
                            className="wd-quizzes-actions-dropdown"
                            aria-expanded={showDropdowns[qIndex]}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleDropdown(qIndex);
                            }}
                          >
                            <FaEllipsisV className="ms-2" />
                          </button>
                          <div
                            className={`dropdown-menu dropdown-menu-start wd-quiz-dropdown-menu${
                              showDropdowns[qIndex] ? " show" : ""
                            }`}
                          >
                            {quizzesDropDownEllipsisOption.map(
                              (option, index) => (
                                <button
                                  key={index}
                                  className="dropdown-item px-3 py-1 mt-1"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDropdownSelectedOption(
                                      option.item,
                                      q
                                    );
                                  }}
                                >
                                  {option.icon}
                                  {option.item}
                                </button>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {showDeleteQuizModal && (
                <DeleteQuizModal
                  show={showDeleteQuizModal}
                  setShow={setShowDeleteQuizModal}
                />
              )}
            </div>
          </Collapse>
        </li>
      </ul>
    </>
  );
}

export default QuizList;
