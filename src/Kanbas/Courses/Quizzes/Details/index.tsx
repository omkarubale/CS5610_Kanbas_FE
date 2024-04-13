import { Button, Table } from "react-bootstrap";
import { MdOutlineEdit } from "react-icons/md";
import MiddleContent from "../../../layout/Content/NotLeftSide/MiddleContent";
import MiddleContentActions from "../../../layout/Content/NotLeftSide/MiddleContent/MiddleContentActions";
import MiddleContentData from "../../../layout/Content/NotLeftSide/MiddleContent/MiddleContentData";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../store";
import { IKanbasQuizDetails } from "../../../store/interfaces/quizzes";
import { setQuiz } from "../reducer";
import { useEffect } from "react";
import { getQuizDetails, postQuizSetPublish } from "../client";
import { FaBan, FaCheckCircle, FaEllipsisV } from "react-icons/fa";
import "./index.css";
import { eQuizType } from "../../../store/enums/eQuizType";
import { formatSnakeCaseToTitleCase } from "../../common/Utils";

function QuizDetails() {
  const { courseId, quizId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);

  const handleEdit = () => {
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/edit`);
  };

  const handlePreview = () => {
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/preview`);
  };

  const renderBooleanValue = (val: boolean) => {
    if (val) return <>Yes</>;
    else return <>No</>;
  };

  const handlePublishToggle = () => {
    postQuizSetPublish(quiz._id, !quiz.isPublished).then(() => {
      dispatch(setQuiz({ ...quiz, isPublished: !quiz.isPublished }));
    });
  };

  useEffect(() => {
    if (quizId !== undefined && courseId !== undefined) {
      getQuizDetails(quizId).then((quiz: IKanbasQuizDetails) => {
        dispatch(setQuiz(quiz));
      });
    }
  }, [dispatch, quizId, courseId]);

  return (
    <>
      <MiddleContent>
        <MiddleContentActions>
          <Button
            className={
              quiz.isPublished ? "wd-button-published" : "wd-button-standard"
            }
            onClick={handlePublishToggle}
          >
            <div className="d-flex justify-content-center align-items-center">
              {quiz.isPublished ? (
                <>
                  <FaCheckCircle className="me-1" /> Published
                </>
              ) : (
                <>
                  <FaBan className="me-1" /> Publish
                </>
              )}
            </div>
          </Button>
          <Button className="wd-button-standard me-2" onClick={handlePreview}>
            <div className="d-flex justify-content-center align-items-center">
              Preview
            </div>
          </Button>

          <Button className="wd-button-standard" onClick={() => handleEdit()}>
            <div className="d-flex justify-content-center align-items-center">
              <MdOutlineEdit className="me-1" /> Edit
            </div>
          </Button>
          <Button className="wd-button-standard">
            <div className="d-flex justify-content-center align-items-center">
              <FaEllipsisV className="my-1" />
            </div>
          </Button>
        </MiddleContentActions>
        <hr />
        <MiddleContentData>
          <div className="wd-quiz-details-container">
            <h2>{quiz.title}</h2>
            <div className="row wd-quiz-details-item">
              <div className="col-4 wd-quiz-details-label">Quiz Type</div>
              <div className="col-8 wd-quix-details-value">
                {formatSnakeCaseToTitleCase(eQuizType[quiz.quizType])}
              </div>
            </div>
            <div className="row wd-quiz-details-item">
              <div className="col-4 wd-quiz-details-label">Points</div>
              <div className="col-8 wd-quix-details-value">{quiz.points}</div>
            </div>
            <div className="row wd-quiz-details-item">
              <div className="col-4 wd-quiz-details-label">
                Assignment Group
              </div>
              <div className="col-8 wd-quix-details-value">QUIZZES</div>
            </div>
            <div className="row wd-quiz-details-item">
              <div className="col-4 wd-quiz-details-label">Shuffle Answers</div>
              <div className="col-8 wd-quix-details-value">
                {renderBooleanValue(quiz.isShuffleAnswers)}
              </div>
            </div>
            <div className="row wd-quiz-details-item">
              <div className="col-4 wd-quiz-details-label">Time Limit</div>
              <div className="col-8 wd-quix-details-value">
                {quiz.timeLimit} minutes
              </div>
            </div>
            <div className="row wd-quiz-details-item">
              <div className="col-4 wd-quiz-details-label">
                Multiple Attempts
              </div>
              <div className="col-8 wd-quix-details-value">
                {renderBooleanValue(quiz.isMultipleAttempts)}
              </div>
            </div>
            <div className="row wd-quiz-details-item">
              <div className="col-4 wd-quiz-details-label">
                Show Correct Answers
              </div>
              <div className="col-8 wd-quix-details-value">
                {quiz.showCorrectAnswersDate.toString()}
              </div>
            </div>
            <div className="row wd-quiz-details-item">
              <div className="col-4 wd-quiz-details-label">
                One Question at a Time
              </div>
              <div className="col-8 wd-quix-details-value">
                {renderBooleanValue(quiz.isOneQuestionAtATime)}
              </div>
            </div>
            <div className="row wd-quiz-details-item">
              <div className="col-4 wd-quiz-details-label">Webcam Required</div>
              <div className="col-8 wd-quix-details-value">
                {renderBooleanValue(quiz.isWebcamRequired)}
              </div>
            </div>
            <div className="row wd-quiz-details-item">
              <div className="col-4 wd-quiz-details-label">
                Lock Questions After Answering
              </div>
              <div className="col-8 wd-quix-details-value">
                {renderBooleanValue(quiz.isLockQuestionsAfterAnswering)}
              </div>
            </div>

            <Table>
              <thead>
                <tr className="wd-quiz-details-th">
                  <th className="col-3">Due</th>
                  <th className="col-2">For</th>
                  <th className="col-4">Available From</th>
                  <th className="col-3">Until</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{quiz.dueDate.toString()}</td>
                  <td>Everyone</td>
                  <td>{quiz.availableDate.toString()}</td>
                  <td>{quiz.availableUntilDate.toString()}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </MiddleContentData>
      </MiddleContent>
    </>
  );
}

export default QuizDetails;
