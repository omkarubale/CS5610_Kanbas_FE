import { useState } from "react";
import { IKanbasQuizQuestion } from "../../../../../store/interfaces/quizzes";
import { Button, Form } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { eQuizQuestionType } from "../../../../../store/enums/eQuizQuestionType";
import "./index.css";
import { useDispatch } from "react-redux";
import { setQuestion } from "../reducer";
import TinyMCEEditor from "../../../../common/Editor/TinyMCEEditor";

function QuizQuestionEditor({
  quizQuestion,
  setQuestionEditMode,
}: {
  quizQuestion: IKanbasQuizQuestion;
  setQuestionEditMode: (quizQuestionId: string, isEditMode: boolean) => void;
}) {
  const dispatch = useDispatch();

  const [internalQuizQuestion, setInternalQuizQuestion] =
    useState(quizQuestion);

  const [questionText, setEditorQuestionText] = useState(
    internalQuizQuestion?.questionText
  );
  const handleGetEditorContent = (content: string) => {
    setEditorQuestionText(content);
    setInternalQuizQuestion({ ...internalQuizQuestion, questionText: content });
  };

  const renderAnswers = () => {
    return <>Answers List</>;
  };

  const handleUpdateQuestion = () => {
    dispatch(setQuestion(internalQuizQuestion));
    setQuestionEditMode(quizQuestion._id, false);
  };

  const handleCancel = () => {
    setQuestionEditMode(quizQuestion._id, false);
  };

  return (
    <>
      <div>
        <div className="wd-quiz-question-edit-header d-flex">
          <div className="d-flex">
            <Form.Control
              placeholder="Question Title"
              value={internalQuizQuestion.title}
              onChange={(e) =>
                setInternalQuizQuestion({
                  ...internalQuizQuestion,
                  title: e.target.value,
                })
              }
            />
            <Form.Select
              className="ms-2"
              value={internalQuizQuestion.quizQuestionType}
              onChange={(e) =>
                setInternalQuizQuestion({
                  ...internalQuizQuestion,
                  quizQuestionType: Number(e.target.value),
                })
              }
            >
              <option value={eQuizQuestionType.MCQ}>Multiple Choice</option>
              <option value={eQuizQuestionType.FillInTheBlank}>
                Fill in the Blank
              </option>
              <option value={eQuizQuestionType.TrueOrFalse}>True/False</option>
            </Form.Select>
          </div>
          <div className="d-flex ms-auto">
            <div className="mt-2">pts: </div>
            <Form.Control
              className="wd-quiz-question-edit-pts ms-2"
              value={internalQuizQuestion.points}
            />
          </div>
        </div>
        <div className="wd-quiz-question-edit-body">
          <span className="fs-6">
            Enter your question and multiple answers, then select the one
            correct answer.
          </span>
          <div>
            <div className="fs-5 fw-medium">Question:</div>
            <div>
              <TinyMCEEditor
                initialValue={questionText}
                onGetContent={handleGetEditorContent}
              />
            </div>
          </div>
          <div>
            <div className="fs-5 fw-medium">Answers:</div>
            <div>{renderAnswers()}</div>

            <div className="d-flex">
              <Button className=" d-contents text-danger">
                <div className="ms-auto d-flex justify-content-center align-items-center">
                  <FaPlus className="me-1" /> Add Another Answer
                </div>
              </Button>
            </div>
          </div>
          <div>
            <Button
              size="sm"
              className="wd-button-standard"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              className="wd-button-red"
              onClick={handleUpdateQuestion}
            >
              Update Question
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default QuizQuestionEditor;
