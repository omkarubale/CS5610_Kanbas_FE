import { Button, Form } from "react-bootstrap";
import {
  IKanbasQuizQuestion,
  IKanbasQuizQuestionTrueFalse,
} from "../../../../../../store/interfaces/quizzes";
import { FaPlus } from "react-icons/fa6";

function QuizQuestionEditorBooleanAnswers({
  quizQuestion,
  setQuizQuestion,
}: {
  quizQuestion: IKanbasQuizQuestion;
  setQuizQuestion: (quizQuestion: IKanbasQuizQuestion) => void;
}) {
  const trueFalseQuestion = quizQuestion as IKanbasQuizQuestionTrueFalse;

  const handleChangeCorrectChoice = (correctAnswer: boolean) => {
    const _trueFalseQuestion = {
      ...trueFalseQuestion,
      correctBooleanAnswer: correctAnswer,
    };
    setQuizQuestion(_trueFalseQuestion);
  };

  return (
    <>
      <div>
        <div className="mt-2">
          <Form.Check
            type="radio"
            id={`trueFalse_${trueFalseQuestion._id}`}
            checked={trueFalseQuestion.correctBooleanAnswer === true}
            onChange={(e) => handleChangeCorrectChoice(e.target.checked)}
            label="True"
          />
        </div>
        <div className="mt-2">
          <Form.Check
            type="radio"
            id={`trueFalse_${trueFalseQuestion._id}`}
            checked={trueFalseQuestion.correctBooleanAnswer === false}
            onChange={(e) => handleChangeCorrectChoice(!e.target.checked)}
            label="False"
          />
        </div>
      </div>
    </>
  );
}

export default QuizQuestionEditorBooleanAnswers;
