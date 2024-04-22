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
  return (
    <>
      <div>
        <div className="mt-2">
          <Form.Check
            type="radio"
            id={`trueFalse_${trueFalseQuestion._id}`}
            value="true"
            label="True"
          />
        </div>
        <div className="mt-2">
          <Form.Check
            type="radio"
            id={`trueFalse_${trueFalseQuestion._id}`}
            value="false"
            label="False"
          />
        </div>
      </div>
      <div className="d-flex">
        <Button className=" d-contents text-danger">
          <div className="ms-auto d-flex justify-content-center align-items-center">
            <FaPlus className="me-1" /> Add Another Answer
          </div>
        </Button>
      </div>
    </>
  );
}

export default QuizQuestionEditorBooleanAnswers;
