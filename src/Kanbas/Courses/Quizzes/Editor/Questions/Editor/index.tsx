import { useState } from "react";
import {
  IKanbasQuizQuestion,
  IKanbasQuizQuestionBlank,
  IKanbasQuizQuestionMCQ,
  IKanbasQuizQuestionMCQChoice,
  IKanbasQuizQuestionTrueFalse,
} from "../../../../../store/interfaces/quizzes";
import { Button, Form } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { eQuizQuestionType } from "../../../../../store/enums/eQuizQuestionType";
import "./index.css";
import { useDispatch } from "react-redux";
import { setQuestion } from "../reducer";
import TinyMCEEditor from "../../../../common/Editor/TinyMCEEditor";
import QuizQuestionEditorMcqAnswers from "./McqAnswers";
import QuizQuestionEditorBooleanAnswers from "./BooleanAnswers";
import QuizQuestionEditorBlankAnswers from "./BlankAnswers";

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

  const handleQuestionTypeChange = (newQuizQuestionType: Number) => {
    let _quizQuestion: IKanbasQuizQuestion = internalQuizQuestion;

    switch (internalQuizQuestion.quizQuestionType) {
      case eQuizQuestionType.MCQ:
        _quizQuestion = {
          ...internalQuizQuestion,
          answerChoices: [] as IKanbasQuizQuestionMCQChoice[],
          quizQuestionType: Number(newQuizQuestionType),
        } as IKanbasQuizQuestionMCQ;
        break;

      case eQuizQuestionType.TrueOrFalse:
        _quizQuestion = {
          ...internalQuizQuestion,
          correctBooleanAnswer: true,
          quizQuestionType: Number(newQuizQuestionType),
        } as IKanbasQuizQuestionTrueFalse;
        break;

      case eQuizQuestionType.FillInTheBlank:
        _quizQuestion = {
          ...internalQuizQuestion,
          correctBlankAnswers: [],
          quizQuestionType: Number(newQuizQuestionType),
        } as IKanbasQuizQuestionBlank;
        break;

      default:
        return <div>Unsupported question type</div>;
    }

    console.log("Handling Type Change", _quizQuestion);
    setInternalQuizQuestion(_quizQuestion);
  };

  const renderAnswers = () => {
    switch (internalQuizQuestion.quizQuestionType) {
      case eQuizQuestionType.MCQ:
        const mcqQuestion: IKanbasQuizQuestionMCQ =
          internalQuizQuestion as IKanbasQuizQuestionMCQ;
        if (mcqQuestion.answerChoices === undefined)
          mcqQuestion.answerChoices = [];
        return (
          <QuizQuestionEditorMcqAnswers
            mcqQuestion={mcqQuestion}
            setQuizQuestion={setInternalQuizQuestion}
          />
        );

      case eQuizQuestionType.TrueOrFalse:
        const trueFalseQuestion: IKanbasQuizQuestionTrueFalse =
          internalQuizQuestion as IKanbasQuizQuestionTrueFalse;
        if (trueFalseQuestion.correctBooleanAnswer === undefined)
          trueFalseQuestion.correctBooleanAnswer = true;
        return (
          <QuizQuestionEditorBooleanAnswers
            trueFalseQuestion={trueFalseQuestion}
            setQuizQuestion={setInternalQuizQuestion}
          />
        );

      case eQuizQuestionType.FillInTheBlank:
        const blankQuestion: IKanbasQuizQuestionBlank =
          internalQuizQuestion as IKanbasQuizQuestionBlank;
        if (blankQuestion.correctBlankAnswers === undefined)
          blankQuestion.correctBlankAnswers = [];
        return (
          <QuizQuestionEditorBlankAnswers
            blankQuestion={blankQuestion}
            setQuizQuestion={setInternalQuizQuestion}
          />
        );

      default:
        return <div>Unsupported question type</div>;
    }
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
      <div className="wd-quiz-question-edit-container">
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
              onChange={(e) => handleQuestionTypeChange(Number(e.target.value))}
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
              type="number"
              className="wd-quiz-question-edit-pts ms-2"
              value={internalQuizQuestion.points}
              onChange={(e) =>
                setInternalQuizQuestion({
                  ...internalQuizQuestion,
                  points: Number(e.target.value),
                })
              }
            />
          </div>
        </div>
        <div className="wd-quiz-question-edit-body">
          <div className="mt-2">
            <span className="fs-6">
              Enter your question and multiple answers, then select the one
              correct answer.
            </span>
          </div>
          <div>
            <div className="fs-5 fw-medium mt-3 mb-2">Question:</div>
            <div>
              <TinyMCEEditor
                initialValue={questionText}
                onGetContent={handleGetEditorContent}
              />
            </div>
          </div>
          <div className="mb-4">
            <div className="fs-5 fw-medium mt-3">Answers:</div>
            <div>{renderAnswers()}</div>
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
