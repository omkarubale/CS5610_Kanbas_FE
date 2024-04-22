import { Button, Form } from "react-bootstrap";
import {
  IKanbasQuizQuestion,
  IKanbasQuizQuestionMCQ,
  IKanbasQuizQuestionMCQChoice,
} from "../../../../../../store/interfaces/quizzes";
import "./index.css";
import { FaPlus, FaTrash } from "react-icons/fa6";

function QuizQuestionEditorMcqAnswers({
  mcqQuestion,
  setQuizQuestion,
}: {
  mcqQuestion: IKanbasQuizQuestionMCQ;
  setQuizQuestion: (quizQuestion: IKanbasQuizQuestion) => void;
}) {
  const handleChangeCorrectChoice = (index: number) => {
    const _answerChoices = mcqQuestion.answerChoices.map((ac, _index) => {
      if (index == _index) {
        return {
          choiceText: ac.choiceText,
          isCorrect: true,
        } as IKanbasQuizQuestionMCQChoice;
      } else {
        return {
          choiceText: ac.choiceText,
          isCorrect: false,
        } as IKanbasQuizQuestionMCQChoice;
      }
    });

    const _mcqQuestion = { ...mcqQuestion, answerChoices: _answerChoices };
    setQuizQuestion(_mcqQuestion);
  };

  const handleChangeChoiceText = (index: number, text: string) => {
    const _answerChoices = mcqQuestion.answerChoices.map((ac, _index) => {
      if (index == _index) {
        return {
          choiceText: text,
          isCorrect: ac.isCorrect,
        } as IKanbasQuizQuestionMCQChoice;
      } else {
        return {
          choiceText: ac.choiceText,
          isCorrect: ac.isCorrect,
        } as IKanbasQuizQuestionMCQChoice;
      }
    });

    const _mcqQuestion = { ...mcqQuestion, answerChoices: _answerChoices };
    setQuizQuestion(_mcqQuestion);
  };

  const handleAddChoice = () => {
    const _answerChoices = [...mcqQuestion.answerChoices];
    _answerChoices.push({
      choiceText: "",
      isCorrect: false,
    } as IKanbasQuizQuestionMCQChoice);

    const _mcqQuestion = {
      ...mcqQuestion,
      answerChoices: _answerChoices,
    };
    setQuizQuestion(_mcqQuestion);
  };

  const handleRemoveChoice = (index: number) => {
    const _answerChoices = mcqQuestion.answerChoices.filter(
      (_, _index) => _index != index
    );

    const _mcqQuestion = {
      ...mcqQuestion,
      answerChoices: _answerChoices,
    };
    setQuizQuestion(_mcqQuestion);
  };

  return (
    <>
      <div>
        {mcqQuestion.answerChoices.map((choice, index) => (
          <div className="d-flex mt-2" key={index}>
            <Form.Check
              className="wd-quiz-question-mcq-choice"
              type="radio"
              name={`mcq_${mcqQuestion._id}`}
              checked={choice.isCorrect}
              onChange={(e) => {
                if (e.target.checked === true) {
                  handleChangeCorrectChoice(index);
                }
              }}
            />
            <Form.Control
              className="ms-2 w-50"
              type="text"
              name={`mcq_text_${mcqQuestion._id}`}
              placeholder="Type your answer..."
              value={choice.choiceText}
              onChange={(e) => handleChangeChoiceText(index, e.target.value)}
            />
            <div className="d-flex justify-content-center align-items-center ms-2">
              <FaTrash onClick={() => handleRemoveChoice(index)} />
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex mt-2">
        <Button className=" d-contents text-danger" onClick={handleAddChoice}>
          <div className="d-flex justify-content-center align-items-center">
            <FaPlus className="me-2" /> Add Another Answer
          </div>
        </Button>
      </div>
    </>
  );
}

export default QuizQuestionEditorMcqAnswers;
