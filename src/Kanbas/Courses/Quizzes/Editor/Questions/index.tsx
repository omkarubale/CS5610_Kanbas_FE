import { Button, Form } from "react-bootstrap";

import QuizQuestionList from "./List";
import { useNavigate, useParams } from "react-router";
import { setQuizPublished } from "../../reducer";
import { useDispatch, useSelector } from "react-redux";
import { postQuizQuestions, postQuizSetPublish } from "../../client";
import { KanbasState } from "../../../../store";

function QuizQuestionsEditor() {
  const { courseId, quizId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const quizQuestions = useSelector(
    (state: KanbasState) => state.quizQuestionsReducer.questions
  );

  const handleCancel = () => {
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}`);
  };

  const handleSave = (isPublished: boolean) => {
    if (quizId !== undefined) {
      postQuizQuestions(quizId, quizQuestions).then(() => {
        if (isPublished) {
          postQuizSetPublish(quizId, true).then(() => {
            dispatch(setQuizPublished({ quizId, isPublished: true }));
          });
        }
      });
    }

    handleCancel();
  };

  return (
    <>
      <Form>
        <QuizQuestionList />

        <hr />

        <div className="d-flex">
          <div className="form-check float-start ms-2 mt-2 d-block flex-fill">
            <Form.Check
              type="checkbox"
              label="Notify users that this content has changed"
              id="formNotifyChangeCb"
              className="ps-0"
            />
          </div>
          <div className="float-end me-2">
            <Button
              className="wd-button-standard"
              onClick={() => handleCancel()}
            >
              Cancel
            </Button>
            <Button
              className="wd-button-standard"
              onClick={() => handleSave(true)}
            >
              Save & Publish
            </Button>
            <Button className="wd-button-red" onClick={() => handleSave(false)}>
              Save
            </Button>
          </div>
        </div>
        <hr />
      </Form>
    </>
  );
}

export default QuizQuestionsEditor;
